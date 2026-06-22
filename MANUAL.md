# Manual de Alteração de Dados — Relatório Trimestral da Ouvidoria ANTAQ

> **Para quem é este manual?**
> Para qualquer pessoa que precise atualizar os dados do relatório ao início de um novo trimestre — mesmo sem experiência avançada em programação. Se você sabe abrir um arquivo de texto, você consegue fazer as atualizações descritas aqui.

---

## Índice

1. [O que é este projeto](#1-o-que-é-este-projeto)
2. [Estrutura de pastas](#2-estrutura-de-pastas)
3. [Como a apresentação funciona](#3-como-a-apresentação-funciona)
4. [Checklist de atualização trimestral](#4-checklist-de-atualização-trimestral)
5. [Mapa de slides — o que cada um contém](#5-mapa-de-slides--o-que-cada-um-contém)
6. [Como atualizar gráficos](#6-como-atualizar-gráficos)
7. [Como atualizar textos e KPIs (números em destaque)](#7-como-atualizar-textos-e-kpis)
8. [Como adicionar ou remover um slide](#8-como-adicionar-ou-remover-um-slide)
9. [Campos "Side text" — o que ainda falta preencher](#9-campos-side-text--o-que-ainda-falta-preencher)
10. [Design system — cores, fontes e classes](#10-design-system--cores-fontes-e-classes)
11. [Como publicar (git + GitHub Pages)](#11-como-publicar-git--github-pages)
12. [Dúvidas frequentes](#12-dúvidas-frequentes)

---

## 1. O que é este projeto

Este é um **site estático** (só HTML, CSS e JavaScript — sem servidor, sem banco de dados) que funciona como uma apresentação interativa do Relatório Trimestral da Ouvidoria da ANTAQ.

Tudo roda no navegador do usuário. Não há nada para "instalar" ou "executar". O conteúdo fica hospedado no GitHub Pages e pode ser acessado pelo link do repositório.

---

## 2. Estrutura de pastas

```
relatorios-ouvidoria/
│
├── index.html              ← Página inicial (portal com os cards de acesso)
├── img_porto.jpeg          ← Foto de fundo da página inicial
├── .nojekyll               ← Arquivo vazio — diz ao GitHub para não usar Jekyll
├── .github/
│   └── workflows/
│       └── static.yml      ← Configura o deploy automático no GitHub Pages
│
└── sistema/
    ├── index.html          ← Visualizador de slides (controla o iframe)
    ├── relatorio.html      ← Versão para impressão em PDF (todos os slides em uma página)
    │
    ├── Imagens/
    │   ├── Logo Horizontal_Azul_S_N.png    ← Logo ANTAQ azul
    │   ├── Logo Horizontal_Branca_C_N.png  ← Logo ANTAQ branca
    │   ├── logomarca_Ouvidoria.png         ← Logomarca da Ouvidoria
    │   └── Logo_Fala_BR.png               ← Logo do Fala.BR
    │
    ├── slide-01.html   ← Capa + Sumário
    ├── slide-02.html   ← Apresentação da Ouvidoria
    ├── ...
    └── slide-35.html   ← Links Úteis e Contatos
```

---

## 3. Como a apresentação funciona

O arquivo `sistema/index.html` é o "palco". Ele carrega cada slide dentro de um **iframe** (uma janela embutida). Quando você clica nas setas ou pressiona uma tecla, ele troca o `src` do iframe para o próximo arquivo `slide-XX.html`.

```
sistema/index.html  →  iframe  →  slide-01.html
                               →  slide-02.html
                               →  ...
                               →  slide-35.html
```

**Importante:** Se você adicionar ou remover slides, precisa atualizar a variável `total` em `sistema/index.html`:

```javascript
// sistema/index.html — linha ~232
const total = 35;  // ← mude este número se adicionar ou remover slides
```

---

## 4. Checklist de atualização trimestral

A cada novo trimestre, siga esta ordem:

### Passo 1 — Atualizar as referências ao período
Faça uma busca global por `1º trimestre` e `Jan–Mar` nos arquivos `.html` e substitua pelo novo período.

- Exemplo: `1º trimestre de 2026` → `2º trimestre de 2026`
- Exemplo: `Jan–Mar` → `Abr–Jun`

### Passo 2 — Atualizar os dados numéricos nos slides
Cada slide tem seu próprio conjunto de dados. Veja a tabela no [Mapa de slides](#5-mapa-de-slides--o-que-cada-um-contém) para saber exatamente onde alterar.

### Passo 3 — Atualizar o rodapé de todos os slides
Cada slide tem um rodapé com o texto:
```html
<p class="text-gray-400 text-xs">Relatório Trimestral 2026 · Ouvidoria da ANTAQ</p>
```
Use "Localizar e substituir" no seu editor para trocar `2026` pelo ano correto se necessário.

### Passo 4 — Publicar
```bash
git add .
git commit -m "Atualiza dados para o Xº trimestre de AAAA"
git push
```
O GitHub Pages publica automaticamente em ~2 minutos.

---

## 5. Mapa de slides — o que cada um contém

| Slide | Título | O que atualizar a cada trimestre |
|-------|--------|----------------------------------|
| 01 | Capa + Sumário | Ano/trimestre no título; `goToSlide()` se mudar n.º de slides |
| 02 | Apresentação da Ouvidoria | Nome da ouvidora, missão institucional se mudar |
| 03 | Apresentação (continuação) | Dados estruturais da Ouvidoria |
| 04 | **Manifestações Recebidas** | ⭐ KPIs principais: total recebidas, denúncias, reclamações |
| 05 | Processos Sancionatórios | N.º de processos abertos a partir de manifestações |
| 06 | Manifestações por Mês | Array de dados mensais do gráfico de barras/linha |
| 07 | Evolução Histórica | Série histórica anual (adicionar o novo ano) |
| 08 | **Destaques do Trimestre** | ⭐ `const TOTAL` + array `THEMES` com temas e subtemas |
| 09 | Principais Achados | Texto narrativo dos achados do trimestre |
| 10 | Inteligência da Ouvidoria | Texto analítico — principais padrões observados |
| 11 | Análise Qualitativa | Texto qualitativo das manifestações |
| 12 | Riscos e Oportunidades | Atualizar riscos identificados no período |
| 13 | Recomendações Institucionais | Recomendações baseadas nos dados do trimestre |
| 14 | Tipos de Manifestações | Dados do gráfico de pizza/barra por tipo |
| 15 | Tipos por Mês | Série mensal por tipo de manifestação |
| 16 | Manifestações por Canal | Dados por canal (Fala.BR, telefone, e-mail, etc.) |
| 17 | Canais por Mês | Série mensal por canal |
| 18 | **LAI — Pedidos de Acesso** | ⭐ KPIs: total pedidos, respondidos no prazo |
| 19 | LAI por Mês | Série mensal de pedidos LAI |
| 20 | **Histórico LAI** | ⭐ Adicionar o novo trimestre no gráfico comparativo |
| 21 | Dados Abertos | Preencher links "Side text"; adicionar novas bases do PDA |
| 22 | Transparência Ativa | Atualizar percentual e n.º de quesitos do Painel LAI |
| 23 | Transparência Passiva | Atualizar total de pedidos e taxa de deferimento |
| 24–27 | Carta de Serviços | Atualizar indicadores se mudarem |
| 28 | Definições | Raramente muda |
| 29 | Glossário | Raramente muda |
| 30–32 | Leis, Decretos, Normativas | Atualizar se nova legislação for publicada |
| 33 | **Conclusão** | ⭐ Texto-resumo com os principais números do trimestre |
| 34 | Expediente | Nomes, cargos, data de publicação |
| 35 | Links Úteis | Verificar se os links ainda estão ativos |

> ⭐ = slide com dados que **sempre mudam** a cada trimestre

---

## 6. Como atualizar gráficos

Todos os gráficos usam a biblioteca **Chart.js**. Os dados ficam num bloco `<script>` perto do final de cada slide. Procure por:

```javascript
data: {
  labels: [...],   // ← nomes das categorias (eixo X)
  datasets: [{
    data: [...],   // ← valores numéricos (na mesma ordem dos labels)
```

### Exemplo — slide-06.html (manifestações por mês):
```javascript
// ANTES (dados do 1º tri):
labels: ['Janeiro', 'Fevereiro', 'Março'],
data:   [98,        112,         94      ],

// DEPOIS (dados do 2º tri):
labels: ['Abril', 'Maio', 'Junho'],
data:   [87,      103,    91     ],
```

### Exemplo — slide-20.html (histórico comparativo):
Para adicionar um novo trimestre, adicione o valor no **início** do array (mais recente primeiro):
```javascript
// Adicionar 2027 no início:
labels: ['1ºT 2027', '1ºT 2026', '1ºT 2025', '1ºT 2024', '1ºT 2023'],
data:   [145,         130,         107,         105,         62       ],
```

---

## 7. Como atualizar textos e KPIs

KPIs são os números grandes em destaque. Eles aparecem assim no HTML:

```html
<!-- Exemplo de KPI — slide-04.html -->
<p class="kpi-num">304</p>          ← número principal
<p class="kpi-label">manifestações</p>  ← rótulo embaixo
```

Basta encontrar o número e trocar pelo novo valor. Use **Ctrl+F** no seu editor para buscar o número antigo.

### Textos narrativos
Os slides de análise (09 a 13) têm parágrafos de texto livre. Basta editar diretamente o conteúdo entre as tags `<p>...</p>`.

---

## 8. Como adicionar ou remover um slide

### Adicionar um slide após o slide 21 (por exemplo):

1. **Renomear** os slides existentes em ordem reversa para abrir espaço:
   ```bash
   # No terminal, dentro da pasta sistema/
   mv slide-35.html slide-36.html
   mv slide-34.html slide-35.html
   # ... continuar até o slide que vem depois do novo
   mv slide-22.html slide-23.html
   ```

2. **Criar** o novo arquivo `slide-22.html` copiando um slide similar como base.

3. **Atualizar** o rodapé do novo slide (ex: `22 / 36`) e de todos os renomeados.

4. **Atualizar** o total em `sistema/index.html`:
   ```javascript
   const total = 36;  // era 35
   ```

5. **Atualizar** o Sumário em `slide-01.html` — verificar se os `goToSlide()` ainda apontam para os slides certos.

### Remover um slide:
Processo inverso: delete o arquivo, renomeie os seguintes para fechar a lacuna, atualize o total e o sumário.

---

## 9. Campos "Side text" — o que ainda falta preencher

Durante a criação, alguns links não puderam ser confirmados no site da ANTAQ. Eles estão marcados como `Side text` nos slides abaixo. Para preenchê-los, acesse o site da ANTAQ e substitua:

| Slide | O que preencher | Onde buscar |
|-------|----------------|-------------|
| 21 | Links de cada base de dados (18 + 8 previstas) | [dados.gov.br/antaq](https://dados.gov.br/dados/organizacoes/visualizar/agencia-nacional-de-transportes-aquaviarios) |
| 21 | Nomes das 8 bases previstas no PDA 2026-2028 | [PDA ANTAQ](https://www.gov.br/antaq/pt-br/acesso-a-informacao/dados-abertos/plano-de-dados-abertos) |
| 22 | Link do Painel LAI da ANTAQ | Site da ANTAQ → Acesso à Informação → Transparência Ativa |
| 22 | Link do portal de transparência ativa | Site da ANTAQ → Transparência e Prestação de Contas |
| 23 | Link do SIC (Serviço de Informação ao Cidadão) | [gov.br/antaq/.../sic](https://www.gov.br/antaq/pt-br/acesso-a-informacao/servico-de-informacao-ao-cidadao-sic) |
| 23 | E-mail do SIC | Página do SIC na ANTAQ |
| 23 | Taxa de deferimento dos pedidos | Relatório de Monitoramento LAI |

**Como fazer a substituição:**
1. Abra o arquivo do slide no editor de texto
2. Use Ctrl+F para buscar `Side text`
3. Substitua pelo valor correto

---

## 10. Design system — cores, fontes e classes

### Cores oficiais (não alterar sem aprovação)
| Nome | Código hex | Uso |
|------|-----------|-----|
| Azul escuro (primário) | `#103050` | Fundos, títulos |
| Azul médio | `#0070C0` | Destaques, bordas |
| Azul claro | `#0090C0` | Ícones, links, KPIs |
| Âmbar (destaque especial) | `#F2A900` | Barra de 2026, alertas |

### Fontes
- **Montserrat** → títulos, KPIs, labels em maiúsculas
- **Open Sans** → texto corrido, parágrafos

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

---

## 11. Como publicar (git + GitHub Pages)

O repositório está configurado para publicar automaticamente via GitHub Actions toda vez que há um `push` na branch `main`.

### Fluxo básico de publicação:
```bash
# 1. Verificar o que mudou
git status

# 2. Adicionar os arquivos alterados
git add sistema/slide-04.html sistema/slide-08.html
# (ou "git add ." para adicionar tudo)

# 3. Criar o commit com descrição clara
git commit -m "Atualiza dados do 2º trimestre de 2026"

# 4. Enviar para o GitHub (isso dispara o deploy automático)
git push
```

Após o push, aguarde ~2 minutos e acesse a URL do GitHub Pages para confirmar que funcionou.

### Se der erro de `index.lock`:
```bash
# Remova o arquivo de lock travado
del .git\index.lock
# Tente o git add / commit novamente
```

---

## 12. Dúvidas frequentes

**Q: Alterei um arquivo mas o site não mudou.**
A: Verifique se o push foi feito (`git push`). Depois limpe o cache do navegador (Ctrl+Shift+R).

**Q: O slide está em branco.**
A: Verifique se o arquivo `slide-XX.html` existe na pasta `sistema/` e se o número no `total` de `sistema/index.html` está correto.

**Q: Quebrei o gráfico e não sei como voltar.**
A: Use `git diff sistema/slide-XX.html` para ver o que mudou, ou `git checkout sistema/slide-XX.html` para desfazer todas as alterações naquele arquivo.

**Q: Quero ver o resultado antes de publicar.**
A: Abra o arquivo `index.html` da raiz diretamente no navegador, ou use a extensão **Live Server** do VS Code. O endereço será `http://127.0.0.1:5500`.

**Q: O PDF não está sendo gerado corretamente.**
A: Use o arquivo `sistema/relatorio.html` (não os slides). Abra no navegador → Ctrl+P → "Salvar como PDF" → configure papel A4, margens mínimas e "Gráficos de fundo" ativado.

**Q: Como saber qual variável JavaScript mudar para atualizar um número?**
A: Procure pelo número atual usando Ctrl+F no arquivo. Os valores sempre ficam em blocos `<script>` perto do final do arquivo, comentados com `/* DADOS */` ou similar.

---

*Manual criado em junho de 2026 · Ouvidoria da ANTAQ*
