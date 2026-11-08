package com.csit321g3._idiots.sedata.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name="tblcourse")
public class Course {
    @Id 
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int course_id;
    private int instructor_id;
    private String course_name;

    public Course(){}
    public Course(int course_id, int instructor_id, String course_name) {
        this.course_id = course_id;
        this.instructor_id = instructor_id;
        this.course_name = course_name;
    }
    
    public int getCourse_id() {
        return course_id;
    }
    public void setCourse_id(int course_id) {
        this.course_id = course_id;
    }
    public int getInstructor_id() {
        return instructor_id;
    }
    public void setInstructor_id(int instructor_id) {
        this.instructor_id = instructor_id;
    }
    public String getCourse_name() {
        return course_name;
    }
    public void setCourse_name(String course_name) {
        this.course_name = course_name;
    }
    
}
