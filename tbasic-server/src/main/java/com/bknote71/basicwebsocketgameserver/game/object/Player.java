package com.bknote71.basicwebsocketgameserver.game.object;

import com.bknote71.basicwebsocketgameserver.protocol.info.GameObjectType;
import com.bknote71.basicwebsocketgameserver.session.ClientSession;
import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class Player extends GameObject {

    private ClientSession session;
    private int score; // 실시간 점수 ?

    public Player() {
        setType(GameObjectType.Player);
    }

    public int getPlayerId() {
        return getId();
    }
}
