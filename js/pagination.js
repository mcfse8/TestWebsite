/**
 * pagination.js
 * Navigation entre les pages du tableau de données (Products).
 *
 * Dépend des variables globales :
 * `allRows`, `currentPage`, `rowsPerPage`
 *
 * et des fonctions :
 * `renderDataTable`
 * `getFilteredTableRows`
 *
 * définies dans products.js.
 */

function renderDataTablePage() {

  // Récupère les données après application des filtres
  const filteredRows =
    typeof getFilteredTableRows === "function"
      ? getFilteredTableRows()
      : allRows;

  const totalPages =
    Math.max(1, Math.ceil(filteredRows.length / rowsPerPage));

  // Évite d'être sur une page inexistante après un filtrage
  if (currentPage > totalPages) {
    currentPage = totalPages;
  }

  const start =
    (currentPage - 1) * rowsPerPage;

  const end =
    start + rowsPerPage;

  const rows =
    filteredRows.slice(start, end);

  renderDataTable(rows);

  document.getElementById("page-info").textContent =
    `Page ${currentPage} / ${totalPages}`;
}


function nextPage() {

  const filteredRows =
    typeof getFilteredTableRows === "function"
      ? getFilteredTableRows()
      : allRows;

  const totalPages =
    Math.max(1, Math.ceil(filteredRows.length / rowsPerPage));

  if (currentPage < totalPages) {

    currentPage++;

    renderDataTablePage();
  }
}


function previousPage() {

  if (currentPage > 1) {

    currentPage--;

    renderDataTablePage();
  }
}