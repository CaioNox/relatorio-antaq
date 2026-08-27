// Autoria exclusiva do código-fonte e da lógica de implementação: Caio Fábio Alves da Silva.
// ╔══════════════════════════════════════════════════════════════════════════╗
// ║  semestral/deck.js — FONTE ÚNICA da ordem do relatório semestral          ║
// ╠══════════════════════════════════════════════════════════════════════════╣
// ║  Consumido por index.html (apresentação) e relatorio.html (PDF).         ║
// ║  Mesmo padrão de sistema/deck.js e enquetes-2026/deck.js — para          ║
// ║  reordenar/incluir/excluir um slide, mexa SÓ AQUI.                       ║
// ║                                                                           ║
// ║  ATENÇÃO: a árvore `tree` de slide-01.html é uma SEGUNDA fonte de        ║
// ║  verdade, independente deste arquivo — precisa ser mantida em sincronia  ║
// ║  manual (ver INVENTARIO.md §4 e o teste comparador pedido no prompt).    ║
// ║                                                                           ║
// ║  Cada item de `files` pode ser:                                          ║
// ║    'slide-x.html'                              → aparece nos dois        ║
// ║    { file:'slide-x.html', apresentacao:false }  → só no PDF (não no      ║
// ║                                                    visualizador)         ║
// ║    { file:'slide-x.html', relatorio:false }     → só na apresentação     ║
// ╚══════════════════════════════════════════════════════════════════════════╝
window.RELATORIO = {
  meta: {
    titulo: 'Relatório Semestral · Ouvidoria ANTAQ',
    rodapeAnexo: 'Relatório 1º Semestre de 2026 – Ouvidoria – ANTAQ',
    arquivoPptx: 'Relatorio-Semestral-2026-1S.pptx',
  },

  blocos: [
    {
      block: 'Abertura', short: 'Abertura', tint: 0.35, // 4 slides
      files: ['slide-00.html', 'slide-34.html', 'slide-01.html', 'slide-msg-ouvidora.html'],
    },
    {
      block: 'Bloco 1 · Visão Geral das Ouvidorias públicas', short: 'Visão Geral', tint: 1, // 6 slides
      files: ['capa-bloco-1.html', 'slide-ctx-01.html', 'slide-atribuicoes-01.html', 'slide-principios-01.html', 'slide-diretrizes-01.html', 'slide-diretrizes-02.html'],
    },
    {
      block: 'Bloco 2 · A Ouvidoria da ANTAQ', short: 'A Ouvidoria da ANTAQ', tint: 0.85, // 11 slides
      files: [
        'capa-bloco-2.html', 'slide-03c.html', 'slide-ouvidoria-geral.html',
        'slide-falabr.html', // NOVO — ver §6.1 do prompt
        'slide-canais-atend.html',
        'slide-demais-canais.html', // NOVO (derivado de slide-canais-atend.html) — ver §6.3
        'slide-25.html',
        // Diferente do trimestral: aqui slide-cartas-servicos.html aparece TAMBÉM na
        // apresentação (sem apresentacao:false), conforme instrução explícita do prompt.
        'slide-cartas-servicos.html',
        'slide-17b.html', 'slide-17e.html', 'slide-07.html',
      ],
    },
    {
      block: 'Bloco 3 · Seção de Apoio ao Cidadão — SAC', short: 'SAC', tint: 0.7, // 9 slides
      files: ['capa-bloco-3.html', 'slide-sac-apres.html', 'slide-sac-ativ.html', 'slide-14.html', 'slide-canal.html', 'slide-17d.html', 'slide-04.html', 'slide-05.html', 'slide-08.html'],
    },
    {
      block: 'Bloco 4 · Seção de Transparência e Acesso à Informação — STAI', short: 'STAI', tint: 0.55, // 11 slides
      files: [
        'capa-bloco-4.html', 'slide-4a.html', 'slide-qa-geral.html', 'slide-23.html',
        // slide-22.html (Transparência Ativa) NÃO migra — decisão revertida: no relato
        // livre do usuário, "transparência ativa" só aparece como texto dentro de
        // slide-4a.html (junto com transparência passiva e dados abertos), sem slide
        // de dados próprio. Regra explícita do usuário: "o que não foi citado, não usar".
        'slide-pda.html', 'slide-qa-dados-abertos.html', 'slide-resp-unidade.html',
        'slide-tramit-uorg.html', 'slide-20.html', 'slide-18.html', 'slide-21.html',
      ],
    },
    {
      block: 'Bloco 5 · Considerações Finais', short: 'Considerações Finais', tint: 0.4, // 3 slides
      files: ['capa-bloco-5.html', 'slide-09.html', 'slide-conclusao.html'],
    },
    {
      block: 'Bloco 6 · Apêndice', short: 'Apêndice', tint: 0.3, // 6 slides
      files: ['capa-bloco-6.html', 'slide-31.html', 'slide-29.html', 'slide-29b.html', 'slide-30.html', 'slide-32.html'],
    },
    {
      block: 'Encerramento', short: 'Encerramento', tint: 0.2, // 1 slide
      files: ['slide-35.html'],
    },
  ],
  // Total: 51 slides.

  // Conteúdo que no slide só aparece ao clicar/passar o mouse (glossário, decretos,
  // leis, normativos, carta de serviços, bases de dados abertos, respostas da
  // sanfona de perguntas). Consumido só por relatorio.html, para virar páginas de
  // texto — o slide em si não é alterado. Herdado 1:1 de sistema/deck.js: todos os
  // arquivos abaixo continuam migrando para o semestral.
  anexos: {
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

  // Ajustes de captura para o gerador de PowerPoint — herdado 1:1 de sistema/deck.js.
  capturaPptx: {
    'slide-qa-geral.html': { esconder: '.hint' },
    'slide-qa-dados-abertos.html': { esconder: '.hint' },
  },
};

// ── Normalização + derivação (não mexer para reordenar — mexa em `blocos`) ──
(function () {
  function normalizar(it) {
    if (typeof it === 'string') return { file: it, apresentacao: true, relatorio: true };
    return { file: it.file, apresentacao: it.apresentacao !== false, relatorio: it.relatorio !== false };
  }

  // Lista achatada com metadados de bloco — usada pelo visualizador (index.html).
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

  // Lista simples de nomes de arquivo, na ordem final do documento — usada por
  // relatorio.html.
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

  // Guarda de sanidade: nenhum arquivo referenciado duas vezes na apresentação,
  // nenhum arquivo referenciado no relatório sem existir no repositório
  // (checado via fetch, não trava a página se falhar).
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
