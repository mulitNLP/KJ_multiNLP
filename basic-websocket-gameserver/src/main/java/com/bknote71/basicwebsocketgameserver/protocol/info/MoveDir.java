package com.bknote71.basicwebsocketgameserver.protocol.info;

import static com.bknote71.basicwebsocketgameserver.game.Vector2d.l;

public enum MoveDir {

    North(0, 1),
    South(0, -1),
    West(-1, 0),
    East(1, 0),
    Northeast(l, l),
    Northwest(-l, l),
    Southwest(-l, -l),
    Southeast(l, -l);

    public final double x, y;

    MoveDir(double x, double y) {
        this.x = x;
        this.y = y;
    }
}
