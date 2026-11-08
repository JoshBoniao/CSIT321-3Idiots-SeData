package com.csit321g3._idiots.sedata.Service;

import com.csit321g3._idiots.sedata.entity.submission;
import com.csit321g3._idiots.sedata.Repository.SubmissionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class SubmissionService {

    @Autowired
    private SubmissionRepository submissionRepository;

    // Create
    public submission createSubmission(submission sub) {
        if (sub.getSubmitted_at() == null) {
            sub.setSubmitted_at(LocalDateTime.now());
        }
        return submissionRepository.save(sub);
    }

    // Read All
    public List<submission> getAllSubmissions() {
        return submissionRepository.findAll();
    }

    // Read by ID
    public Optional<submission> getSubmissionById(int id) {
        return submissionRepository.findById(id);
    }

    // Update
    public submission updateSubmission(int id, submission newSub) {
        return submissionRepository.findById(id).map(existing -> {
            existing.setAssessment_id(newSub.getAssessment_id());
            existing.setStudent_id(newSub.getStudent_id());
            existing.setConsent_id(newSub.getConsent_id());
            if (newSub.getEncrypted_data() != null) {
                existing.setEncrypted_data(newSub.getEncrypted_data());
            }
            if (newSub.getSubmitted_at() != null) {
                existing.setSubmitted_at(newSub.getSubmitted_at());
            }
            return submissionRepository.save(existing);
        }).orElse(null);
    }

    // Delete
    public boolean deleteSubmission(int id) {
        if (submissionRepository.existsById(id)) {
            submissionRepository.deleteById(id);
            return true;
        }
        return false;
    }
}
