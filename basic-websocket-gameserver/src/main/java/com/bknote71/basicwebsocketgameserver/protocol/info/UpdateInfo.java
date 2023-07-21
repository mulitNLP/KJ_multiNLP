package com.bknote71.basicwebsocketgameserver.protocol.info;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UpdateInfo {

    public long t;
    public List<LeaderBoardInfo> leaderboard = new ArrayList<>();
    public List<UpdatePosInfo> infos = new ArrayList<>();

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class LeaderBoardInfo {
        String username;
        int score;
    }

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class UpdatePosInfo {
        double direction;
        int hp;
        String id;
        double x;
        double y;
    }

}
