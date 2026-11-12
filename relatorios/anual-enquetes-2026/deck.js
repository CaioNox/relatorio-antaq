

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



      block: 'Bloco 3 · Carta de Serviços da ANTAQ', short: 'Carta de Serviços', tint: 0.7,
      files: ['capa-bloco-3.html', 'slide-11.html', 'slide-carta-32servicos.html?p=1', 'slide-carta-32servicos.html?p=2', 'slide-12.html', 'slide-13.html', 'slide-14.html'],
    },
    {




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




  capturaPptx: {



    'slide-19.html': { classeBody: 'modo-grade', esconder: '.dicas, .ctx-bar .ctx-btn' },

    'slide-resultados-perspectivas.html': { classeBody: 'modo-grade', esconder: '.dicas, .ctx-bar .ctx-btn' },

    'slide-14.html': { esconder: '.filtro' },
    'slide-enquete.html': { esconder: '.btn-modo' },
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
