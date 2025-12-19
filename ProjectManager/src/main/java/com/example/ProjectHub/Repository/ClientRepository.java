package com.example.ProjectHub.Repository;

import com.example.ProjectHub.Model.Client;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ClientRepository extends JpaRepository<Client, Long> {
}
