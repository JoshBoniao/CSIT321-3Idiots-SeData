package com.csit321g3._idiots.sedata.Controller;

import com.csit321g3._idiots.sedata.entity.consent_record;
import com.csit321g3._idiots.sedata.Service.ConsentRecordService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/consent_record")
@CrossOrigin(origins = "*")
public class ConsentRecordController {

    @Autowired
    private ConsentRecordService consentRecordService;

    // Create
    @PostMapping({"", "/add"})
    public ResponseEntity<consent_record> createConsentRecord(@RequestBody consent_record record) {
        consent_record created = consentRecordService.createConsentRecord(record);
        return new ResponseEntity<>(created, HttpStatus.CREATED);
    }

    // Read All
    @GetMapping({"", "/all"})
    public List<consent_record> getAllConsentRecords() {
        return consentRecordService.getAllConsentRecords();
    }

    // Read by ID
    @GetMapping("/{id}")
    public ResponseEntity<consent_record> getConsentRecordById(@PathVariable int id) {
        return consentRecordService.getConsentRecordById(id)
                .map(record -> new ResponseEntity<>(record, HttpStatus.OK))
                .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    // Update
    @PutMapping({"/{id}", "/update/{id}"})
    public ResponseEntity<consent_record> updateConsentRecord(@PathVariable int id, @RequestBody consent_record record) {
        consent_record updated = consentRecordService.updateConsentRecord(id, record);
        if (updated != null) {
            return new ResponseEntity<>(updated, HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    // Delete
    @DeleteMapping({"/{id}", "/delete/{id}"})
    public ResponseEntity<String> deleteConsentRecord(@PathVariable int id) {
        boolean deleted = consentRecordService.deleteConsentRecord(id);
        if (deleted) {
            return new ResponseEntity<>("Consent record deleted successfully", HttpStatus.OK);
        }
        return new ResponseEntity<>("Consent record not found", HttpStatus.NOT_FOUND);
    }
}
