package com.csit321g3._idiots.sedata.service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.csit321g3._idiots.sedata.entity.AuditLog;
import com.csit321g3._idiots.sedata.repository.AuditLogRepository;

@Service
public class AuditLogService {

    @Autowired
    private AuditLogRepository auditLogRepository;

    public AuditLogService() {
    }

    public AuditLogService(AuditLogRepository auditLogRepository) {
        this.auditLogRepository = auditLogRepository;
    }

    // Create / Insert AuditLog
    public AuditLog createAuditLog(AuditLog auditLog) {
        if (auditLog.getLogged_at() == null) {
            auditLog.setLogged_at(LocalDateTime.now());
        }
        return auditLogRepository.save(auditLog);
    }

    public AuditLog insertAuditLog(AuditLog auditLog) {
        return createAuditLog(auditLog);
    }

    // Read all audit logs
    public List<AuditLog> getAllAuditLogs() {
        return auditLogRepository.findAll();
    }

    // Read audit log by ID
    public Optional<AuditLog> getAuditLogById(int logId) {
        return auditLogRepository.findById(logId);
    }

    // Update audit log
    public AuditLog updateAuditLog(int logId, AuditLog newAuditLogDetails) {
        return auditLogRepository.findById(logId).map(existing -> {
            existing.setUser_id(newAuditLogDetails.getUser_id());
            if (newAuditLogDetails.getAction() != null) {
                existing.setAction(newAuditLogDetails.getAction());
            }
            if (newAuditLogDetails.getTarget() != null) {
                existing.setTarget(newAuditLogDetails.getTarget());
            }
            if (newAuditLogDetails.getLogged_at() != null) {
                existing.setLogged_at(newAuditLogDetails.getLogged_at());
            }
            return auditLogRepository.save(existing);
        }).orElse(null);
    }

    // Delete audit log by ID
    public boolean deleteAuditLog(int logId) {
        if (auditLogRepository.existsById(logId)) {
            auditLogRepository.deleteById(logId);
            return true;
        }
        return false;
    }
}
