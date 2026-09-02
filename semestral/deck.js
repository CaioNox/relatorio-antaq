

window.RELATORIO = {
  meta: {
    titulo: 'Relatório Semestral · Ouvidoria ANTAQ',
    rodapeAnexo: 'Relatório 1º Semestre de 2026 – Ouvidoria – ANTAQ',
    arquivoPptx: 'Relatorio-Semestral-2026-1S.pptx',
  },

  blocos: [
    {
      block: 'Abertura', short: 'Abertura', tint: 0.35,
      files: ['slide-00.html', 'slide-34.html', 'slide-01.html', 'slide-msg-ouvidora.html'],
    },
    {
      block: 'Bloco 1 · Visão Geral das Ouvidorias públicas', short: 'Visão Geral', tint: 1,
      files: ['capa-bloco-1.html', 'slide-ctx-01.html', 'slide-fundamentos-ouvidorias.html'],
    },
    {
      block: 'Bloco 2 · A Ouvidoria da ANTAQ', short: 'A Ouvidoria da ANTAQ', tint: 0.85,
      files: [
        'capa-bloco-2.html',
        'slide-03c.html',
        'slide-falabr.html',
        'slide-demais-canais.html',
        'slide-ouvidoria-geral.html',
        'slide-25.html',
        'slide-cartas-servicos.html',
        'conselho.html',
        'slide-17.html',
        'slide-CnsU2.html',
        'slide-17b.html', 'slide-17e.html', 'slide-07.html',
      ],
    },
    {
      block: 'Bloco 3 · Seção de Apoio ao Cidadão — SAC', short: 'SAC', tint: 0.7,
      files: ['capa-bloco-3.html', 'slide-sac-apres.html', 'slide-sac-ativ.html', 'slide-14.html', 'slide-canal.html', 'slide-17d.html', 'slide-04.html', 'slide-05.html', 'slide-08.html'],
    },
    {
      block: 'Bloco 4 · Seção de Transparência e Acesso à Informação — STAI', short: 'STAI', tint: 0.55,
      files: [
        'capa-bloco-4.html', 'slide-4a.html', 'slide-qa-geral.html', 'slide-23.html',




        'slide-pda.html', 'slide-qa-dados-abertos.html',
        'slide-20.html', 'slide-18.html', 'slide-21.html',
      ],
    },
    {
      block: 'Bloco 5 · Considerações Finais', short: 'Considerações Finais', tint: 0.4,
      files: ['capa-bloco-5.html', 'slide-09.html', 'slide-conclusao.html'],
    },
    {
      block: 'Bloco 6 · Apêndice', short: 'Apêndice', tint: 0.3,
      files: ['capa-bloco-6.html', 'slide-31.html', 'slide-29.html', 'slide-29b.html', 'slide-30.html', 'slide-32.html'],
    },
    {
      block: 'Encerramento', short: 'Encerramento', tint: 0.2,
      files: ['slide-35.html'],
    },
  ],







  anexos: {
    // slide-fundamentos-ouvidorias.html só mostra 1 das 4 etapas por vez (navegação
    // interativa) — sem este anexo, o PDF perderia Princípios/Diretrizes 1-8/9-16.
    'slide-fundamentos-ouvidorias.html': {
      titulo: 'Atribuições, Princípios e Diretrizes das Ouvidorias — detalhamento completo',
      sel: '.etapa-foco',
      ler: (el, txt) => {
        var itens = Array.from(el.querySelectorAll('.ref-card')).map(function (c) {
          var n = txt(c, '.ref-num');
          var t = txt(c, '.ref-title');
          var d = txt(c, '.ref-desc');
          return n + '. ' + (t ? t + ' — ' : '') + d;
        }).join(' ');
        return { num: el.dataset.n || '', nome: txt(el, '.foco-t'), tag: '', desc: itens };
      }
    },
    'slide-cartas-servicos.html': {
      titulo: 'Carta de Serviços da ANTAQ', sel: '.svc-bar',
      ler: (el, txt) => ({
        num: el.dataset.num || '', nome: el.dataset.title || txt(el, '.sb-name'),
        tag: el.dataset.kicker || '', desc: txt(el, '.sb-desc')
      })
    },
    'slide-21.html': {
      titulo: 'Dados Abertos — bases publicadas', sel: '.base-chip',
      ler: (el, txt) => ({
        num: el.dataset.num || '', nome: el.dataset.title || txt(el, '.bt-name'),
        tag: '', desc: txt(el, '.bt-desc'), src: el.dataset.link || ''
      })
    },
    'slide-31.html': { titulo: 'Decretos', sel: '.tile', ler: 'tile' },
    'slide-29.html': { titulo: 'Glossário', sel: '.tile', ler: 'tile' },
    'slide-29b.html': { titulo: 'Glossário (continuação)', sel: '.tile', ler: 'tile' },
    'slide-30.html': { titulo: 'Leis', sel: '.tile', ler: 'tile' },
    'slide-32.html': { titulo: 'Normativos e Portarias', sel: '.tile', ler: 'tile' },
    'slide-qa-geral.html': {
      titulo: 'Perguntas e Respostas — STAI', sel: '.qa',
      ler: (el, txt) => ({ num: txt(el, '.qa-n'), nome: txt(el, '.qa-q'), tag: '', desc: txt(el, '.qa-a') })
    },
    'slide-qa-dados-abertos.html': {
      titulo: 'Perguntas e Respostas — Dados Abertos', sel: '.qa',
      ler: (el, txt) => ({ num: txt(el, '.qa-n'), nome: txt(el, '.qa-q'), tag: '', desc: txt(el, '.qa-a') })
    },
  },


  capturaPptx: {
    'slide-qa-geral.html': { esconder: '.hint' },
    'slide-qa-dados-abertos.html': { esconder: '.hint' },
  },
};

(function () {
  function normalizar(it) {
    if (typeof it === 'string') return { file: it, apresentacao: true, relatorio: true };
    return { file: it.file, apresentacao: it.apresentacao !== false, relatorio: it.relatorio !== false };
  }


  window.RELATORIO.paraApresentacao = function () {
    const out = [];
    this.blocos.forEach((b, bi) => {
      b.files.forEach((it) => {
        const n = normalizar(it);
        if (n.apresentacao) out.push({ file: n.file, block: b.block, blockShort: b.short, blockIndex: bi, tint: b.tint });
      });
    });
    return out;
  };



  window.RELATORIO.paraRelatorio = function () {
    const out = [];
    this.blocos.forEach((b) => {
      b.files.forEach((it) => {
        const n = normalizar(it);
        if (n.relatorio) out.push(n.file);
      });
    });
    return out;
  };




  window.RELATORIO.checarSanidade = function () {
    const vistos = new Set();
    this.paraApresentacao().forEach((s) => {
      if (vistos.has(s.file)) console.warn('[deck.js] arquivo duplicado na apresentação:', s.file);
      vistos.add(s.file);
    });
    this.paraRelatorio().forEach((file) => {
      fetch(file, { method: 'HEAD' }).then((r) => {
        if (!r.ok) console.warn('[deck.js] arquivo referenciado no relatório não encontrado:', file);
      }).catch(() => console.warn('[deck.js] falha ao checar arquivo:', file));
    });
  };
})();
