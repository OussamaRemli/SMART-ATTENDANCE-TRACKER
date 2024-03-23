package com.ensaoSquad.backend.repository;

import com.ensaoSquad.backend.Model.Department;
import com.ensaoSquad.backend.Model.Level;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LevelRepository extends JpaRepository<Level, Long> {
    Level findByLevelNameAndSectorName(String levelName, String sectorName);
}