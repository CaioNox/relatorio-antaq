# Inventário — 1º Relatório Semestral 2026 (derivado de `/sistema/`)

Etapa 0 da especificação. Todo item abaixo foi confirmado por leitura direta do
código (não assumido). Fonte de verdade usada: `sistema/deck.js` — **não**
`sistema/RESUMO-SLIDES.md`, que está desatualizado (ver §5 abaixo).

Status geral: **os 50 arquivos-origem listados na especificação existem em
`sistema/`** (verificação 1-a-1, 50/50 encontrados). Nenhum bloqueio de
arquivo faltante.

## DECISÕES REGISTRADAS (respondidas em 2026-08-27)

| Pendência | Decisão |
|---|---|
| §3.1 QR Code WhatsApp/Omnichannel | Reaproveitar `QRCODE_IARA.jpeg` para os dois cards (WhatsApp e IARA) em `slide-demais-canais.html`, replicando o padrão já usado em `sistema/`. |
| §3.2 `slide-22.html` (Transparência Ativa) | ~~Incluir no deck~~ **REVERTIDO em 2026-08-27**: uma descrição livre subsequente do usuário, com a regra explícita "o que não foi citado, não usar", não menciona `slide-22.html` em nenhum momento — "transparência ativa" fica só como item de texto dentro de `slide-4a.html`. Removido do `deck.js` e do disco. **Deck volta a 51 slides.** |
| §6 Verde WhatsApp (`#25D366`/`#128C7E`) | **Converter para azul institucional** — aplicação estrita da regra "proibido verde" do §18, mesmo em cor de marca de terceiro. |
| §6 Indicador crescimento/queda (`slide-17d.html`) | Substituir verde/vermelho por **ícone ▲/▼ + peso da escala azul** (`.indicador--alta`/`.indicador--baixa`, já criadas em `semestral/base.css`). |

**Limpeza pós-reversão do slide-22.html:** removido de `deck.js` (files +
anexos), arquivo apagado do disco. Corrigido um link cruzado quebrado de
verdade em `slide-qa-geral.html` (botão "ver mais" que apontava para
`slide-22.html` — repontado para `slide-4a.html`, e a resposta marcada
`.todo-dado` porque cita o mesmo número trimestral do Painel LAI que estava
no slide removido). **Pendente:** `slide-01.html` ainda tem um nó
`{ t: 'Transparência Ativa', f: 'slide-22.html' }` na árvore do sumário —
como a árvore inteira ainda não foi reescrita (§15, não iniciado), esse nó
será removido junto quando eu fizer essa reescrita; não é um link quebrado
funcional hoje porque o slide-01.html copiado ainda não está em uso real no
deck (a reescrita da árvore é pré-requisito antes de publicar o sumário).

**Verificação de compatibilidade (2026-08-27):** o usuário mandou uma descrição
livre, informal, de toda a ordem do deck (capa → ficha técnica → sumário →
mensagem → 6 capítulos → encerramento), com a regra "o que não citei, não
usar". Comparei slide a slide contra este inventário: **100% de
compatibilidade, exceto `slide-22.html`** (já corrigido acima). Ficha técnica
(nomes/ordem/seções), texto da mensagem da ouvidora, dados de `slide-04`
(614/69/544/12,5) e `slide-23` (262/100%/10,3), QR Codes, reestruturação de
`slide-4a`, e a ordem completa dos 51 slides batem exatamente.

Infraestrutura já montada nesta sessão: `semestral/deck.js` (52 slides, 8
blocos incl. "Encerramento" separado), `semestral/Imagens/` (7 assets
copiados de `sistema/Imagens/`), `semestral/base.css` (tokens de cor + 
`.txt-bloco` + `.todo-dado` + `.indicador`). `a11y.css`/`a11y.js` já
existiam em `semestral/` de trabalho anterior — confirmados compatíveis.

---

## 1. Tabela de derivação (51 slides do deck do semestral)

