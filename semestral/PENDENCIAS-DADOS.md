# Pendências de dados — 1º Relatório Semestral 2026

Status: **parcial**. Este arquivo cobre os itens já identificados durante a
cópia/derivação (Etapa 3). A marcação sistemática de `.todo-dado` em todos os
slides listados no §16 do prompt (badge visual + comentário `TODO-DADO` em
cada valor numérico) ainda **não foi feita** — é a Etapa 9 da ordem de
execução, pendente.

## 1. Dados já CONFIRMADOS pelo usuário (§8 do prompt) — ainda não inseridos no HTML

| Slide | Métrica | Valor confirmado |
|---|---|---|
| `slide-04.html` | Total de manifestações | 614 |
| `slide-04.html` | Arquivadas | 69 |
| `slide-04.html` | Respondidas | 544 |
| `slide-04.html` | Tempo médio de conclusão | 12,5 dias |
| `slide-23.html` | Pedidos (Transparência Passiva) | 262 |
| `slide-23.html` | Atendimento no prazo | 100% |
| `slide-23.html` | Tempo médio de resposta | 10,3 dias |

⚠️ **Divergência sinalizada, não resolvida:** 69 + 544 = 613, não 614. Não vou
calcular nenhum percentual derivado desses três números até confirmação.

Esses dois slides ainda têm os números ANTIGOS (trimestrais) no HTML copiado
— a inserção dos valores confirmados acima é a próxima edição pontual (§8),
ainda não executada.

## 2. Pendências novas, identificadas durante a cópia (aguardando dado do usuário)

| Slide | O que falta | Status |
|---|---|---|
| `slide-07.html` | Dados de 1º semestre de 2023, 2024 e 2025 (hoje só tem 1º trimestre de cada ano) | Usuário confirmou que vai fornecer. Mantido com dado/rótulo trimestral original até lá (comentário `TODO-DADO` já inserido no arquivo). |
| `slide-20.html` | Idem acima, para a série histórica de pedidos LAI | Mesma situação — comentário já inserido. |
| `slide-qa-geral.html` (Trilha 2 inteira) | Reconciliar com o dado confirmado de `slide-23.html` (262/100%/10,3 dias) **e** com a série histórica de `slide-20.html` quando disponível — hoje ainda mostra 130 pedidos/9,1 dias/série 62-105-107-130 | Bloco inteiro sinalizado com comentário `TODO-DADO`, conteúdo preservado sem alteração até a reconciliação. |

## 3. Slides que precisam de badge `.todo-dado` sistemático (§16) — pendente, não iniciado

Lista do próprio prompt (mínimo): `slide-17b`, `slide-17e`, `slide-07`,
`slide-14`, `slide-canal`, `slide-17d`, `slide-05`, `slide-08`,
`slide-resp-unidade`, `slide-tramit-uorg`, `slide-20`, `slide-18`.

Nenhum desses recebeu ainda o badge visual `.todo-dado` (já definido em
`semestral/base.css`) nem o comentário HTML padronizado
`<!-- TODO-DADO: valor do 1º trimestre. Substituir pelos números do 1º
semestre de 2026. -->` em cada KPI/gráfico — isso é trabalho ainda não feito,
a ser executado como Etapa 9 (ver `INVENTARIO.md`).

⚠️ **Atenção especial** (já identificado pela auditoria, ver `INVENTARIO.md`):
- `slide-tramit-uorg.html`: a base de cálculo `BASE_PCT = 353` e o array
  `MESES = ['Janeiro','Fevereiro','Março']` estão hardcoded para 3 meses —
  vão precisar virar 7 meses (Jan–Jul) com os respectivos valores, não é só
  trocar o texto "trimestre"→"semestre".
- `slide-17d.html`: mesma situação — passa de 3 para 7 meses; os indicadores
  ▲/▼ já foram convertidos para a escala azul (ver INVENTARIO.md), mas os
  valores em si (+43,3%/-34,1%) ainda são os do trimestre e a série mensal
  precisa ser expandida.
- `slide-08.html`: comentário no código confirma que a base de dados
  ("planilha oficial") hoje só cobre o 1º trimestre (total 304) — os números
  do ranking de temas/subtemas precisam ser recalculados com abril–junho.

---

## 4. Dados do 1º semestre inseridos em 28/08/2026 — e o que ficou pendente

### Aplicado (valores fornecidos pelo usuário)

