package com.bknote71.basicwebsocketgameserver.data;

import com.bknote71.basicwebsocketgameserver.protocol.info.SkillInfo;
import com.bknote71.basicwebsocketgameserver.protocol.info.StatInfo;
import com.fasterxml.jackson.annotation.JsonTypeName;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@JsonTypeName("statdata")
@Getter
public class StatData implements ILoader<Integer, StatInfo> {

    private List<StatInfo> stats;

    @Override
    public Map<Integer, StatInfo> makeMap() {
        int idx = 0;
        Map<Integer, StatInfo> result = new HashMap<>();
        for (StatInfo stat : stats)
            result.put(idx++, stat);
        return result;
    }
}
