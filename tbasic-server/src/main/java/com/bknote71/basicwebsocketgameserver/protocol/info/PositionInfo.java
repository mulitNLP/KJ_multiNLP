package com.bknote71.basicwebsocketgameserver.protocol.info;

import com.bknote71.basicwebsocketgameserver.game.Vector2d;
import lombok.Data;

@Data
public class PositionInfo {
    Vector2d pos;
    MoveDir dir;
    CreatureState state;
}
