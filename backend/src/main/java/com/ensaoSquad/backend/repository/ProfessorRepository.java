package com.ensaoSquad.backend.repository;

import com.ensaoSquad.backend.model.Professor;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ProfessorRepository extends JpaRepository<Professor, Long> {
    Optional<Professor> findByLastName(String lastName);

}

