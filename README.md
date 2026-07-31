# Relatórios da Ouvidoria da ANTAQ

Hub de apresentações/painéis **interativos em HTML** da Ouvidoria da **ANTAQ**
(Agência Nacional de Transportes Aquaviários). A página inicial (`index.html`) traz um
card por relatório publicado:

| Pasta | Relatório | Manual |
|-------|-----------|--------|
| `sistema/` | **Relatório Trimestral 2026** — 1º Trimestre (Jan–Mar) | [`MANUAL.md`](MANUAL.md) |
| `enquetes-2026/` | **Relatório Anual de Enquetes do Conselho de Usuários de Serviços Públicos da ANTAQ 2026** — 2ª rodada de avaliação (07/04 a 27/04/2026) | [`enquetes-2026/MANUAL.md`](enquetes-2026/MANUAL.md) |

As duas pastas são **independentes**: têm o próprio visualizador, os próprios slides e a
própria versão para impressão. Mexer em uma não afeta a outra.

> O restante deste README descreve o **Relatório Trimestral** (`sistema/`). Para o
> Relatório Anual de Enquetes, veja [`enquetes-2026/MANUAL.md`](enquetes-2026/MANUAL.md) —
> lá os dados das enquetes moram todos em um único arquivo, `dados-enquetes.js`.

---

## Relatório Trimestral — 1º Trimestre de 2026 (Jan–Mar)

## Para que serve

A Ouvidoria da ANTAQ é o canal oficial de interlocução com a sociedade. Este projeto
é o **relatório trimestral em formato de painel dinâmico**, elaborado pelo corpo técnico
da unidade com base nos dados do **Fala.BR**, e tem como objetivos:

- **Consolidar e dar transparência** aos números das manifestações recebidas
  (reclamações, solicitações, denúncias, sugestões e elogios) e ao seu encaminhamento/apuração;
- Dar **publicidade** à Carta de Serviços ao Usuário, ao Conselho de Usuários e aos
  dados de **transparência ativa e passiva (LAI)** e de **dados abertos**;
- **Subsidiar a tomada de decisão da Alta Gestão** e **fortalecer a participação social**.

É um **site estático** (HTML/CSS/JS, sem back-end e sem build): cada slide é um arquivo
`.html` independente, exibido por um visualizador com navegação por teclado, cliques e
miniaturas.

## Conteúdo (60 telas, em 4 blocos)

A ordem de exibição é a **única fonte da verdade** no array `slides` de
`sistema/index.html` — derivado de um objeto `deck` estruturado em **4 blocos**
(o Bloco B tem **6 seções institucionais**). A apresentação começa pelo
institucional/conceitual e só então mostra os números do trimestre; o contador,
os dots e o breadcrumb são calculados automaticamente a partir desse array.

### Bloco A · Abertura
Capa de abertura, ficha técnica, mensagem da Ouvidora, **sumário clicável** e sumário executivo.

### Bloco B · Fundamentos Institucionais

| Seção | Tema |
|-------|------|
| 1 | **As ouvidorias públicas** — a Ouvidoria da ANTAQ, princípios, diretrizes, atribuições e papel institucional |
| 2 | **Canais de Atendimento** — tramitação e manifestações por canal |
| 3 | **Tipos de Manifestações** — denúncia, elogio, reclamação (simples, solicitação, sugestão) |
| 4 | **SAC — Seção de Apoio ao Cidadão** — apresentação, atividades e referências |
| 5 | **STAI — Transparência e Acesso à Informação** — pedidos de acesso à informação (LAI), Dados Abertos/PDA 2026–2028 e transparência ativa/passiva |
| 6 | **Carta de Serviços da ANTAQ** — serviços por superintendência (SOG, SRG, SAF, SFC) |

### Bloco C · Dados do Trimestre
Manifestações recebidas (volumes, evolução histórica, tratamento no Fala.BR), destaques
do trimestre (temas dominantes) e análise quantitativa (principais achados, inteligência
da Ouvidoria, análise qualitativa, riscos, recomendações, panorama e fluxos de tramitação).

### Bloco D · Encerramento
Conclusão institucional, glossário e definições, decretos, leis, normativas/portarias e links úteis.

## Relatório em PDF

