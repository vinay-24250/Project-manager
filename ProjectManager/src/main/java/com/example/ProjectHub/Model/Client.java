package com.example.ProjectHub.Model;

import jakarta.persistence.*;

@Entity
@Table(name = "clients")
public class Client {
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getClientName() {
        return clientName;
    }

    public void setClientName(String clientName) {
        this.clientName = clientName;
    }

    public String getDesignation() {
        return designation;
    }

    public void setDesignation(String designation) {
        this.designation = designation;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String clientName;

    private String designation;

    @Column(length = 1000)
    private String description;

    @Column(name = "image_url")
    private String imageUrl;

    public Client() {}

    public Client(String clientName, String designation, String description, String imageUrl) {
        this.clientName = clientName;
        this.designation = designation;
        this.description = description;
        this.imageUrl = imageUrl;
    }

}
