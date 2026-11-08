package com.csit321g3._idiots.sedata.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "tblauditlog")
public class auditLog {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int logId;
    private int userId;
    private String action;
    private String target;
    private String loggedAt;

    public auditLog() {
    }

    public auditLog(int logId, int userId, String action, String target, String loggedAt) {
        this.logId = logId;
        this.userId = userId;
        this.action = action;
        this.target = target;
        this.loggedAt = loggedAt;
    }

    public int getLogId() {
        return logId;
    }

    public void setLogId(int logId) {
        this.logId = logId;
    }

    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }

    public String getAction() {
        return action;
    }

    public void setAction(String action) {
        this.action = action;
    }

    public String getTarget() {
        return target;
    }

    public void setTarget(String target) {
        this.target = target;
    }

    public String getLoggedAt() {
        return loggedAt;
    }

    public void setLoggedAt(String loggedAt) {
        this.loggedAt = loggedAt;
    }
    
}