| # | Destino (`semestral/`) | Origem (`sistema/`) | Ação | O que muda | Origem confirmada? |
|---|---|---|---|---|---|
| **ABERTURA** |
| 1 | `slide-00.html` | `slide-00.html` | copiar + editar título | "1º Relatório Semestral de 2026" / "1º de janeiro a 30 de julho de 2026" | ✅ |
| 2 | `slide-34.html` | `slide-34.html` | copiar + reestruturar ficha técnica | conteúdo integral novo (§12 do prompt) | ✅ |
| 3 | `slide-01.html` | `slide-01.html` | copiar + reescrever árvore `tree` | árvore própria (2ª fonte de verdade, sincronizar à mão com `deck.js` — ver §4) | ✅ |
| 4 | `slide-msg-ouvidora.html` | `slide-msg-ouvidora.html` | copiar + texto novo | texto exato do prompt §14, bloco justificado | ✅ |
| **CAPÍTULO 01 · Visão Geral das Ouvidorias Públicas** |
| 5 | `capa-bloco-1.html` | idem | copiar | identidade semestral | ✅ |
| 6 | `slide-ctx-01.html` | idem | copiar | identidade semestral | ✅ |
| 7 | `slide-atribuicoes-01.html` | idem | copiar + padronizar (§5) | grid/fonte/cor padronizados entre os 4 | ✅ |
| 8 | `slide-principios-01.html` | idem | copiar + padronizar (§5) | idem | ✅ |
| 9 | `slide-diretrizes-01.html` | idem | copiar + padronizar (§5) | idem | ✅ |
| 10 | `slide-diretrizes-02.html` | idem | copiar + padronizar (§5) | idem | ✅ |
| **CAPÍTULO 02 · A Ouvidoria da ANTAQ** |
| 11 | `capa-bloco-2.html` | idem | copiar | identidade semestral | ✅ |
| 12 | `slide-03c.html` | idem | copiar | identidade semestral | ✅ |
| 13 | `slide-ouvidoria-geral.html` | idem | copiar | identidade semestral (contém organograma com cores categóricas — ver §6) | ✅ |
| 14 | `slide-falabr.html` | **NOVO** | criar (§6.1) | slide expositivo sobre a Plataforma Fala.BR | n/a |
| 15 | `slide-canais-atend.html` | `slide-canais-atend.html` | copiar + editar bloco (§6.2) | "Manifestações e Pedido de Informação" → "Tipos de Manifestações da Ouvidoria"; **contém QR do WhatsApp — ver §3 (pendência)** | ✅ |
| 16 | `slide-demais-canais.html` | **NOVO**, base `slide-canais-atend.html` | criar (§6.3) | 7 cards de canais; **2 QR Codes — ver §3 (pendência)** | n/a |
| 17 | `slide-25.html` | idem | copiar | identidade semestral | ✅ |
| 18 | `slide-cartas-servicos.html` | idem | copiar + remover `apresentacao:false` | passa a aparecer também na apresentação, não só no PDF | ✅ |
| 19 | `slide-17b.html` | idem | copiar | ⚠️ TODO-DADO (Omnichannel) | ✅ |
| 20 | `slide-17e.html` | idem | copiar | ⚠️ TODO-DADO (pizza) | ✅ |
| 21 | `slide-07.html` | idem | copiar | "comparativo entre trimestres" → "entre semestres"; ⚠️ TODO-DADO | ✅ |
| **CAPÍTULO 03 · Seção de Apoio ao Cidadão — SAC** |
| 22 | `capa-bloco-3.html` | idem | copiar | identidade semestral | ✅ |
| 23 | `slide-sac-apres.html` | idem | copiar | identidade semestral | ✅ |
| 24 | `slide-sac-ativ.html` | idem | **refatorar por completo (§7)** | novo layout — 2 propostas antes de implementar | ✅ |
| 25 | `slide-14.html` | idem | copiar | ⚠️ TODO-DADO | ✅ |
| 26 | `slide-canal.html` | idem | copiar | ⚠️ TODO-DADO | ✅ |
| 27 | `slide-17d.html` | idem | copiar | 3 meses → 7 meses (Jan–Jul); ⚠️ TODO-DADO; **usa verde/vermelho semântico — ver §6 (pendência)** | ✅ |
| 28 | `slide-04.html` | idem | copiar + dados novos (§8) | 614 / 69 / 544 / 12,5 dias — **divergência 69+544≠614, ver §3** | ✅ |
| 29 | `slide-05.html` | idem | copiar | ⚠️ TODO-DADO | ✅ |
| 30 | `slide-08.html` | idem | copiar | "Destaques do Trimestre"→"do Semestre"; ⚠️ TODO-DADO; **gráfico usa paleta categórica verde/roxo/azul-céu — ver §6** | ✅ |
| **CAPÍTULO 04 · Seção de Transparência e Acesso à Informação — STAI** |
| 31 | `capa-bloco-4.html` | idem | copiar | identidade semestral | ✅ |
| 32 | `slide-4a.html` | idem | reestruturar (§9) | subtítulo + lista de atividades (item 3 com 2 subitens aninhados) | ✅ |
| 33 | `slide-qa-geral.html` | idem | copiar + aprofundar respostas (§10) | 2-4 frases por resposta; revisar `data-file` órfãos | ✅ |
| 34 | `slide-23.html` | idem | copiar + dados novos (§11) | 262 pedidos / 100% no prazo / 10,3 dias | ✅ |
| 35 | `slide-pda.html` | idem | copiar | identidade semestral | ✅ |
| 36 | `slide-qa-dados-abertos.html` | idem | copiar | identidade semestral | ✅ |
| 37 | `slide-resp-unidade.html` | idem | copiar | ⚠️ TODO-DADO; **paleta categórica verde/roxo/azul-céu — ver §6** | ✅ |
| 38 | `slide-tramit-uorg.html` | idem | copiar | ⚠️ TODO-DADO; **paleta categórica verde/roxo/azul-céu — ver §6** | ✅ |
| 39 | `slide-20.html` | idem | copiar | ⚠️ TODO-DADO | ✅ |
| 40 | `slide-18.html` | idem | copiar | ⚠️ TODO-DADO | ✅ |
| 41 | `slide-21.html` | idem | copiar | ⚠️ cards de "Bases previstas PDA" usam verde — ver §6 | ✅ |
| **CAPÍTULO 05 · Considerações Finais** |
| 42 | `capa-bloco-5.html` | idem | copiar | identidade semestral | ✅ |
| 43 | `slide-09.html` | idem | copiar | linguagem adaptada ao semestre | ✅ |
| 44 | `slide-conclusao.html` | idem | copiar | linguagem adaptada; **usa verde `.ok` — ver §6** | ✅ |
| **CAPÍTULO 06 · Apêndice** |
| 45 | `capa-bloco-6.html` | idem | copiar | identidade semestral | ✅ |
| 46 | `slide-31.html` | idem | copiar | identidade semestral | ✅ |
| 47 | `slide-29.html` | idem | copiar | identidade semestral | ✅ |
| 48 | `slide-29b.html` | idem | copiar | identidade semestral | ✅ |
| 49 | `slide-30.html` | idem | copiar | identidade semestral | ✅ |
| 50 | `slide-32.html` | idem | copiar | identidade semestral | ✅ |
| **ENCERRAMENTO** |
| 51 | `slide-35.html` | idem | copiar | QR IARA/WhatsApp reaproveitado — ver decisão; **verde WhatsApp → converter para azul (decisão registrada)** | ✅ |

