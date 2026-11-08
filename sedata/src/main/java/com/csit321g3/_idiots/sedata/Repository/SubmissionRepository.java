package com.csit321g3._idiots.sedata.Repository;

import com.csit321g3._idiots.sedata.entity.submission;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SubmissionRepository extends JpaRepository<submission, Integer> {
}