O botão **"Baixar PDF"** fica sempre visível no topo do visualizador (e a tela de
**Links Úteis**, no Bloco D, também o traz). Ele abre `sistema/relatorio.html` — uma
versão em **documento formal A4** com os mesmos dados, gráficos (Chart.js) e tabelas.
Basta escolher **Salvar como PDF** no destino de impressão do navegador.

## Estrutura

```
.
├── index.html              # Página inicial (um card por relatório)
├── img_porto.jpeg          # Imagem de fundo da home
├── README.md
├── MANUAL.md               # Manual do Relatório Trimestral
├── .nojekyll               # Desliga o Jekyll no GitHub Pages
│
├── sistema/                # ── Relatório Trimestral ──
│   ├── index.html          # Visualizador dos slides (array `deck`/`slides` = ordem)
│   ├── slide-*.html / capa-*.html   # Telas individuais (uma por arquivo)
│   ├── relatorio.html      # Versão A4 imprimível / "Salvar como PDF"
│   └── Imagens/            # Logos da ANTAQ
│
└── enquetes-2026/          # ── Relatório Anual de Enquetes do Conselho de Usuários ──
    ├── index.html          # Visualizador (o `deck` inclui as telas geradas do .js)
    ├── dados-enquetes.js   # FONTE ÚNICA dos dados das enquetes
    ├── slide-enquete.html            # Template das telas de resultado
    │                                 #   ?e=8270&p=1 → questões 1 e 2 (rosca)
    │                                 #   ?e=8270&p=2 → questões 3 e 4 (barras) + sugestões
    ├── slide-*.html / capa-*.html    # Demais telas
    ├── relatorio.html      # Versão imprimível
    ├── MANUAL.md           # Como atualizar a próxima rodada
    └── Imagens/            # Logos + fluxograma (Figura 5)
```

Bibliotecas via CDN (HTTPS): **Tailwind CSS**, **Chart.js**, **Font Awesome** e **Google Fonts**.

## Navegação

- **Setas ← →**, **PageUp/PageDown**, **espaço** ou clique nas laterais para avançar/voltar;
- **Home/End** vão ao primeiro/último slide; **F** alterna tela cheia;
- Miniaturas (dots) na barra inferior para ir direto a um slide;
- No slide de capa, **clique nos itens do sumário** para saltar direto à seção;
- Em vários slides (Carta de Serviços, Dados Abertos, Definições), **clique nos cartões**
  para expandir o detalhamento. Nos apêndices do Relatório Anual de Enquetes (Glossário,
  Leis, Decretos, Normativos) basta **passar o mouse**; o clique fixa o cartão aberto.

## Publicar no GitHub Pages

O site usa **somente caminhos relativos**, então funciona tanto em site de usuário
(`usuario.github.io`) quanto em site de projeto (`usuario.github.io/repo/`).

1. Envie os arquivos para a branch `main` (mantendo o `index.html` na raiz).
2. Em **Settings → Pages**, selecione **Source: branch `main`**, pasta **`/ (root)`** e salve.
3. Aguarde ~1–2 min. Como este repositório se chama `CaioNox.github.io`, o site fica em
   **https://caionox.github.io** — o Relatório Trimestral abre em `/sistema/` e o Relatório Anual de Enquetes em `/enquetes-2026/`.

> O campo **"Custom domain"** não aceita endereços `*.github.io` — esse endereço vem
> automaticamente do nome do repositório. Use "Custom domain" apenas para domínios
> próprios (ex.: `meusite.com.br`).

## Rodar localmente

```bash
python3 -m http.server 8000
# abra http://localhost:8000
```

## Como editar / adicionar slides

- Cada tela é um `.html` independente (`slide-*.html` / `capa-*.html`). A **ordem** e o
  **total** vêm do objeto `deck` em `sistema/index.html` (`const total = slides.length;`) —
  não há números de página hardcoded nos slides; o contador `N / total`, os dots e o
  breadcrumb são calculados a partir do array.
- Para **inserir/mover/remover** uma tela, basta editar o `deck` (arquivo e bloco/seção).
  O **sumário clicável** da capa (`slide-01.html`) usa `goToFile('capa-XX.html')` — navegação
  por nome de arquivo, robusta à reordenação; só atualize-o se mudar a estrutura de seções.
- Se mudar a ordem/estrutura, revise também o `sistema/relatorio.html` (versão PDF, separada
  do array) para manter os **mesmos dados**.
- O servidor é **case-sensitive** (Linux/Pages): a pasta de logos é `Imagens/` (I maiúsculo).