**Total: 51/51 destinos mapeados, 50/50 origens confirmadas em disco** (os 2
slides `NOVO` — #14 e #16 — não têm origem própria; #16 deriva visualmente de
`slide-canais-atend.html`, já confirmado). `slide-22.html` foi removido do
deck (decisão revertida — ver seção de decisões acima).

---

## 2. Infraestrutura a replicar em `/semestral/`

| Item | Estado atual em `semestral/` | Ação |
|---|---|---|
| `deck.js` | Esqueleto: só bloco "Abertura" com 5 placeholders | Reescrever com os 7 blocos (Abertura + Cap. 01-06), `meta` atualizado (título, rodapé, `Relatorio-Semestral-2026-1S.pptx`) |
| `index.html` | Funcional, já lê `RELATORIO.paraApresentacao()` | Sem mudança estrutural — só passa a carregar mais arquivos |
| `relatorio.html` | Funcional, já lê `RELATORIO.paraRelatorio()` | Revisar mapa `anexos` (remover entradas de slides não migrados, incluir os novos) |
| `a11y.css` / `a11y.js` | Já existem, idênticos em função aos de `sistema/` | Manter; replicar `<link>`/`<script defer>` em cada um dos 51 slides (padrão: link no fim do `<head>`, script no fim do `<body>`) |
| `Imagens/` | **Não existe ainda** | Criar `semestral/Imagens/` com os assets usados (logos + `QRCODE_IARA.jpeg`) |
| `base.css` | Não existe | Criar (§4 do prompt — `.txt-bloco` etc.) |
| `RESUMO-SLIDES.md` | Não existe em `semestral/` | Criar do zero, baseado em `deck.js` — **não copiar o de `sistema/`, que está desatualizado (§5)** |
| `slide-01..05.html` (placeholders atuais) | 5 arquivos genéricos | Serão sobrescritos pelos 51 slides reais |

