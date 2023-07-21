// Learn more about this file at:
// https://victorzhou.com/blog/build-an-io-game-part-1/#6-client-input-%EF%B8%8F
import { updateInputKeyBoardDown, updateInputKeyBoardUp } from './networking';

function onkeyDown(e) {
  if (e.keyCode === 87 || e.keyCode === 83 || e.keyCode === 68 || e.keyCode === 65 || e.keyCode === 13) {
    updateInputKeyBoardDown(e.keyCode);
  }
}

function onkeyUp(e) {
  if (e.keyCode === 87 || e.keyCode === 83 || e.keyCode === 68 || e.keyCode === 65 || e.keyCode === 13) {
    updateInputKeyBoardUp(e.keyCode);
  }
}

// function onMouseInput(e) {
//   handleInput(e.clientX, e.clientY);
// }

// function onTouchInput(e) {
//   const touch = e.touches[0];
//   handleInput(touch.clientX, touch.clientY);
// }

// function handleInput(x, y) {
//   // const dir = Math.atan2(x - window.innerWidth / 2, window.innerHeight / 2 - y);
//   const dir = Math.atan2(x - window.innerWidth / 2, window.innerHeight / 2 - y);
//   updateDirection(dir);
// }

export function startCapturingInput() {
  // window.addEventListener('mousemove', onMouseInput);
  // window.addEventListener('click', onMouseInput);
  // window.addEventListener('touchstart', onTouchInput);
  // window.addEventListener('touchmove', onTouchInput);
  window.addEventListener('keydown', onkeyDown);
  window.addEventListener('keyup', onkeyUp);
}

export function stopCapturingInput() {
  // window.removeEventListener('mousemove', onMouseInput);
  // window.removeEventListener('click', onMouseInput);
  // window.removeEventListener('touchstart', onTouchInput);
  // window.removeEventListener('touchmove', onTouchInput);
  window.removeEventListener('keydown', onkeyDown);
  window.removeEventListener('keyup', onkeyUp);
}