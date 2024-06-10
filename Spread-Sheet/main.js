const spreadSheetContainer = document.querySelector("#spreadsheet-container");

const Rows = 10;
const Columns = 10;

const spreadSheet = [];
const exportBtn = document.querySelector("#export-btn");

exportBtn.onclick = function (e) {
  console.log(spreadSheet);
  let csv = "";
  for (let i = 0; i < spreadSheet.length; i++) {
    if (i === 0) continue;
    csv +=
      spreadSheet[i]
        .filter((item) => !item.isHeader)
        .map((item) => item.data)
        .join(",") + "\r\n";
  }
  const csvObj = new Blob([csv]);
  const csvUrl = URL.createObjectURL(csvObj);

  const a = document.createElement("a");
  a.href = csvUrl;
  a.download = "SpreadSheet File.csv";
  a.click();
};

class Cell {
  constructor(
    isHeader,
    disabled,
    data,
    row,
    column,
    rowName,
    columnName,
    active = false
  ) {
    this.isHeader = isHeader;
    this.disabled = disabled;
    this.data = data;
    this.row = row;
    this.column = column;
    this.rowName = rowName;
    this.columnName = columnName;
    this.active = active;
  }
}

let alphabet = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L"];

initSpreadSheet();
function initSpreadSheet() {
  for (let i = 0; i < Rows; i++) {
    let spreadSheetRow = [];
    for (let j = 0; j < Columns; j++) {
      let cellData = "";
      let isHeader = false;
      let disabled = false;

      if (j === 0) {
        cellData = i;
        isHeader = true;
        disabled = true;
      }
      if (i === 0) {
        cellData = alphabet[j - 1];
        isHeader = true;
        disabled = true;
      }
      if (!cellData) {
        cellData = "";
      }

      const rowName = i;
      const columnName = alphabet[j - 1];
      const cell = new Cell(
        isHeader,
        disabled,
        cellData,
        i,
        j,
        rowName,
        columnName,
        false
      );

      spreadSheetRow.push(cell);
    }
    spreadSheet.push(spreadSheetRow);
  }
  drawSheet();
}
function createCellEl(cell) {
  const cellEl = document.createElement("input");
  cellEl.className = "cell";
  cellEl.id = `cell_${cell.row}${cell.column}`;
  cellEl.value = cell.data;
  cellEl.disabled = cell.disabled;
  if (cell.isHeader) {
    cellEl.classList.add("header");
  }
  cellEl.onclick = () => {
    handleCellClick(cell);
  };
  cellEl.onchange = (e) => {
    handleOnChange(e.target.value, cell);
  };
  return cellEl;
}

function handleOnChange(data, cell) {
  cell.data = data;
}

function handleCellClick(cell) {
  clearHeaderActive();
  const columnHeader = spreadSheet[0][cell.column];
  const rowHeader = spreadSheet[cell.row][0];

  const columnHeaderEl = getElFromRowColumn(
    columnHeader.row,
    columnHeader.column
  );
  const rowHeaderEl = getElFromRowColumn(rowHeader.row, rowHeader.column);
  columnHeaderEl.classList.add("active");
  rowHeaderEl.classList.add("active");
}

function getElFromRowColumn(row, column) {
  return document.querySelector(`#cell_${row}${column}`);
}
function clearHeaderActive() {
  const headers = document.querySelectorAll(".header");

  headers.forEach((header) => {
    header.classList.remove("active");
  });
}
function drawSheet() {
  for (let i = 0; i < spreadSheet.length; i++) {
    const rowContainerEl = document.createElement("div");
    rowContainerEl.className = "cell-row";

    for (let j = 0; j < spreadSheet[i].length; j++) {
      rowContainerEl.append(createCellEl(spreadSheet[i][j]));
    }
    spreadSheetContainer.append(rowContainerEl);
  }
}
