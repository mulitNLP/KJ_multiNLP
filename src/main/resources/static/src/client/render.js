// Learn more about this file at:
// https://victorzhou.com/blog/build-an-io-game-part-1/#5-client-rendering
import { debounce } from 'throttle-debounce';
import { getCurrentState } from './state';

import renderBackground from './render/background';
import renderPlayer from './render/player';
import renderLine from './render/line';
import renderMeteor from './render/meteor';
import renderTarget from './render/target';
import renderBullet from './render/bullet';

const Constants = require('../shared/constants');

const { MAP_SIZE } = Constants;

// Get the canvas graphics context
const canvas = document.getElementById('game-canvas');
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
  const { me, others, bullets, meteors } = getCurrentState();
  if (me) {

    // 배경 그리기
    renderBackground(me.x, me.y);

    // 경계선 그리기
    renderLine(me);

    renderTarget();
    // 모든 총알 그리기
    bullets.forEach(renderBullet.bind(null, me));
    meteors.forEach(renderMeteor.bind(null, me));

    // 모든 플레이어 그리기
    renderPlayer(me, me);
    others.forEach(renderPlayer.bind(null, me));
  }

  // 다음 프레임에서 이 render 함수를 다시 실행
  animationFrameRequestId = requestAnimationFrame(render);
}

// 메인 메뉴를 그리는 함수
function renderMainMenu() {
  const t = Date.now() / 7500;
  // const x = MAP_SIZE / 2 + 800 * Math.cos(t);
  // const y = MAP_SIZE / 2 + 800 * Math.sin(t);
  const x = MAP_SIZE / 2;
  const y = MAP_SIZE / 2;
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
