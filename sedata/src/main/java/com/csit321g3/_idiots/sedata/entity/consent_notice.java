package com.csit321g3._idiots.sedata.entity;

import java.time.LocalDateTime;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name="tblconsent_notice")
public class consent_notice {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int notice_id;
    private int assessment_id;
    private String data_collected;
    private String purpose;
    private String stored_in;
    private int retention_days;
    private LocalDateTime created_at;

    public consent_notice() {
    }

    public consent_notice(int notice_id, int assessment_id, String data_collected, String purpose, String stored_in, int retention_days, LocalDateTime created_at) {
        this.notice_id = notice_id;
        this.assessment_id = assessment_id;
        this.data_collected = data_collected;
        this.purpose = purpose;
        this.stored_in = stored_in;
        this.retention_days = retention_days;
        this.created_at = created_at;
    }

    public int getNotice_id() {
        return notice_id;
    }

    public void setNotice_id(int notice_id) {
        this.notice_id = notice_id;
    }

    public int getAssessment_id() {
        return assessment_id;
    }

    public void setAssessment_id(int assessment_id) {
        this.assessment_id = assessment_id;
    }

    public String getData_collected() {
        return data_collected;
    }

    public void setData_collected(String data_collected) {
        this.data_collected = data_collected;
    }

    public String getPurpose() {
        return purpose;
    }

    public void setPurpose(String purpose) {
        this.purpose = purpose;
    }

    public String getStored_in() {
        return stored_in;
    }

    public void setStored_in(String stored_in) {
        this.stored_in = stored_in;
    }

    public int getRetention_days() {
        return retention_days;
    }

    public void setRetention_days(int retention_days) {
        this.retention_days = retention_days;
    }

    public LocalDateTime getCreated_at() {
        return created_at;
    }

    public void setCreated_at(LocalDateTime created_at) {
        this.created_at = created_at;
    }
}
