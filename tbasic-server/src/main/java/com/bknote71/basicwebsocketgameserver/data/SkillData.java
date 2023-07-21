package com.bknote71.basicwebsocketgameserver.data;

import com.bknote71.basicwebsocketgameserver.protocol.info.SkillInfo;
import com.bknote71.basicwebsocketgameserver.protocol.info.SkillType;
import com.fasterxml.jackson.annotation.JsonTypeName;
import lombok.Getter;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;


@JsonTypeName("skilldata")
@Getter
public class SkillData implements ILoader<Integer, SkillInfo> {

    private List<SkillInfo> skills;

    @Override
    public Map<Integer, SkillInfo> makeMap() {
        Map<Integer, SkillInfo> result = new HashMap<>();
        for (SkillInfo skill : skills)
            result.put(skill.getSkillId(), skill);
        return result;
    }
}
