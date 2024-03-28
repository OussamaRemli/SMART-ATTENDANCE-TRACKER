package com.ensaoSquad.backend.service;

import com.ensaoSquad.backend.dto.LevelDTO;
import com.ensaoSquad.backend.dto.ModuleDTO;
import com.ensaoSquad.backend.dto.ProfessorDTO;
import com.ensaoSquad.backend.dto.SessionDTO;
import com.ensaoSquad.backend.model.Session;
import org.apache.poi.ss.usermodel.Sheet;
import org.springframework.web.multipart.MultipartFile;

import java.sql.Time;
import java.util.List;

public interface SessionService {

    List<SessionDTO>  uploadSessionFromExcel(MultipartFile file);

    List<SessionDTO> parseSessionExcel(Sheet sheet, int startRow, int startColumn , String sessionDay);

    boolean isByGroup(Sheet sheet, int startRow, int startColumn);
    SessionDTO createSessionDTO(LevelDTO levelDTO, boolean byGroup, String groupName, String sessionType,
                                        ModuleDTO moduleDTO, ProfessorDTO professorDTO, Time startTime, Time endTime,
                                        String sessionDay);
     LevelDTO getLevelFromSheet(Sheet sheet);
}