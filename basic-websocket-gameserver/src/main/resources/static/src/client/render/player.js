import { getAsset } from '../assets';

const Constants = require('../../shared/constants');

const { PLAYER_RADIUS } = Constants;

// Get the canvas graphics context
const canvas = document.getElementById('game-canvas');
const context = canvas.getContext('2d');

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
        getAsset('circle.png'),
        -PLAYER_RADIUS,
        -PLAYER_RADIUS,
        PLAYER_RADIUS * 2,
        PLAYER_RADIUS * 2,
    );
    context.restore();

    // // 체력 바 그리기
    // context.fillStyle = 'white';
    // context.fillRect(
    //   canvasX - PLAYER_RADIUS,
    //   canvasY + PLAYER_RADIUS + 8,
    //   PLAYER_RADIUS * 2,
    //   2,
    // );
    // context.fillStyle = 'red';
    // context.fillRect(
    //   canvasX - PLAYER_RADIUS + PLAYER_RADIUS * 2 * player.hp / PLAYER_MAX_HP,
    //   canvasY + PLAYER_RADIUS + 8,
    //   PLAYER_RADIUS * 2 * (1 - player.hp / PLAYER_MAX_HP),
    //   2,
    // );
}

export default renderPlayer;