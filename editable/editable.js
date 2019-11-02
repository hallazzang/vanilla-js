(() => {
  const global = this;

  function editable(options) {
    const { table, dataSource, columns } = options;

    table.classList.add('editable__table');

    // setup thead
    let oldTableHead = table.tHead;
    if (!oldTableHead) {
      oldTableHead = table.createTHead();
    }

    const newTableHead = document.createElement('thead');
    const tr = document.createElement('tr');
    columns.forEach(column => {
      const th = document.createElement('th');
      th.classList.add('editable__cell_header');
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
        const { key, validator, editable = true } = column;

        const td = document.createElement('td');
        td.classList.add('editable__cell');
        td.textContent = item[key];

        if (editable) {
          let editing = false;
          let originalValue;
          let validatedValue;

          function selectContent() {
            const selection = getSelection();
            const range = document.createRange();
            range.selectNodeContents(td);
            selection.removeAllRanges();
            selection.addRange(range);
          }

          function unselectContent() {
            getSelection().removeAllRanges();
          }

          function startEditing() {
            editing = true;
            originalValue = td.textContent;
            td.classList.add('editable__cell_editing');
            td.contentEditable = true;
            td.focus();
            selectContent();
          }

          function validate() {
            if (!validator) {
              validatedValue = td.textContent;
              return;
            }

            validatedValue = validator(td.textContent);

            if (validatedValue == null) {
              td.classList.add('editable__cell_error');
            } else {
              td.classList.remove('editable__cell_error');
            }
          }

          function endEditing(cancel = false) {
            if (cancel) {
              td.textContent = originalValue;
              td.classList.remove('editable__cell_error');
              unselectContent();
            } else {
              if (validatedValue === null) {
                return;
              }
              item[key] = validatedValue;
            }
            editing = false;
            td.classList.remove('editable__cell_editing');
            td.contentEditable = false;
            td.blur();
          }

          td.ondblclick = () => startEditing();

          td.oninput = () => validate();

          td.onblur = () => {
            if (editing) {
              endEditing(true);
            }
          };

          td.onkeydown = e => {
            if (e.key === 'Enter') {
              if (editing) {
                e.preventDefault();
                endEditing();
              }
            } else if (e.key === 'Escape') {
              if (editing) {
                e.preventDefault();
                endEditing(true);
              }
            }
          };
        }

        tr.appendChild(td);
      });
      newTableBody.appendChild(tr);
    });

    table.replaceChild(newTableBody, oldTableBody);
  }

  global.editable = editable;
})();
