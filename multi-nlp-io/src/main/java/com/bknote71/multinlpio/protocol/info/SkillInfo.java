package com.bknote71.multinlpio.protocol.info;

import lombok.Data;

@Data
public class SkillInfo {
    private int skillId;
    private String name;
    private int damage;
    private SkillType skillType;
    private ProjectileInfo projectile;
    // private double range;
    // private double speed;
}
