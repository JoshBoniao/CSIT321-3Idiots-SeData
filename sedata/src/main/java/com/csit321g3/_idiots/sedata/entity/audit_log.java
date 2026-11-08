package com.csit321g3._idiots.sedata.entity;
import java.time.LocalDateTime;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
@Entity
@Table(name="tblaudit_log")
public class audit_log {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int log_id;
    private int user_id;
    private String action;
    private String target;
    private LocalDateTime logged_at;
    public audit_log() {
    }

     public audit_log(int log_id, int user_id, String action, String target, LocalDateTime logged_at) {
        this.log_id = log_id;
        this.user_id = user_id;
        this.action = action;
        this.target = target;
        this.logged_at = logged_at;
    }
    public int getLog_id() {
        return log_id;
    }
    public void setLog_id(int log_id) {
        this.log_id = log_id;
    }
    public int getUser_id() {
        return user_id;
    }
    public void setUser_id(int user_id) {
        this.user_id = user_id;
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
    public LocalDateTime getLogged_at() {
        return logged_at;
    }
    public void setLogged_at(LocalDateTime logged_at) {
        this.logged_at = logged_at;
    }
}

