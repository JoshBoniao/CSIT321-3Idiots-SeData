package com.csit321g3._idiots.sedata.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.csit321g3._idiots.sedata.entity.User;
import com.csit321g3._idiots.sedata.repository.UserRepository;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public UserService() {
    }

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    // Create / Insert User
    public User createUser(User user) {
        return userRepository.save(user);
    }

    public User insertUser(User user) {
        return createUser(user);
    }

    // Read all users
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    // Read user by ID
    public Optional<User> getUserById(int userId) {
        return userRepository.findById(userId);
    }

    // Update user
    public User updateUser(int userId, User newUserDetails) {
        return userRepository.findById(userId).map(user -> {
            user.setRole_id(newUserDetails.getRole_id());
            if (newUserDetails.getFull_name() != null) {
                user.setFull_name(newUserDetails.getFull_name());
            }
            if (newUserDetails.getEmail() != null) {
                user.setEmail(newUserDetails.getEmail());
            }
            if (newUserDetails.getPassword_hash() != null) {
                user.setPassword_hash(newUserDetails.getPassword_hash());
            }
            return userRepository.save(user);
        }).orElse(null);
    }

    // Delete user by ID
    public boolean deleteUser(int userId) {
        if (userRepository.existsById(userId)) {
            userRepository.deleteById(userId);
            return true;
        }
        return false;
    }
}
