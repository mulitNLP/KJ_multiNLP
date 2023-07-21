// Learn more about this file at:
// https://victorzhou.com/blog/build-an-io-game-part-1/#6-client-input-%EF%B8%8F
import { updateInputKeyBoardDown, updateInputKeyBoardUp } from './networking';
import { enterKeyBoard } from './index';
import { getCurrentState } from './state';

const Constants = require('../shared/constants');
const canvas = document.getElementById('game-canvas');

const { PLAYER_RADIUS, MAP_SIZE } = Constants;

function onkeyDown(e) {
  if (e.keyCode === 87 || e.keyCode === 83 || e.keyCode === 68 || e.keyCode === 65) {
    updateInputKeyBoardDown(e.keyCode);
  }

  if (e.keyCode === 13) {
    enterKeyBoard();
  }

}

function onkeyUp(e) {
  if (e.keyCode === 87 || e.keyCode === 83 || e.keyCode === 68 || e.keyCode === 65) {
    updateInputKeyBoardUp(e.keyCode);
  }
}

// function onTouchInput(e) {
//   const touch = e.touches[0];
//   handleInput(touch.clientX, touch.clientY);
// }

export function startCapturingInput() {
  // window.addEventListener('mousemove', onMouseInput);
  window.addEventListener('click', onMouseInput);
  // window.addEventListener('touchstart', onTouchInput);
  // window.addEventListener('touchmove', onTouchInput);
  window.addEventListener('keydown', onkeyDown);
  window.addEventListener('keyup', onkeyUp);
}

export function stopCapturingInput() {
  // window.removeEventListener('mousemove', onMouseInput);
  window.removeEventListener('click', onMouseInput);
  // window.removeEventListener('touchstart', onTouchInput);
  // window.removeEventListener('touchmove', onTouchInput);
  window.removeEventListener('keydown', onkeyDown);
  window.removeEventListener('keyup', onkeyUp);
}

/* ------------------------------------------------------------ */

// 여기에 상대 플레이어를 마우스 클릭 하는 기능을 구현하고 싶어
function onMouseInput(e) {
  const rect = canvas.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;

  // Get the current player's state
  const me = getCurrentState().me;

  // Convert the canvas coordinates to game world coordinates
  const gameX = (x / canvas.width) * MAP_SIZE + me.x - MAP_SIZE / 2;
  const gameY = (y / canvas.height) * MAP_SIZE + me.y - MAP_SIZE / 2;

  clickPlayer(gameX, gameY);
}

function clickPlayer(x, y) {

  console.log(x, y);
  // 플레이어의 목록을 가져옵니다. 이는 게임의 상태나 다른 곳에서 가져와야 합니다.
  const players = getCurrentState().others;
  console.log(getCurrentState());
  // console.log(players);
  // console.log(me);
  // 클릭된 위치가 플레이어의 영역 내에 있는지 확인합니다.
  for (const player of players) {
    const distance = Math.hypot(player.x - (x), player.y - (y));
    console.log(player.x);
    console.log(player.y);
    // console.log(distance);
    // 클릭한 위치가 플레이어의 반경 내에 있다면,
    // 이 플레이어를 락온하고 루프를 종료합니다.
    if (distance < PLAYER_RADIUS) {
      // lockedPlayerId = player.id;
      console.log("hi");
      return;
    }
  }

}