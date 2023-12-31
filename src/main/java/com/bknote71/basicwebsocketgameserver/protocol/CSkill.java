package com.bknote71.basicwebsocketgameserver.protocol;

import com.bknote71.basicwebsocketgameserver.protocol.info.SkillInfo;
import com.fasterxml.jackson.annotation.JsonTypeName;
import lombok.Data;

@JsonTypeName("cskill")
@Data
public class CSkill extends Protocol { // bullet or barrier
    private int target;
    private SkillInfo info;

    public CSkill() {
        super(ProtocolType.C_Skill);
    }
}
