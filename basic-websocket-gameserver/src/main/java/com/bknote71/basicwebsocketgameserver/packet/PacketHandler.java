package com.bknote71.basicwebsocketgameserver.packet;

import com.bknote71.basicwebsocketgameserver.game.Vector2d;
import com.bknote71.basicwebsocketgameserver.game.object.ObjectManager;
import com.bknote71.basicwebsocketgameserver.game.room.GameRoom;
import com.bknote71.basicwebsocketgameserver.game.object.Player;
import com.bknote71.basicwebsocketgameserver.game.room.RoomManager;
import com.bknote71.basicwebsocketgameserver.protocol.*;
import com.bknote71.basicwebsocketgameserver.protocol.info.CreatureState;
import com.bknote71.basicwebsocketgameserver.protocol.info.ObjectInfo;
import com.bknote71.basicwebsocketgameserver.protocol.info.PositionInfo;
import com.bknote71.basicwebsocketgameserver.session.ClientSession;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.socket.WebSocketSession;

import java.util.concurrent.ThreadLocalRandom;

@Slf4j
public class PacketHandler {

    public static void CEnterGameHandler(ClientSession clientSession, Protocol protocol) {
        log.info("client enter game");
        CEnterGame enterPacket = (CEnterGame) protocol;

        // 플레이어 생성, 위치는 랜덤으로 생성
        Player player = ObjectManager.Instance.add(Player.class);
        ObjectInfo info = player.getInfo();
        PositionInfo posInfo = info.getPosInfo();
        double x = ThreadLocalRandom.current().nextDouble(500, 1500);
        double y = ThreadLocalRandom.current().nextDouble(500, 1500);
        posInfo.setPos(new Vector2d(x, y));
        // posInfo.setDir(MoveDir.North); // 이것도 나중에는 랜덤으로
        posInfo.setState(CreatureState.IDLE);
        info.setName(enterPacket.getUsername());
        info.setStatInfo(null); // 나중에 stat 도 지정해야함
        player.setSession(clientSession);

        clientSession.setMyPlayer(player);

        // 방 찾기
        Integer roomId = getRoomId(clientSession.getWebSocketSession());
        GameRoom gameRoom = RoomManager.Instance.find(roomId);
        gameRoom.push(gameRoom::enterGame, player);
    }

    public static void CChatHandler(ClientSession clientSession, Protocol protocol) {
        log.info("client chat handling");

        CChat chatPacket = (CChat) protocol;
        // validation << 나중에 함수로 묶짜.
        Player player = clientSession.getMyPlayer();
        if (player == null) {
            log.info("player is null");
            return;
        }

        GameRoom room = player.getGameRoom();
        if (room == null) {
            log.info("room is null");
            return;
        }

        log.info("chat content: {}", chatPacket.getContent());

        room.push(room::handleChat, player, chatPacket);
    }

    public static void CMoveHandler(ClientSession clientSession, Protocol protocol) {
        log.info("in cmove handing");
        CMove movePacket = (CMove) protocol;

        // SMove 패킷 전송
        Player player = clientSession.getMyPlayer();
        if (player == null) {
            return;
        }

        GameRoom room = player.getGameRoom();
        if (room == null) {
            return;
        }

        room.push(room::handleMove, player, movePacket);
    }

    public static void CSkillHandler(ClientSession clientSession, Protocol protocol) {
        log.info("c skill handle {}", clientSession.getMyPlayer().getPlayerId());
        CSkill skillPacket = (CSkill) protocol;

        Player player = clientSession.getMyPlayer();
        if (player == null)
            return;

        GameRoom room = player.getGameRoom();
        if (room == null)
            return;
        log.info("room push");
        room.push(room::handleSkill, player, skillPacket);
    }

    private static Integer getRoomId(WebSocketSession session) {
        String[] paths = session.getUri().getPath().split("/");
        // path: /room/{roomId}
        Integer roomId = Integer.valueOf(paths[2]);
        return roomId;
    }
}
