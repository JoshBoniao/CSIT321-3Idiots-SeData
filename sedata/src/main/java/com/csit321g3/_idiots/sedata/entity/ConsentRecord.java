package com.csit321g3._idiots.sedata.entity;

import java.time.LocalDateTime;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name="tblconsent_record")
public class ConsentRecord {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int consent_id;
    private int notice_id;
    private int student_id;
    private String decision;
    private LocalDateTime decided_at;

    public ConsentRecord() {
    }

    public ConsentRecord(int consent_id, int notice_id, int student_id, String decision, LocalDateTime decided_at) {
        this.consent_id = consent_id;
        this.notice_id = notice_id;
        this.student_id = student_id;
        this.decision = decision;
        this.decided_at = decided_at;
    }

    public int getConsent_id() {
        return consent_id;
    }

    public void setConsent_id(int consent_id) {
        this.consent_id = consent_id;
    }

    public int getNotice_id() {
        return notice_id;
    }

    public void setNotice_id(int notice_id) {
        this.notice_id = notice_id;
    }

    public int getStudent_id() {
        return student_id;
    }

    public void setStudent_id(int student_id) {
        this.student_id = student_id;
    }

    public String getDecision() {
        return decision;
    }

    public void setDecision(String decision) {
        this.decision = decision;
    }

    public LocalDateTime getDecided_at() {
        return decided_at;
    }

    public void setDecided_at(LocalDateTime decided_at) {
        this.decided_at = decided_at;
    }
}
