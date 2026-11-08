package com.csit321g3._idiots.sedata.controller;

import com.csit321g3._idiots.sedata.entity.Submission;
import com.csit321g3._idiots.sedata.service.SubmissionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/submission")
@CrossOrigin(origins = "*")
public class SubmissionController {

    @Autowired
    private SubmissionService submissionService;

    // Create
    @PostMapping({"", "/add"})
    public ResponseEntity<Submission> createSubmission(@RequestBody Submission sub) {
        Submission created = submissionService.createSubmission(sub);
        return new ResponseEntity<>(created, HttpStatus.CREATED);
    }

    // Read All
    @GetMapping({"", "/all"})
    public List<Submission> getAllSubmissions() {
        return submissionService.getAllSubmissions();
    }

    // Read by ID
    @GetMapping("/{id}")
    public ResponseEntity<Submission> getSubmissionById(@PathVariable int id) {
        return submissionService.getSubmissionById(id)
                .map(sub -> new ResponseEntity<>(sub, HttpStatus.OK))
                .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    // Update
    @PutMapping({"/{id}", "/update/{id}"})
    public ResponseEntity<Submission> updateSubmission(@PathVariable int id, @RequestBody Submission sub) {
        Submission updated = submissionService.updateSubmission(id, sub);
        if (updated != null) {
            return new ResponseEntity<>(updated, HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    // Delete
    @DeleteMapping({"/{id}", "/delete/{id}"})
    public ResponseEntity<String> deleteSubmission(@PathVariable int id) {
        boolean deleted = submissionService.deleteSubmission(id);
        if (deleted) {
            return new ResponseEntity<>("Submission deleted successfully", HttpStatus.OK);
        }
        return new ResponseEntity<>("Submission not found", HttpStatus.NOT_FOUND);
    }
}
