package com.bknote71.basicwebsocketgameserver.game.object;

import com.bknote71.basicwebsocketgameserver.game.Vector2d;
import com.bknote71.basicwebsocketgameserver.game.room.GameRoom;
import com.bknote71.basicwebsocketgameserver.protocol.SChangeHp;
import com.bknote71.basicwebsocketgameserver.protocol.SDie;
import com.bknote71.basicwebsocketgameserver.protocol.info.*;
import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class GameObject { // player, bullet, meteor

    private GameRoom gameRoom;

    private GameObjectType type;
    private ObjectInfo info;
    private PositionInfo posInfo;
    private StatInfo statInfo;

    public GameObject() {
        this.info = new ObjectInfo();

        this.posInfo = new PositionInfo();
        this.statInfo = new StatInfo();

        info.setPosInfo(posInfo);
        info.setStatInfo(statInfo);
    }

    public void setPosInfo(PositionInfo posInfo) {
        this.posInfo = posInfo;
        info.setPosInfo(this.posInfo);
    }

    // 자주 사용하는 상태들 보기 (hp, speed, dir, cellpos)
    public int getId() {
        return info.getObjectId();
    }

    public void setId(int objectId) {
        info.setObjectId(objectId);
    }

    public int hp() {
        return statInfo.getHp();
    }

    public float speed() {
        return statInfo.getSpeed();
    }

    public Vector2d pos() {
        return posInfo.getPos();
    }

    public void pos(double posX, double posY) {
        posInfo.setPos(new Vector2d(posX, posY));
    }

    public void pos(Vector2d vec) {
        posInfo.setPos(vec);
    }

    public CreatureState state() {
        return posInfo.getState();
    }

    public void state(CreatureState state) {
        posInfo.setState(state);
    }

    public void onDamaged(GameObject attacker, int damage) {
        if (gameRoom == null)
            return;

        statInfo.setHp(Math.max(hp() - damage, 0));

        SChangeHp changePacket = new SChangeHp();
        changePacket.setObjectId(getId());
        changePacket.setHp(hp());
        gameRoom.broadcast(changePacket);

        if (hp() <= 0)
            onDead(attacker);
    }

    public void onDead(GameObject attacker) {
        if (gameRoom == null)
            return;

        SDie diePacket = new SDie();
        diePacket.setObjectId(getId());
        diePacket.setAttackerId(attacker.getId());
        gameRoom.broadcast(diePacket);

        GameRoom room = gameRoom;
        room.push(room::leaveGame, getId());
    }
}