## 3. Achados críticos — preciso da sua decisão antes de prosseguir

### 3.1 — QR Codes: não existe QR de WhatsApp/Omnichannel separado do da IARA
Busca em todo o repositório encontrou **um único arquivo de QR Code**:
`Imagens/QRCODE_IARA.jpeg` (com cópias idênticas em `sistema/Imagens/` e
`enquetes-2026/Imagens/`). Em `sistema/`, esse **mesmo arquivo** é usado com
dois rótulos diferentes:
- `slide-canais-atend.html` (card WhatsApp): `alt="QR Code do WhatsApp da Ouvidoria da ANTAQ"`
- `slide-35.html` (badge flutuante): `alt="QR Code do WhatsApp da Ouvidoria da ANTAQ (IARA)"`

Ou seja, no padrão já em produção, "QR do WhatsApp" e "QR da IARA" **são a
mesma imagem física** (faz sentido: a IARA atende pelo próprio WhatsApp).

**Isso afeta diretamente o slide #16 (`slide-demais-canais.html`)**, que pede
os itens 3 (WhatsApp/Omnichannel) e 7 (IARA) como cards distintos, cada um
"com o QR Code já existente".

> ✅ **Decidido:** reaproveitar `QRCODE_IARA.jpeg` para os dois cards (item 3
> e item 7), replicando o padrão já usado em `sistema/`.

### 3.2 — `slide-22.html` (Transparência Ativa): incluir ou não?
Confirmo a pergunta que você mesmo levantou no prompt: `slide-22.html`
existe em `sistema/` (11.797 B) e está fora da lista de 51, mas o novo
`slide-4a.html` (§9) passa a listar "Transparência ativa (site da ANTAQ)"
como uma das 3 atividades da STAI — sem um slide próprio de dados/detalhe
para isso no semestral, se `slide-22` ficar de fora.

> ✅ **Decidido (revertido em 2026-08-27):** NÃO incluir `slide-22.html`. Uma
> descrição livre subsequente do usuário — com a regra explícita "o que não
> foi citado, não usar" — percorre a ordem inteira do deck sem mencionar esse
> slide em nenhum momento; "transparência ativa" fica só como um item de
> texto dentro de `slide-4a.html`. Arquivo removido de `semestral/` e do
> `deck.js`. Deck permanece com 51 slides.

### 3.3 — Divergência de dados em `slide-04.html` (§8 do prompt)
Confirmando o que você já sinalizou: 69 (arquivadas) + 544 (respondidas) =
613, não 614 (total informado). Vou marcar isso em comentário HTML no código
(`<!-- ATENÇÃO: 69+544=613, divergente do total informado (614). Confirmar com a fonte antes de publicar. -->`)
e **não vou calcular nenhum percentual derivado** (ex. "% respondidas") até
você confirmar qual dos três números está correto.

