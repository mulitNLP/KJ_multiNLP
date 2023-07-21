package com.bknote71.basicwebsocketgameserver.protocol;

import com.bknote71.basicwebsocketgameserver.protocol.info.PositionInfo;
import com.fasterxml.jackson.annotation.JsonTypeName;
import lombok.Data;

@JsonTypeName("cmove")
@Data
public class CMove extends Protocol {

    // 내가 이동했다. 따라서 플레이어 id 가 따로 필요 없다.
    // 대신 어디로 이동했는지 좌표값은 필요
    private PositionInfo posInfo;

    public CMove() {
        super(ProtocolType.C_Move);
    }
}
