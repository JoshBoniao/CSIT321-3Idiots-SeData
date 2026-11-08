package com.csit321g3._idiots.sedata.service;

import com.csit321g3._idiots.sedata.entity.Role;
import com.csit321g3._idiots.sedata.repository.RoleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class RoleService {

    @Autowired
    private RoleRepository roleRepository;

    // Create
    public Role createRole(Role role) {
        return roleRepository.save(role);
    }

    // Read All
    public List<Role> getAllRoles() {
        return roleRepository.findAll();
    }

    // Read by ID
    public Optional<Role> getRoleById(int id) {
        return roleRepository.findById(id);
    }

    // Update
    public Role updateRole(int id, Role newRole) {
        return roleRepository.findById(id).map(existingRole -> {
            existingRole.setRole_name(newRole.getRole_name());
            return roleRepository.save(existingRole);
        }).orElse(null);
    }

    // Delete
    public boolean deleteRole(int id) {
        if (roleRepository.existsById(id)) {
            roleRepository.deleteById(id);
            return true;
        }
        return false;
    }
}
