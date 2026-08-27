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
