package com.bknote71.basicwebsocketgameserver.protocol;

import com.fasterxml.jackson.annotation.JsonSubTypes;
import com.fasterxml.jackson.annotation.JsonTypeName;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@JsonTypeName("schat")
@Data
public class SChat extends Protocol {

    private int playerId; // sender
    private String content;

    public SChat() {
        super(ProtocolType.S_Chat);
    }

}
