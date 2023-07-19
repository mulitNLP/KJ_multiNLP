package com.bknote71.basicwebsocketgameserver.session;

import com.bknote71.basicwebsocketgameserver.game.Vector2d;
import com.bknote71.basicwebsocketgameserver.game.room.GameRoom;
import com.bknote71.basicwebsocketgameserver.game.object.Player;
import com.bknote71.basicwebsocketgameserver.game.object.ObjectManager;
import com.bknote71.basicwebsocketgameserver.game.room.RoomManager;
import com.bknote71.basicwebsocketgameserver.packet.ServerPacketManager;
import com.bknote71.basicwebsocketgameserver.protocol.info.CreatureState;
import com.bknote71.basicwebsocketgameserver.protocol.info.MoveDir;
import com.bknote71.basicwebsocketgameserver.protocol.info.ObjectInfo;
import com.bknote71.basicwebsocketgameserver.protocol.info.PositionInfo;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import java.util.concurrent.ThreadLocalRandom;

@Slf4j
public class ClientSessionHandler extends TextWebSocketHandler {

    @Override
    public void afterConnectionEstablished(WebSocketSession session) throws Exception {
        // session 이 지정한 방에 플레이어 추가!!
        log.info("connected established");

        // 클라이언트 세션 생성 및 추가
        ClientSession clientSession = ClientSessionManager.Instance.generate(session);

        // 플레이어 생성, 위치는 랜덤으로 생성
        Player player = ObjectManager.Instance.add(Player.class);
        ObjectInfo info = player.getInfo();
        PositionInfo posInfo = info.getPosInfo();
        double x = ThreadLocalRandom.current().nextDouble(-100, 100);
        double y = ThreadLocalRandom.current().nextDouble(-100, 100);
        posInfo.setPos(new Vector2d(x, y));
        posInfo.setDir(MoveDir.North); // 이것도 나중에는 랜덤으로
        posInfo.setState(CreatureState.IDLE);
        info.setName("Player_" + player.getPlayerId());
        info.setStatInfo(null);
        player.setSession(clientSession);

        clientSession.setMyPlayer(player);

        // 방 찾기
        Integer roomId = getRoomId(session);
        GameRoom gameRoom = RoomManager.Instance.find(roomId);
        gameRoom.push(gameRoom::enterGame, player);
    }

    @Override
    protected void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {
        // ClientSession 이게 굳이 필요한가?
        // 일단 ClientSession == WebSocketSession wrapper
        ClientSession clientSession = ClientSessionManager.Instance.find(session.getId());
        ServerPacketManager.Instance.handlePacket(clientSession, message);
    }

    @Override
    public void handleTransportError(WebSocketSession session, Throwable exception) throws Exception {
        super.handleTransportError(session, exception);
    }

    @Override
    public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception {
        log.info("connection closed status {} and closed={}", status, !session.isOpen());
        // leave room
        ClientSession clientSession = ClientSessionManager.Instance.find(session.getId());
        GameRoom gameRoom = clientSession.getMyPlayer().getGameRoom();
        Player sessionPlayer = clientSession.getMyPlayer();
        gameRoom.push(gameRoom::leaveGame, sessionPlayer.getPlayerId());
        ClientSessionManager.Instance.remove(clientSession);
    }

    public Integer getRoomId(WebSocketSession session) {
        String[] paths = session.getUri().getPath().split("/");
        // path: /room/{roomId}
        Integer roomId = Integer.valueOf(paths[2]);
        return roomId;
    }

}
