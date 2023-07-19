// Learn more about this file at:
// https://victorzhou.com/blog/build-an-io-game-part-1/#4-client-networking
import io from 'socket.io-client';
import { throttle } from 'throttle-debounce';
import { processGameUpdate } from './state';

const Constants = require('../shared/constants');

const socketProtocol = (window.location.protocol.includes('https')) ? 'wss' : 'ws';
const socket = io(`${socketProtocol}://${window.location.host}`, { reconnection: false });

const connectedPromise = new Promise(resolve => {
  socket.on('connect', () => {
    console.log('Connected to server!');
    resolve();
  });
});

export const connect = onGameOver => (
  connectedPromise.then(() => {
    console.log(onGameOver);
    // Register callbacks
    socket.on(Constants.MSG_TYPES.GAME_UPDATE, processGameUpdate);
    socket.on(Constants.MSG_TYPES.GAME_OVER, onGameOver);
    socket.on('disconnect', () => {
      console.log('Disconnected from server.');
      document.getElementById('disconnect-modal').classList.remove('hidden');
      document.getElementById('reconnect-button').onclick = () => {
        window.location.reload();
      };
    });
  })
);

export const play = username => {
  console.log("playplayplay");
  console.log(`username: ${username}`);
  socket.emit(Constants.MSG_TYPES.JOIN_GAME, username);
};

export const updateDirection = throttle(20, dir => {
  console.log(`dir: ${dir}`)
  socket.emit(Constants.MSG_TYPES.INPUT, dir);
});

// websocket connection
const roomId = 1;
const websocket = new WebSocket(`ws://localhost:8080/room/${roomId}`);

const wsconnectedPromise = new Promise(resolve => {
  // to websocket, 이벤트 핸들러 변경
  // io 와는 다르게 WebSocket 을 사용할 때는 이벤트 핸들러를 직접 등록해야 한다.
  websocket.onopen = ((e) => {
    console.log('Connected to web socket game server!');
    console.log(e);
    resolve();
  })
});


// connect 이후 콜백 등록
export const wsconnect = onGameOver => (
  wsconnectedPromise.then(() => {
    // Register callbacks
    // socket.on(Constants.MSG_TYPES.GAME_UPDATE, processGameUpdate);
    // 이벤트 핸들러 등록 (open, close, error 제외한 일반적인 메시지에 대한 이벤트 핸들러)
    // 
    websocket.onmessage = event => {
      const message = JSON.parse(event.data);
      console.log(message);

      if (message.type == "sentergame") {
        console.log("enter game!!!!!!!!!!!!!!!!!1");
      }
      else if (message.type == "smove") { // move update (움직임 패킷)
        console.log("movemovemove!!");

      }

    };

    websocket.onclose = () => {
      console.log('Disconnected from server.');
      document.getElementById('disconnect-modal').classList.remove('hidden');
      document.getElementById('reconnect-button').onclick = () => {
        window.location.reload();
      };
    }
  })
);

// send data << 어차피 이거 아님
export const wsplay = username => {
  const message = {
    type: "centergame",
    protocol: "C_EnterGame",
    username: username,
  };
  websocket.send(JSON.stringify(message));
}

// move
export const wsupdateDirection = throttle(20, dir => {
  console.log("ws move");
  const message = {
    type: "cmove",
    protocol: "C_Move",
    posInfo: {
      pos: {
        x: 123.5,
        y: 123.5
      },
      dir: "North",
      state: "IDLE"
    }
  };

  websocket.send(JSON.stringify(message));
});

