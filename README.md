# Relatório Trimestral — Ouvidoria da ANTAQ

Apresentação/painel **interativo em HTML** do Relatório Trimestral da Ouvidoria da
**ANTAQ** (Agência Nacional de Transportes Aquaviários) — **1º Trimestre de 2026 (Jan–Mar)**.

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

## Conteúdo (33 slides)

| # | Slide | Tema |
|---|-------|------|
| 01 | Capa | Identificação e **sumário clicável** (cada item leva ao slide) |
| 02–03 | Apresentação | A Ouvidoria, sua atuação e o objeto do relatório |
| 04 | Manifestações Recebidas | Indicadores gerais (total, arquivadas, encaminhadas, tempo médio) |
| 05 | Encaminhamentos / Tratamento | Funil das manifestações que geraram processos sancionatórios |
| 06 | Manifestações por mês | Recebidas / arquivadas / encaminhadas (Jan–Mar) |
| 07 | Evolução Histórica | Série histórica das manifestações recebidas (1º Tri 2023–2026) |
| 08 | Destaques do Trimestre | Tema central: cobranças portuárias abusivas e suas vertentes |
| 09–13 | Análise Estratégica | Principais achados, Inteligência da Ouvidoria, Análise qualitativa, Riscos e oportunidades e Recomendações institucionais |
| 14–15 | Tipos de Manifestações | Distribuição por tipo e comparativo mensal |
| 16–17 | Manifestações por Canal | Distribuição por canal e evolução mensal |
| 18–19 | LAI · Transparência Passiva | Pedidos de acesso à informação (totais e por mês) |
| 20 | Histórico LAI | Série histórica dos pedidos de acesso à informação (1º Tri 2023–2026) |
| 21–22 | Transparência Ativa e Dados Abertos | Painel LAI, bases publicadas e novas bases |
| 23–25 | Carta de Serviços | Apresentação e 32 serviços por superintendência (SOG, SRG, SAF, SFC) |
| 26–27 | Definições e Glossário | Conceitos relevantes para a leitura dos dados |
| 28–30 | Base Legal | Leis, decretos e normativas/portarias |
| 31 | Conclusão | Conclusão institucional do trimestre |
| 32 | Expediente | Diretoria, estrutura e equipe técnica |
| 33 | Links Úteis | Contatos, canais oficiais e **download do relatório em PDF** |

## Relatório em PDF

O slide **33 (Links Úteis)** traz o botão **"Baixar Relatório em PDF"**, que abre
`sistema/relatorio.html` — uma versão em **documento formal A4** com os mesmos dados,
gráficos (Chart.js) e tabelas. Basta clicar em **"Baixar em PDF"** e escolher
**Salvar como PDF** no destino de impressão do navegador.

## Estrutura

```
.
├── index.html              # Página inicial (abre a apresentação)
├── img_porto.jpeg          # Imagem de fundo da home
├── README.md
├── .nojekyll               # Desliga o Jekyll no GitHub Pages
└── sistema/
    ├── index.html          # Visualizador dos slides (navegação)
    ├── slide-01.html … slide-33.html
    ├── relatorio.html      # Versão A4 imprimível / "Salvar como PDF"
    └── Imagens/            # Logos da ANTAQ
```

Bibliotecas via CDN (HTTPS): **Tailwind CSS**, **Chart.js**, **Font Awesome** e **Google Fonts**.

## Navegação

- **Setas ← →**, **PageUp/PageDown**, **espaço** ou clique nas laterais para avançar/voltar;
- **Home/End** vão ao primeiro/último slide; **F** alterna tela cheia;
- Miniaturas (dots) na barra inferior para ir direto a um slide;
- No slide de capa, **clique nos itens do sumário** para saltar direto à seção;
- Em vários slides (Carta de Serviços, Dados Abertos, Definições), **clique nos cartões**
  para expandir o detalhamento.

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
  (`const total = 33;`) e o rodapé de cada slide mostra `N / 33`.
- Ao **inserir** um slide no meio, renumere os arquivos seguintes, atualize os rodapés,
  o `total` e os destinos do **sumário clicável** da capa (`goToSlide(n)` no `slide-01.html`).
- Se mudar a ordem/numeração, revise também o `sistema/relatorio.html` para manter os
  **mesmos dados** dos slides.
- O servidor é **case-sensitive** (Linux/Pages): a pasta de logos é `Imagens/` (I maiúsculo).
