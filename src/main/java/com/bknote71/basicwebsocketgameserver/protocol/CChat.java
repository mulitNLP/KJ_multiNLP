package com.bknote71.basicwebsocketgameserver.protocol;

import com.fasterxml.jackson.annotation.*;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@JsonTypeName("cchat")
@Data
public class CChat extends Protocol {

    private String content;

    public CChat() {
        super(ProtocolType.C_Chat);
    }

    public CChat(String protocol, String content) {
        super(Enum.valueOf(ProtocolType.class, protocol));
        this.content = content;
    }
}
