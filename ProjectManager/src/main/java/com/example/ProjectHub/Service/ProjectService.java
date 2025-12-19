package com.example.ProjectHub.Service;

import com.example.ProjectHub.Model.Project;
import com.example.ProjectHub.Repository.ProjectRepository;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Service
public class ProjectService {

    private final ProjectRepository projectRepo;
    private final ImageService imageService;

    public ProjectService(ProjectRepository projectRepo, ImageService imageService) {
        this.projectRepo = projectRepo;
        this.imageService = imageService;
    }

    public Project addProject(String projectName,
                              String description,
                              MultipartFile image) {

        // ✅ SAFETY CHECK
        if (projectName == null || projectName.trim().isEmpty()) {
            throw new RuntimeException("Project name is required");
        }

        String imageUrl = imageService.uploadImage(image);

        // ✅ CORRECT OBJECT CREATION
        Project project = new Project(projectName, description, imageUrl);

        return projectRepo.save(project);
    }

    public List<Project> getAllProjects() {
        return projectRepo.findAll();
    }
}
