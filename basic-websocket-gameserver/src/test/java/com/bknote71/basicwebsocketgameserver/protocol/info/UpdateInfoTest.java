package com.bknote71.basicwebsocketgameserver.protocol.info;

import com.bknote71.basicwebsocketgameserver.protocol.SEnterGame;
import com.fasterxml.jackson.annotation.JsonAutoDetect;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;

import java.util.ArrayList;
import java.util.List;

class UpdateInfoTest {

    @Test
    void updateinfo_json() throws JsonProcessingException {
        UpdateInfo updateInfo = new UpdateInfo();

        List<UpdateInfo.LeaderBoardInfo> l = new ArrayList<>();
        UpdateInfo.LeaderBoardInfo tl = new UpdateInfo.LeaderBoardInfo();
        tl.username = "abcd";
        tl.score = 10;
        l.add(tl);



        UpdateInfo.UpdatePos me = new UpdateInfo.UpdatePos();
        me.direction = 1.5;
        me.hp = 100;
//        me.id = "abcd";
        me.x = 2000;
        me.y = 0;

        List<UpdateInfo.UpdatePos> os = new ArrayList<>();
        for (int i = 0; i < 3; ++i) {
            UpdateInfo.UpdatePos tm = new UpdateInfo.UpdatePos();
            me.direction = 1.6;
            me.hp = 100;
//            me.id = "abcde" + i;
            me.x = 2000;
            me.y = 0;
            os.add(tm);
        }

        updateInfo.setLeaderboard(l);
//        updateInfo.me = me;
//        updateInfo.others = os;

        ObjectMapper mapper = new ObjectMapper();
//        mapper.enableDefaultTyping();
        mapper.setVisibility(
                mapper.getSerializationConfig().getDefaultVisibilityChecker()
                        .withFieldVisibility(JsonAutoDetect.Visibility.ANY)
        );
        String json = mapper.writeValueAsString(updateInfo);
        System.out.println(json);
        SEnterGame sEnterGame = new SEnterGame();
//        sEnterGame.setUpdate(updateInfo);
        String json2 = mapper.writeValueAsString(sEnterGame);
        System.out.println(json2);
    }

}