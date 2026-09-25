# Relatórios da Ouvidoria da ANTAQ

Hub de **relatórios interativos em HTML** da Ouvidoria da **ANTAQ** (Agência Nacional de
Transportes Aquaviários). Cada relatório é, ao mesmo tempo, uma **apresentação navegável**
(16:9, 1920×1080), um **documento A4 imprimível/PDF** e um **arquivo `.pptx` exportável** —
tudo gerado a partir dos mesmos arquivos-fonte, sem back-end e sem etapa de build.

| Pasta | Relatório | Manual |
|-------|-----------|--------|
| [`semestral/`](semestral/) | **Relatório Semestral 2026** — 1º Semestre (Jan–Jun) | [`semestral/INVENTARIO.md`](semestral/INVENTARIO.md) · [`semestral/PENDENCIAS-DADOS.md`](semestral/PENDENCIAS-DADOS.md) |
| [`sistema/`](sistema/) | **Relatório Trimestral 2026** — 1º Trimestre (Jan–Mar) | [`MANUAL.md`](MANUAL.md) |
| [`enquetes-2026/`](enquetes-2026/) | **Relatório Anual de Enquetes do Conselho de Usuários 2026** — 2ª rodada (07/04 a 27/04/2026) | [`enquetes-2026/MANUAL.md`](enquetes-2026/MANUAL.md) |

Os três relatórios são **módulos independentes**: cada pasta tem o próprio visualizador,
o próprio manifesto de slides (`deck.js`), a própria versão de impressão e os próprios
assets. Alterar um não afeta os outros.

---

## Sumário

