# Manual de Alteração de Dados — Relatório Trimestral da Ouvidoria ANTAQ

> **Para quem é este manual?**
> Para qualquer pessoa que precise atualizar os dados do relatório ao início de um novo trimestre — mesmo sem experiência avançada em programação. Se você sabe abrir um arquivo de texto, você consegue fazer as atualizações descritas aqui.

---

## Índice

1. [O que é este projeto](#1-o-que-é-este-projeto)
2. [Estrutura de pastas](#2-estrutura-de-pastas)
3. [Como a apresentação funciona (o `deck`)](#3-como-a-apresentação-funciona-o-deck)
4. [Checklist de atualização trimestral](#4-checklist-de-atualização-trimestral)
5. [Mapa de slides — o que cada um contém](#5-mapa-de-slides--o-que-cada-um-contém)
6. [Como atualizar gráficos](#6-como-atualizar-gráficos)
7. [Como atualizar textos e KPIs (números em destaque)](#7-como-atualizar-textos-e-kpis)
8. [Como adicionar, remover ou reordenar um slide](#8-como-adicionar-remover-ou-reordenar-um-slide)
9. [Pendências conhecidas — o que ainda falta preencher](#9-pendências-conhecidas--o-que-ainda-falta-preencher)
10. [Design system — cores, fontes e classes](#10-design-system--cores-fontes-e-classes)
11. [Como visualizar localmente](#11-como-visualizar-localmente)
12. [Como publicar (git + GitHub Pages)](#12-como-publicar-git--github-pages)
13. [Dúvidas frequentes](#13-dúvidas-frequentes)

---

## 1. O que é este projeto

Este é um **site estático** (só HTML, CSS e JavaScript — sem servidor, sem banco de dados) que funciona como uma apresentação interativa do Relatório Trimestral da Ouvidoria da ANTAQ.

Tudo roda no navegador do usuário. Não há nada para "instalar" ou "executar" (a única exceção é rodar um servidor local **só para conferir** antes de publicar — veja a seção 11). O conteúdo fica hospedado no GitHub Pages e pode ser acessado pelo link do repositório.

Cada tela da apresentação é um arquivo `.html` **independente** dentro da pasta `sistema/`. A **ordem** em que aparecem é decidida por uma única lista chamada `deck`, dentro de `sistema/index.html`.

---

## 2. Estrutura de pastas

```
relatorios-ouvidoria/
│
├── index.html              ← Página inicial (portal com os cards de acesso)
├── img_porto.jpeg          ← Foto de fundo da página inicial
├── README.md               ← Visão geral do projeto
├── MANUAL.md               ← Este manual
├── .nojekyll               ← Arquivo vazio — diz ao GitHub para não usar Jekyll
├── .github/
│   └── workflows/
│       └── static.yml      ← Configura o deploy automático no GitHub Pages
│
└── sistema/
    ├── index.html          ← Visualizador de slides (contém a lista `deck` = a ordem)
    ├── relatorio.html      ← Versão para impressão em PDF (todos os slides em uma página)
    ├── RESUMO-SLIDES.md    ← Anotações internas sobre cada slide / reorganizações
    │
    ├── Imagens/            ← Logos da ANTAQ, Ouvidoria e Fala.BR (atenção: "I" maiúsculo)
    │
    ├── slide-*.html        ← Telas de conteúdo (uma por arquivo)
    ├── capa-*.html         ← Capas de bloco e capas antigas
    └── slide-ctx-*.html    ← Telas de "contexto"/apresentação de seção
```

> **Importante:** os nomes dos arquivos **não seguem a ordem de exibição**. Existe, por
> exemplo, `slide-04.html`, `slide-17d.html`, `capa-bloco-3.html` e `slide-sac-apres.html`,
> e a ordem em que aparecem na tela é definida só pelo `deck` (seção 3). Não confie no
> número do nome do arquivo para saber a posição do slide.

---

## 3. Como a apresentação funciona (o `deck`)

O arquivo `sistema/index.html` é o "palco". Ele carrega cada slide dentro de um **iframe** (uma janela embutida). Quando você clica nas setas/laterais ou aperta uma tecla, ele troca o arquivo mostrado no iframe.

A ordem dos slides vem de **uma única lista**, o `deck`, logo no início do bloco `<script>` de `sistema/index.html`. Ela agrupa os arquivos em **blocos temáticos**:

```javascript
// sistema/index.html
const deck = [
  { block: 'Abertura', short: 'Abertura', tint: 0.35,
    files: ['slide-00.html', 'slide-34.html', 'slide-msg-ouvidora.html', 'slide-01.html'] },

  { block: 'Bloco 1 · Visão Geral das ouvidorias públicas', short: 'Visão Geral', tint: 1,
    files: ['capa-bloco-1.html', 'slide-ctx-01.html', /* ... */] },

  // ... Blocos 2 a 6 ...

  { block: 'Sobras · Capas desativadas / Revisar', short: 'Sobras', tint: 0.15,
    files: ['capa-01.html', /* slides fora de uso, jogados pro fim */] },
];
```

Pontos-chave:

- **A ordem de exibição = a ordem dos arquivos dentro de cada `files: [...]`.** Para mover, inserir ou tirar um slide, você edita essa lista (veja a seção 8).
- **Não existe mais um número total fixo.** O contador (`N / total`), as bolinhas de navegação (dots) e a barra de progresso são **calculados automaticamente** a partir do `deck`:
  ```javascript
  const total = slides.length;  // calculado sozinho — NÃO precisa mexer
  ```
- **Os slides não têm número de página gravado dentro deles.** Por isso, ao reordenar, você **não** precisa reescrever rodapés com "12 / 60" etc. Basta mexer no `deck`.
- **O bloco "Sobras"** guarda no fim da apresentação as capas antigas e os slides ainda não reposicionados ou que foram pedidos para desativar. ⚠️ **Atenção:** slides que estão em "Sobras" **ainda aparecem** para quem navega até o fim. Se você quer que um slide realmente **suma** da apresentação, remova-o do `deck` (veja a seção 8), não basta deixá-lo em "Sobras".

O **sumário clicável** (na capa `slide-01.html`) navega **por nome de arquivo** (`goToFile('capa-bloco-3.html')`), então continua funcionando mesmo se você reordenar os slides. Só precisa mexer nele se mudar a estrutura de blocos/seções.

---

## 4. Checklist de atualização trimestral

A cada novo trimestre, siga esta ordem:

### Passo 1 — Atualizar as referências ao período
Faça uma busca global por `1º trimestre`, `1º Trimestre` e `Jan–Mar` (ou `Janeiro a Março`) nos arquivos `.html` e substitua pelo novo período.

- Exemplo: `1º Trimestre de 2026` → `2º Trimestre de 2026`
- Exemplo: `Janeiro a Março` → `Abril a Junho`
- **Não esqueça:** a página inicial `index.html` (raiz) tem o texto do card
  *"Dados consolidados das manifestações do 1º trimestre (Jan–Mar)"* — atualize também.

### Passo 2 — Atualizar os dados numéricos e gráficos nos slides
Cada slide tem seu próprio conjunto de dados. Veja a tabela no [Mapa de slides](#5-mapa-de-slides--o-que-cada-um-contém) para saber onde alterar, e a seção [Como atualizar gráficos](#6-como-atualizar-gráficos).

### Passo 3 — Atualizar a versão PDF
O arquivo `sistema/relatorio.html` é **separado** dos slides (não faz parte do `deck`). Ele repete os mesmos dados em formato de documento A4. Depois de atualizar os slides, **repita as alterações de números/gráficos/textos no `relatorio.html`** para manter os dois em sincronia.

### Passo 4 — Conferir localmente
Abra a apresentação e passe por todos os slides (veja a seção 11). Confira principalmente os slides marcados com ⭐ no mapa.

### Passo 5 — Publicar
```bash
git add .
git commit -m "Atualiza dados para o Xº trimestre de AAAA"
git push
```
O GitHub Pages publica automaticamente em ~2 minutos.

---

## 5. Mapa de slides — o que cada um contém

> Esta é a ordem **atual** do `deck` (Abertura + 6 blocos + Sobras). Se a ordem mudar,
> a fonte da verdade é sempre o `deck` em `sistema/index.html`.
> ⭐ = slide com dados que **sempre mudam** a cada trimestre.

### Abertura
| Arquivo | Título | O que atualizar |
|---------|--------|-----------------|
| `slide-00.html` | Capa de Abertura | Ano/trimestre |
| `slide-34.html` | Ficha Técnica | Nomes, cargos, data de publicação |
| `slide-msg-ouvidora.html` | Mensagem da Ouvidora | Texto da ouvidora *(hoje é placeholder)* |
| `slide-01.html` | Sumário (clicável) | Só se mudar a estrutura de blocos |

### Bloco 1 · Visão Geral das ouvidorias públicas
| Arquivo | Título | O que atualizar |
|---------|--------|-----------------|
| `capa-bloco-1.html` | Capa do bloco | Raramente muda |
| `slide-ctx-01.html` | Apresentação das ouvidorias | Texto institucional |
| `slide-principios-01.html` | Princípios das ouvidorias | Texto institucional |
| `slide-diretrizes-01.html` | Diretrizes das ouvidorias | Texto institucional |
| `slide-atribuicoes-01.html` | Atribuições das ouvidorias | Texto institucional |

### Bloco 2 · A Ouvidoria da ANTAQ
| Arquivo | Título | O que atualizar |
|---------|--------|-----------------|
| `capa-bloco-2.html` | Capa do bloco | Raramente muda |
| `slide-03c.html` | Papel Institucional da Ouvidoria | Texto |
| `slide-ouvidoria-geral.html` | Estrutura Organizacional | Organograma/nomes se mudar |
| `slide-25.html` | Cartas de Serviço ANTAQ | Indicadores se mudarem |
| `slide-26.html` | Carta de Serviços (SOG) | Indicadores se mudarem |
| `slide-27.html` | Carta de Serviços (SRG/SAF/SFC) | Indicadores se mudarem |
| `slide-canais-atend.html` | Canais de Atendimento | Dados por canal |
| `slide-17b.html` | ⭐ Ouvidoria em Números | KPIs do trimestre |
| `slide-17e.html` | ⭐ Perfil de Uso Fala.BR | Dados do trimestre |
| `slide-07.html` | ⭐ Evolução Histórica das Manifestações | Adicionar o novo ano à série |

### Bloco 3 · Seção de Apoio ao Cidadão — SAC
| Arquivo | Título | O que atualizar |
|---------|--------|-----------------|
| `capa-bloco-3.html` | Capa do bloco | Raramente muda |
| `slide-sac-apres.html` | Apresentação da SAC | Texto |
| `slide-sac-ativ.html` | Principais Atividades da SAC | Texto *(revisar — marcado como placeholder)* |
| `slide-14.html` | ⭐ Tipos de Manifestações | Gráfico por tipo |
| `slide-canal.html` | ⭐ Manifestações por Canal | Gráfico por canal |
| `slide-17d.html` | ⭐ Fluxo Mensal — Painel Resolveu | Série mensal |
| `slide-04.html` | ⭐ Manifestações Recebidas | KPIs principais (total, denúncias, reclamações) |
| `slide-05.html` | ⭐ Manifestações → processos sancionatórios | N.º de processos abertos |
| `slide-08.html` | ⭐ Demandas recorrentes | Temas/subtemas do trimestre |
| `slide-ctx-03.html` | Destaques do Trimestre | Texto de destaque |
| `slide-11.html` | Análise Qualitativa | Texto |
| `slide-12.html` | Riscos e Oportunidades | Texto |

### Bloco 4 · STAI — Transparência e Acesso à Informação
| Arquivo | Título | O que atualizar |
|---------|--------|-----------------|
| `capa-bloco-4.html` | Capa do bloco | Raramente muda |
| `slide-4a.html` | Apresentação da STAI | Texto |
| `slide-22.html` | ⭐ Transparência Ativa | Percentual/quesitos do Painel LAI |
| `slide-23.html` | ⭐ Transparência Passiva | Total de pedidos e taxa de deferimento |
| `slide-18.html` | ⭐ LAI — Transparência Passiva (pedidos) | KPIs: total pedidos, respondidos no prazo |
| `slide-20.html` | ⭐ Histórico de Pedidos LAI | Adicionar o novo trimestre ao gráfico |
| `slide-pda.html` | Plano de Dados Abertos 2026–2028 | Bases previstas no PDA |
| `slide-21.html` | Transparência Ativa e Dados Abertos | Links das bases (ver seção 9) |

### Bloco 5 · Considerações Finais
| Arquivo | Título | O que atualizar |
|---------|--------|-----------------|
| `capa-bloco-5.html` | Capa do bloco | Raramente muda |
| `slide-09.html` | ⭐ Principais Achados do Trimestre | Texto-resumo dos achados |
| `slide-conclusao.html` | ⭐ Considerações Finais | Texto-resumo com os números do trimestre |

### Bloco 6 · Apêndice
| Arquivo | Título | O que atualizar |
|---------|--------|-----------------|
| `capa-bloco-6.html` | Capa do bloco | Raramente muda |
| `slide-31.html` | Decretos | Só se houver nova legislação |
| `slide-29.html` | Glossário | Raramente muda |
| `slide-30.html` | Leis | Só se houver nova legislação |
| `slide-32.html` | Normativos e Portarias | Só se houver nova norma |
| `slide-35.html` | Links Úteis & Contatos | Verificar se os links seguem ativos |

### Sobras · Revisar / Desativados
Cerca de 20 arquivos (capas antigas `capa-01/02/03/…`, contextos antigos e slides como
`slide-10`, `slide-16`, `slide-16b`, `slide-17`, `slide-sac-refs`, `slide-stai-ativ`).
**Não são conteúdo do trimestre** — estão à espera de decisão sobre reaproveitar ou apagar.
⚠️ Enquanto estiverem no `deck`, **ainda aparecem** para quem navega até o fim (veja seção 3).

---

## 6. Como atualizar gráficos

Os gráficos usam a biblioteca **Chart.js** (carregada via CDN). Os dados ficam num bloco `<script>` perto do final de cada slide. Procure por:

```javascript
data: {
  labels: [...],   // ← nomes das categorias (eixo X)
  datasets: [{
    data: [...],   // ← valores numéricos (na mesma ordem dos labels)
```

### Exemplo — gráfico por mês:
```javascript
// ANTES (dados do 1º tri):
labels: ['Janeiro', 'Fevereiro', 'Março'],
data:   [98,        112,         94      ],

// DEPOIS (dados do 2º tri):
labels: ['Abril', 'Maio', 'Junho'],
data:   [87,      103,    91     ],
```

### Exemplo — gráfico histórico comparativo (ex.: `slide-07.html`, `slide-20.html`):
Para adicionar um novo período, acrescente o valor **respeitando a ordem** já usada no array (confira se o mais recente vem no início ou no fim):
```javascript
labels: ['1ºT 2027', '1ºT 2026', '1ºT 2025', '1ºT 2024', '1ºT 2023'],
data:   [145,         130,         107,         105,         62       ],
```

> Lembre-se de replicar a mesma mudança em `sistema/relatorio.html` (versão PDF).

---

## 7. Como atualizar textos e KPIs

KPIs são os números grandes em destaque. No HTML costumam aparecer assim:

```html
<p class="kpi-num">304</p>               ← número principal
<p class="kpi-label">manifestações</p>   ← rótulo embaixo
```

Basta encontrar o número e trocar pelo novo valor. Use **Ctrl+F** no seu editor para buscar o número antigo.

### Textos narrativos
Os slides de análise (ex.: `slide-09`, `slide-11`, `slide-12`, `slide-conclusao`) têm parágrafos de texto livre. Basta editar diretamente o conteúdo entre as tags `<p>...</p>`.

---

## 8. Como adicionar, remover ou reordenar um slide

Com o modelo de `deck`, quase tudo se resolve **editando a lista `files` do bloco** em `sistema/index.html`. Você **não** precisa mais renomear arquivos nem atualizar um contador.

### Reordenar / mover um slide
Recorte o nome do arquivo de onde ele está e cole na posição desejada, dentro do `files: [...]` do bloco de destino. Salve. Pronto — contador, dots e barra de progresso se ajustam sozinhos.

### Adicionar um slide novo
1. **Crie** o arquivo `.html` na pasta `sistema/` (o mais fácil é copiar um slide parecido e editar o conteúdo).
2. **Adicione** o nome do arquivo na posição desejada dentro do `files: [...]` do bloco certo:
   ```javascript
   files: ['capa-bloco-3.html', 'slide-sac-apres.html', 'slide-novo.html', /* ... */],
   ```
3. (Opcional) Se ele deve aparecer no **sumário clicável**, edite `slide-01.html`.
4. Se for um slide de dados, **replique** no `sistema/relatorio.html` (PDF).

### Remover um slide da apresentação
Basta **apagar o nome do arquivo** da lista `files`. O arquivo continua no disco (não é excluído), mas some da navegação. Se quiser removê-lo de vez, apague também o arquivo `.html`.

> Mandar um slide para o bloco **"Sobras"** **não** o esconde — ele continua navegável no fim.
> Para esconder de verdade, tire-o do `deck`.

---

## 9. Pendências conhecidas — o que ainda falta preencher

Durante a construção, alguns conteúdos ficaram como **placeholder** ou com links não confirmados. Para preenchê-los, abra o arquivo, use **Ctrl+F** para localizar o texto e substitua.

| Arquivo | O que preencher | Onde buscar |
|---------|----------------|-------------|
| `slide-msg-ouvidora.html` | Texto real da mensagem da Ouvidora | Com a Ouvidora |
| `slide-sac-ativ.html` | Revisar "Principais Atividades da SAC" (marcado como placeholder) | Com a equipe da SAC |
| `slide-21.html` | Links de cada base de dados abertos | [dados.gov.br/antaq](https://dados.gov.br/dados/organizacoes/visualizar/agencia-nacional-de-transportes-aquaviarios) |
| `slide-21.html` | Bases previstas no PDA 2026–2028 | [PDA ANTAQ](https://www.gov.br/antaq/pt-br/acesso-a-informacao/dados-abertos/plano-de-dados-abertos) |
| `slide-22.html` | Link do Painel LAI / portal de transparência ativa | Site da ANTAQ → Acesso à Informação |
| `slide-23.html` | Link do SIC, e-mail do SIC, taxa de deferimento | [gov.br/antaq/.../sic](https://www.gov.br/antaq/pt-br/acesso-a-informacao/servico-de-informacao-ao-cidadao-sic) |

**Slides "Sobras" a decidir (reaproveitar ou apagar):** capas antigas (`capa-01/02/03/04/05/06/07/10/11/sac/stai`), `slide-10` e `slide-ctx-08` (foram pedidos para retirar), `slide-16/16b/17`, `slide-sac-refs` (contém *Lorem ipsum*), `slide-stai-ativ`, `slide-ctx-04/05/09`.

**Arquivos fora do `deck`** (existem no disco mas não aparecem na apresentação — verificar se contêm conteúdo que deveria ser reaproveitado antes de apagar): `capa-08.html`, `slide-02.html`, `slide-03.html`, `slide-03b.html` (Sumário Executivo), `slide-06.html`, `slide-13.html` (Recomendações Institucionais), `slide-15.html`, `slide-19.html` (LAI por Mês), `slide-28.html`, `slide-ctx-02.html`, `slide-ctx-06.html`, `slide-principios.html`.

---

## 10. Design system — cores, fontes e classes

### Cores oficiais (não alterar sem aprovação)
| Nome | Código hex | Uso |
|------|-----------|-----|
| Azul escuro (primário) | `#103050` | Fundos, títulos |
| Azul médio | `#0070C0` | Destaques, bordas |
| Azul claro | `#0090C0` | Ícones, links, KPIs |
| Âmbar (destaque especial) | `#F2A900` | Alertas, botão de PDF |

### Fontes
- **Montserrat** → títulos, KPIs, labels em maiúsculas (usada na home e nos slides)
- **Open Sans** → texto corrido, parágrafos
- **Roboto** → interface do visualizador (`sistema/index.html`)

### Classes CSS recorrentes
| Classe | O que faz |
|--------|-----------|
| `.text-brand-primary` | Texto azul escuro (#103050) |
| `.text-brand-secondary` | Texto azul médio (#0070C0) |
| `.bg-brand-secondary` | Fundo azul médio |
| `.font-montserrat` | Aplica a fonte Montserrat |
| `.top-accent` | Faixa azul escura no topo do slide |
| `.top-accent-secondary` | Faixa azul média abaixo da anterior |
| `.chart-card` | Card branco com borda e sombra para gráficos |
| `.kpi-card` | Card grande de KPI com gradiente azul |

Os slides usam **Tailwind CSS** (via CDN), então também aparecem classes utilitárias do Tailwind (`text-gray-400`, `flex`, `p-8` etc.).

---

## 11. Como visualizar localmente

Como os slides carregam uns aos outros e usam caminhos relativos, o ideal é abrir por um
**servidor local** (e não dando duplo-clique no arquivo).

No Windows, use `py` (o comando `python` costuma ser só um atalho da Microsoft Store):

```powershell
# na pasta raiz do projeto
py -m http.server 8000
# depois abra no navegador:  http://localhost:8000
```

Alternativa: a extensão **Live Server** do VS Code (endereço `http://127.0.0.1:5500`).

---

## 12. Como publicar (git + GitHub Pages)

O repositório publica automaticamente via GitHub Actions a cada `push` na branch `main`.

### Fluxo básico:
```bash
# 1. Verificar o que mudou
git status

# 2. Adicionar os arquivos alterados (ou "git add ." para tudo)
git add sistema/slide-04.html sistema/relatorio.html

# 3. Criar o commit com descrição clara
git commit -m "Atualiza dados do 2º trimestre de 2026"

# 4. Enviar para o GitHub (dispara o deploy automático)
git push
```

Após o push, aguarde ~1–2 minutos e acesse a URL do GitHub Pages para confirmar.

### Se der erro de `index.lock`:
```powershell
# Remova o arquivo de lock travado (PowerShell)
Remove-Item .git\index.lock
# Tente o git add / commit novamente
```

---

## 13. Dúvidas frequentes

**Q: Alterei um arquivo mas o site não mudou.**
A: Verifique se o push foi feito (`git push`). Depois limpe o cache do navegador (Ctrl+Shift+R).

**Q: O slide está em branco ou dá erro ao abrir.**
A: Confira se o nome do arquivo no `deck` (em `sistema/index.html`) está **exatamente** igual ao nome do arquivo no disco — incluindo maiúsculas/minúsculas. O GitHub Pages diferencia `Imagens/` de `imagens/`.

**Q: Um slide antigo continua aparecendo no fim da apresentação.**
A: Ele provavelmente está no bloco **"Sobras"** do `deck`. Para sumir de vez, remova o nome dele da lista `files` (seção 8).

**Q: Quebrei um gráfico/slide e quero voltar.**
A: Use `git diff sistema/slide-XX.html` para ver o que mudou, ou `git checkout sistema/slide-XX.html` para desfazer todas as alterações naquele arquivo.

**Q: Onde fica o número total de slides?**
A: Em lugar nenhum para editar — é calculado sozinho (`const total = slides.length;`) a partir do `deck`. Você só mexe na lista `deck`.

**Q: O PDF não está saindo certo.**
A: Use `sistema/relatorio.html` (não os slides). Abra no navegador → Ctrl+P → "Salvar como PDF" → papel A4, margens mínimas e "Gráficos de fundo" ativado. Lembre que ele é **separado** do `deck`: se atualizou os slides, atualize o `relatorio.html` também.

**Q: Como saber qual variável mudar para atualizar um número?**
A: Procure pelo número atual com Ctrl+F no arquivo do slide. Os valores dos gráficos ficam em blocos `<script>` perto do final (`labels` / `data`); os KPIs ficam em tags como `<p class="kpi-num">`.

---

*Manual criado em junho de 2026 · revisado em julho de 2026 · Ouvidoria da ANTAQ*
