package com.example.ProjectHub.Controller;

import com.example.ProjectHub.Model.ContactForm;
import com.example.ProjectHub.Repository.ContactRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/contacts")
@CrossOrigin(origins = "http://localhost:5173")
public class ContactController {

    private final ContactRepository contactRepository;

    public ContactController(ContactRepository contactRepository) {
        this.contactRepository = contactRepository;
    }

    @PostMapping
    public ContactForm saveContact(@RequestBody ContactForm contact) {
        return contactRepository.save(contact);
    }

    @GetMapping
    public List<ContactForm> getAllContacts() {
        return contactRepository.findAll();
    }
}
