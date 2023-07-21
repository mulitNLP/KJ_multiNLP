package com.bknote71.basicwebsocketgameserver.protocol;

import com.bknote71.basicwebsocketgameserver.game.object.Player;
import com.bknote71.basicwebsocketgameserver.protocol.info.ObjectInfo;
import com.bknote71.basicwebsocketgameserver.protocol.info.UpdateInfo;
import com.fasterxml.jackson.annotation.JsonTypeName;
import lombok.Data;

import java.util.ArrayList;
import java.util.List;

import static com.bknote71.basicwebsocketgameserver.protocol.info.UpdateInfo.*;

@JsonTypeName("sspawn")
@Data
public class SSpawn extends Protocol {

    // list of players
    private List<ObjectInfo> objects = new ArrayList<>();

    public SSpawn() {
        super(ProtocolType.S_Spawn);
    }

    public void add(ObjectInfo info) {
        objects.add(info);
    }
}
