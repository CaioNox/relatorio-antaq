# Relatório Trimestral — Ouvidoria da ANTAQ

Painel/apresentação em HTML do Relatório Trimestral da Ouvidoria da ANTAQ (1º Trimestre de 2026).
Site estático, sem build — basta servir os arquivos.

## Estrutura

```
.
├── index.html              # Página inicial (abre a apresentação)
├── img_porto.jpeg          # Imagem de fundo da home
├── .nojekyll               # Desliga o Jekyll no GitHub Pages
└── sistema/
    ├── index.html          # Visualizador dos slides (navegação)
    ├── slide-01.html … slide-23.html
    └── Imagens/            # Logos (ANTAQ)
```

## Publicar no GitHub Pages

O site usa **somente caminhos relativos**, então funciona tanto em site de usuário
(`usuario.github.io`) quanto em site de projeto (`usuario.github.io/repo/`).

### Opção A — endereço `caionox.github.io` (site de usuário)
1. Crie um repositório com o nome **exato** `CaioNox.github.io`.
2. Envie estes arquivos para a branch `main` (mantendo `index.html` na raiz).
3. Em **Settings → Pages**, selecione a branch `main` e a pasta `/ (root)`.
4. O site fica em `https://caionox.github.io`.

> O campo **"Custom domain"** não serve para endereços `*.github.io` — esse endereço
> vem automaticamente do nome do repositório. Use "Custom domain" apenas para
> domínios próprios (ex.: `meusite.com.br`).

### Opção B — repositório de projeto (qualquer nome)
1. Repositório, por exemplo, `relatorios-ouvidoria`.
2. **Settings → Pages** → branch `main`, pasta `/ (root)`.
3. O site fica em `https://caionox.github.io/relatorios-ouvidoria/`.

## Rodar localmente

```bash
python3 -m http.server 8000
# abra http://localhost:8000
```

## Observações
- Servidor é **case-sensitive** (Linux/Pages): a pasta de logos é `Imagens/` (I maiúsculo).
- Bibliotecas (Tailwind, Chart.js, Font Awesome, Google Fonts) carregam via CDN (HTTPS).
