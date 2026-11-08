package com.csit321g3._idiots.sedata.Controller;

import com.csit321g3._idiots.sedata.entity.submission;
import com.csit321g3._idiots.sedata.Service.SubmissionService;
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
    public ResponseEntity<submission> createSubmission(@RequestBody submission sub) {
        submission created = submissionService.createSubmission(sub);
        return new ResponseEntity<>(created, HttpStatus.CREATED);
    }

    // Read All
    @GetMapping({"", "/all"})
    public List<submission> getAllSubmissions() {
        return submissionService.getAllSubmissions();
    }

    // Read by ID
    @GetMapping("/{id}")
    public ResponseEntity<submission> getSubmissionById(@PathVariable int id) {
        return submissionService.getSubmissionById(id)
                .map(sub -> new ResponseEntity<>(sub, HttpStatus.OK))
                .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    // Update
    @PutMapping({"/{id}", "/update/{id}"})
    public ResponseEntity<submission> updateSubmission(@PathVariable int id, @RequestBody submission sub) {
        submission updated = submissionService.updateSubmission(id, sub);
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