| Slide | Campo | Antes | Depois |
|---|---|---|---|
| `slide-04.html` | Total de manifestações | 304 | **614** |
| `slide-04.html` | Manifestações arquivadas | 46 | **69** |
| `slide-04.html` | Manifestações respondidas | 258 | **544** |
| `slide-04.html` | Tempo médio de conclusão | 13,9 dias | **12,6 dias** |
| `slide-04.html` | Encaminhadas a outros órgãos | 12 | **25** |
| `slide-05.html` | Concluídas pela Ouvidoria/demais unidades | 106 | **399** |
| `slide-05.html` | Encaminhadas à SFC | 152 | **215** |
| `slide-05.html` | Deram origem a PAS (SEI) | 103 | **125** |
| `slide-05.html` | Card grande + subtítulo | 258 respondidas | **614 recebidas** |
| `slide-05.html` | Percentuais da divisão | 41% / 59% | **65% / 35%** |
| `slide-17b.html` | Atendimentos no semestre | 405 | **614** |

### ⚠️ Inconsistências de fechamento a confirmar com a área

1. **`slide-04.html` — total não fecha por 1:** o card diz "o total inclui
   tanto as arquivadas quanto as respondidas", mas 69 + 544 = **613**, e o
   total informado é **614**. Antes fechava exato (46 + 258 = 304).
   Confirmar se falta 1 manifestação em alguma das duas parcelas.

2. **`slide-04.html` vs `slide-05.html` — bases diferentes:** o `slide-04`
   registra **544** respondidas, mas a divisão do `slide-05`
   (399 + 215) soma **614**, que é o *total recebido*, não o respondido.
   Decisão tomada: o `slide-05` passou a usar 614 como base (única leitura
   em que os percentuais fecham em 100%) e o rótulo do card grande mudou de
   "Demandas respondidas" para "Manifestações recebidas". **Confirmar se a
   divisão 399/215 é mesmo sobre o total recebido** ou se são outros valores
   sobre as 544 respondidas.

### ⛔ Pendente — dado não fornecido

- **`slide-17b.html` — série mensal:** o gráfico foi expandido de 3 para 6
  barras (Jan–Jun). **Abril, Maio e Junho estão sem valor** (`—`, barra
  hachurada) e Janeiro/Fevereiro/Março seguem com os valores do trimestre
  (152 / 123 / 130), que somam 405 e **não fecham mais com o novo total de
  614**. O bloco inteiro está marcado com `.todo-dado` (badge
  "DADO PROVISÓRIO"). Substituir os 6 valores quando a série mensal do
  semestre for fornecida.

---

## 5. `slide-08.html` — gráfico interativo de temas (atualizado 28/08/2026)

Base trocada de **304 (1º trimestre)** para **614 (1º semestre)**, com as 7
categorias e 61 subcategorias da tabela de referência fornecida.

| Categoria | Qtd | % |
|---|---:|---:|
| Tarifa Portuária Abusiva | 291 | 47,4% |
| Diversos (Solicitação) | 136 | 22,1% |
| Regulação Portuária | 68 | 11,1% |
| Serviços na Navegação Interior | 68 | 11,1% |
| Regulação na Navegação Marítima | 30 | 4,9% |
| Jurisdição (Legislação) / fora do âmbito | 18 | 2,9% |
| Meio Ambiente | 3 | 0,5% |
| **TOTAL** | **614** | **100%** |

### Linhas realocadas na leitura da tabela girada

A tabela de origem veio girada 90°, e três blocos de linhas caíram sob o
cabeçalho de categoria errado. Foram realocados porque as somas passam a
fechar **exatamente** com os totais informados (6 das 7 categorias):

1. `Solicitação / Solicitação de Informação` (11) — estava sob **Meio ambiente**,
   movido para **Diversos**. → Meio ambiente 14→3 ✓ · Diversos 125→136 ✓
2. `Tarifa Abusiva no Transporte da Navegação Interior` (20) e
   `Travessias fora da jurisdição da ANTAQ…` (1) — estavam sob **Regulação na
   Navegação Marítima**, movidos para **Serviços na Navegação Interior**.
   → Nav. Marítima 51→30 ✓ · Nav. Interior 47→68 ✓

### ⚠️ Divergência remanescente a confirmar

**`Regulação Portuária`: as 12 subcategorias somam 70, mas o total informado
é 68 (+2).** Foi mantido o total **68**, que é o valor que fecha os 614 e o
percentual de 11,1%. As subcategorias ficaram como vieram na tabela.
Conferir com a área quais duas unidades estão sobrando (as candidatas mais
prováveis, por posição na tabela, são `Penalidades` (2) ou `Carga Perigosa` (2)).

### Fora do total

A linha `Acesso à informação — Demandas redirecionadas à STAI (99)` **não** entra
no gráfico: as 7 categorias já somam 614 sem ela, e ela representa demandas
redirecionadas, não manifestações do próprio recorte. As categorias
`Reabertura de demandas` e `Controladoria-Geral da União – CGU` vieram sem
quantidade e também ficaram de fora.

### Correções de bug feitas junto (pré-existentes, confirmadas no git)

- O elemento `id="odo"` (odômetro de %) tinha CSS e JS mas **nunca existiu no
  HTML** — `update()` lançava `TypeError` a cada clique. Elemento inserido no
  cabeçalho; contador agora calcula certo (verificado: 100,00% / 47,39% / 47,88%).
