package com.csit321g3._idiots.sedata.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name="tblassessment")
public class assessment {
    @Id 
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int assessment_id;
    private int course_id;
    private String title;
    private int retention_days;

    public assessment() {
    }

    public assessment(int assessment_id, int course_id, String title, int retention_days) {
        this.assessment_id = assessment_id;
        this.course_id = course_id;
        this.title = title;
        this.retention_days = retention_days;
    }

    public int getAssessment_id() {
        return assessment_id;
    }

    public void setAssessment_id(int assessment_id) {
        this.assessment_id = assessment_id;
    }

    public int getCourse_id() {
        return course_id;
    }

    public void setCourse_id(int course_id) {
        this.course_id = course_id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public int getRetention_days() {
        return retention_days;
    }

    public void setRetention_days(int retention_days) {
        this.retention_days = retention_days;
    }
}
