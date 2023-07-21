package com.bknote71.basicwebsocketgameserver.packet;

import com.bknote71.basicwebsocketgameserver.game.room.GameRoom;
import com.bknote71.basicwebsocketgameserver.game.object.Player;
import com.bknote71.basicwebsocketgameserver.protocol.CChat;
import com.bknote71.basicwebsocketgameserver.protocol.CMove;
import com.bknote71.basicwebsocketgameserver.protocol.CSkill;
import com.bknote71.basicwebsocketgameserver.protocol.Protocol;
import com.bknote71.basicwebsocketgameserver.session.ClientSession;
import lombok.extern.slf4j.Slf4j;

@Slf4j
public class PacketHandler {
    public static void CChatHandler(ClientSession clientSession, Protocol protocol) {
        log.info("in cchat handing");

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
}
