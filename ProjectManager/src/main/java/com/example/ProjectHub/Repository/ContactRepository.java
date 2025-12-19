package com.example.ProjectHub.Repository;

import com.example.ProjectHub.Model.ContactForm;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ContactRepository extends JpaRepository<ContactForm ,Long> {
}
