package com.bknote71.basicwebsocketgameserver.web;

import com.bknote71.basicwebsocketgameserver.game.room.GameRoom;
import com.bknote71.basicwebsocketgameserver.game.room.RoomManager;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.ArrayList;
import java.util.List;
import java.util.Timer;
import java.util.TimerTask;

@Slf4j
@Controller
public class HomeController {

    @GetMapping("/enter/game")
    @ResponseBody
    public Integer room_number() {
        GameRoom room = RoomManager.Instance.poll();

        if (room == null)
            return null;

        // timer task 등록 (-> 주기마다 실행해야 하는 timer task 등록)
        if (room.getSize() == 1)
            room.register();

        return room.getRoomId();
    }

    @GetMapping("/")
    public String home() {
        return "index.html";
    }
}
