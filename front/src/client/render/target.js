import { getAsset } from '../assets';
import { getCurrentState } from '../state';
import { targetId } from '../input';


const canvas = document.getElementById('game-canvas');
const context = canvas.getContext('2d');

function renderTarget() {
  const { me, others, meteors } = getCurrentState();
  const lockedEntities = [...others, ...meteors];
  const lockedEntity = lockedEntities.find(e => e.id === targetId);

  if (!lockedEntity) {
    return;
  }

  const { x, y } = lockedEntity;
  const canvasX = canvas.width / 2 + x - me.x;
  const canvasY = canvas.height / 2 + y - me.y;

  const targetImage = getAsset('target.png');
  context.drawImage(
    targetImage,
    canvasX - targetImage.width / 16,   // Adjust the center of the image
    canvasY - targetImage.height / 16,  // Adjust the center of the image
    targetImage.width / 8,
    targetImage.height / 8
  );
}

export default renderTarget;