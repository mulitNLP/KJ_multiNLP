package com.bknote71.basicwebsocketgameserver.protocol;

import com.bknote71.basicwebsocketgameserver.game.Vector2d;
import com.bknote71.basicwebsocketgameserver.protocol.info.CreatureState;
import com.bknote71.basicwebsocketgameserver.protocol.info.MoveDir;
import com.bknote71.basicwebsocketgameserver.protocol.info.PositionInfo;
import com.bknote71.basicwebsocketgameserver.util.PacketTranslator;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import static org.junit.jupiter.api.Assertions.*;

class CUpdatePosTest {

    @Test
    void set_test() {
        CMove movePacket = new CMove();
        Set<MoveDir> dirs = new HashSet<>();
        PositionInfo posInfo = new PositionInfo();
        posInfo.setState(CreatureState.IDLE);
//        posInfo.setPos(new Vector2d(1,1));
        dirs.add(MoveDir.North);
        dirs.add(MoveDir.East);
        posInfo.setDirs(dirs);
        movePacket.setPosInfo(posInfo);

        String json = PacketTranslator.json(movePacket);
        System.out.println(json);

        CMove object = PacketTranslator.object(json);
        System.out.println(object.getPosInfo());

        Assertions.assertTrue(dirs.contains(MoveDir.North));
        Assertions.assertTrue(dirs.contains(MoveDir.East));
    }

}