# Relatório Trimestral — Ouvidoria da ANTAQ

Apresentação/painel **interativo em HTML** do Relatório Trimestral da Ouvidoria da
**ANTAQ** (Agência Nacional de Transportes Aquaviários) — **1º Trimestre de 2026**.

## Para que serve

A Ouvidoria da ANTAQ é o canal oficial de interlocução com a sociedade. Este projeto
é o **relatório trimestral em formato de painel dinâmico**, elaborado pelo corpo técnico
da unidade com base nos dados do **Fala.BR**, e tem como objetivos:

- **Consolidar e dar transparência** aos números das manifestações recebidas
  (reclamações, solicitações, denúncias, sugestões e elogios) e ao seu encaminhamento/apuração;
- Dar **publicidade** à Carta de Serviços ao Usuário, ao Conselho de Usuários e aos
  dados de **transparência ativa e passiva (LAI)**;
- **Subsidiar a tomada de decisão da Alta Gestão** e **fortalecer a participação social**.

É um **site estático** (HTML/CSS/JS, sem back-end e sem build): cada slide é um arquivo
`.html` independente, exibido por um visualizador com navegação por teclado, cliques e
miniaturas.

## Conteúdo (24 slides)

| # | Slide | Tema |
|---|-------|------|
| 01 | Capa | Identificação e sumário |
| 02–03 | Apresentação | A Ouvidoria, sua atuação e o relatório |
| 04 | Manifestações Recebidas | Indicadores gerais (total, arquivadas, encaminhadas, tempo médio) |
| 05 | **Funil de Tratamento** | 304 manifestações → 182 SFC/GPF (95 viraram processo) + 122 outros órgãos |
| 06 | Manifestações por mês | Recebidas / arquivadas / encaminhadas (Jan–Mar) |
| 07 | Destaques do Trimestre | Tema central: tarifa portuária |
| 08–09 | Tipos de Manifestações | Distribuição por tipo e comparativo mensal |
| 10–11 | Manifestações por Canal | Distribuição por canal e evolução mensal |
| 12–13 | LAI · Transparência Passiva | Pedidos de acesso à informação |
| 14 | Transparência Ativa | Publicações e dados abertos |
| 15–17 | Carta de Serviços | Apresentação e 31 serviços por superintendência (SOG, SRG, SAF, SFC) |
| 18–22 | Glossário e Base Legal | Definições, leis, decretos e normativas |
| 23 | Expediente | Créditos |
| 24 | Links Úteis | Contatos e canais oficiais (encerramento) |

## Estrutura

```
.
├── index.html              # Página inicial (abre a apresentação)
├── img_porto.jpeg          # Imagem de fundo da home
├── .nojekyll               # Desliga o Jekyll no GitHub Pages
└── sistema/
    ├── index.html          # Visualizador dos slides (navegação)
    ├── slide-01.html … slide-24.html
    └── Imagens/            # Logos da ANTAQ
```

Bibliotecas via CDN (HTTPS): **Tailwind CSS**, **Chart.js**, **Font Awesome** e **Google Fonts**.

## Navegação

- **Setas ← →**, **PageUp/PageDown**, **espaço** ou clique nas laterais para avançar/voltar;
- **Home/End** vão ao primeiro/último slide; **F** alterna tela cheia;
- Miniaturas (dots) na barra inferior para ir direto a um slide.

## Publicar no GitHub Pages

O site usa **somente caminhos relativos**, então funciona tanto em site de usuário
(`usuario.github.io`) quanto em site de projeto (`usuario.github.io/repo/`).

1. Envie os arquivos para a branch `main` (mantendo o `index.html` na raiz).
2. Em **Settings → Pages**, selecione **Source: branch `main`**, pasta **`/ (root)`** e salve.
3. Aguarde ~1–2 min. Como este repositório se chama `CaioNox.github.io`, o site fica em
   **https://caionox.github.io** (a apresentação abre em `/sistema/`).

> O campo **"Custom domain"** não aceita endereços `*.github.io` — esse endereço vem
> automaticamente do nome do repositório. Use "Custom domain" apenas para domínios
> próprios (ex.: `meusite.com.br`).

## Rodar localmente

```bash
python3 -m http.server 8000
# abra http://localhost:8000
```

## Como editar / adicionar slides

- Cada slide é `sistema/slide-NN.html`. O número total fica em `sistema/index.html`
  (`const total = 24;`) e o rodapé de cada slide mostra `N / 24`.
- Ao **inserir** um slide no meio, renumere os arquivos seguintes e atualize os rodapés
  e o `total`.
- O servidor é **case-sensitive** (Linux/Pages): a pasta de logos é `Imagens/` (I maiúsculo).
