package com.bknote71.basicwebsocketgameserver.protocol.info;

import lombok.Data;

@Data
public class ProjectileInfo {
    private String name;
    private float speed;
    private double range;
}