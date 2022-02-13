export function getCellList() {
  return document.querySelectorAll(".playboard__play-area section  span");
}

export function getCurrentTurn() {
  return document.querySelector(".cross");
}

export function getSelectBox() {
  return document.querySelector(".select-box");
}

export function getSelectBoxPlayerX() {
  return document.querySelector(".options--player-x");
}

export function getSelectBoxPlayerO() {
  return document.querySelector(".options--player-o");
}

export function getPlayBoard() {
  return document.querySelector(".playboard");
}

export function getResultBox() {
  return document.querySelector(".result-box");
}

export function getTextWinner() {
  return document.querySelector(".result-box__text-winner");
}

export function getButtonReplay() {
  return document.querySelector(".result-box__btn-replay button");
}
