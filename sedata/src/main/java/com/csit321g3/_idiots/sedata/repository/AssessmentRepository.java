package com.csit321g3._idiots.sedata.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.csit321g3._idiots.sedata.entity.Assessment;

@Repository
public interface AssessmentRepository extends JpaRepository<Assessment, Integer> {
}