### 3.4 — `sistema/RESUMO-SLIDES.md` está desatualizado — não vou usá-lo como referência
O arquivo se autodeclara defasado ("a tabela abaixo ainda reflete a
numeração anterior") e lista ~19 arquivos que não existem mais em disco
(movidos para uma pasta "sobras-relatorio" fora do projeto, conforme
comentário em `sistema/deck.js`). Ele também descreve `index.html` como
consumindo uma `const deck` local — não é mais verdade, hoje é
`RELATORIO.paraApresentacao()` de `deck.js`. **Estou usando exclusivamente
`sistema/deck.js` como fonte de verdade** para esta derivação, não o
`RESUMO-SLIDES.md`. Nenhuma ação sua necessária aqui — só transparência sobre
a fonte usada.

### 3.5 — 14 arquivos "órfãos" em `sistema/` (fora do `deck.js` ativo)
`capa-08.html`, `slide-02.html`, `slide-03.html`, `slide-03b.html`,
`slide-06.html`, `slide-13.html`, `slide-15.html`, `slide-19.html`,
`slide-26.html`, `slide-27.html`, `slide-28.html`, `slide-ctx-02.html`,
`slide-ctx-06.html`, `slide-principios.html` existem fisicamente em
`sistema/` mas não são referenciados em nenhum lugar do `deck.js` ativo
(nem apresentação, nem PDF, nem sumário). Nenhum deles está na sua lista de
51 — confirmo que não há erro de omissão, são resíduos de reorganizações
anteriores. Não requer decisão, só registro.

---

## 4. Confirmações estruturais (deck.js / index.html / relatorio.html / sumário)

- `deck.js` define `window.RELATORIO = { meta, blocos, anexos, capturaPptx }`.
  Cada item de `bloco.files` pode ser uma string (aparece em apresentação E
  PDF) ou `{file, apresentacao:false}` / `{file, relatorio:false}` (só um dos
  dois) — mecanismo já usado para `slide-cartas-servicos.html` no trimestral.
- `index.html` consome `RELATORIO.paraApresentacao()`; `relatorio.html`
  consome `RELATORIO.paraRelatorio()` + o mapa `anexos` (conteúdo que só
  aparece por clique/hover no slide vira páginas de texto no PDF).
- **Confirmado: a árvore `tree` de `slide-01.html` é uma segunda fonte de
  verdade, totalmente independente de `deck.js`** — não há import nem fetch
  cruzado. O próprio código-fonte já alerta sobre isso ("manter em
  sincronia... manualmente"). Vou manter as duas coerentes à mão e, conforme
  pedido no §15 do prompt, vou gerar um teste que compara as duas listas.
- `a11y.css`/`a11y.js` são carregados em **todos** os 70 slides individuais
  de `sistema/` (não só no shell), sempre no mesmo padrão: `<link>` como
  última tag do `<head>`, `<script defer>` como última tag antes de
  `</body>`. Vou replicar esse padrão exato nos 51 slides do semestral.

---

## 5. Design system real confirmado (paleta institucional)

Núcleo dominante (confirmado por grep em todos os 72 HTML de `sistema/`):

| Hex | Papel confirmado | Onde |
|---|---|---|
| `#103050` | **brand-primary** | `.text-brand-primary`, `.top-accent` (barra 8px), rodapé de anexo no PDF, `.skip-link` |
| `#0070C0` | **brand-secondary** | `.text-brand-secondary`, `.top-accent-secondary` (barra 4px) |
| `#0090C0` | **accent/cyan técnico** | cor de interação mais usada do sistema — ícones ativos, hover, sumário, `:focus-visible` |
| `#F2A900` | **dourado, acento pontual** | `.kicker` das capas de bloco, `.btn-pptx`, gradiente do topo das capas |
| Gradiente de capa (`slide-00.html`) | `linear-gradient(150deg, #071A2E 0%, #0C2D50 45%, #103C6B 100%)` | único, específico da capa |
| Gradiente das 6 capas de bloco | `linear-gradient(135deg, #050e18 0%, #0a2236 40%, #0d3358 100%)` | idêntico entre as 6 |

Tipografia: **Montserrat** (títulos/kickers/números) + **Open Sans** (corpo).
Base `html{font-size}` **não é um token único** — varia por arquivo: `26px`
domina (~30 dos 50 arquivos), mas `slide-01.html` usa `18px`, `slide-29/29b`
usam `20px`, `slide-30/31` usam `21px`, `slide-32` usa `20px`. Vou replicar o
valor de cada arquivo-origem exatamente como está, salvo instrução em
contrário.

Componentes confirmados (existem de verdade, com CSS citado no relatório
completo dos agentes): `.top-accent` / `.top-accent-secondary`, `.av1`/`.av2`
(capas de bloco), kicker "CAPÍTULO NN" (dois padrões distintos: `.kicker`
nas capas, `<p>` utilitário nos slides de conteúdo — não há classe única),
`.doc-lead` / `.doc-text` / `.act-list` (5 slides "documento"), `.kpi-card`
(7 arquivos), `.chart-card` (14 arquivos), `.tile` (6 slides de apêndice),
`.qa-bar` (2 slides de Q&A). **Não existe um arquivo CSS central** — cada
slide redefine seu próprio `<style>` inline; replicar o semestral significa
copiar o padrão slide a slide, não importar uma folha de estilos única.

## 6. Cores fora da paleta marítima — uso sistemático em gráficos/dados (pendência §18)

O `grep` de hex em todo `sistema/` encontrou paletas categóricas fora do
azul/dourado/cinza, usadas de forma **sistemática** (não acidental) em
gráficos e pares semânticos positivo/negativo, em slides que **fazem parte
dos 51 migrados**:

| Slide (destino) | Cores fora da paleta | Uso |
|---|---|---|
| #15 `slide-canais-atend.html` | `#25D366`/`#128C7E` (verde WhatsApp) | gradiente do card WhatsApp |
| #27 `slide-17d.html` | `#16a34a` (verde) / `#dc2626` (vermelho) | indicador crescimento/queda |
| #30 `slide-08.html` | `#10B981`, `#22C55E` (verdes), `#6366F1` (roxo), `#0EA5E9` (azul-céu) | cor categórica por unidade/tema no gráfico |
| #37 `slide-resp-unidade.html` | idem acima | paleta categórica do organograma interativo |
| #38 `slide-tramit-uorg.html` | idem acima | paleta categórica do fluxo por unidade |
| #41 `slide-21.html` | `#16a34a`, `#15803d` (verdes) | cards de "Bases previstas PDA 2026-2028" |
| #44 `slide-conclusao.html` | `#16a34a` (verde) | `.metric-value .ok` |
| #51 `slide-35.html` | `#25D366`/`#128C7E` (verde WhatsApp) | badge flutuante do QR |

(`slide-11.html`/`slide-12.html`, que também usam verde/vermelho para
Riscos×Oportunidades, **não estão na lista de migração** — não requerem
ação.)

> ✅ **Decidido:**
> - `slide-17d.html` (crescimento↑/queda↓): substituir por **ícone
>   direcional (▲/▼) + peso da escala azul** — azul mais escuro (`--brand-primary`)
>   + ▲ = crescimento, azul mais claro (`--azul-300`) + ▼ = queda. Classes
>   `.indicador--alta`/`.indicador--baixa` já criadas em `semestral/base.css`.
> - Verde de marca do WhatsApp (`slide-canais-atend.html`, `slide-35.html`):
>   **converter para azul institucional**, aplicação estrita do §18 mesmo
>   para cor de marca de terceiro. Vou usar um gradiente dentro da escala
>   azul (ex. `linear-gradient(145deg, var(--brand-primary), var(--accent))`)
>   no lugar de `linear-gradient(145deg,#128C7E,#25D366)`.
