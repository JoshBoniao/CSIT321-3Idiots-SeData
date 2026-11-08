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

import com.csit321g3._idiots.sedata.entity.AuditLog;
import com.csit321g3._idiots.sedata.service.AuditLogService;

@RestController
@RequestMapping(value = {"/auditlog", "/auditLog", "/audit_log"})
@CrossOrigin(origins = "*")
public class AuditLogController {

    @Autowired
    private AuditLogService auditLogService;

    public AuditLogController() {
    }

    public AuditLogController(AuditLogService auditLogService) {
        this.auditLogService = auditLogService;
    }

    // Create a new audit log
    @PostMapping(value = {"", "/add", "/createAuditLog", "/insertAuditLog", "/log"})
    public ResponseEntity<AuditLog> createAuditLog(@RequestBody AuditLog auditLog) {
        AuditLog createdAuditLog = auditLogService.createAuditLog(auditLog);
        return new ResponseEntity<>(createdAuditLog, HttpStatus.CREATED);
    }

    // Get all audit logs
    @GetMapping(value = {"", "/all", "/getAllAuditLogs", "/getAllLogs"})
    public ResponseEntity<List<AuditLog>> getAllAuditLogs() {
        List<AuditLog> auditLogs = auditLogService.getAllAuditLogs();
        return ResponseEntity.ok(auditLogs);
    }

    // Get an audit log by ID
    @GetMapping(value = {"/{id}", "/getAuditLogById/{id}", "/getLogById/{id}"})
    public ResponseEntity<AuditLog> getAuditLogById(@PathVariable int id) {
        return auditLogService.getAuditLogById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // Update an audit log by ID
    @PutMapping(value = {"/{id}", "/update/{id}", "/updateAuditLog/{id}"})
    public ResponseEntity<AuditLog> updateAuditLog(@PathVariable int id, @RequestBody AuditLog auditLog) {
        AuditLog updatedAuditLog = auditLogService.updateAuditLog(id, auditLog);
        if (updatedAuditLog != null) {
            return ResponseEntity.ok(updatedAuditLog);
        }
        return ResponseEntity.notFound().build();
    }

    // Delete an audit log by ID
    @DeleteMapping(value = {"/{id}", "/delete/{id}", "/deleteAuditLog/{id}"})
    public ResponseEntity<String> deleteAuditLog(@PathVariable int id) {
        boolean deleted = auditLogService.deleteAuditLog(id);
        if (deleted) {
            return ResponseEntity.ok("Audit log with ID " + id + " has been successfully deleted.");
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Audit log with ID " + id + " not found.");
    }
}
