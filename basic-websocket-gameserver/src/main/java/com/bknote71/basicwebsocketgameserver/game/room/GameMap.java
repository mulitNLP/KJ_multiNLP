package com.bknote71.basicwebsocketgameserver.game.room;

import com.bknote71.basicwebsocketgameserver.game.Vector2d;
import com.bknote71.basicwebsocketgameserver.game.object.Bullet;
import com.bknote71.basicwebsocketgameserver.game.object.Player;

import java.util.ArrayList;
import java.util.List;

// 충돌이 없는 게임 맵 + 크기가 굉장히 큼
public class GameMap {

    private List<Player> players = new ArrayList<>();
    private int minX;
    private int maxX;
    private int minY;
    private int maxY;

    public GameMap(int minX, int maxX, int minY, int maxY) {
        this.minX = minX;
        this.maxX = maxX;
        this.minY = minY;
        this.maxY = maxY;
    }

    public int sizeX() {
        return maxX - minX;
    }

    public int sizeY() {
        return maxY - minY;
    }

    public boolean cango(Vector2d pos) {
        // pos 좌표가 박스 안에 있어야 한다.
        System.out.println("pos? " + pos.x + " " + pos.y + " can't go? " + (pos.x < minX || pos.x > maxX || pos.y < minY || pos.y > maxY));
        if (pos.x < minX || pos.x > maxX)
            return false;
        if (pos.y < minY || pos.y > maxY)
            return false;

        return true;
    }
}
