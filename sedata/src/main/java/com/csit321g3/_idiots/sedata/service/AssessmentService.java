package com.csit321g3._idiots.sedata.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.csit321g3._idiots.sedata.entity.Assessment;
import com.csit321g3._idiots.sedata.repository.AssessmentRepository;

@Service
public class AssessmentService {

    @Autowired
    private AssessmentRepository assessmentRepository;

    public AssessmentService() {
    }

    public AssessmentService(AssessmentRepository assessmentRepository) {
        this.assessmentRepository = assessmentRepository;
    }

    // Create / Insert Assessment
    public Assessment createAssessment(Assessment assessment) {
        return assessmentRepository.save(assessment);
    }

    public Assessment insertAssessment(Assessment assessment) {
        return createAssessment(assessment);
    }

    // Read all assessments
    public List<Assessment> getAllAssessments() {
        return assessmentRepository.findAll();
    }

    // Read assessment by ID
    public Optional<Assessment> getAssessmentById(int assessmentId) {
        return assessmentRepository.findById(assessmentId);
    }

    // Update assessment
    public Assessment updateAssessment(int assessmentId, Assessment newAssessmentDetails) {
        return assessmentRepository.findById(assessmentId).map(assessment -> {
            assessment.setCourse_id(newAssessmentDetails.getCourse_id());
            assessment.setRetention_days(newAssessmentDetails.getRetention_days());
            assessment.setTitle(newAssessmentDetails.getTitle());
            return assessmentRepository.save(assessment);
        }).orElse(null);
    }

    // Delete assessment by ID
    public boolean deleteAssessment(int assessmentId) {
        if (assessmentRepository.existsById(assessmentId)) {
            assessmentRepository.deleteById(assessmentId);
            return true;
        }
        return false;
    }
}
