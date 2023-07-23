package com.bknote71.basicwebsocketgameserver.game.object;

import com.bknote71.basicwebsocketgameserver.game.Vector2d;
import com.bknote71.basicwebsocketgameserver.game.room.GameRoom;
import com.bknote71.basicwebsocketgameserver.protocol.SChangeHp;
import com.bknote71.basicwebsocketgameserver.protocol.SDie;
import com.bknote71.basicwebsocketgameserver.protocol.info.*;
import lombok.Getter;
import lombok.Setter;
import lombok.extern.slf4j.Slf4j;

import java.util.ArrayList;
import java.util.List;

@Slf4j
@Getter @Setter
public class GameObject { // player, bullet, meteor

    private GameRoom gameRoom;

    private GameObjectType type;
    private ObjectInfo info;
    private PositionInfo posInfo;

    // 여러 총알(여러 스레드)이 이 게임 오브젝트에 날라오면 동시성 문제가 생길 수 있다.
    private Object attackLock;
    private List<GameObject> attackers;

    public GameObject() {
        this.info = new ObjectInfo();

        this.posInfo = new PositionInfo();
        info.setStatInfo(new StatInfo());

        info.setPosInfo(posInfo);

        attackLock = new Object();
        attackers = new ArrayList<>();
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
        return info.getStatInfo().getHp();
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

    public void addAttacker(GameObject attacker) {
        if (attacker == null)
            return;

        if (!(type == GameObjectType.Player || type == GameObjectType.Meteor)) {
            log.info("이 오브젝트의 타입은 플레이어나 메테오가 아니므로 공격할 수 없습니다.");
            return;
        }

        synchronized (attackLock) {
            // attacker 의 타입은 현재까지는 무조건 총알이어야 함 (일단 이것도 임시로)
            if (attacker.getType() == GameObjectType.Bullet)
                attackers.add(attacker);
        }
    }

    public void flushAttackers() {
        // attackers 제거
        synchronized (attackLock) {
            for (GameObject attacker : attackers) {
                Bullet bullet = (Bullet) attacker;
                bullet.setTarget(null);
            }
            attackers.clear();
        }
    }

    public void onDamaged(GameObject attacker, int damage) {
        if (gameRoom == null)
            return;

        if (attacker.getType() == GameObjectType.Bullet && !attackers.remove(attacker))
        {
            log.info("어태커s중에 이 어테커는 없다? 말이 안됨");
            return;
        }

        log.info("before hp {}", hp());
        info.getStatInfo().setHp(Math.max(hp() - damage, 0));
        log.info("after hp {}", hp());

        SChangeHp changePacket = new SChangeHp();
        changePacket.setObjectId(getId());
        changePacket.setHp(hp());
        gameRoom.broadcast(changePacket);

        if (hp() <= 0)
            onDead(attacker);
    }

    public void onDead(GameObject attacker) {
        log.info("on dead {}.",getId());

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
