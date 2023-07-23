import { getAsset } from '../assets';
import { getCurrentState } from '../state';

const canvas = document.getElementById('game-canvas');
const context = canvas.getContext('2d');

const Constants = require('../../shared/constants');
const { MAP_SIZE } = Constants;

// 배경을 그리는 역할, 그라데이션
function renderBackground(x, y) {

    // Draw black background
    context.fillStyle = 'black';
    context.fillRect(0, 0, canvas.width, canvas.height);

    // Draw grid
    const gridSize = 50; // Define the size of the grid here
    context.strokeStyle = 'gray';
    context.lineWidth = 0.2;

    // Calculate the boundary in canvas coordinates
    const boundaryX = canvas.width / 2 - x;
    const boundaryY = canvas.height / 2 - y;

    // Draw vertical lines
    for (let i = 0; i < MAP_SIZE; i += gridSize) {
        const canvasX = canvas.width / 2 + i - x;
        if (canvasX >= boundaryX && canvasX <= boundaryX + MAP_SIZE) {
            context.beginPath();
            context.moveTo(canvasX, boundaryY);
            context.lineTo(canvasX, boundaryY + MAP_SIZE);
            context.stroke();
        }
    }

    // Draw horizontal lines
    for (let i = 0; i < MAP_SIZE; i += gridSize) {
        const canvasY = canvas.height / 2 + i - y;
        if (canvasY >= boundaryY && canvasY <= boundaryY + MAP_SIZE) {
            context.beginPath();
            context.moveTo(boundaryX, canvasY);
            context.lineTo(boundaryX + MAP_SIZE, canvasY);
            context.stroke();
        }
    }
}

export default renderBackground;