package com.bknote71.basicwebsocketgameserver;

import com.bknote71.basicwebsocketgameserver.data.DataManager;
import com.bknote71.basicwebsocketgameserver.game.room.GameRoom;
import com.bknote71.basicwebsocketgameserver.game.room.RoomManager;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.util.ArrayList;
import java.util.List;
import java.util.Timer;
import java.util.TimerTask;

@SpringBootApplication
public class BasicWebsocketGameserverApplication {

	public static void main(String[] args) {
		SpringApplication.run(BasicWebsocketGameserverApplication.class, args);

		DataManager.loadData();

		// 무조건 처음 룸 생성하도록 할까?
		GameRoom room = RoomManager.Instance.poll();
		RoomManager.Instance.tickRoom(room, 1000 / 60);
	}
}
