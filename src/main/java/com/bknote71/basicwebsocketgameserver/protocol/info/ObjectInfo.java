package com.bknote71.basicwebsocketgameserver.protocol.info;

import lombok.Data;

@Data
public class ObjectInfo {
    private int objectId;
    String name;
    PositionInfo posInfo;
    StatInfo statInfo;
}
