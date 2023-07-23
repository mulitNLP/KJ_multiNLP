package com.bknote71.basicwebsocketgameserver.protocol;

import com.bknote71.basicwebsocketgameserver.protocol.info.ObjectInfo;
import com.bknote71.basicwebsocketgameserver.protocol.info.UpdateInfo;
import com.fasterxml.jackson.annotation.JsonTypeName;
import lombok.Data;

import java.util.ArrayList;
import java.util.List;

import static com.bknote71.basicwebsocketgameserver.protocol.info.UpdateInfo.*;

@JsonTypeName("sentergame")
@Data
public class SEnterGame extends Protocol { // 내(플레이어) 정보

    private ObjectInfo player;

    public SEnterGame() {
        super(ProtocolType.S_EnterGame);
        player = new ObjectInfo();
    }
}
