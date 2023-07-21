package com.bknote71.basicwebsocketgameserver.game.object;

import com.bknote71.basicwebsocketgameserver.game.Vector2d;
import com.bknote71.basicwebsocketgameserver.protocol.info.GameObjectType;
import com.bknote71.basicwebsocketgameserver.protocol.info.MoveDir;
import com.bknote71.basicwebsocketgameserver.session.ClientSession;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Getter @Setter
public class Player extends GameObject {

    private ClientSession session;
    private int score; // 실시간 점수 ?
    private double direction;

    public Player() {
        setType(GameObjectType.Player);
    }

    public int getPlayerId() {
        return getId();
    }

    private Set<MoveDir> dirs = new HashSet<>();
    private double speed = 200;
    private int size = 2000;


    public void update() {
        Vector2d curpos = pos();

        curpos.x = Math.max(0, Math.min(size, curpos.x));
        curpos.y = Math.max(0, Math.min(size, curpos.y));

        if (dirs.contains(MoveDir.North)) {
            direction = Math.atan2(0, curpos.y - speed); // 200 이 나중에는 player.speed()
            curpos.y -= speed / 40;
        }
        if (dirs.contains(MoveDir.South)) {
            direction = Math.atan2(0, curpos.y + speed - size); // 200 이 나중에는 player.speed()
            curpos.y += speed / 40;
        }
        if (dirs.contains(MoveDir.East)) {
            direction = Math.atan2(curpos.x + speed, 0); // 200 이 나중에는 player.speed()
            curpos.x += speed / 40;
        }
        if (dirs.contains(MoveDir.West)) {
            direction = Math.atan2(curpos.x - speed - size, 0); // 200 이 나중에는 player.speed()
            curpos.x -= speed / 40;
        }
    }

    public void addDir(MoveDir dir) {
        dirs.add(dir);
    }

    public void removeDir(MoveDir dir) {
        dirs.remove(dir);
    }
}
