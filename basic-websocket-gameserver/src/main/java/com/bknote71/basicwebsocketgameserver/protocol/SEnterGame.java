package com.bknote71.basicwebsocketgameserver.protocol;

import com.bknote71.basicwebsocketgameserver.protocol.info.ObjectInfo;
import com.bknote71.basicwebsocketgameserver.protocol.info.UpdateInfo;
import com.fasterxml.jackson.annotation.JsonTypeName;
import lombok.Data;

import java.util.ArrayList;
import java.util.List;

import static com.bknote71.basicwebsocketgameserver.protocol.info.UpdateInfo.*;

@JsonTypeName("sentergame")
@Data
public class SEnterGame extends Protocol { // 내(플레이어) 정보

    private ObjectInfo player;

    // tmp info: update
    private UpdateInfo update;

    public SEnterGame() {
        super(ProtocolType.S_EnterGame);
        player = new ObjectInfo();
        update = new UpdateInfo();
    }

    public void update() {
        List<LeaderBoardInfo> lb = new ArrayList<>();
        UpdatePosInfo me = new UpdatePosInfo();
        me.setId(player.getName());
        me.setDirection(3.14); // default 3.14
        me.setHp(100); // default: 100 (임시로), 나중에는: player.getStatInfo().getHp()
        me.setX(player.getPosInfo().getPos().x);
        me.setY(player.getPosInfo().getPos().y);

        update.setT(System.currentTimeMillis());
        update.setLeaderboard(lb);
        update.infos.add(me);
    }

}
