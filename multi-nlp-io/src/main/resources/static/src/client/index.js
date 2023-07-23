// Learn more about this file at:
// https://victorzhou.com/blog/build-an-io-game-part-1/#3-client-entrypoints
import { connect, play, handleChatAttack } from './networking';
import { startRendering, stopRendering } from './render';
import { startCapturingInput, stopCapturingInput } from './input';
import { downloadAssets } from './assets';
import { initState } from './state';
import { setLeaderboardHidden } from './leaderboard';
import { throttle } from 'throttle-debounce';
import { targetId } from './input';

// I'm using a tiny subset of Bootstrap here for convenience - there's some wasted CSS,
// but not much. In general, you should be careful using Bootstrap because it makes it
// easy to unnecessarily bloat your site.
import './css/bootstrap-reboot.css';
import './css/main.css';

const playMenu = document.getElementById('play-menu');
const playButton = document.getElementById('play-button');
const usernameInput = document.getElementById('username-input');
const enterInputBar = document.getElementById('inputbar');

Promise.all([
  connect(onGameOver),
  downloadAssets(),
]).then(() => {
  playMenu.classList.remove('hidden');
  usernameInput.focus();
  playButton.onclick = () => {
    // Play!
    play(usernameInput.value);
    playMenu.classList.add('hidden');
    initState();
    startCapturingInput();
    startRendering();
    setLeaderboardHidden(false);
  };
}).catch(console.error);

function onGameOver() {
  stopCapturingInput();
  stopRendering();
  playMenu.classList.remove('hidden');
  setLeaderboardHidden(true);
}

export const enterKeyBoard = throttle (10, ()=> {
  
  // nlp는 부정이면 -1 긍정이면 1
  // const nlp = -1;

  // if (nlp === 1) {


  // } else

  if (document.activeElement === enterInputBar){
    if (targetId > 0) {
      if (enterInputBar.value.trim() === "") {
        // 아무것도 입력하지 않았다면 알람을 표시하고 포커스를 제거합니다.
        console.log("입력 실패, 메세지를 입력해 주세요!");
        enterInputBar.blur();
      } else {
        handleChatAttack(targetId, enterInputBar.value, true, 0);
        enterInputBar.value="";
        enterInputBar.blur();
      }
    }
  } else {
    // 포커스가 없으니까 포커스 잡아줌
    if(targetId < 0) {
      console.log("타겟이 지정되지 않았음!");
      return;
    }
    enterInputBar.focus();
  }
});