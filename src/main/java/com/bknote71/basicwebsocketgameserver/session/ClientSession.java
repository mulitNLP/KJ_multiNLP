package com.bknote71.basicwebsocketgameserver.session;

import com.bknote71.basicwebsocketgameserver.game.room.GameRoom;
import com.bknote71.basicwebsocketgameserver.game.object.Player;
import com.bknote71.basicwebsocketgameserver.protocol.Protocol;
import com.bknote71.basicwebsocketgameserver.util.PacketTranslator;
import lombok.Getter;
import lombok.Setter;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;

import java.io.IOException;

@Getter @Setter
public class ClientSession {

    private String sessionId;
    private WebSocketSession webSocketSession;

    private Player myPlayer;

    public ClientSession(String sessionId, WebSocketSession session) {
        this.sessionId = sessionId;
        this.webSocketSession = session;
    }

    public void send(Protocol packet) {
        try {
            // packet to json
            String json = PacketTranslator.json(packet);
            if (webSocketSession.isOpen())
                webSocketSession.sendMessage(new TextMessage(json));
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }
}
