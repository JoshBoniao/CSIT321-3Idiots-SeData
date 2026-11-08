package com.csit321g3._idiots.sedata.Repository;

import com.csit321g3._idiots.sedata.entity.ConsentRecord;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ConsentRecordRepository extends JpaRepository<ConsentRecord, Integer> {
}
