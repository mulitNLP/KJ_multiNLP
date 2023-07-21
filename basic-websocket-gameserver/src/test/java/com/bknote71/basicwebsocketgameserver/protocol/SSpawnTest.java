package com.bknote71.basicwebsocketgameserver.protocol;

import com.bknote71.basicwebsocketgameserver.protocol.info.ObjectInfo;
import com.bknote71.basicwebsocketgameserver.util.PacketTranslator;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class SSpawnTest {

    @Test
    void spawn_json() {
        SSpawn spawnpacket = new SSpawn();
        ObjectInfo info = new ObjectInfo();
        info.setName("spawn object");
        info.setObjectId(123);
        spawnpacket.add(info);

        String json = PacketTranslator.json(spawnpacket);
        System.out.println(json);
    }

}