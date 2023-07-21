// Learn more about this file at:
// https://victorzhou.com/blog/build-an-io-game-part-1/#4-client-networking
// import io from 'socket.io-client';
import { throttle } from 'throttle-debounce';
import { processGameUpdate } from './state';

// websocket connection
const roomId = 1;
const websocket = new WebSocket(`ws://localhost:8080/room/${roomId}`);

const wsconnectedPromise = new Promise(resolve => {
  // to websocket, 이벤트 핸들러 변경
  // io 와는 다르게 WebSocket 을 사용할 때는 이벤트 핸들러를 직접 등록해야 한다.
  websocket.onopen = (() => {
    console.log('Connected to web socket game server!');
    resolve();
  });
});

let myId;

// connect 이후 콜백 등록
export const connect = onGameOver => (
  wsconnectedPromise.then(() => {
    // Register callbacks
    // socket.on(Constants.MSG_TYPES.GAME_UPDATE, processGameUpdate);
    // 이벤트 핸들러 등록 (open, close, error 제외한 일반적인 메시지에 대한 이벤트 핸들러)
    // 
    websocket.onmessage = event => {
      const message = JSON.parse(event.data);

      if (message.type === 'sentergame') {
        // console.log('enter game!!');
        // console.log(message.update);
        myId = message.player.name;
        const update = {
          me: message.update.infos[0],
          leaderboard: [],
          t: message.update.t,
        };
        processGameUpdate(update);
      } else if (message.type === 'sspawn') {
        // console.log('spawn!!');
        // processGameUpdate(message);
      } else if (message.type === 'supdate') { // update (움직임 패킷)
        // 플레이어 update
        // me 와 others 구분
        let me;
        const others = [];

        for (let item of message.update.infos) {
          // console.log(item);
          // console.log(myId);
          if (item['id'] === myId) {
            me = item;
          }
          else {
            others.push(item);
          }
        }

        const update = {
          meteors: [],
          bullets: [],
          leaderboard: [],
          t: message.update.t,
          me: me,
          others: others,
        };

        // console.log('update!');
        // console.log(update);

        processGameUpdate(update);

      } else if (message.type === 'smove') { // move update (움직임 패킷)
        // processGameUpdate(message.update);
        // 일단은 무시 (나중에 bullet, meteor 처리 시에 사용될 무브)
      } else if (message.type === 'schat') {
        // console.log('schat');
      } else if (message.type === 'sskill') {
        // console.log('sskill');
      } else if (message.type === 'sdie') {
        onGameOver();
      }
    };

    websocket.onclose = () => {
      console.log('Disconnected from server.');
      document.getElementById('disconnect-modal').classList.remove('hidden');
      document.getElementById('reconnect-button').onclick = () => {
        window.location.reload();
      };
    };
  })
);

// send data << 어차피 이거 아님
export const play = name => {
  const message = {
    type: 'centergame',
    protocol: 'C_EnterGame',
    username: name,
  };
  websocket.send(JSON.stringify(message));
};

export const updateInputKeyBoardDown = throttle(20, (key) => {
  var dir;
  if (key === 87) {
    dir = 'North';
  } else if (key === 83) {
    dir = 'South';
  } else if (key === 68) {
    dir = 'East';
  } else if (key === 65) {
    dir = 'West';
  }

  const message = {
    type: 'cmove',
    protocol: 'C_Move',
    posInfo: {
      pos: {},
      dirs: [],
      state: null,
    },
    dir: dir,
    updown: true,
  };

  console.log(`message: ${JSON.stringify(message)}`);
  websocket.send(JSON.stringify(message));
});

export const updateInputKeyBoardUp = (key) => {
  var dir;
  if (key === 87) {
    dir = 'North';
  } else if (key === 83) {
    dir = 'South';
  } else if (key === 68) {
    dir = 'East';
  } else if (key === 65) {
    dir = 'West';
  }

  const message = {
    type: 'cmove',
    protocol: 'C_Move',
    posInfo: {
      pos: {},
      dirs: [],
      state: null,
    },
    dir: dir,
    updown: false,
  };

  console.log(`message: ${JSON.stringify(message)}`);
  websocket.send(JSON.stringify(message));
};
