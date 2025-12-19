package com.example.ProjectHub.Controller;

import com.example.ProjectHub.Model.Subscriber;
import com.example.ProjectHub.Repository.SubscriberRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/subscribers")
@CrossOrigin("*")
public class SubscriberController {

    private final SubscriberRepository subscriberRepository;

    public SubscriberController(SubscriberRepository subscriberRepository) {
        this.subscriberRepository = subscriberRepository;
    }

    @PostMapping
    public Subscriber subscribe(@RequestBody Subscriber subscriber) {

        return subscriberRepository
                .findByEmail(subscriber.getEmail())
                .orElseGet(() -> subscriberRepository.save(subscriber));
    }

    @GetMapping
    public List<Subscriber> getAllSubscribers() {
        return subscriberRepository.findAll();
    }
}
