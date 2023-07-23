package com.bknote71.multinlpio.game.object;

import com.bknote71.multinlpio.game.Vector2d;
import com.bknote71.multinlpio.protocol.info.GameObjectType;
import com.bknote71.multinlpio.game.room.GameRoom;
import com.bknote71.multinlpio.protocol.SMove;
import com.bknote71.multinlpio.protocol.info.SkillInfo;
import lombok.Getter;
import lombok.Setter;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Getter @Setter
public class Bullet extends GameObject {

    private GameObject owner;
    private GameObject target; // bullet 은 target 을 따라간다. 따라서 moveDir 가 필요 없다.

    private SkillInfo skill;
    private double speed;
    private double range;

    public Bullet() {
        setType(GameObjectType.Bullet);
    }

    // 다음 움직일 틱 기간, 이 틱을 기준으로 update
    // 참고로 자바에서는 "1틱"이 거의 1ms라고 한다.
    long nextMoveTick = 0;
    public void update() {
        log.info("bullet update");
        GameRoom room = getGameRoom();
        int objectId = getId();
        if (room == null)
            return;

        if (owner == null || target == null) {
            room.push(room::leaveGame, objectId);
            return;
        }

        // 이후에 실행해야 할 조건
        if (nextMoveTick > System.currentTimeMillis())
            return;

        // next move tick 갱신
        long tick = (long) (1000 / 60); // tick(대기 시간) = 1초(도달 거리)/(속도s?)
        nextMoveTick = System.currentTimeMillis() + tick;
        // 다음 위치로 갈 수 있으면 이동한다.
        Vector2d targetPos = target.pos();
        Vector2d dir = Vector2d.unitVector(targetPos, pos());
        Vector2d dest = Vector2d.dest(pos(), dir, speed);

        // log
        // log.info("target type: {}, target pos ({}, {})", target.getType(), targetPos.x, targetPos.y);
        // log.info("방향 단위 벡터: ({}, {})", dir.x, dir.y);
        // log.info("bullet 이동 위치 ({}, {})", dest.x, dest.y);

        // 갈 수 있는 조건: dest, range 안에 target 플레이어가 없어야 한다. + 맵 밖이 아니여야 한다.
        if (room.cango(dest) && !Vector2d.isIncludedInRange(dest, range, targetPos)) {
            // 좌표 갱신 이후 이동 패킷 보내기(SMove)
            pos(dest.x, dest.y);
            SMove movePacket = new SMove();
            movePacket.setObjectId(objectId);
            movePacket.setPosInfo(getPosInfo());
            room.broadcast(movePacket);
        } else {
            log.info("can't go ? {}", Vector2d.isIncludedInRange(dest, range, targetPos));
            // 갈 수 없다. (예를 들어, 사용자와 부딪히거나, 맵의 끝에 도달)
            // 그러면 소멸한다는 의미다.
            // 소멸: 상대 피해 입히기 or 맵에서 나가기
            if (Vector2d.isIncludedInRange(dest, range, targetPos))
                target.onDamaged(this, skill.getDamage());

            room.push(room::leaveGame, objectId);
        }
    }

    public void setSkill(SkillInfo skill) {
        this.skill = skill;
        this.range = skill.getProjectile().getRange();
        this.speed = skill.getProjectile().getSpeed();
    }
}
