package com.csit321g3._idiots.sedata.entity;

import java.time.LocalDateTime;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Lob;
import jakarta.persistence.Table;

@Entity
@Table(name="tblsubmission")
public class Submission {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int submission_id;
    private int assessment_id;
    private int student_id;
    private int consent_id;

    @Lob
    private byte[] encrypted_data;
    private LocalDateTime submitted_at;

    public Submission() {
    }

    public Submission(int submission_id, int assessment_id, int student_id, int consent_id, byte[] encrypted_data, LocalDateTime submitted_at) {
        this.submission_id = submission_id;
        this.assessment_id = assessment_id;
        this.student_id = student_id;
        this.consent_id = consent_id;
        this.encrypted_data = encrypted_data;
        this.submitted_at = submitted_at;
    }

    public int getSubmission_id() {
        return submission_id;
    }

    public void setSubmission_id(int submission_id) {
        this.submission_id = submission_id;
    }

    public int getAssessment_id() {
        return assessment_id;
    }

    public void setAssessment_id(int assessment_id) {
        this.assessment_id = assessment_id;
    }

    public int getStudent_id() {
        return student_id;
    }

    public void setStudent_id(int student_id) {
        this.student_id = student_id;
    }

    public int getConsent_id() {
        return consent_id;
    }

    public void setConsent_id(int consent_id) {
        this.consent_id = consent_id;
    }

    public byte[] getEncrypted_data() {
        return encrypted_data;
    }

    public void setEncrypted_data(byte[] encrypted_data) {
        this.encrypted_data = encrypted_data;
    }

    public LocalDateTime getSubmitted_at() {
        return submitted_at;
    }

    public void setSubmitted_at(LocalDateTime submitted_at) {
        this.submitted_at = submitted_at;
    }
}
