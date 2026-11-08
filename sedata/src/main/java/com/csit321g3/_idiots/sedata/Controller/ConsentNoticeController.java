package com.csit321g3._idiots.sedata.controller;

import com.csit321g3._idiots.sedata.entity.ConsentNotice;
import com.csit321g3._idiots.sedata.service.ConsentNoticeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/consent_notice")
@CrossOrigin(origins = "*")
public class ConsentNoticeController {

    @Autowired
    private ConsentNoticeService consentNoticeService;

    // Create
    @PostMapping({"", "/add"})
    public ResponseEntity<ConsentNotice> createConsentNotice(@RequestBody ConsentNotice notice) {
        ConsentNotice created = consentNoticeService.createConsentNotice(notice);
        return new ResponseEntity<>(created, HttpStatus.CREATED);
    }

    // Read All
    @GetMapping({"", "/all"})
    public List<ConsentNotice> getAllConsentNotices() {
        return consentNoticeService.getAllConsentNotices();
    }

    // Read by ID
    @GetMapping("/{id}")
    public ResponseEntity<ConsentNotice> getConsentNoticeById(@PathVariable int id) {
        return consentNoticeService.getConsentNoticeById(id)
                .map(notice -> new ResponseEntity<>(notice, HttpStatus.OK))
                .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    // Update
    @PutMapping({"/{id}", "/update/{id}"})
    public ResponseEntity<ConsentNotice> updateConsentNotice(@PathVariable int id, @RequestBody ConsentNotice notice) {
        ConsentNotice updated = consentNoticeService.updateConsentNotice(id, notice);
        if (updated != null) {
            return new ResponseEntity<>(updated, HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    // Delete
    @DeleteMapping({"/{id}", "/delete/{id}"})
    public ResponseEntity<String> deleteConsentNotice(@PathVariable int id) {
        boolean deleted = consentNoticeService.deleteConsentNotice(id);
        if (deleted) {
            return new ResponseEntity<>("Consent notice deleted successfully", HttpStatus.OK);
        }
        return new ResponseEntity<>("Consent notice not found", HttpStatus.NOT_FOUND);
    }
}
