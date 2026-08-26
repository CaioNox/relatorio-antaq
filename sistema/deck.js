// Autoria exclusiva do código-fonte e da lógica de implementação: Caio Fábio Alves da Silva.
// ╔══════════════════════════════════════════════════════════════════════════╗
// ║  sistema/deck.js — FONTE ÚNICA da ordem do relatório trimestral           ║
// ╠══════════════════════════════════════════════════════════════════════════╣
// ║  Consumido por index.html (apresentação) e relatorio.html (PDF).         ║
// ║  Antes deste arquivo, cada um mantinha sua PRÓPRIA lista de ordem, à mão  ║
// ║  — e as duas divergiam. Para reordenar/incluir/excluir um slide, mexa    ║
// ║  SÓ AQUI. Nenhuma outra lista de ordem deve existir no projeto.          ║
// ║                                                                           ║
// ║  Cada item de `files` pode ser:                                          ║
// ║    'slide-x.html'                              → aparece nos dois        ║
// ║    { file:'slide-x.html', apresentacao:false }  → só no PDF (não no      ║
// ║                                                    visualizador)         ║
// ║    { file:'slide-x.html', relatorio:false }     → só na apresentação     ║
// ╚══════════════════════════════════════════════════════════════════════════╝
window.RELATORIO = {
  meta: {
    titulo: 'Relatório Trimestral · Ouvidoria ANTAQ',
    rodapeAnexo: 'Relatório 1º Trimestre de 2026 – Ouvidoria – ANTAQ',
    arquivoPptx: 'Relatorio-Trimestral-2026-1T.pptx',
  },

  blocos: [
    {
      block: 'Abertura', short: 'Abertura', tint: 0.35, //4 slides
      files: ['slide-00.html', 'slide-34.html', 'slide-msg-ouvidora.html', 'slide-01.html'],
    },
    {
      block: 'Bloco 1 · Visão Geral das Ouvidorias públicas', short: 'Visão Geral', tint: 1, //6 slides
      files: ['capa-bloco-1.html', 'slide-ctx-01.html', 'slide-atribuicoes-01.html', 'slide-principios-01.html', 'slide-diretrizes-01.html', 'slide-diretrizes-02.html'],
    },
    {
      block: 'Bloco 2 · A Ouvidoria da ANTAQ', short: 'A Ouvidoria da ANTAQ', tint: 0.85,
      files: [
        'capa-bloco-2.html', 'slide-03c.html', 'slide-canais-atend.html', 'slide-falabr-faq.html',
        'slide-ouvidoria-geral.html', 'slide-25.html',
        // D2-a: slide-cartas-servicos.html tinha saído da apresentação mas continuava
        // no PDF do relatorio.html antigo (é dele que sai o anexo "Carta de Serviços").
        // Opção A (ADOTADA): mantém os 38 serviços no PDF sem reintroduzir o slide na
        // apresentação em tela. Opção B, não adotada: remover o slide e o anexo de vez,
        // assumindo a perda dos 38 serviços na versão documental.
        // Decidido em 2026-08-26 por auditoria técnica (ver AUDITORIA.md / conversa).
        { file: 'slide-cartas-servicos.html', apresentacao: false },
        'slide-CnsU.html', 'slide-CnsU2.html', 'slide-17b.html', 'slide-17e.html', 'slide-07.html',
      ],
    },
    {
      block: 'Bloco 3 · Seção de Apoio ao Cidadão — SAC', short: 'SAC', tint: 0.7,
      files: ['capa-bloco-3.html', 'slide-sac-apres.html', 'slide-sac-ativ.html', 'slide-14.html', 'slide-canal.html', 'slide-17d.html', 'slide-04.html', 'slide-05.html', 'slide-08.html', 'slide-ctx-03.html', 'slide-11.html', 'slide-12.html'],
    },
    {
      block: 'Bloco 4 · Seção de Transparência e Acesso à Informação — STAI', short: 'STAI', tint: 0.55,
      files: ['capa-bloco-4.html', 'slide-4a.html', 'slide-22.html', 'slide-23.html', 'slide-18.html', 'slide-20.html', 'slide-qa-geral.html', 'slide-tramit-uorg.html', 'slide-resp-unidade.html', 'slide-pda.html', 'slide-qa-dados-abertos.html', 'slide-21.html'],
    },
    {
      block: 'Bloco 5 · Considerações Finais', short: 'Considerações Finais', tint: 0.4,
      files: ['capa-bloco-5.html', 'slide-09.html', 'slide-conclusao.html'],
    },
    {
      block: 'Bloco 6 · Apêndice', short: 'Apêndice', tint: 0.3,
      files: ['capa-bloco-6.html', 'slide-31.html', 'slide-29.html', 'slide-29b.html', 'slide-30.html', 'slide-32.html', 'slide-35.html'],
    },
    // Bloco "Sobras" (capas desativadas / slides a revisar) foi ARQUIVADO fora do projeto
    // em jul/2026 — os 21 arquivos foram movidos para a pasta "sobras-relatorio" na
    // Área de Trabalho. Se precisar reativar algum, traga o arquivo de volta para
    // sistema/ e re-adicione o nome aqui no deck.
  ],

  // Conteúdo que no slide só aparece ao clicar/passar o mouse (glossário, decretos,
  // leis, normativos, carta de serviços, bases de dados abertos, respostas do
  // sanfona de perguntas). Consumido só por relatorio.html, para virar páginas de
  // texto — o slide em si não é alterado.
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
    // Sanfona de perguntas e respostas: no PDF, o slide sai igual à tela (só a
    // pergunta 01 aberta) — as 9 respostas completas saem aqui, sem overflow.
    'slide-qa-geral.html': {
      titulo: 'Perguntas e Respostas — STAI', sel: '.qa',
      ler: (el, txt) => ({ num: txt(el, '.qa-n'), nome: txt(el, '.qa-q'), tag: '', desc: txt(el, '.qa-a') })
    },
    'slide-qa-dados-abertos.html': {
      titulo: 'Perguntas e Respostas — Dados Abertos', sel: '.qa',
      ler: (el, txt) => ({ num: txt(el, '.qa-n'), nome: txt(el, '.qa-q'), tag: '', desc: txt(el, '.qa-a') })
    },
  },

  // Ajustes de captura para o gerador de PowerPoint — a chave é o arquivo sem
  // a query string. Usado só por relatorio.html (o PDF não precisa: ele já
  // sai igual à tela, e essas dicas de mouse não fazem sentido numa imagem
  // estática).
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
