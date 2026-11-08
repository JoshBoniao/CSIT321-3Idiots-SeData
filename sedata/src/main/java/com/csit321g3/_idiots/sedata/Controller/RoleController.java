package com.csit321g3._idiots.sedata.controller;

import com.csit321g3._idiots.sedata.entity.Role;
import com.csit321g3._idiots.sedata.service.RoleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/role")
@CrossOrigin(origins = "*")
public class RoleController {

    @Autowired
    private RoleService roleService;

    // Create
    @PostMapping({"", "/add"})
    public ResponseEntity<Role> createRole(@RequestBody Role role) {
        Role created = roleService.createRole(role);
        return new ResponseEntity<>(created, HttpStatus.CREATED);
    }

    // Read All
    @GetMapping({"", "/all"})
    public List<Role> getAllRoles() {
        return roleService.getAllRoles();
    }

    // Read by ID
    @GetMapping("/{id}")
    public ResponseEntity<Role> getRoleById(@PathVariable int id) {
        return roleService.getRoleById(id)
                .map(role -> new ResponseEntity<>(role, HttpStatus.OK))
                .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    // Update
    @PutMapping({"/{id}", "/update/{id}"})
    public ResponseEntity<Role> updateRole(@PathVariable int id, @RequestBody Role role) {
        Role updated = roleService.updateRole(id, role);
        if (updated != null) {
            return new ResponseEntity<>(updated, HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    // Delete
    @DeleteMapping({"/{id}", "/delete/{id}"})
    public ResponseEntity<String> deleteRole(@PathVariable int id) {
        boolean deleted = roleService.deleteRole(id);
        if (deleted) {
            return new ResponseEntity<>("Role deleted successfully", HttpStatus.OK);
        }
        return new ResponseEntity<>("Role not found", HttpStatus.NOT_FOUND);
    }
}
