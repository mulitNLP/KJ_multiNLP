// Learn more about this file at:
// https://victorzhou.com/blog/build-an-io-game-part-1/#5-client-rendering
import { debounce } from 'throttle-debounce';
import { getAsset } from './assets';
import { getCurrentState } from './state';

const Constants = require('../shared/constants');

const { PLAYER_RADIUS, PLAYER_MAX_HP, BULLET_RADIUS, MAP_SIZE } = Constants;

// Get the canvas graphics context
const canvas = document.getElementById('game-canvas');
const context = canvas.getContext('2d');
setCanvasDimensions();

// 캔버스의 크기를 설정하는 함수
function setCanvasDimensions() {
  // 작은 화면 (예: 핸드폰)에서는 "확대/축소"를 해서 플레이어가 최소한
  // 800개의 게임 유닛 너비를 볼 수 있게 한다.
  // const scaleRatio = Math.max(1, 800 / window.innerWidth);
  // canvas.width = scaleRatio * window.innerWidth;
  // canvas.height = scaleRatio * window.innerHeight;

  canvas.width = 1200;
  canvas.height = 800;

}

// 화면 크기가 변경될 때 캔버스 크기를 업데이트
window.addEventListener('resize', debounce(40, setCanvasDimensions));

let animationFrameRequestId;

// 게임의 현재 상태를 그리는 함수
function render() {
  const { me, others, bullets } = getCurrentState();
  if (me) {

    // 배경 그리기
    renderBackground(me.x, me.y);

    // 경계선 그리기
    context.strokeStyle = 'white';
    context.lineWidth = 5;
    context.strokeRect(canvas.width / 2 - me.x, canvas.height / 2 - me.y, MAP_SIZE, MAP_SIZE);

    // 모든 총알 그리기
    bullets.forEach(renderBullet.bind(null, me));

    // 모든 플레이어 그리기
    renderPlayer(me, me);
    others.forEach(renderPlayer.bind(null, me));
  }

  // 다음 프레임에서 이 render 함수를 다시 실행
  animationFrameRequestId = requestAnimationFrame(render);
}


// 배경을 그리는 역할, 그라데이션
function renderBackground(x, y) {
  // const backgroundX = MAP_SIZE / 2 - x + canvas.width / 2;
  // const backgroundY = MAP_SIZE / 2 - y + canvas.height / 2;

  // // const backgroundX = MAP_SIZE;
  // // const backgroundY = MAP_SIZE;

  // const backgroundGradient = context.createRadialGradient(
  //   backgroundX,
  //   backgroundY,
  //   MAP_SIZE / 10,
  //   backgroundX,
  //   backgroundY,
  //   MAP_SIZE / 2,
  // );
  // backgroundGradient.addColorStop(0, 'gray');
  // backgroundGradient.addColorStop(1, 'black');
  // context.fillStyle = backgroundGradient;
  // context.fillRect(0, 0, canvas.width, canvas.height);

  // Draw black background
  context.fillStyle = 'black';
  context.fillRect(0, 0, canvas.width, canvas.height);

  // Draw grid
  const gridSize = 50; // Define the size of the grid here
  context.strokeStyle = 'white';
  context.lineWidth = 1;

  // Start positions for grid
  const startX = x - (x % gridSize);
  const startY = y - (y % gridSize);

  // Draw vertical lines
  for (let i = startX; i < MAP_SIZE; i += gridSize) {
    const canvasX = canvas.width / 2 + i - x;
    context.beginPath();
    context.moveTo(canvasX, 0);
    context.lineTo(canvasX, canvas.height);
    context.stroke();
  }

  // Draw horizontal lines
  for (let i = startY; i < MAP_SIZE; i += gridSize) {
    const canvasY = canvas.height / 2 + i - y;
    context.beginPath();
    context.moveTo(0, canvasY);
    context.lineTo(canvas.width, canvasY);
    context.stroke();
  }

}

// 주어진 좌표에서 배를 그리는 함수
function renderPlayer(me, player) {
  const { x, y, direction } = player;
  const canvasX = canvas.width / 2 + x - me.x;
  const canvasY = canvas.height / 2 + y - me.y;

  // 배 그리기
  context.save();
  context.translate(canvasX, canvasY);
  context.rotate(direction);
  context.drawImage(
    getAsset('ship.svg'),
    -PLAYER_RADIUS,
    -PLAYER_RADIUS,
    PLAYER_RADIUS * 2,
    PLAYER_RADIUS * 2,
  );
  context.restore();

  // 체력 바 그리기
  context.fillStyle = 'white';
  context.fillRect(
    canvasX - PLAYER_RADIUS,
    canvasY + PLAYER_RADIUS + 8,
    PLAYER_RADIUS * 2,
    2,
  );
  context.fillStyle = 'red';
  context.fillRect(
    canvasX - PLAYER_RADIUS + PLAYER_RADIUS * 2 * player.hp / PLAYER_MAX_HP,
    canvasY + PLAYER_RADIUS + 8,
    PLAYER_RADIUS * 2 * (1 - player.hp / PLAYER_MAX_HP),
    2,
  );
}

// 총알을 그리는 함수
function renderBullet(me, bullet) {
  const { x, y } = bullet;
  context.drawImage(
    getAsset('bullet.svg'),
    canvas.width / 2 + x - me.x - BULLET_RADIUS,
    canvas.height / 2 + y - me.y - BULLET_RADIUS,
    BULLET_RADIUS * 2,
    BULLET_RADIUS * 2,
  );
}

// 메인 메뉴를 그리는 함수
function renderMainMenu() {
  const t = Date.now() / 7500;
  const x = MAP_SIZE / 2 + 800 * Math.cos(t);
  const y = MAP_SIZE / 2 + 800 * Math.sin(t);
  renderBackground(x, y);

  // 다음 프레임에서 이 render 함수를 다시 실행
  animationFrameRequestId = requestAnimationFrame(renderMainMenu);
}

// 초기 애니메이션 프레임 요청
animationFrameRequestId = requestAnimationFrame(renderMainMenu);

// 메인 메뉴 렌더링을 게임 렌더링으로 교체하는 함수
export function startRendering() {
  cancelAnimationFrame(animationFrameRequestId);
  animationFrameRequestId = requestAnimationFrame(render);
}

// 게임 렌더링을 메인 메뉴 렌더링으로 교체하는 함수
export function stopRendering() {
  cancelAnimationFrame(animationFrameRequestId);
  animationFrameRequestId = requestAnimationFrame(renderMainMenu);
}
