// Autoria exclusiva do código-fonte e da lógica de implementação: Caio Fábio Alves da Silva.
// ╔══════════════════════════════════════════════════════════════════════════╗
// ║  crie-seu-slide.js — MOTOR COMPARTILHADO do montador de apresentação      ║
// ╠══════════════════════════════════════════════════════════════════════════╣
// ║  Usado pelas duas ferramentas — crie-seu-slide-trimestral.html (foco no   ║
// ║  Relatório Trimestral) e crie-seu-slide-conselho.html (foco no Relatório  ║
// ║  do Conselho de Usuários). A ordem/seleção inicial de cada uma é o seu    ║
// ║  próprio relatório, mas a Biblioteca sempre oferece os slides do OUTRO    ║
// ║  relatório também — dá pra puxar slides de um pro outro à vontade.        ║
// ║                                                                           ║
// ║  Cada página que inclui este arquivo deve, ANTES do <script src=          ║
// ║  "crie-seu-slide.js">, definir:                                          ║
// ║    window.CRIE_SEU_SLIDE_CONFIG = {                                       ║
// ║      focoOrigem: 'sistema' | 'enquetes',   // relatório padrão desta      ║
// ║                                             // ferramenta                 ║
// ║      tituloFoco: 'Relatório Trimestral',   // nome amigável, p/ mensagens ║
// ║      storageKey: 'crieSeuSlide.trimestral.v1', // chave própria no        ║
// ║                                             // localStorage (as duas      ║
// ║                                             // ferramentas não podem      ║
// ║                                             // compartilhar a mesma)      ║
// ║    };                                                                    ║
// ║                                                                           ║
// ║  NENHUM arquivo de sistema/ ou enquetes-2026/ é alterado ou duplicado:    ║
// ║  os slides são carregados ao vivo dos próprios arquivos originais.        ║
// ╚══════════════════════════════════════════════════════════════════════════╝
(function () {
  const CONFIG = Object.assign({
    focoOrigem: null,
    tituloFoco: 'este relatório',
    storageKey: 'crieSeuSlide.geral.v1',
  }, window.CRIE_SEU_SLIDE_CONFIG || {});

  /* ══════════════════════════════════════════════════════════════════
     1. CARREGAR OS DOIS DECKS SEM CONFLITO
     sistema/deck.js e enquetes-2026/deck.js fazem, cada um, `window.
     RELATORIO = {...}`. Incluí-los com <script src> normal faria o
     segundo sobrescrever o primeiro. Em vez disso, buscamos o texto de
     cada arquivo e rodamos dentro de uma função cujo parâmetro se chama
     "window" — isso isola cada deck (inclusive o `const ENQUETES` que o
     deck de enquetes espera encontrar no escopo) sem tocar no `window`
     real nem um deck atropelar o outro.
     ══════════════════════════════════════════════════════════════════ */
  const ORIGENS = {
    sistema: { label: 'Trimestral', pasta: 'sistema/', extras: [] },
    enquetes: { label: 'Conselho de Usuários', pasta: 'enquetes-2026/', extras: ['dados-enquetes.js'] },
  };
  const STORAGE_KEY = CONFIG.storageKey;

  async function carregarRelatorio(pasta, extras) {
    const arquivos = extras.concat(['deck.js']);
    const textos = await Promise.all(arquivos.map((f) => fetch(pasta + f).then((r) => r.text())));
    const codigo = textos.join('\n;\n') + '\n;return window.RELATORIO;';
    const fn = new Function('window', codigo);
    return fn({});
  }

  let poolTodos = [];
  const poolPorUid = new Map();
  let decks = {};
  let ajustesCaptura = {};
  let selecao = [];
  let focoUid = null;

  function salvar() {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(selecao)); } catch (e) { /* ignora */ }
  }

  function carregarSelecaoSalva() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return null;
      const arr = JSON.parse(raw);
      if (!Array.isArray(arr)) return null;
      const filtrado = arr.filter((uid) => poolPorUid.has(uid));
      return filtrado.length ? filtrado : null;
    } catch (e) { return null; }
  }

  function selecaoPadrao() {
    if (!CONFIG.focoOrigem) return poolTodos.map((s) => s.uid);
    return poolTodos.filter((s) => s.origemKey === CONFIG.focoOrigem).map((s) => s.uid);
  }

  async function init() {
    const [sistema, enquetes] = await Promise.all([
      carregarRelatorio(ORIGENS.sistema.pasta, ORIGENS.sistema.extras),
      carregarRelatorio(ORIGENS.enquetes.pasta, ORIGENS.enquetes.extras),
    ]);
    decks = { sistema, enquetes };

    Object.keys(decks).forEach((key) => {
      const cfg = ORIGENS[key];
      const deck = decks[key];
      deck.paraApresentacao().forEach((s) => {
        const item = {
          uid: cfg.pasta + s.file,
          src: cfg.pasta + s.file,
          file: s.file,
          pasta: cfg.pasta,
          origem: cfg.label,
          origemKey: key,
          block: s.block,
          blockShort: s.blockShort,
          tint: s.tint,
        };
        poolTodos.push(item);
        poolPorUid.set(item.uid, item);
      });
      // Ajustes de captura para o PPTX indexados por PASTA+ARQUIVO (não só
      // pelo nome do arquivo): sistema/ e enquetes-2026/ têm arquivos de
      // mesmo nome com conteúdo diferente.
      Object.entries(deck.capturaPptx || {}).forEach(([file, ajuste]) => {
        ajustesCaptura[cfg.pasta + file] = ajuste;
      });
    });

    selecao = carregarSelecaoSalva() || selecaoPadrao();
    focoUid = selecao[0] || null;

    document.getElementById('loadingOverlay').classList.add('hidden');
    renderFilmstrip();
    renderBiblioteca();
    atualizarPalco();
  }

  init().catch((e) => {
    console.error('Falha ao carregar os decks:', e);
    document.getElementById('loadingOverlay').innerHTML =
      '<div class="loading-box"><i class="fa-solid fa-triangle-exclamation"></i>' +
      '<p>Não foi possível carregar os slides.<br>Veja o console para detalhes.</p></div>';
  });

  /* ══════════════════════════════════════════════════════════════════
     2. FILMSTRIP — a seleção atual, na ordem atual
     ══════════════════════════════════════════════════════════════════ */
  const filmstripEl = document.getElementById('filmstrip');
  const filmstripCountEl = document.getElementById('filmstripCount');
  let dragUid = null;

  function renderFilmstrip() {
    filmstripEl.innerHTML = '';
    if (filmstripCountEl) {
      filmstripCountEl.textContent = selecao.length === 1 ? '1 slide selecionado' : selecao.length + ' slides selecionados';
    }
    if (!selecao.length) {
      const vazio = document.createElement('div');
      vazio.className = 'filmstrip-vazio';
      vazio.textContent = 'Sua seleção está vazia — adicione slides pela Biblioteca.';
      filmstripEl.appendChild(vazio);
      return;
    }
    selecao.forEach((uid, i) => {
      const s = poolPorUid.get(uid);
      if (!s) return;
      const outro = CONFIG.focoOrigem && s.origemKey !== CONFIG.focoOrigem;
      const card = document.createElement('div');
      card.className = 'fs-card' + (uid === focoUid ? ' active' : '') + (outro ? ' fs-card-outro' : '');
      card.draggable = true;
      card.dataset.uid = uid;
      card.style.setProperty('--tint', s.tint);
      card.title = s.origem + ' · ' + s.block + ' · ' + s.file;

      const num = document.createElement('span');
      num.className = 'fs-num';
      num.textContent = i + 1;

      const texto = document.createElement('span');
      texto.className = 'fs-text';

      const origem = document.createElement('span');
      origem.className = 'fs-origem';
      origem.textContent = outro ? s.origem + ' ↩' : s.origem;

      const arquivo = document.createElement('span');
      arquivo.className = 'fs-file';
      arquivo.textContent = s.file.replace(/\.html.*/, '').replace(/[-_]/g, ' ');

      const bloco = document.createElement('span');
      bloco.className = 'fs-block';
      bloco.textContent = s.blockShort;

      texto.append(origem, arquivo, bloco);

      const remove = document.createElement('button');
      remove.className = 'fs-remove';
      remove.type = 'button';
      remove.textContent = '×';
      remove.title = 'Remover';
      remove.setAttribute('aria-label', 'Remover slide ' + (i + 1) + ': ' + s.file);
      remove.addEventListener('click', (e) => { e.stopPropagation(); removerDaSelecao(uid); });

      card.append(num, texto, remove);

      card.addEventListener('click', () => {
        focoUid = uid;
        atualizarPalco();
        renderFilmstrip();
      });

      card.addEventListener('dragstart', (e) => {
        dragUid = uid;
        card.classList.add('dragging');
        e.dataTransfer.effectAllowed = 'move';
      });
      card.addEventListener('dragend', () => {
        dragUid = null;
        card.classList.remove('dragging');
        salvar();
      });
      card.addEventListener('dragover', (e) => {
        e.preventDefault();
        if (!dragUid || dragUid === uid) return;
        const de = selecao.indexOf(dragUid);
        const te = selecao.indexOf(uid);
        if (de === -1 || te === -1 || de === te) return;
        selecao.splice(de, 1);
        selecao.splice(te, 0, dragUid);
        renderFilmstrip();
      });

      filmstripEl.appendChild(card);
    });
  }

  function removerDaSelecao(uid) {
    selecao = selecao.filter((u) => u !== uid);
    if (focoUid === uid) focoUid = selecao[0] || null;
    renderFilmstrip();
    renderBiblioteca();
    atualizarPalco();
    salvar();
  }

  function adicionarNaSelecao(uid) {
    if (selecao.includes(uid)) return;
    selecao.push(uid);
    focoUid = uid;
    renderFilmstrip();
    renderBiblioteca();
    atualizarPalco();
    salvar();
    filmstripEl.scrollLeft = filmstripEl.scrollWidth;
  }

  /* ══════════════════════════════════════════════════════════════════
     3. BIBLIOTECA — os slides que não estão na seleção (do próprio
        relatório em foco E do outro — dá pra puxar slides entre si)
     ══════════════════════════════════════════════════════════════════ */
  const libBody = document.getElementById('libraryBody');

  function renderBiblioteca() {
    libBody.innerHTML = '';
    const disponiveis = poolTodos.filter((s) => !selecao.includes(s.uid));
    if (!disponiveis.length) {
      const p = document.createElement('p');
      p.className = 'lib-vazio';
      p.textContent = 'Todos os slides já estão na sua seleção.';
      libBody.appendChild(p);
      return;
    }
    const grupos = new Map();
    disponiveis.forEach((s) => {
      const chave = s.origem + ' — ' + s.block;
      if (!grupos.has(chave)) grupos.set(chave, []);
      grupos.get(chave).push(s);
    });
    grupos.forEach((itens, titulo) => {
      const outroGrupo = CONFIG.focoOrigem && itens[0].origemKey !== CONFIG.focoOrigem;
      const det = document.createElement('details');
      det.open = !outroGrupo;
      const sum = document.createElement('summary');
      sum.textContent = titulo + ' (' + itens.length + ')';
      det.appendChild(sum);
      itens.forEach((s) => {
        const row = document.createElement('div');
        row.className = 'lib-item' + (outroGrupo ? ' lib-item-outro' : '');
        row.style.setProperty('--tint', s.tint);

        const nome = document.createElement('span');
        nome.className = 'lib-file';
        nome.textContent = s.file.replace(/\.html.*/, '').replace(/[-_]/g, ' ');

        const add = document.createElement('button');
        add.className = 'lib-add';
        add.type = 'button';
        add.innerHTML = '<i class="fa-solid fa-plus" aria-hidden="true"></i>';
        add.title = 'Adicionar';
        add.setAttribute('aria-label', 'Adicionar ' + s.file);
        add.addEventListener('click', () => adicionarNaSelecao(s.uid));

        row.append(nome, add);
        det.appendChild(row);
      });
      libBody.appendChild(det);
    });
  }

  /* ══════════════════════════════════════════════════════════════════
     4. PALCO — pré-visualização do slide focado
     ══════════════════════════════════════════════════════════════════ */
  const previewFrame = document.getElementById('previewFrame');
  const stageEmpty = document.getElementById('stageEmpty');
  const stageCaption = document.getElementById('stageCaption');
  const stageEl = document.getElementById('stage');

  function atualizarPalco() {
    const s = focoUid ? poolPorUid.get(focoUid) : null;
    if (!s) {
      previewFrame.removeAttribute('src');
      previewFrame.style.display = 'none';
      stageEmpty.style.display = 'flex';
      stageCaption.textContent = '';
      return;
    }
    previewFrame.style.display = 'block';
    stageEmpty.style.display = 'none';
    if (previewFrame.dataset.src !== s.src) {
      previewFrame.src = s.src;
      previewFrame.dataset.src = s.src;
    }
    stageCaption.textContent = s.origem + ' · ' + s.block + ' · ' + s.file;
  }

  function escalarPalco() {
    const scale = Math.min(stageEl.clientWidth / 1920, stageEl.clientHeight / 1080);
    previewFrame.style.transform = 'scale(' + scale + ')';
  }
  escalarPalco();
  window.addEventListener('resize', escalarPalco);
  new ResizeObserver(escalarPalco).observe(stageEl);

  /* ══════════════════════════════════════════════════════════════════
     5. BOTÕES DE TOPO
     ══════════════════════════════════════════════════════════════════ */
  document.getElementById('btnReset').addEventListener('click', () => {
    if (!poolTodos.length) return;
    const msg = CONFIG.focoOrigem
      ? 'Repor a seleção padrão (todos os slides do ' + CONFIG.tituloFoco + ', na ordem original)? ' +
        'Isso substitui sua seleção atual, incluindo slides que você tenha puxado do outro relatório.'
      : 'Repor todos os slides na ordem original? Sua seleção atual será substituída.';
    if (!confirm(msg)) return;
    selecao = selecaoPadrao();
    focoUid = selecao[0] || null;
    renderFilmstrip();
    renderBiblioteca();
    atualizarPalco();
    salvar();
  });

  const libraryEl = document.getElementById('library');
  const btnLib = document.getElementById('btnLib');
  function toggleLibrary(show) {
    libraryEl.classList.toggle('open', show);
    btnLib.classList.toggle('active', show);
    btnLib.setAttribute('aria-expanded', show ? 'true' : 'false');
  }
  btnLib.addEventListener('click', () => toggleLibrary(!libraryEl.classList.contains('open')));
  document.getElementById('btnLibClose').addEventListener('click', () => toggleLibrary(false));

  /* ══════════════════════════════════════════════════════════════════
     6. BAIXAR POWERPOINT — cada slide da seleção vira uma imagem dentro
        do .pptx. Mesmo mecanismo de sistema/relatorio.html: captura numa
        iframe-palco escondida de 1920×1080 (fontes e imagens embutidas
        antes da captura), com duas iframes alternadas para sobrepor rede
        e captura.
     ══════════════════════════════════════════════════════════════════ */
  const PPTX_LARGURA = 1920;
  const PPTX_JPEG = 0.88;
  const CSS_CAPTURA =
    '*{animation:none!important;transition:none!important}' +
    '.overlay,.base-pop,.svc-pop{display:none!important}';

  const cacheDataUrl = new Map();
  function imagemParaDataUrl(src) {
    if (cacheDataUrl.has(src)) return cacheDataUrl.get(src);
    const p = fetch(src)
      .then((res) => res.blob())
      .then((blob) => new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(blob);
      }))
      .catch((e) => { cacheDataUrl.delete(src); throw e; });
    cacheDataUrl.set(src, p);
    return p;
  }

  function injetarStyle(doc, css) {
    const st = doc.createElement('style');
    st.textContent = css;
    doc.head.appendChild(st);
    return st;
  }

  let cssFontes = null;
  async function carregarFontesInline() {
    if (cssFontes !== null) return cssFontes;
    const folhas = [
      'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css',
      'https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;600;700;800;900&family=Open+Sans:ital,wght@0,400;0,600;1,400&display=swap',
    ];
    let out = '';
    for (const href of folhas) {
      try {
        let css = await (await fetch(href)).text();
        for (const m of [...css.matchAll(/url\((['"]?)([^)'"]+)\1\)/g)]) {
          if (!/\.(woff2?|ttf)(\?|$)/i.test(m[2])) continue;
          try {
            const dataUrl = await imagemParaDataUrl(new URL(m[2], href).href);
            css = css.replace(m[0], 'url(' + dataUrl + ')');
          } catch (e) { /* mantém a URL original se a rede falhar */ }
        }
        out += css + '\n';
      } catch (e) { /* folha indisponível: segue sem ela */ }
    }
    cssFontes = out;
    return out;
  }

  async function inlinarImagens(doc) {
    const imgs = Array.from(doc.querySelectorAll('img'));
    await Promise.all(imgs.map(async (img) => {
      const src = img.getAttribute('src');
      if (!src || src.startsWith('data:')) return;
      try {
        img.src = await imagemParaDataUrl(new URL(src, doc.baseURI).href);
      } catch (e) { /* mantém como está se falhar */ }
    }));
  }

  function prepararIframePptx(iframe, src) {
    return new Promise((resolve) => {
      iframe.addEventListener('load', async function onLoad() {
        iframe.removeEventListener('load', onLoad);
        try {
          const doc = iframe.contentDocument;
          injetarStyle(doc, CSS_CAPTURA);
          if (cssFontes) injetarStyle(doc, cssFontes);

          const ajuste = ajustesCaptura[src.split('?')[0]];
          if (ajuste) {
            if (ajuste.classeBody) doc.body.classList.add(ajuste.classeBody);
            if (ajuste.esconder) injetarStyle(doc, ajuste.esconder + '{display:none!important}');
          }

          await inlinarImagens(doc);
          if (doc.fonts && doc.fonts.ready) await doc.fonts.ready;
        } catch (e) { /* segue mesmo assim */ }
        requestAnimationFrame(() => requestAnimationFrame(resolve));
      });
      iframe.src = src;
    });
  }

  const btnPptx = document.getElementById('btnPptx');

  async function gerarPPTX() {
    if (!selecao.length) { alert('Adicione ao menos um slide à seleção antes de gerar o PowerPoint.'); return; }
    const original = btnPptx.innerHTML;
    btnPptx.disabled = true;

    const stageA = document.createElement('iframe');
    stageA.style.cssText = 'position:fixed; left:-99999px; top:0; width:1920px; height:1080px; border:0;';
    const stageB = stageA.cloneNode();
    document.body.appendChild(stageA);
    document.body.appendChild(stageB);
    const stages = [stageA, stageB];

    try {
      btnPptx.textContent = 'Preparando…';
      await carregarFontesInline();

      const arquivos = selecao.map((uid) => poolPorUid.get(uid)).filter(Boolean);
      const pptx = new PptxGenJS();
      pptx.layout = 'LAYOUT_WIDE';

      const preparos = new Map();
      let proximaStage = 0;
      function agendarPreparo(idx) {
        if (idx < 0 || idx >= arquivos.length || preparos.has(idx)) return;
        const stage = stages[proximaStage % 2];
        proximaStage++;
        preparos.set(idx, prepararIframePptx(stage, arquivos[idx].src).then(() => stage));
      }
      agendarPreparo(0);
      agendarPreparo(1);

      for (let i = 0; i < arquivos.length; i++) {
        btnPptx.textContent = 'Gerando ' + (i + 1) + '/' + arquivos.length + '…';
        agendarPreparo(i + 1);
        const stage = await preparos.get(i);
        const canvas = await html2canvas(stage.contentDocument.body, {
          foreignObjectRendering: true,
          useCORS: true,
          width: 1920,
          height: 1080,
          scale: PPTX_LARGURA / 1920,
          backgroundColor: '#ffffff',
        });
        pptx.addSlide().addImage({ data: canvas.toDataURL('image/jpeg', PPTX_JPEG), x: 0, y: 0, w: 13.333, h: 7.5 });
      }

      btnPptx.textContent = 'Salvando…';
      let nome = (document.getElementById('pptxName').value || '').trim();
      if (!nome) nome = 'Apresentacao-Personalizada-ANTAQ.pptx';
      if (!/\.pptx$/i.test(nome)) nome += '.pptx';
      await pptx.writeFile({ fileName: nome });
    } catch (err) {
      console.error('Falha ao gerar o PowerPoint:', err);
      alert('Não foi possível gerar o PowerPoint. Veja o console para detalhes.');
    } finally {
      document.body.removeChild(stageA);
      document.body.removeChild(stageB);
      btnPptx.innerHTML = original;
      btnPptx.disabled = false;
    }
  }

  btnPptx.addEventListener('click', gerarPPTX);
})();
