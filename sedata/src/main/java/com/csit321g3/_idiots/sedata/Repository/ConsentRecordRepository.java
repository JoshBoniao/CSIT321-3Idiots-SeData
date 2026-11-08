package com.csit321g3._idiots.sedata.Repository;

import com.csit321g3._idiots.sedata.entity.consent_record;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ConsentRecordRepository extends JpaRepository<consent_record, Integer> {
}
