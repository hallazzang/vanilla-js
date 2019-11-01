(() => {
  const global = this;

  function editable(options) {
    const { table, dataSource, columns } = options;

    let oldTableHead = table.tHead;
    if (!oldTableHead) {
      oldTableHead = table.createTHead();
    }

    let oldTableBody = table.tBodies[0];
    if (!oldTableBody) {
      oldTableBody = table.createTBody();
    }

    const newTableHead = document.createElement('thead');
    const newTableBody = document.createElement('tbody');

    table.replaceChild(newTableHead, oldTableHead);
    table.replaceChild(newTableBody, oldTableBody);
  }

  global.editable = editable;
})();
