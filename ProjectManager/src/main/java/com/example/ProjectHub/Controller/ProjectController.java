package com.example.ProjectHub.Controller;

import com.example.ProjectHub.Model.Project;
import com.example.ProjectHub.Service.ProjectService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/api/projects")
@CrossOrigin("*")
public class ProjectController {

    @Autowired
    private ProjectService projectService;

    // Landing Page
    @GetMapping
    public List<Project> fetchProjects() {
        return projectService.getAllProjects();
    }

    // Admin Panel
    @PostMapping
    public Project addProject(
            @RequestParam String projectName,
            @RequestParam String description,
            @RequestParam MultipartFile image
    ) {
        return projectService.addProject(projectName, description, image);
    }
}
