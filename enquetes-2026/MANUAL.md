# Manual — Relatório Anual de Enquetes do Conselho de Usuários (ANTAQ)

> **Para quem é este manual?**
> Para quem precisa atualizar este relatório na próxima rodada de avaliação do Conselho de Usuários.
> Se você sabe abrir um arquivo de texto, consegue fazer as atualizações descritas aqui.

---

## Índice

1. [O que é esta pasta](#1-o-que-é-esta-pasta)
2. [A regra de ouro: `dados-enquetes.js`](#2-a-regra-de-ouro-dados-enquetesjs)
3. [Como atualizar a próxima rodada — passo a passo](#3-como-atualizar-a-próxima-rodada--passo-a-passo)
4. [Estrutura de arquivos](#4-estrutura-de-arquivos)
5. [Mapa de slides](#5-mapa-de-slides)
6. [Como adicionar, remover ou reordenar um slide](#6-como-adicionar-remover-ou-reordenar-um-slide)
7. [Ressalvas de fonte (selo amarelo)](#7-ressalvas-de-fonte-selo-amarelo)
8. [Design system](#8-design-system)
9. [Visualizar localmente e publicar](#9-visualizar-localmente-e-publicar)
10. [Dúvidas frequentes](#10-dúvidas-frequentes)

---

## 1. O que é esta pasta

`enquetes-2026/` é o **segundo produto** do hub (o primeiro é `sistema/`, o Relatório Trimestral).
Ela é independente: tem o próprio visualizador, os próprios slides e a própria versão de impressão.
Mexer aqui **não afeta** o relatório trimestral, e vice-versa.

O conteúdo é a apuração das enquetes que a Ouvidoria publica na **Plataforma do Conselho de Usuários
de Serviços Públicos da CGU**, uma enquete por serviço da Carta de Serviços da ANTAQ.

Como no relatório trimestral, cada tela é um `.html` independente e a ordem vem de uma única lista
(`const deck`) dentro de `index.html`.

---

## 2. A regra de ouro: `dados-enquetes.js`

**Todos os números das enquetes moram em um único arquivo: `dados-enquetes.js`.**

Quem lê esse arquivo:

| Quem | Para quê |
|------|----------|
| `index.html` | Monta a lista de telas de enquete dentro do `deck` |
| `slide-enquete.html` | Desenha os gráficos e escreve os textos de análise (2 telas por enquete) |
| `slide-tabela-enquetes.html` | Monta a Tabela 1 |
| `slide-18.html` (cnsu-numeros) | Total de conselheiros, enquetes e respostas |
| `slide-13.html` (carta-numeros) | Distribuição de serviços por superintendência |
| `slide-23.html` (resultados-ambos) | Números do bloco de considerações finais |
| `relatorio.html` | Monta as páginas da versão para impressão |

> ⚠️ **Os textos de análise NÃO são digitados** — são gerados a partir dos números pela função
> `textoAnalise()`, no fim do `dados-enquetes.js`. Isso garante que gráfico e texto nunca fiquem
> divergentes. Se um número mudar, a frase muda junto, sozinha.
>
> A frase é montada em pedaços por `segmentosAnalise()`, logo acima: cada oração que fala de uma
> fatia do gráfico carrega a sua chave (`sim`, `nao`, `n1`…`n5`). É o que permite ao slide acender
> a oração certa quando o mouse passa pela fatia. `textoAnalise()` é só a junção desses pedaços —
> mexer em um mexe no outro.

### Anatomia de uma enquete

```javascript
{
  id: 8270,                 // nº da enquete na Plataforma da CGU
  sup: 'SOG', num: 1,       // superintendência e nº do serviço na Carta
  servico: 'Solicitar autorização e registro na ANTAQ para afretamento de embarcação estrangeira',
  pergunta: 'Qual é a sua opinião a respeito do serviço prestado pela Antaq no registro de…?',
  publicacao: '07/04/2026',
  respondentes: 7,          // quantos conselheiros responderam
  base: 147,                // total de inscritos na data (null = não informado)
  q1: { sim: 2, nao: 5 },   // 1) Você já utilizou esse serviço?
  q2: { sim: 2, nao: 5 },   // 2) Teve facilidade para acessar?  (null = questão não exibida)
  q3: [0, 1, 0, 0, 1],      // 3) notas do ATENDIMENTO — [nota1, nota2, nota3, nota4, nota5]
  q4: [0, 0, 1, 0, 1],      // 4) notas do TEMPO de conclusão
  sugestoes: ['Acesso a poucas empresas'],   // 5) respostas livres — [] se não houve
  nota: '…'                 // opcional: ressalva exibida no rodapé do slide
}
```

**Regras que o arquivo respeita (confira ao editar):**

- `q1.sim + q1.nao` deve ser igual a `respondentes`.
- Se **ninguém** usou o serviço (`q1.sim === 0`), então `q2`, `q3` e `q4` são `null` — o slide passa a
  mostrar o aviso "Demais questões não apresentadas".
- `q3` e `q4` são arrays de **5 posições**, sempre — use `0` onde não houve resposta.
- Enquete sem sugestões (`sugestoes: []`) mostra “Não houve sugestões registradas” na faixa da questão 5.

---

## 3. Como atualizar a próxima rodada — passo a passo

### Passo 1 — Atualizar o período e a base de conselheiros
No topo de `dados-enquetes.js`:

```javascript
const PERIODO_ENQUETES = {
  inicio: '07/04/2026', fim: '27/04/2026', dias: 21,
  rodada: '2ª rodada de avaliação do quadriênio 2025–2028',
  conselheiros: 145, conselheirosData: '06/05/2026'
};
```

### Passo 2 — Substituir o array `ENQUETES`
Troque os objetos pelos dados da nova rodada. Mantenha a ordem **SOG → SRG → SAF → SFC** e, dentro de
cada uma, a ordem do campo `num` (a ordem da Carta de Serviços). O `deck` e o sumário se reorganizam
sozinhos.

### Passo 3 — Serviços sem enquete
Se algum serviço da Carta não recebeu enquete, registre-o em `SERVICOS_SEM_ENQUETE` — ele aparece na
Tabela 1 com o selo `sem enquete publicada` em vez de sumir do documento.

### Passo 4 — Atualizar as telas que não vêm dos dados
| Arquivo | O que revisar |
|---------|---------------|
| `slide-00.html` | Ano e período na capa e no badge do rodapé |
| `slide-01.html` (ficha-tecnica) | Nomes e cargos |
| `slide-02.html` (apresentacao) | Texto de apresentação (datas e nº de enquetes) |
| `slide-18.html` (cnsu-numeros) | Datas das rodadas de avaliação realizadas |
| `slide-13.html` (carta-numeros) | Só se a Carta mudar de tamanho — edite `SUPERINTENDENCIAS` no `.js` |

### Passo 5 — Conferir
Rode o servidor local (seção 9), abra a apresentação e percorra tudo. Confira principalmente:
- a Tabela 1 (partes 1 e 2) — todas as linhas cabem na tela?
- 2 ou 3 enquetes de amostra — gráfico e texto batem?
- `relatorio.html` → **Preparar impressão** → Ctrl+P.

### Passo 6 — Publicar
```bash
git add .
git commit -m "Atualiza enquetes do Conselho de Usuários — rodada de AAAA"
git push
```

---

## 4. Estrutura de arquivos

```
enquetes-2026/
├── index.html                        ← visualizador + o `deck` (a ordem)
├── relatorio.html                    ← versão para impressão / PDF
├── dados-enquetes.js                 ← FONTE ÚNICA DOS DADOS
├── MANUAL.md                         ← este arquivo
├── Imagens/                          ← logos + fluxograma (Figura 5)
│
├── slide-enquete.html                ← template das 56 telas de resultado
├── slide-tabela-enquetes.html        ← Tabela 1 (?p=1 e ?p=2)
│
├── capa-bloco-1..6.html              ← capas dos 6 capítulos
└── slide-01.html..slide-28.html      ← demais telas de conteúdo, na ordem do deck
```

### Por que os templates usam `?e=` na URL

`slide-enquete.html?e=8270&p=1` se monta a partir do registro `8270`. Cada enquete ocupa **duas
telas**, para o texto caber grande e legível:

| URL | O que mostra |
|-----|--------------|
| `?e=NNNN&p=1` | questões 1 e 2 — os dois gráficos de rosca |
| `?e=NNNN&p=2` | questões 3 e 4 — os dois gráficos de barras — e a questão 5 (sugestões) |

O cabeçalho (superintendência, nº da enquete, enunciado, respondentes) se repete nas duas, com o
selo `1/2` · `2/2` ao lado do número, para cada tela se ler sozinha.

**Exceção:** quando nenhum conselheiro usou o serviço (`q2: null`), o formulário encerra na questão
1 — não existem questões 2 a 5 e a enquete fica em **uma tela só**, com o selo `1/1`. Nesta rodada
são 6 casos, então as 31 enquetes dão **56 telas** — todas com **um arquivo**. Publicar ou retirar
uma enquete = editar o `.js`.

---

## 5. Mapa de slides

### Abertura
| Arquivo | Título |
|---------|--------|
| `slide-00.html` | Capa |
| `slide-01.html` | Ficha Técnica |
| `slide-02.html` | Apresentação |
| `slide-03.html` | Sumário clicável |

### Bloco 1 · Visão Geral das Ouvidorias Públicas
`capa-bloco-1.html`, `slide-04.html`, `slide-05.html`, `slide-06.html`,
`slide-07.html`, `slide-08.html` — texto institucional, raramente muda.

### Bloco 2 · A Ouvidoria da ANTAQ
`capa-bloco-2.html`, `slide-09.html`, `slide-10.html`.

### Bloco 3 · Carta de Serviços da ANTAQ
| Arquivo | Título |
|---------|--------|
| `capa-bloco-3.html` | Capa do bloco |
| `slide-11.html` | Apresentação da Carta (+ processo SEI) |
| `slide-carta-32servicos.html?p=1` | Os 31 serviços — parte 1: SOG (18) |
| `slide-carta-32servicos.html?p=2` | Os 31 serviços — parte 2: SRG · SAF · SFC (13) |
| `slide-12.html` | O que faz cada superintendência |
| `slide-13.html` | ⭐ Distribuição de serviços (lê o `.js`) |

> **Por que só 31 e não os 33 da Carta oficial?** A partir desta rodada, só entram
> aqui os serviços com enquete publicada — SisPAT e ProTeu (SFC) ficaram de fora
> porque não tiveram enquete nesta rodada (ver `ENQUETES` em `dados-enquetes.js`).
> O arquivo do nome continua sendo o histórico (`slide-carta-32servicos.html`), mas
> hoje guarda 31 cartões.
>
> **Por que os 31 serviços ocupam duas telas?** Em uma tela só, os 31 cartões
> ficavam pequenos demais para ler. O arquivo continua sendo **um só** (com os 31
> serviços dentro): ele lê `?p=` da URL e esconde os blocos da outra parte,
> aumentando os cartões. Assim o anexo do `relatorio.html`, que lê todos os
> `.svc-bar` do arquivo, continua listando os 31 na íntegra.

### Bloco 4 · Conselho de Usuários da ANTAQ
Ordem escolhida na revisão — não segue mais o documento-fonte (que trazia a
metodologia antes do "Conselho em números"). O slide de critérios de
avaliação foi removido nesta rodada.

| Arquivo | Título |
|---------|--------|
| `capa-bloco-4.html` | Capa do bloco |
| `slide-15.html` | Apresentação do Conselho |
| `slide-16.html` | Lei nº 13.460/2017, arts. 18 a 22 |
| `slide-17.html` | Como se tornar conselheiro |
| `slide-18.html` | ⭐ Conselheiros e rodadas |
| `slide-19.html` | Metodologia utilizada na consulta aos conselheiros |
| `slide-20.html` | Fluxo da Consulta (fluxo horizontal + Figura 5) |
| `slide-21.html` | Estrutura das Enquetes |
| `slide-tabela-enquetes.html?p=1/2` | ⭐ Enquetes Publicadas no Portal Gov.br |
| `slide-enquete.html?e=NNNN&p=1/2` | ⭐ Resultado de cada enquete (rosca na 1/2, barras + sugestões na 2/2) |

### Bloco 5 · Considerações Finais
`capa-bloco-5.html`, `slide-22.html`, `slide-23.html`.

### Bloco 6 · Apêndice
`capa-bloco-6.html`, `slide-24.html`, `slide-25.html`, `slide-26.html`,
`slide-27.html`, `slide-28.html`.

> Nos quatro slides de quadros (Decretos, Glossário, Leis, Normativos) o detalhamento abre ao
> **passar o mouse**, num painel **ancorado ao quadro apontado** — abaixo dele, ou acima quando não
> cabe, ou ao lado (mais estreito) quando não cabe nem acima nem abaixo. O painel é transparente ao
> ponteiro (`pointer-events: none`), então nunca fica embaixo do cursor: não há zona morta nem
> pisca-pisca, e dá para varrer a grade inteira sem clicar. O **clique** abre o mesmo conteúdo no
> cartão central de sempre (`.fixado`), aí com fundo escurecido, rolagem, links clicáveis e X.
>
> O conteúdo continua no `.tile-full` de cada quadro, que é de onde o `relatorio.html` monta as
> páginas de anexo — mexer no gatilho não mexe na impressão.

---

## 6. Como adicionar, remover ou reordenar um slide

Tudo se resolve editando o `deck` em `index.html`:

```javascript
{
  block: 'Bloco 3 · Carta de Serviços da ANTAQ', short: 'Carta de Serviços', tint: 0.7,
  files: ['capa-bloco-3.html', 'slide-11.html', /* ... */],
}
```

- **Reordenar / mover:** recorte o nome do arquivo e cole na posição desejada. Se a posição no deck
  mudar, considere renomear o arquivo para manter o número alinhado (não é obrigatório).
- **Adicionar:** copie um slide parecido, edite o conteúdo e acrescente o nome ao `files`.
  Se ele deve aparecer no sumário, edite também a árvore `tree` em `slide-03.html`.
- **Remover:** apague o nome da lista `files` (o arquivo continua no disco).
- **Replique** a mudança no array `files` de `relatorio.html`.

> As telas de enquete **não** são listadas à mão em lugar nenhum — saem do `.js`.

---

## 7. Ressalvas de fonte (selo amarelo)

O documento-fonte desta edição tinha lacunas. Onde algo foi deduzido ou não pôde ser confirmado, o
slide mostra um selo amarelo:

| Onde | O quê |
|------|-------|
| `slide-enquete.html?e=8274` | Percentuais da questão 1 corrigidos pelo gráfico (80%/20%) |
| `slide-enquete.html?e=8276` | Respostas da questão 1 estavam invertidas no documento-fonte |
| `slide-enquete.html?e=8277` | Nº de respostas "sim" da questão 2 ajustado pelo gráfico |
| `slide-enquete.html?e=8297` | Enunciado reconstituído; total de inscritos não consta |
| `slide-enquete.html?e=8299` | Enunciado reconstituído; total de inscritos não consta |
| `slide-enquete.html?e=8300` | Numeração corrigida (constava 8299, duplicada) |
| `slide-tabela-enquetes.html` | Coluna "Link" sem URLs individuais |

Para retirar uma ressalva depois de confirmar o dado com a fonte: apague o campo `nota` daquela
enquete em `dados-enquetes.js` (ou preencha `base` quando for o caso).

---

## 8. Design system

### Cores oficiais
| Nome | Hex | Uso |
|------|-----|-----|
| Azul escuro | `#103050` | Fundos, títulos, respostas "NÃO" |
| Azul médio | `#0070C0` | Destaques, bordas, respostas "SIM" |
| Azul claro | `#0090C0` | Ícones, barras de nota, links |
| Âmbar | `#F2A900` | Ressalvas, selos "a confirmar", SFC |

### Fontes
- **Montserrat** → títulos, números, rótulos em maiúsculas
- **Open Sans** → texto corrido
- **Roboto** → interface do visualizador (`index.html`)

### Gráficos
Todos usam **Chart.js** via CDN. As pizzas são *doughnut* com rótulo de percentual no centro de cada
fatia; as barras de nota mostram o valor acima da coluna e usam escala de inteiros.

---

## 9. Visualizar localmente e publicar

```powershell
# na RAIZ do repositório (CaioNox.github.io), não dentro de enquetes-2026
py -m http.server 8000
# depois abra: http://localhost:8000/enquetes-2026/
```

> Abrir os arquivos com duplo-clique **não funciona bem**: `dados-enquetes.js` e os iframes precisam
> de um servidor. Use o comando acima ou a extensão Live Server do VS Code.

Publicação: `git add . && git commit -m "..." && git push`. O GitHub Pages atualiza em ~2 minutos.

---

## 10. Dúvidas frequentes

**Q: Mudei um número e o texto de análise continua o antigo.**
A: Limpe o cache do navegador (Ctrl+Shift+R). O texto é sempre derivado do número — se ainda divergir,
confira se você editou o registro certo (`id`).

**Q: A tela de uma enquete abriu em branco / "Enquete não encontrada".**
A: O `id` na URL (`?e=8270`) não existe no array `ENQUETES`. Confira se o registro foi removido do `.js`
sem ser retirado do `deck` — ou simplesmente recarregue, porque o `deck` se monta a partir do `.js`.

**Q: A Tabela 1 está cortando a última linha.**
A: A tabela tem altura fixa (a tela é 1920×1080). Se a rodada tiver mais serviços, reduza
`font-size`/`padding` de `table.enq td` em `slide-tabela-enquetes.html`, ou quebre em 3 partes
(`?p=3`) acrescentando o arquivo ao `deck`.

**Q: As sugestões (questão 5) ficaram com a letra menor numa enquete.**
A: A faixa inferior mede a própria altura e usa a **maior** fonte que ainda cabe — a escala vai de
21 px a 15 px (`caberNaCaixa()`, em `slide-enquete.html`). A caixa de análise faz o mesmo, de 19 px
a 14 px. Só encolhe quem tem texto demais; as demais telas ficam no tamanho cheio.

**Q: Dá para ver os números exatos de um gráfico?**
A: Sim — o botão **Ver números** no canto do cartão troca o gráfico por uma tabela com os mesmos
valores, e volta no clique seguinte. Passar o mouse numa fatia/barra também acende a oração
correspondente na caixa de análise (e vice-versa), e clicar na legenda `SIM`/`NÃO` põe uma das
respostas em foco. Nada disso altera número nenhum, e a versão de impressão sai sempre em gráfico.

**Q: Quantos slides tem a apresentação?**
A: Não há número fixo — é calculado do `deck` (`const total = slides.length`).

**Q: Quebrei alguma coisa e quero voltar.**
A: `git diff enquetes-2026/dados-enquetes.js` mostra o que mudou; `git checkout <arquivo>` desfaz.

---

*Manual criado em julho de 2026 · Ouvidoria da ANTAQ*
