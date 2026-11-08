package com.csit321g3._idiots.sedata.repository;

import com.csit321g3._idiots.sedata.entity.ConsentNotice;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ConsentNoticeRepository extends JpaRepository<ConsentNotice, Integer> {
}
