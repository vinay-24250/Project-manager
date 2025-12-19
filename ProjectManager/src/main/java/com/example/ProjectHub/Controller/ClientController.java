package com.example.ProjectHub.Controller;

import com.example.ProjectHub.Model.Client;
import com.example.ProjectHub.Service.ClientService;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/api/clients")
@CrossOrigin("*")
public class ClientController {

    private final ClientService clientService;

    public ClientController(ClientService clientService) {
        this.clientService = clientService;
    }

    @GetMapping
    public List<Client> getClients() {
        return clientService.getAllClients();
    }

    @PostMapping(value = "/admin", consumes = "multipart/form-data")
    public Client addClient(
            @RequestParam("clientName") String clientName,
            @RequestParam("designation") String designation,
            @RequestParam("description") String description,
            @RequestParam("image") MultipartFile image
    ) {
        return clientService.addClient(
                clientName,
                designation,
                description,
                image
        );
    }
}
