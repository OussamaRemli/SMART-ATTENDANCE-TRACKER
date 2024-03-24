package com.ensaoSquad.backend.mapper;

import com.ensaoSquad.backend.dto.ModuleDTO;
import com.ensaoSquad.backend.model.Module;
import org.springframework.stereotype.Component;

@Component
public class ModuleMapper {
    public static ModuleDTO toDTO(Module module){
        ModuleDTO moduleDto=new ModuleDTO();
        moduleDto.setModuleId(module.getModuleId());
        moduleDto.setModuleName(module.getModuleName());
        moduleDto.setDepartment(module.getDepartment());
        return moduleDto;
    }

    public static  Module toEntity(ModuleDTO moduleDto){
        Module module=new Module();

        module.setModuleId(moduleDto.getModuleId());
        module.setModuleName(moduleDto.getModuleName());
        module.setDepartment(moduleDto.getDepartment());

        return module;

    }
}
