// Autoria exclusiva do código-fonte e da lógica de implementação: Caio Fábio Alves da Silva.
// ╔══════════════════════════════════════════════════════════════════════════╗
// ║  semestral/deck.js — FONTE ÚNICA da ordem do relatório semestral          ║
// ╠══════════════════════════════════════════════════════════════════════════╣
// ║  Consumido por index.html (apresentação) e relatorio.html (PDF/PPTX).    ║
// ║  Mesmo padrão de sistema/deck.js e enquetes-2026/deck.js — para          ║
// ║  reordenar/incluir/excluir um slide, mexa SÓ AQUI.                       ║
// ║                                                                           ║
// ║  ESTADO ATUAL: esqueleto com os 5 primeiros slides (placeholders).       ║
// ║  Conteúdo real dos blocos vem depois — por ora só a estrutura de         ║
// ║  navegação (viewer + PDF/PPTX) está pronta e funcional.                  ║
// ║                                                                           ║
// ║  Cada item de `files` pode ser:                                          ║
// ║    'slide-x.html'                              → aparece nos dois        ║
// ║    { file:'slide-x.html', apresentacao:false }  → só no PDF/PPTX          ║
// ║    { file:'slide-x.html', relatorio:false }     → só na apresentação     ║
// ╚══════════════════════════════════════════════════════════════════════════╝
window.RELATORIO = {
  meta: {
    titulo: 'Relatório Semestral · Ouvidoria ANTAQ',
    rodapeAnexo: 'Relatório Semestral de 2026 – Ouvidoria – ANTAQ',
    arquivoPptx: 'Relatorio-Semestral-2026.pptx',
  },

  blocos: [
    {
      block: 'Abertura', short: 'Abertura', tint: 0.6, // 5 slides (placeholder)
      files: ['slide-01.html', 'slide-02.html', 'slide-03.html', 'slide-04.html', 'slide-05.html'],
    },
    // Próximos blocos entram aqui conforme o conteúdo do semestre for
    // definido — mesmo esquema de sistema/deck.js (um objeto por bloco,
    // com `files` na ordem de exibição).
  ],

  // Sem anexos/ajustes de captura ainda — o esqueleto não tem cartões
  // interativos nem exceções de captura para o PPTX.
  anexos: {},
  capturaPptx: {},
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
