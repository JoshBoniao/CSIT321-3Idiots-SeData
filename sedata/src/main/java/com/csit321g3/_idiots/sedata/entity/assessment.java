package com.csit321g3._idiots.sedata.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name="tblassessment")
public class Assessment {
    @Id 
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int assessment_id;
    private Course course_id;
    private int retention_days;
    private String title;

    public Assessment(){}
    public Assessment(int assessment_id, Course course_id, int retention_days, String title) {
        this.assessment_id = assessment_id;
        this.course_id = course_id;
        this.retention_days = retention_days;
        this.title = title;
    }
    
    public int getAssessment_id() {
        return assessment_id;
    }

    public void setAssessment_id(int assessment_id) {
        this.assessment_id = assessment_id;
    }

    public Course getCourse_id() {
        return course_id;
    }

    public void setCourse_id(Course course_id) {
        this.course_id = course_id;
    }

    public Course getCourse() {
        return course_id;
    }

    public void setCourse(Course course) {
        this.course_id = course;
    }

    public int getRetention_days() {
        return retention_days;
    }

    public void setRetention_days(int retention_days) {
        this.retention_days = retention_days;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }
    
}
