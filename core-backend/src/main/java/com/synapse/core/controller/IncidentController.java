package com.synapse.core.controller;

import com.synapse.core.model.Incident;
import com.synapse.core.repository.IncidentRepository;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Arrays;
import java.util.List;

@RestController
@RequestMapping("/api/v1/incidents")
public class IncidentController {

    @Autowired
    private IncidentRepository incidentRepository;

    @PostConstruct
    public void seedData() {
        if (incidentRepository.count() == 0) {
            incidentRepository.saveAll(Arrays.asList(
                new Incident("INC-991", "POWER_GRID_FAILURE", "CRITICAL", 40.7128, -74.0060, "Sector 7 Substation cascading failure detected. 40,000 without power.", System.currentTimeMillis()),
                new Incident("INC-992", "TRAFFIC_COLLISION", "WARNING", 40.7300, -73.9900, "Multi-vehicle collision blocking 3 lanes on Route 4.", System.currentTimeMillis()),
                new Incident("INC-993", "AIR_TOXICITY", "CRITICAL", 40.7145, -74.0080, "Chemical spill detected at industrial park. PM2.5 levels exceeding safe limits.", System.currentTimeMillis())
            ));
            System.out.println("[SYNAPSE CORE BACKEND] Seeded mock incidents into H2 database.");
        }
    }

    @GetMapping
    public List<Incident> getAllIncidents() {
        return incidentRepository.findAll();
    }
}
