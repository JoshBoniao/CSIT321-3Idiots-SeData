package com.csit321g3._idiots.sedata.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "tbluser")
public class User {

    @Id 
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int user_id;
    private int role_id;
    private String full_name;
    private String email;
    private String password_hash;

    public User() {
    }

    public User(int role_id, String full_name, String email, String password_hash) {
        this.role_id = role_id;
        this.full_name = full_name;
        this.email = email;
        this.password_hash = password_hash;
    }

    public User(int user_id, int role_id, String full_name, String email, String password_hash) {
        this.user_id = user_id;
        this.role_id = role_id;
        this.full_name = full_name;
        this.email = email;
        this.password_hash = password_hash;
    }

    // Standard snake_case getters and setters matching ERD
    public int getUser_id() {
        return user_id;
    }

    public void setUser_id(int user_id) {
        this.user_id = user_id;
    }

    public int getRole_id() {
        return role_id;
    }

    public void setRole_id(int role_id) {
        this.role_id = role_id;
    }

    public String getFull_name() {
        return full_name;
    }

    public void setFull_name(String full_name) {
        this.full_name = full_name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword_hash() {
        return password_hash;
    }

    public void setPassword_hash(String password_hash) {
        this.password_hash = password_hash;
    }

    // CamelCase alias getters and setters for compatibility
    public int getUserId() {
        return user_id;
    }

    public void setUserId(int userId) {
        this.user_id = userId;
    }

    public int getRoleId() {
        return role_id;
    }

    public void setRoleId(int roleId) {
        this.role_id = roleId;
    }

    public String getFullName() {
        return full_name;
    }

    public void setFullName(String fullName) {
        this.full_name = fullName;
    }

    public String getPasswordHash() {
        return password_hash;
    }

    public void setPasswordHash(String passwordHash) {
        this.password_hash = passwordHash;
    }
}
