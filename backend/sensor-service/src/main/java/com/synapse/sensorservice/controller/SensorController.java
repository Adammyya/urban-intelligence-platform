package com.synapse.sensorservice.controller;

import com.synapse.sensorservice.entity.Sensor;
import com.synapse.sensorservice.entity.SensorData;
import com.synapse.sensorservice.repository.SensorRepository;
import com.synapse.sensorservice.repository.SensorDataRepository;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/sensors")
public class SensorController {

    private final SensorRepository sensorRepository;
    private final SensorDataRepository sensorDataRepository;

    public SensorController(SensorRepository sensorRepository, SensorDataRepository sensorDataRepository) {
        this.sensorRepository = sensorRepository;
        this.sensorDataRepository = sensorDataRepository;
    }

    @GetMapping
    public ResponseEntity<List<Sensor>> getAllSensors() {
        return ResponseEntity.ok(sensorRepository.findAll());
    }

    @GetMapping("/{id}/data")
    public ResponseEntity<List<SensorData>> getSensorData(@PathVariable UUID id) {
        return ResponseEntity.ok(sensorDataRepository.findBySensorIdOrderByTimestampDesc(id));
    }
}
