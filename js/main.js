import { PLAYER_X_CROSS, PLAYER_O_CIRCLE } from "./constants.js";
import {
  getSelectBox,
  getSelectBoxPlayerX,
  getPlayBoard,
  getSelectBoxPlayerO,
  getCellList,
  getCurrentTurn,
  getResultBox,
  getTextWinner,
  getButtonReplay,
} from "./selectors.js";

let playerSign;

//--Choose player--
function selectPlayer() {
  const selectBox = getSelectBox();
  if (!selectBox) return;

  const btnPlayerX = getSelectBoxPlayerX();
  if (!btnPlayerX) return;

  const btnPlayerO = getSelectBoxPlayerO();
  if (!btnPlayerO) return;

  const playBoard = getPlayBoard();
  if (!playBoard) return;

  const currentTurn = getCurrentTurn();
  if (!currentTurn) return;

  btnPlayerX.addEventListener("click", () => {
    selectBox.classList.add("hide");
    playBoard.classList.add("show");
  });

  btnPlayerO.addEventListener("click", () => {
    selectBox.classList.add("hide");
    playBoard.classList.add("show");
    currentTurn.textContent = "O";
  });
}

function handleCellElements(cellElement) {
  const currentTurn = getCurrentTurn();
  if (!currentTurn) return;

  cellElement.style.pointerEvents = "none";
  if (currentTurn.textContent === "X") {
    playerSign = "x";
    cellElement.innerHTML = `<i class="${PLAYER_X_CROSS}"></i>`;
    currentTurn.textContent = "O";
    cellElement.dataset.id = playerSign;
    selectPlayerWinner();
  } else {
    playerSign = "o";
    cellElement.innerHTML = `<i class="${PLAYER_O_CIRCLE}"></i>`;
    currentTurn.textContent = "X";
    cellElement.dataset.id = playerSign;
    selectPlayerWinner();
  }
}

function clickCellElement() {
  const cellList = getCellList();
  if (cellList.length === 0 || !cellList) return;

  for (const cellElement of cellList) {
    cellElement.addEventListener("click", () => {
      handleCellElements(cellElement);
    });
  }
}

function getIdBox(idBox) {
  return document.querySelector(".box" + idBox).dataset.id;
}

function isWinner(element1, element2, element3, sign) {
  if (
    getIdBox(element1) == sign &&
    getIdBox(element2) == sign &&
    getIdBox(element3) == sign
  )
    return true;
}

function selectPlayerWinner() {
  const resultBox = getResultBox();
  if (!resultBox) return;

  const playBoard = getPlayBoard();
  if (!playBoard) return;

  const textWinner = getTextWinner();
  if (!textWinner) return;

  if (
    isWinner(1, 2, 3, playerSign) ||
    isWinner(1, 5, 9, playerSign) ||
    isWinner(1, 4, 7, playerSign) ||
    isWinner(2, 5, 8, playerSign) ||
    isWinner(3, 6, 9, playerSign) ||
    isWinner(3, 5, 7, playerSign) ||
    isWinner(4, 5, 6, playerSign) ||
    isWinner(7, 8, 9, playerSign)
  ) {
    setTimeout(() => {
      playBoard.classList.remove("show");
      resultBox.classList.add("show");
      textWinner.textContent = `Player ${playerSign.toUpperCase()} is winner!`;
      replayGame();
    }, 700);
  }
}

function replayGame() {
  const btnReplay = getButtonReplay();
  if (!btnReplay) return;

  btnReplay.addEventListener("click", () => {
    window.location.reload();
  });
}

(() => {
  selectPlayer();
  clickCellElement();
})();
