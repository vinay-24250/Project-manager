package com.example.ProjectHub.Service;

import com.example.ProjectHub.Model.Client;
import com.example.ProjectHub.Repository.ClientRepository;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Service
public class ClientService {

    private final ClientRepository clientRepo;
    private final ImageService imageService;

    public ClientService(ClientRepository clientRepo, ImageService imageService) {
        this.clientRepo = clientRepo;
        this.imageService = imageService;
    }

    public Client addClient(String clientName,
                            String designation,
                            String description,
                            MultipartFile image) {

        String imageUrl = imageService.uploadImage(image);

        Client client = new Client(
                clientName,
                designation,
                description,
                imageUrl
        );

        return clientRepo.save(client);
    }

    public List<Client> getAllClients() {
        return clientRepo.findAll();
    }
}
