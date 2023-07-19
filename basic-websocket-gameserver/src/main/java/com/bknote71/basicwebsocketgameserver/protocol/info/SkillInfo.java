package com.bknote71.basicwebsocketgameserver.protocol.info;

import lombok.Data;

@Data
public class SkillInfo {
    private int skillId;
    private String name;
    private int damage;
    private SkillType skillType;
    private ProjectileInfo projectile;
}