- [Ideia central](#ideia-central)
- [Stack](#stack)
- [Arquitetura](#arquitetura)
  - [Manifesto único: `deck.js`](#manifesto-único-deckjs)
  - [Visualizador: `index.html`](#visualizador-indexhtml)
  - [Slides: um arquivo por tela](#slides-um-arquivo-por-tela)
  - [Protocolo de mensagens slide ↔ visualizador](#protocolo-de-mensagens-slide--visualizador)
  - [Versão A4 / PDF e exportação PPTX: `relatorio.html`](#versão-a4--pdf-e-exportação-pptx-relatoriohtml)
  - [Camada de movimento: `vida.js`](#camada-de-movimento-vidajs)
  - [Acessibilidade: `a11y.js` + `a11y.css`](#acessibilidade-a11yjs--a11ycss)
  - [Design tokens: `base.css`](#design-tokens-basecss)
  - [Crie seu Slide](#crie-seu-slide)
- [Estrutura de pastas](#estrutura-de-pastas)
- [Relatório Semestral — conteúdo](#relatório-semestral--conteúdo)
- [Navegação e atalhos](#navegação-e-atalhos)
- [Como editar](#como-editar)
- [Rodar localmente](#rodar-localmente)
- [Deploy](#deploy)
- [Convenções](#convenções)

---

## Ideia central

O relatório é tratado como **dado estruturado + templates**, e não como um arquivo de
apresentação fechado:

1. **Uma única fonte da verdade** (`deck.js`) define a ordem, os blocos e o que entra em
   cada saída (apresentação, relatório A4 ou ambos).
2. **Cada tela é um documento HTML isolado**, carregado dentro de um `<iframe>`. Isso dá
   *encapsulamento total de CSS/JS* por slide — um slide pode ter gráficos, animações
   e interações próprias sem vazar estilos para os outros.
3. **Os consumidores do manifesto** (visualizador, versão A4, exportador PPTX, gerador
   "Crie seu Slide") apenas **projetam** o mesmo `deck.js` em formatos diferentes.
4. **Melhoria progressiva**: o conteúdo final de todo slide está no HTML estático.
   Animações, contagens numéricas e interações são camadas aditivas — se o JavaScript
   falhar ou o usuário pedir *reduced motion*, o slide continua íntegro e legível.

## Stack

| Camada | Tecnologia |
|--------|-----------|
| Marcação e lógica | HTML5, CSS3, JavaScript ES2017+ (vanilla, sem framework, sem bundler) |
| Estilo utilitário | **Tailwind CSS** (Play CDN) + CSS próprio com *custom properties* |
| Gráficos | **Chart.js** |
| Ícones / tipografia | **Font Awesome 6**, **Google Fonts** (Montserrat, Open Sans) |
| Rasterização | **html2canvas** (captura de cada slide como imagem) |
| Exportação PowerPoint | **PptxGenJS** (geração do `.pptx` no próprio navegador) |
| Hospedagem | **GitHub Pages** via **GitHub Actions** (`.github/workflows/static.yml`) |

Todas as dependências vêm de CDN por HTTPS. Não existe `package.json`, `node_modules`
nem passo de compilação: o repositório **é** o site.

## Arquitetura

```
                        ┌──────────────────────────┐
                        │         deck.js          │  window.RELATORIO
                        │  meta · blocos · anexos  │  (manifesto único)
                        │  capturaPptx             │
                        └────────────┬─────────────┘
          paraApresentacao()         │          paraRelatorio()
         ┌───────────────────────────┼───────────────────────────┐
         ▼                           ▼                           ▼
 ┌───────────────┐          ┌─────────────────┐         ┌─────────────────┐
 │  index.html   │          │ relatorio.html  │         │ crie-seu-slide  │
 │  visualizador │          │  A4 / PDF       │         │  (raiz do repo) │
 │  2 iframes    │          │  + gerador PPTX │         │                 │
 └───────┬───────┘          └────────┬────────┘         └─────────────────┘
         │ postMessage               │ html2canvas → PptxGenJS
         ▼                           ▼
 ┌─────────────────────────────────────────────────────────┐
 │ slide-*.html / capa-*.html  (1 documento por tela)     │
 │  base.css · a11y.css · a11y.js · vida.js                │
 └─────────────────────────────────────────────────────────┘
```

### Manifesto único: `deck.js`

Define `window.RELATORIO`, um objeto com:

- **`meta`** — título, rodapé dos anexos e nome do `.pptx` gerado.
- **`blocos[]`** — cada bloco tem `block` (nome completo), `short` (rótulo curto para o
  breadcrumb), `tint` (intensidade de cor da barra de progresso) e `files[]`.
  Um item de `files` pode ser:
  - uma *string* (`'slide-18.html'`) → entra na apresentação **e** no relatório;
  - um objeto `{ file, apresentacao: false }` ou `{ file, relatorio: false }` → entra
    só em uma das saídas.
- **`anexos`** — para slides **interativos** que mostram só parte do conteúdo por vez
  (etapas, cartões expansíveis, abas), declara um seletor CSS (`sel`) e uma função
  `ler(el, txt)` que extrai o conteúdo completo. A versão A4 usa isso para gerar
  **páginas de anexo** sem perder informação que, na apresentação, fica escondida.
- **`capturaPptx`** — seletores a esconder antes da rasterização (ex.: dicas de interação
  que não fazem sentido em um arquivo estático).

Métodos expostos:

| Método | Retorno | Consumido por |
|--------|---------|---------------|
| `paraApresentacao()` | `[{ file, block, blockShort, blockIndex, tint }]` | `index.html` |
| `paraRelatorio()` | `['slide-00.html', …]` | `relatorio.html`, exportador PPTX |
| `checarSanidade()` | — (avisa no console duplicatas e arquivos 404 via `fetch HEAD`) | `index.html?auditoria=1` |

Contador `N / total`, dots, breadcrumb e numeração **são sempre derivados** desse array —
não existem números de página *hardcoded* nos slides.

### Visualizador: `index.html`

- **Palco de resolução fixa** (1920×1080) escalado com
  `transform: scale(min(w/1920, h/1080))`, recalculado por `resize` e `ResizeObserver`.
  O slide é desenhado sempre no mesmo sistema de coordenadas; o visualizador só o
  ajusta ao tamanho da janela (*letterboxing*).
- **Double buffering com dois iframes** (`quadroA`/`quadroB`): o próximo slide carrega no
  quadro fora de cena e só entra quando o `onload` dispara (com *timeout* de segurança
  de 1,5 s), permitindo transição cruzada sem "flash" branco.
- Barra inferior com **dots** por slide e cores por bloco (`tint`), **breadcrumb** do
  bloco atual e contador clicável para **saltar direto para um número**.
- Botões de **Baixar PDF** / **Baixar PPTX** e atalho `Ctrl+M` para voltar ao menu.

### Slides: um arquivo por tela

Cada `slide-*.html` / `capa-*.html` é um documento completo que:

1. importa `a11y.css` e `base.css` (tokens e componentes compartilhados);
2. traz seu próprio `<style>` e scripts (Chart.js, interações locais);
3. termina com o *listener* de teclado que repassa a navegação ao visualizador e com
   `a11y.js` / `vida.js`.

Como cada slide roda isolado no seu iframe, ele também **abre sozinho no navegador** —
útil para depurar uma tela sem passar pelo visualizador.

### Protocolo de mensagens slide ↔ visualizador

A comunicação entre o iframe e o *host* usa `window.postMessage`, o que funciona mesmo
em contextos em que o acesso direto ao DOM do iframe é bloqueado (ex.: `file://`):

| Direção | Mensagem | Significado |
|---------|----------|-------------|
| slide → host | `{ type: 'slide-nav', key }` | tecla pressionada com o foco dentro do slide; o host decide se avança/volta |
| host → slide | `{ type: 'deck-key', key }` | clique nas laterais; o slide com **etapas internas** consome a tecla (avança a etapa) antes de o host trocar de slide |
| slide → host | `{ type: 'slide-etapas', total }` | o slide informa que tem navegação interna, e o host passa a delegar os cliques laterais a ele |
| slide → host | `{ type: 'slide-goto', slide }` / `{ type: 'slide-goto-file', file }` | salto direto (ex.: sumário clicável); a versão por nome de arquivo é imune a reordenações do manifesto |
| slide → host | `{ type: 'go-menu' }` | volta ao hub (`Ctrl+M`) |

### Versão A4 / PDF e exportação PPTX: `relatorio.html`

- Monta **uma página A4 por slide** a partir de `paraRelatorio()`, reaproveitando o
  próprio HTML de cada tela (iframes escalados), e gera as **páginas de anexo** a partir
  de `anexos`. A impressão usa `@page` e o fluxo nativo do navegador → **Salvar como PDF**.
- O **gerador PPTX** carrega cada slide em um iframe fora de tela, chama
  `Vida.finalizar()` (força os números para o valor final), aplica `capturaPptx`,
  **embute fontes e imagens como `data:` URL** (para o html2canvas não esbarrar em CORS),
  rasteriza com **html2canvas** e insere cada imagem em um slide 16:9 via **PptxGenJS**.
  O arquivo é produzido inteiramente no cliente.

### Camada de movimento: `vida.js`

Script **aditivo** (não remove nem substitui estilos): o estado final de todo elemento é
idêntico ao que está no HTML.

- **Contagem numérica** em `.kpi-num`, `.metric-value`, `.lb-num`, `.hero-num`, `.m-val`
  e `[data-vida]`: interpreta o texto (casas decimais, separador de milhar, prefixos e
  sufixos como `%`), anima de 0 até o valor com *easing* e escalonamento de 90 ms entre
  números do mesmo slide, e **restaura o `textContent` original** ao final.
- Aplica `font-variant-numeric: tabular-nums` e fixa um `min-width` para o número **não
  mudar de largura** durante a contagem.
- Entrada de títulos **palavra por palavra** e promoção de camada (`will-change`) para
  elementos com animação em loop.
- API pública: `Vida.finalizar()` e `Vida.contar(el)`.
- Respeita `prefers-reduced-motion`.

> Como a contagem reescreve o elemento via `textContent`, marcações internas
> (`<span>` dentro de um `.kpi-num`) só sobrevivem no estado final. Para ajustes
> visuais do número, use CSS no próprio elemento.

### Acessibilidade: `a11y.js` + `a11y.css`

- **Região `aria-live`** (`#a11yLiveRegion`) para anúncios a leitores de tela.
- **Tabelas de fallback** para gráficos (`renderChartFallbackTable`): todo gráfico Chart.js
  tem uma representação tabular equivalente, acessível a tecnologias assistivas.
- `aria-label` com o valor final nos números animados, classe `.sr-only`, foco visível
  e navegação completa por teclado.

### Design tokens: `base.css`

- Paleta institucional como *custom properties* (`#103050`, `#0070C0`, `#0090C0`, …).
  **Regra de marca: sem verde na paleta** — cores de terceiros em verde são convertidas
  para o azul institucional.
- Componentes compartilhados: `.txt-bloco` (texto justificado), cabeçalho de capítulo,
  acentos de topo e o selo **`.todo-dado`**, que marca números ainda provisórios
  (controlados em `PENDENCIAS-DADOS.md`).

### Crie seu Slide

`crie-seu-slide-*.html` + `crie-seu-slide.js` (raiz): ferramenta que faz `fetch` do
`deck.js` (e, para o Conselho, também de `dados-enquetes.js`) de outro relatório,
avalia o manifesto em um escopo isolado e permite **compor uma seleção própria de
slides**, persistida em `localStorage`.

## Estrutura de pastas

```
.
├── index.html                     # Hub: um card por relatório
├── img_porto*.jpeg                # Fundo da home (versão web otimizada)
├── Imagens/                       # Logos compartilhados da home
├── crie-seu-slide*.{html,css,js}  # Ferramenta "Crie seu Slide"
├── MANUAL.md                      # Manual do Relatório Trimestral
├── .github/workflows/static.yml   # Deploy no GitHub Pages
├── .nojekyll                      # Desliga o Jekyll no Pages
│
├── semestral/                     # ── Relatório Semestral 2026 (ativo) ──
│   ├── deck.js                    # Manifesto (ordem, blocos, anexos, PPTX)
│   ├── index.html                 # Visualizador
│   ├── relatorio.html             # A4 / PDF + gerador PPTX
│   ├── base.css · apresentacao.css
│   ├── a11y.css · a11y.js · vida.js
│   ├── capa-bloco-{1..6}.html     # Capas de bloco
│   ├── slide-*.html               # Telas
│   ├── conselho.html              # Tela avulsa do Conselho de Usuários
│   ├── INVENTARIO.md              # Log de decisões + tabela de derivação dos slides
│   ├── PENDENCIAS-DADOS.md        # Dados ainda provisórios (.todo-dado)
│   └── Imagens/
│
├── sistema/                       # ── Relatório Trimestral 2026 ──
│   ├── deck.js · index.html · relatorio.html
│   ├── slide-*.html · capa-*.html
│   ├── RESUMO-SLIDES.md
│   └── Imagens/
│
└── enquetes-2026/                 # ── Relatório Anual de Enquetes ──
    ├── dados-enquetes.js          # FONTE ÚNICA dos dados das enquetes
    ├── slide-enquete.html         # Template parametrizado por query string
    │                              #   ?e=8270&p=1 → questões 1 e 2 (rosca)
    │                              #   ?e=8270&p=2 → questões 3 e 4 (barras) + sugestões
    ├── deck.js · index.html · relatorio.html
    ├── slide-*.html · capa-*.html
    ├── MANUAL.md
    └── Imagens/
```

## Relatório Semestral — conteúdo

Ordem definida em `semestral/deck.js` (49 telas):

| Bloco | Tema | Destaques |
|-------|------|-----------|
| Abertura | Capa, ficha técnica, sumário clicável, mensagem da Ouvidora | — |
| 1 · Visão Geral | Contexto e fundamentos das ouvidorias públicas | Atribuições, princípios e diretrizes (navegação por etapas) |
| 2 · A Ouvidoria da ANTAQ | Estrutura, Fala.BR, demais canais, Carta de Serviços, Conselho de Usuários | Carta de Serviços por superintendência (SOG, SRG, SAF, SFC) |
| 3 · SAC | Seção de Apoio ao Cidadão | Atividades, canais e tramitação |
| 4 · STAI | Transparência e Acesso à Informação | Transparência passiva (LAI / Informa.BR), transparência ativa, Dados Abertos (PDA) |
| 5 · Considerações Finais | Destaques do semestre e conclusão | — |
| 6 · Apêndice | Leis, decretos, normativos e glossário | Cartões expansíveis, exportados como anexo no PDF |
| Encerramento | Contatos e links | — |

## Navegação e atalhos

| Ação | Tecla / gesto |
|------|---------------|
| Avançar / voltar | `→` `←`, `PageDown` `PageUp`, `Espaço`, clique nas laterais |
| Primeiro / último slide | `Home` / `End` |
| Tela cheia | `F` |
| Ir para um slide | clique no contador `N / total` e digite o número |
| Voltar ao menu | `Ctrl+M` |
| Pular para uma seção | clique nos itens do sumário (`slide-01.html`) |
| Detalhar | clique nos cartões (Carta de Serviços, Dados Abertos, Glossário…) |

Em slides com **etapas internas**, as setas avançam primeiro as etapas e só depois o slide.

## Como editar

**Inserir, mover ou remover uma tela** — edite apenas o array `files` do bloco em
`deck.js`. Contador, dots, breadcrumb, PDF e PPTX se ajustam sozinhos.

**Criar uma tela nova** — copie um slide existente com layout parecido (ele já traz os
imports de `base.css`/`a11y.css`, o cabeçalho de capítulo e o script de navegação),
troque o conteúdo e registre o arquivo em `deck.js`.

**Slide interativo** (etapas, abas, cartões) — registre uma entrada em `anexos` com o
seletor e a função `ler`, para que o conteúdo escondido apareça no PDF.

**Pontos sincronizados à mão** (não derivam do `deck.js`):
- a árvore do sumário em `slide-01.html`;
- as listas decorativas de tópicos nas `capa-bloco-*.html`.

Registre decisões editoriais em `INVENTARIO.md` e dados provisórios em
`PENDENCIAS-DADOS.md` (sempre com data, sem reescrever entradas antigas).

**Diagnóstico** — abra `semestral/index.html?auditoria=1` e veja o console: arquivos
duplicados ou inexistentes no manifesto são sinalizados.

## Rodar localmente

Os slides usam `fetch` e iframes, então sirva a pasta por HTTP (não abra via `file://`):

```bash
python -m http.server 8000
# http://localhost:8000              → hub
# http://localhost:8000/semestral/   → Relatório Semestral
```

Qualquer servidor estático serve (`npx serve`, extensão Live Server etc.).

## Deploy

Todo `push` na branch `main` dispara o workflow **Deploy static content to Pages**
(`.github/workflows/static.yml`), que publica o repositório inteiro como artefato
estático via `actions/upload-pages-artifact` + `actions/deploy-pages`. Também é possível
disparar manualmente pela aba **Actions** (`workflow_dispatch`).

O site usa **somente caminhos relativos**, então funciona em qualquer subcaminho
(`usuario.github.io/relatorio-antaq/`) ou domínio próprio.

## Convenções

- **Caminhos case-sensitive**: o GitHub Pages roda em Linux. A pasta de logos é
  `Imagens/` (I maiúsculo) — um `imagens/` funciona no Windows e quebra em produção.
- **Sem números de página no HTML** dos slides; tudo vem do manifesto.
- **Conteúdo final no HTML estático**; JS só adiciona comportamento.
- **Sem verde** na paleta; usar os tokens institucionais de `base.css`.
- **Dados provisórios** sempre marcados com `.todo-dado` até serem confirmados.
- Nomes de arquivos, classes e funções em **português**, seguindo o padrão já existente
  (`paraApresentacao`, `finalizarVida`, `.etapa-foco`).
