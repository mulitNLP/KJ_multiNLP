import { getAsset } from '../assets';


const canvas = document.getElementById('game-canvas');
const context = canvas.getContext('2d');

const Constants = require('../../shared/constants');
const { BULLET_RADIUS } = Constants;

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

export default renderBullet;