

window.RELATORIO = {
  meta: {
    titulo: 'Relatório Trimestral · Ouvidoria ANTAQ',
    rodapeAnexo: 'Relatório 3º Trimestre de 2026 – Ouvidoria – ANTAQ',
    arquivoPptx: 'Relatorio-Trimestral-2026-3T.pptx',
  },

  blocos: [
    {
      block: 'Abertura', short: 'Abertura', tint: 0.35,
      files: ['slide-00.html', 'slide-01.html', 'slide-02.html', 'slide-03.html'],//4
    },
    {
      block: 'Bloco 1 · Visão Geral das Ouvidorias públicas', short: 'Visão Geral', tint: 1,
      files: ['slide-04.html', 'slide-05.html', 'slide-06.html'],//7
    },
    {
      block: 'Bloco 2 · A Ouvidoria da ANTAQ', short: 'A Ouvidoria da ANTAQ', tint: 0.85,
      files: [
        'slide-07.html',
        'slide-08.html',
        'slide-09.html',
        'slide-10.html',
        'slide-11.html',
        'slide-12.html',
        'slide-13.html',
        'slide-14.html',
        'slide-15.html',
        'slide-16.html',
        'slide-17.html', 'slide-18.html', 'slide-19.html',
      ],//20
    },
    {
      block: 'Bloco 3 · Seção de Apoio ao Cidadão — SAC', short: 'SAC', tint: 0.7,
      files: ['slide-20.html', 'slide-21.html', 'slide-22.html',
        'slide-23.html', 'slide-24.html', 'slide-25.html', 'slide-26.html', 'slide-27.html', 'slide-28.html'],
    },
    {
      block: 'Bloco 4 · Seção de Transparência e Acesso à Informação — STAI', short: 'STAI', tint: 0.55,
      files: [
        'slide-29.html', 'slide-30.html',
        // 1. Transparência passiva
        'slide-31.html', 'slide-32.html', 'slide-33.html',
        // 2. Transparência ativa
        'slide-34.html', 'slide-35.html',
        // 3. Dados abertos
        'slide-36.html', 'slide-37.html', 'slide-38.html',
      ],
    },
    {
      block: 'Bloco 5 · Considerações Finais', short: 'Considerações Finais', tint: 0.4,
      files: ['slide-39.html', 'slide-40.html', 'slide-41.html', 'slide-42.html'],
    },
    {
      block: 'Bloco 6 · Apêndice', short: 'Apêndice', tint: 0.3,
      files: ['slide-43.html',
        // 1. Leis · 2. Decretos · 3. Normativos · 4. Glossário
        'slide-44.html', 'slide-45.html', 'slide-46.html',
        'slide-47.html', 'slide-48.html'],
    },
    {
      block: 'Encerramento', short: 'Encerramento', tint: 0.2,
      files: ['slide-49.html'],
    },
  ],







  anexos: {
    // slide-06.html só mostra 1 das 4 etapas por vez (navegação
    // interativa) — sem este anexo, o PDF perderia Princípios/Diretrizes 1-8/9-16.
    'slide-06.html': {
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
    // slide-14.html mostra uma superintendencia por vez (4 etapas);
    // sem varrer todas as .etapa-foco, o PDF perderia 3 das 4.
    'slide-14.html': {
      titulo: 'Carta de Serviços da ANTAQ', sel: '.etapa-foco',
      ler: (el, txt) => {
        var itens = Array.from(el.querySelectorAll('.svc-bar')).map(function (b) {
          var n = b.dataset.num || txt(b, '.sb-num');
          var t = b.dataset.title || txt(b, '.sb-name');
          return n + '. ' + t + ' — ' + txt(b, '.sb-desc');
        }).join(' ');
        return {
          num: el.dataset.n || '', nome: txt(el, '.card-nome p'),
          tag: txt(el, '.card-cont'), desc: itens
        };
      }
    },
    'slide-37.html': {
      titulo: 'Dados Abertos — bases publicadas', sel: '.base-chip',
      ler: (el, txt) => ({
        num: el.dataset.num || '', nome: el.dataset.title || txt(el, '.bt-name'),
        tag: '', desc: txt(el, '.bt-desc'), src: el.dataset.link || ''
      })
    },
    'slide-45.html': { titulo: 'Decretos', sel: '.tile', ler: 'tile' },
    'slide-47.html': { titulo: 'Glossário', sel: '.tile', ler: 'tile' },
    'slide-48.html': { titulo: 'Glossário (continuação)', sel: '.tile', ler: 'tile' },
    'slide-44.html': { titulo: 'Leis', sel: '.tile', ler: 'tile' },
    'slide-46.html': { titulo: 'Normativos e Portarias', sel: '.tile', ler: 'tile' },
    'slide-38.html': {
      titulo: 'Perguntas e Respostas — Dados Abertos', sel: '.qa',
      ler: (el, txt) => ({ num: txt(el, '.qa-n'), nome: txt(el, '.qa-q'), tag: '', desc: txt(el, '.qa-a') })
    },
  },


  capturaPptx: {
    'slide-38.html': { esconder: '.hint' },
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
