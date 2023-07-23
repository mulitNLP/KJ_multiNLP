package com.bknote71.basicwebsocketgameserver.packet;

import com.bknote71.basicwebsocketgameserver.session.ClientSession;
import org.junit.jupiter.api.Test;
import org.springframework.web.socket.TextMessage;

import static org.junit.jupiter.api.Assertions.*;

class ServerPacketManagerTest {

    @Test
    void cchat_handling() {
        ClientSession clientSession = new ClientSession("1", null);
        TextMessage message = new TextMessage("{\"type\": \"cchat\", \"protocol\":\"C_Chat\",\"content\":\"this is cchat content!!!\"}");

        ServerPacketManager s = new ServerPacketManager();
        s.handlePacket(clientSession,message);
    }

}