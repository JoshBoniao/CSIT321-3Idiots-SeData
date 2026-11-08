package com.csit321g3._idiots.sedata.Repository;

import com.csit321g3._idiots.sedata.entity.consent_notice;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ConsentNoticeRepository extends JpaRepository<consent_notice, Integer> {
}
