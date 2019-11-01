(() => {
  const global = this;

  function editable(options) {
    const { table, dataSource, columns } = options;

    // setup thead
    let oldTableHead = table.tHead;
    if (!oldTableHead) {
      oldTableHead = table.createTHead();
    }
    const newTableHead = document.createElement('thead');
    const tr = document.createElement('tr');
    columns.forEach(column => {
      const th = document.createElement('th');
      th.textContent = column.label;
      tr.appendChild(th);
    });
    newTableHead.appendChild(tr);
    table.replaceChild(newTableHead, oldTableHead);

    // setup tbody
    let oldTableBody = table.tBodies[0];
    if (!oldTableBody) {
      oldTableBody = table.createTBody();
    }
    const newTableBody = document.createElement('tbody');
    dataSource.forEach(item => {
      const tr = document.createElement('tr');
      columns.forEach(column => {
        const td = document.createElement('td');
        td.textContent = item[column.key];
        tr.appendChild(td);
      });
      newTableBody.appendChild(tr);
    });
    table.replaceChild(newTableBody, oldTableBody);
  }

  global.editable = editable;
})();
