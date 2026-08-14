/* Camada de acessibilidade — helpers reutilizados pelo visualizador e pelos
   slides. Não altera nada visualmente por conta própria. */
(function (global) {
  'use strict';

  function getLiveRegion() {
    var el = document.getElementById('a11yLiveRegion');
    if (!el) {
      el = document.createElement('div');
      el.id = 'a11yLiveRegion';
      el.setAttribute('aria-live', 'polite');
      el.setAttribute('aria-atomic', 'true');
      el.className = 'sr-only';
      document.body.appendChild(el);
    }
    return el;
  }

  /* Anuncia uma mensagem para leitores de tela via região aria-live.
     Limpa antes de escrever para garantir que repetições sejam lidas. */
  function announce(message) {
    var el = getLiveRegion();
    el.textContent = '';
    window.setTimeout(function () {
      el.textContent = message;
    }, 50);
  }

  /* Cria (ou atualiza) uma tabela .sr-only logo após `anchorEl` com os dados
     de um gráfico, como alternativa textual equivalente ao canvas.
     columns: array de strings (cabeçalhos)
     rows: array de arrays (uma linha por item, mesma ordem das colunas) */
  function renderChartFallbackTable(anchorEl, caption, columns, rows) {
    if (!anchorEl || !anchorEl.parentNode) return;
    var existing = anchorEl.nextElementSibling;
    if (existing && existing.classList && existing.classList.contains('a11y-chart-table')) {
      existing.remove();
    }
    var table = document.createElement('table');
    table.className = 'sr-only a11y-chart-table';
    if (caption) {
      var cap = document.createElement('caption');
      cap.textContent = caption;
      table.appendChild(cap);
    }
    var thead = document.createElement('thead');
    var headRow = document.createElement('tr');
    columns.forEach(function (colLabel) {
      var th = document.createElement('th');
      th.setAttribute('scope', 'col');
      th.textContent = colLabel;
      headRow.appendChild(th);
    });
    thead.appendChild(headRow);
    table.appendChild(thead);

    var tbody = document.createElement('tbody');
    rows.forEach(function (row) {
      var tr = document.createElement('tr');
      row.forEach(function (cell, i) {
        var cellEl = i === 0 ? document.createElement('th') : document.createElement('td');
        if (i === 0) cellEl.setAttribute('scope', 'row');
        cellEl.textContent = cell;
        tr.appendChild(cellEl);
      });
      tbody.appendChild(tr);
    });
    table.appendChild(tbody);

    anchorEl.parentNode.insertBefore(table, anchorEl.nextSibling);
  }

  global.A11y = {
    announce: announce,
    renderChartFallbackTable: renderChartFallbackTable
  };
})(window);
