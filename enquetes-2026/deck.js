// Autoria exclusiva do código-fonte e da lógica de implementação: Caio Fábio Alves da Silva.
// ╔══════════════════════════════════════════════════════════════════════════╗
// ║  enquetes-2026/deck.js — FONTE ÚNICA da ordem do relatório de enquetes    ║
// ╠══════════════════════════════════════════════════════════════════════════╣
// ║  Consumido por index.html (apresentação) e relatorio.html (PDF/PPTX).    ║
// ║  Requer que dados-enquetes.js (variável global ENQUETES) seja carregado  ║
// ║  ANTES deste arquivo.                                                    ║
// ║                                                                           ║
// ║  Cada item de `files` pode ser:                                          ║
// ║    'slide-x.html'                              → aparece nos dois        ║
// ║    { file:'slide-x.html', apresentacao:false }  → só no PDF/PPTX          ║
// ║    { file:'slide-x.html', relatorio:false }     → só na apresentação     ║
// ╚══════════════════════════════════════════════════════════════════════════╝

// As telas de enquete não são listadas uma a uma: elas saem de dados-enquetes.js,
// na ordem SOG → SRG → SAF → SFC. Cada enquete ocupa DUAS telas — `&p=1` com as
// questões 1 e 2 (rosca) e `&p=2` com as questões 3 e 4 (barras) mais as
// sugestões. As enquetes em que ninguém usou o serviço (`q2` nulo) não têm
// questões 2 a 5, então ficam em uma tela só. Publicar/retirar uma enquete =
// mexer só no .js.
const telasEnquetes = [];
['SOG', 'SRG', 'SAF', 'SFC'].forEach((sigla) => {
  ENQUETES.filter((e) => e.sup === sigla)
    .sort((a, b) => a.num - b.num)
    .forEach((e) => {
      const base = 'slide-enquete.html?e=' + e.id;
      telasEnquetes.push(base + '&p=1');
      if (e.q2) telasEnquetes.push(base + '&p=2');
    });
});

window.RELATORIO = {
  meta: {
    titulo: 'Relatório Anual de Enquetes do Conselho de Usuários · 2026',
    rodapeAnexo: 'Relatório Anual de Enquetes do Conselho de Usuários · 2026 – Ouvidoria – ANTAQ',
  },

  blocos: [
    {
      block: 'Abertura', short: 'Abertura', tint: 0.35,
      files: ['slide-00.html', 'slide-01.html', 'slide-02.html', 'slide-03.html'],
    },
    {
      block: 'Bloco 1 · Visão Geral das Ouvidorias públicas', short: 'Visão Geral', tint: 1,
      files: ['capa-bloco-1.html', 'slide-04.html', 'slide-05.html', 'slide-06.html', 'slide-07.html', 'slide-08.html'],
    },
    {
      block: 'Bloco 2 · A Ouvidoria da ANTAQ', short: 'A Ouvidoria da ANTAQ', tint: 0.85,
      files: ['capa-bloco-2.html', 'slide-09.html', 'slide-10.html'],
    },
    {
      // Ordem do documento-fonte: apresentação (p.16) → 33 serviços (p.17) →
      // serviços por superintendência (p.18–20) → números (p.21) →
      // evolução histórica 2021–2026 (fecha o bloco).
      block: 'Bloco 3 · Carta de Serviços da ANTAQ', short: 'Carta de Serviços', tint: 0.7,
      files: ['capa-bloco-3.html', 'slide-11.html', 'slide-carta-32servicos.html?p=1', 'slide-carta-32servicos.html?p=2', 'slide-12.html', 'slide-13.html', 'slide-14.html'],
    },
    {
      // Ordem escolhida na revisão (não segue mais o documento-fonte):
      // "Como se tornar conselheiro" → "Conselho em números" → Metodologia
      // (5 etapas) → Estrutura das enquetes. O slide de fluxo da consulta
      // foi removido do deck.
      block: 'Bloco 4 · Conselho de Usuários da ANTAQ', short: 'Conselho de Usuários', tint: 0.55,
      files: [
        'capa-bloco-4.html',
        'slide-15.html', 'slide-16.html', 'slide-17.html',
        'slide-18.html', 'slide-19.html',
        'slide-20.html',
        'slide-tabela-enquetes.html?p=1', 'slide-tabela-enquetes.html?p=2',
        ...telasEnquetes,
      ],
    },
    {
      // slide-resultados-perspectivas.html unificou os dois slides antigos de
      // resultados (órgão/cidadão + "para ambos") num stepper de 3
      // perspectivas, no mesmo formato do slide-19; o convite para novos
      // conselheiros que fechava o bloco virou o overlay (tecla C) daquele
      // slide. slide-resultados-orgao.html e slide-22.html saíram do deck.
      block: 'Bloco 5 · Considerações Finais', short: 'Considerações Finais', tint: 0.4,
      files: ['capa-bloco-5.html', 'slide-21.html', 'slide-resultados-perspectivas.html'],
    },
    {
      block: 'Bloco 6 · Apêndice', short: 'Apêndice', tint: 0.3,
      files: ['capa-bloco-6.html', 'slide-23.html', 'slide-24.html', 'slide-25.html', 'slide-26.html', 'slide-27.html'],
    },
  ],

  anexos: {
    'slide-carta-32servicos.html?p=2': {
      titulo: 'Carta de Serviços da ANTAQ', sel: '.svc-bar',
      ler: (el, txt) => ({
        num: el.dataset.num || '', nome: el.dataset.title || txt(el, '.sb-name'),
        tag: el.dataset.kicker || '', desc: txt(el, '.sb-desc')
      })
    },
    'slide-23.html': { titulo: 'Decretos', sel: '.tile', ler: 'tile' },
    'slide-24.html': { titulo: 'Glossário', sel: '.tile', ler: 'tile' },
    'slide-25.html': { titulo: 'Leis', sel: '.tile', ler: 'tile' },
    'slide-26.html': { titulo: 'Normativos e Portarias', sel: '.tile', ler: 'tile' },
  },

  // Ajustes de captura para o gerador de PowerPoint — a chave é o arquivo sem a
  // query string, porque as telas de enquete chegam como
  // `slide-enquete.html?e=8270&p=1`.
  capturaPptx: {
    // O slide já tem o modo de visão geral pronto (`body.modo-grade`):
    // captura as 5 etapas em vez da etapa 1 sozinha, que é o estado
    // inicial e o que vinha saindo no PowerPoint.
    'slide-19.html': { classeBody: 'modo-grade', esconder: '.dicas, .ctx-bar .ctx-btn' },
    // Mesmo caso: as 3 perspectivas (25 resultados) em vez da 1ª sozinha.
    'slide-resultados-perspectivas.html': { classeBody: 'modo-grade', esconder: '.dicas, .ctx-bar .ctx-btn' },
    // Controles que só servem com mouse — numa imagem estática são ruído.
    'slide-14.html': { esconder: '.filtro' },
    'slide-enquete.html': { esconder: '.btn-modo' },
  },
};

// ── Normalização + derivação (não mexer para reordenar — mexa em `blocos`) ──
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
