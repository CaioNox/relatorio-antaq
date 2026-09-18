/* vida.js — melhorias aditivas de movimento para os slides do Relatório da Ouvidoria ANTAQ.
 *
 * Não remove, não substitui e não altera nenhum estilo existente.
 * O estado final de qualquer elemento é idêntico ao que já estava no HTML.
 *
 * Uso:  <script src="vida.js" defer></script>   (depois de a11y.js)
 *
 * API:  Vida.finalizar()  — força todos os números para o valor final.
 *                           Chame antes de html2canvas / exportação PPTX.
 *       Vida.contar(el)   — inicia a contagem num elemento específico.
 */
(function (global) {
  'use strict';

  /* ------------------------------------------------------------------ *
   * Configuração
   * ------------------------------------------------------------------ */

  var ALVOS = '.kpi-num, .metric-value, .lb-num, [data-vida]';
  var DURACAO = 1100;

  /* Elementos que rodam animação em loop ganham promoção de camada.
     Puramente de performance — o resultado visual é idêntico. */
  var GPU = '.ocean, .wave, .wave-1, .wave-2, .wave-3, .nav-wave, .qr-ring';

  var CSS =
    '.vida-contando{font-variant-numeric:tabular-nums;' +
    'font-feature-settings:"tnum" 1}' +
    '.vida-gpu{will-change:transform;backface-visibility:hidden}';

  var pendentes = [];

  /* ------------------------------------------------------------------ *
   * Utilidades
   * ------------------------------------------------------------------ */

  function reduzido() {
    return global.matchMedia &&
      global.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }

  function injetarCSS() {
    if (document.getElementById('vidaCSS')) return;
    var s = document.createElement('style');
    s.id = 'vidaCSS';
    s.textContent = CSS;
    document.head.appendChild(s);
  }

  /* Interpreta número no formato pt-BR: "10.233" -> 10233 ; "13,9" -> 13.9
     Devolve null quando o conteúdo não é um número puro. */
  function interpretar(txt) {
    var t = (txt || '').trim();
    if (!t) return null;

    /* Descarta ordinais ("01", "02"), datas ("05/2018") e texto misto. */
    if (/^0\d/.test(t)) return null;
    if (/[\/\-–—a-zA-ZÀ-ÿ]/.test(t)) return null;
    if (!/\d/.test(t)) return null;

    var casas = 0;
    var virgula = t.lastIndexOf(',');
    if (virgula !== -1) casas = t.length - virgula - 1;

    var puro = t.replace(/\./g, '').replace(',', '.');
    var valor = parseFloat(puro);
    if (isNaN(valor)) return null;

    return { valor: valor, casas: casas, milhar: t.indexOf('.') !== -1 };
  }

  function formatar(n, casas, milhar) {
    return n.toLocaleString('pt-BR', {
      minimumFractionDigits: casas,
      maximumFractionDigits: casas,
      useGrouping: milhar
    });
  }

  /* ------------------------------------------------------------------ *
   * Contagem
   * ------------------------------------------------------------------ */

  function contar(el) {
    if (el.dataset.vidaFeito) return;

    var info = interpretar(el.textContent);
    if (info === null) { el.dataset.vidaFeito = '1'; return; }

    var original = el.textContent;
    el.dataset.vidaFeito = '1';
    el.dataset.vidaFinal = original;

    if (!el.hasAttribute('aria-label')) el.setAttribute('aria-label', original.trim());
    el.setAttribute('aria-hidden', 'true');

    if (reduzido()) return;

    el.classList.add('vida-contando');
    el.textContent = formatar(0, info.casas, info.milhar);

    var t0 = null;
    var reg = { el: el, texto: original };
    pendentes.push(reg);

    function passo(t) {
      if (reg.cancelado) return;
      if (t0 === null) t0 = t;
      var p = Math.min((t - t0) / DURACAO, 1);
      var e = 1 - Math.pow(1 - p, 3);            /* easeOutCubic */
      el.textContent = formatar(info.valor * e, info.casas, info.milhar);
      if (p < 1) {
        requestAnimationFrame(passo);
      } else {
        el.textContent = original;               /* volta ao HTML original */
        el.classList.remove('vida-contando');
        reg.cancelado = true;
      }
    }
    requestAnimationFrame(passo);
  }

  function finalizar() {
    pendentes.forEach(function (reg) {
      if (reg.cancelado) return;
      reg.cancelado = true;
      reg.el.textContent = reg.texto;
      reg.el.classList.remove('vida-contando');
    });
    pendentes.length = 0;
  }

  /* ------------------------------------------------------------------ *
   * Performance — sem efeito visual
   * ------------------------------------------------------------------ */

  function promoverCamadas() {
    var vistos = {};
    document.querySelectorAll(GPU).forEach(function (el) {
      el.classList.add('vida-gpu');
    });
    document.querySelectorAll('[class]').forEach(function (el) {
      var chave = el.className;
      if (typeof chave !== 'string' || vistos[chave] === false) return;
      var cs = getComputedStyle(el);
      if (cs.animationIterationCount.indexOf('infinite') !== -1) {
        el.classList.add('vida-gpu');
        vistos[chave] = true;
      } else {
        vistos[chave] = false;
      }
    });
  }

  /* ------------------------------------------------------------------ *
   * Inicialização
   * ------------------------------------------------------------------ */

  function iniciar() {
    injetarCSS();
    promoverCamadas();
    document.querySelectorAll(ALVOS).forEach(contar);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', iniciar);
  } else {
    iniciar();
  }

  /* A captura para PPTX e a impressão precisam do valor final. */
  global.addEventListener('beforeprint', finalizar);
  global.addEventListener('message', function (e) {
    if (e.data && e.data.tipo === 'vida:finalizar') finalizar();
  });

  global.Vida = { contar: contar, finalizar: finalizar, interpretar: interpretar };
})(window);
