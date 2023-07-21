package com.bknote71.basicwebsocketgameserver.game.object;

import com.bknote71.basicwebsocketgameserver.protocol.info.GameObjectType;

import java.lang.reflect.Constructor;
import java.util.HashMap;
import java.util.Map;

public class ObjectManager {

    public static ObjectManager Instance = new ObjectManager();

    private Object lock = new Object();
    private Map<Integer, Player> players = new HashMap<>();

    // [UNUSED(1)][TYPE(7)][ID(24)] << 나중에
    private int id;

    public static GameObjectType getObjectTypeById(int objectId) {
        int type = (objectId >> 24) & 0x7f;
        return GameObjectType.values()[type];
    }

    public <T extends GameObject> T add(Class<T> clazz) {
        Constructor<T> constructor = null;
        try {
            constructor = clazz.getDeclaredConstructor();
            constructor.setAccessible(true);

            T gameObject = constructor.newInstance();
            synchronized (lock) {
                int objectId = generateId(gameObject.getType());
                gameObject.setId(objectId);

                if (gameObject.getType() == GameObjectType.Player)
                    players.put(objectId, (Player) gameObject);

                return gameObject;
            }
        } catch (ReflectiveOperationException e) {
            throw new RuntimeException(e);
        }
    }

    private int generateId(GameObjectType type) {
        synchronized (lock) {
            return (type.ordinal() << 24 | (id++));
        }

    }

    public Player find(int objectId) {
        GameObjectType type = getObjectTypeById(objectId);

        synchronized (lock) {
            if (type == GameObjectType.Player)
                return players.get(objectId);
        }
        return null;
    }

    public void remove(int objectId) {
        GameObjectType type = getObjectTypeById(objectId);

        synchronized (lock) {
            if (type == GameObjectType.Player)
                players.remove(objectId);
        }
    }
}
