package com.bknote71.multinlpio.data;

import com.bknote71.multinlpio.protocol.info.SkillInfo;
import com.bknote71.multinlpio.protocol.info.StatInfo;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.core.io.Resource;
import org.springframework.core.io.ResourceLoader;
import org.springframework.stereotype.Component;

import java.util.Map;

@Component
public class DataManager {

    public static Map<Integer, StatInfo> statInfoMap;
    public static Map<Integer, SkillInfo> skillInfoMap;

    private static Environment env;
    private static ResourceLoader resourceLoader; // classpath 에 있는 resource 읽기(로더)

    @Autowired
    public DataManager(Environment env, ResourceLoader resourceLoader) {
        this.env = env;
        this.resourceLoader = resourceLoader;
    }

    public static void loadData() {
        statInfoMap = DataManager.<StatData, Integer, StatInfo>loadJson("stat_data").makeMap();
        skillInfoMap = DataManager.<SkillData, Integer, SkillInfo>loadJson("skill_data").makeMap();
    }

    static <T extends ILoader<K, V>, K, V> T loadJson(String path) {
        try {
            String fullPath = env.getProperty("data_path") + path + ".json";
            Resource resource = resourceLoader.getResource(fullPath);
            byte[] bytes = resource.getInputStream().readAllBytes();
            String text = new String(bytes);
            ObjectMapper mapper = new ObjectMapper();
            return mapper.readValue(text, new TypeReference<>() {});
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

}
