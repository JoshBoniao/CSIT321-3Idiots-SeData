package com.csit321g3._idiots.sedata.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.csit321g3._idiots.sedata.entity.Course;
import com.csit321g3._idiots.sedata.repository.CourseRepository;

@Service
public class CourseService {

    @Autowired
    private CourseRepository courseRepository;

    public CourseService() {
    }

    public CourseService(CourseRepository courseRepository) {
        this.courseRepository = courseRepository;
    }

    // Create / Insert Course
    public Course createCourse(Course course) {
        return courseRepository.save(course);
    }

    public Course insertCourse(Course course) {
        return createCourse(course);
    }

    // Read all courses
    public List<Course> getAllCourses() {
        return courseRepository.findAll();
    }

    // Read course by ID
    public Optional<Course> getCourseById(int courseId) {
        return courseRepository.findById(courseId);
    }

    // Update course
    public Course updateCourse(int courseId, Course newCourseDetails) {
        return courseRepository.findById(courseId).map(course -> {
            course.setInstructor_id(newCourseDetails.getInstructor_id());
            course.setCourse_name(newCourseDetails.getCourse_name());
            return courseRepository.save(course);
        }).orElse(null);
    }

    // Delete course by ID
    public boolean deleteCourse(int courseId) {
        if (courseRepository.existsById(courseId)) {
            courseRepository.deleteById(courseId);
            return true;
        }
        return false;
    }
}
