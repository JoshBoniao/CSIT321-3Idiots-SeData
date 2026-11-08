package com.csit321g3._idiots.sedata.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.csit321g3._idiots.sedata.entity.Assessment;
import com.csit321g3._idiots.sedata.service.AssessmentService;

@RestController
@RequestMapping("/assessment")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class AssessmentController {

    @Autowired
    private AssessmentService assessmentService;

    public AssessmentController() {
    }

    public AssessmentController(AssessmentService assessmentService) {
        this.assessmentService = assessmentService;
    }

    // Create a new assessment
    @PostMapping(value = {"", "/createAssessment", "/insertAssessment"})
    public ResponseEntity<Assessment> createAssessment(@RequestBody Assessment assessment) {
        Assessment createdAssessment = assessmentService.createAssessment(assessment);
        return new ResponseEntity<>(createdAssessment, HttpStatus.CREATED);
    }

    // Get all assessments
    @GetMapping(value = {"", "/getAllAssessments"})
    public ResponseEntity<List<Assessment>> getAllAssessments() {
        List<Assessment> assessments = assessmentService.getAllAssessments();
        return ResponseEntity.ok(assessments);
    }

    // Get an assessment by ID
    @GetMapping(value = {"/{id}", "/getAssessmentById/{id}"})
    public ResponseEntity<Assessment> getAssessmentById(@PathVariable int id) {
        return assessmentService.getAssessmentById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // Update an assessment by ID
    @PutMapping(value = {"/{id}", "/updateAssessment/{id}"})
    public ResponseEntity<Assessment> updateAssessment(@PathVariable int id, @RequestBody Assessment assessment) {
        Assessment updatedAssessment = assessmentService.updateAssessment(id, assessment);
        if (updatedAssessment != null) {
            return ResponseEntity.ok(updatedAssessment);
        }
        return ResponseEntity.notFound().build();
    }

    // Delete an assessment by ID
    @DeleteMapping(value = {"/{id}", "/deleteAssessment/{id}"})
    public ResponseEntity<String> deleteAssessment(@PathVariable int id) {
        boolean deleted = assessmentService.deleteAssessment(id);
        if (deleted) {
            return ResponseEntity.ok("Assessment with ID " + id + " has been successfully deleted.");
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Assessment with ID " + id + " not found.");
    }
}
