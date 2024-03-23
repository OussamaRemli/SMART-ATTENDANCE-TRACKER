package com.ensaoSquad.backend.service;

import com.ensaoSquad.backend.dto.LevelDTO;
import java.util.List;

public interface LevelService {
    LevelDTO createLevel(LevelDTO levelDTO);
    LevelDTO getLevelByName(String levelName);
    List<LevelDTO> getAllLevels();
}