- A escada de agrupamento parava em `makeRows(2)` e saturava em 40 linhas, que
  estouravam o card. Estendida (`ESCALA_AGRUPAMENTO`) e limiares de densidade
  ajustados; todos os 9 cenários de seleção agora cabem em 1920×1080.

---

## 6. Série mensal do 1º semestre integrada (28/08/2026)

Integrada em `slide-14.html` (tipos por mês) e `slide-17d.html` (recebidas por mês).
**Encaminhadas a outros órgãos foram removidas do recorte mensal** a pedido do
usuário — o recorte mensal trabalha apenas com recebidas, respondidas e arquivadas.

### Manifestações por mês

| Mês | Recebidas | Respondidas | Arquivadas | Resp.+Arq. | Sem desfecho |
|---|---:|---:|---:|---:|---:|
| Janeiro | 90 | 73 | 17 | 90 | 0 |
| Fevereiro | 129 | 113 * | 16 | 129 | 0 |
| Março | 85 | 72 | 13 | 85 | 0 |
| Abril | 88 | 76 | 7 | 83 | 5 |
| Maio | 125 | 112 | 13 | 125 | 0 |
| Junho | 108 | 99 | 3 | 102 | 6 |
| **Total** | **625** | **545** | **69** | **614** | **11** |

\* Fevereiro não foi informado; obtido por diferença (129 − 16).

### Tipos por mês (integrado no `slide-14.html`)

| Mês | Reclamação | Solicitação | Denúncia | Sugestão | Elogio | Simplifique | Soma |
|---|---:|---:|---:|---:|---:|---:|---:|
| Janeiro | 19 | 23 | 47 | 0 | 0 | 1 | 90 |
| Fevereiro | 14 | 33 | **81** | 1 | 0 | 0 | 129 |
| Março | 11 | 4 | 66 | 2 | 2 | 0 | 85 |
| Abril | 21 | 11 | 49 | 2 | 0 | 0 | 83 |
| Maio | 31 | 26 | 68 | 0 | 0 | 0 | 125 |
| Junho | 29 | 24 | 47 | 2 | 0 | 0 | 102 |
| **Total** | **125** | **121** | **358** | **7** | **2** | **1** | **614** |

### Reconciliação — fecha por completo

Sem as encaminhadas, os três cortes passam a ser coerentes entre si:

- **625** manifestações recebidas no semestre (soma dos totais mensais).
- **614** com desfecho informado = 545 respondidas + 69 arquivadas — exatamente
  o mesmo 614 da soma dos tipos e do total em `slide-04` / `slide-08`.
- **11** sem desfecho informado, e são exatamente os 5 de abril + 6 de junho,
  os dois únicos meses cujas parcelas não fecham com o total do mês.
- Nesses mesmos dois meses a soma dos tipos também dá 83 e 102 — ou seja, o
  tipo só foi classificado para as manifestações com desfecho.

### Correções feitas

1. **Fevereiro — denúncias = 81, não 11.** O usuário informou 11, mas o valor já
   registrado (vindo do trimestral) era 81. Com 81 fevereiro fecha em 129
   (= seu total) e o semestre em 614. Com 11 daria 59 e 544. Mantido **81**.
2. **`slide-14` — percentual corrigido.** "Representa 63,8%" era do trimestre
   (194/304). Agora **58,3%** (358/614).
3. **Paleta dos meses.** Março/Abril/Junho usavam tons quase idênticos
   (#103050 / #0d3358 / #16466E). Adotada rampa azul sequencial de 6 passos nos
   dois slides e na legenda:
   `#0A2236 · #103050 · #16466E · #0070C0 · #0090C0 · #5fb8dd`

### ⚠️ A confirmar com a área

1. **`slide-04` informa 544 respondidas; a série mensal dá 545.** Com 545 o
   fechamento fica exato (545 + 69 = 614) e desaparece a divergência de 1
   unidade registrada na seção 4. **Provável que o correto seja 545.**
2. **Recebidas: 625 × 614.** O `slide-17d` exibe 625 (soma real das barras);
   `slide-04`, `slide-05` e `slide-08` usam 614. São recortes diferentes
   (recebidas × com desfecho/classificadas), mas convém deixar isso explícito
   no texto dos slides para o leitor não ver contradição.
3. **Abril e junho:** faltam 5 e 6 manifestações sem desfecho informado.
4. **Encaminhadas a outros órgãos:** `slide-04` informa 25 no semestre, mas não
   há abertura mensal (removida a pedido).

### Ainda pendente

`slide-17b.html` (Omnichannel) segue com a série mensal marcada como
DADO PROVISÓRIO — mede *atendimentos do Omnichannel*, métrica distinta das
manifestações do Fala.BR, e seus valores mensais (152/123/130) não foram atualizados.
