package com.bknote71.basicwebsocketgameserver.protocol;

import com.bknote71.basicwebsocketgameserver.game.object.Player;
import com.bknote71.basicwebsocketgameserver.protocol.info.PositionInfo;
import com.bknote71.basicwebsocketgameserver.protocol.info.UpdateInfo;
import com.fasterxml.jackson.annotation.JsonTypeName;
import lombok.Data;

import java.util.ArrayList;
import java.util.List;

import static com.bknote71.basicwebsocketgameserver.protocol.info.UpdateInfo.*;

@JsonTypeName("smove")
@Data
public class SMove extends Protocol {

    private int objectId;
    private PositionInfo posInfo;

    public SMove() {
        super(ProtocolType.S_Move);
    }
}
