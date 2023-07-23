package com.bknote71.basicwebsocketgameserver.protocol.info;

import com.bknote71.basicwebsocketgameserver.game.Vector2d;
import lombok.Data;

import java.util.List;
import java.util.Set;

@Data
public class PositionInfo {
    Vector2d pos;
    Set<MoveDir> dirs;
    CreatureState state;
}
