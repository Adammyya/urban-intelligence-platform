import os

base_pkg = r"C:\Users\Dell\Desktop\Adamya\Projects\SYNAPSE\backend\sensor-service\src\main\java\com\synapse\sensorservice"
resources_dir = r"C:\Users\Dell\Desktop\Adamya\Projects\SYNAPSE\backend\sensor-service\src\main\resources"

def write_file(path, content):
    os.makedirs(os.path.dirname(path), exist_ok=True)
    with open(path, "w") as f:
        f.write(content.strip() + "\n")

# application.yml
app_yml = """
server:
  port: 8081

spring:
  application:
    name: sensor-service
  datasource:
    url: jdbc:postgresql://localhost:5432/synapse
    username: synapse_admin
    password: password
  jpa:
    hibernate:
      ddl-auto: validate
    properties:
      hibernate:
        dialect: org.hibernate.dialect.PostgreSQLDialect
"""
write_file(os.path.join(resources_dir, "application.yml"), app_yml)

# Entity: Sensor
sensor_java = """
package com.synapse.sensorservice.entity;

import jakarta.persistence.*;
import java.util.UUID;
import java.time.LocalDateTime;

@Entity
@Table(name = "sensors")
public class Sensor {
    
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;
    
    @Column(nullable = false)
    private String type;
    
    @Column(nullable = false)
    private Double latitude;
    
    @Column(nullable = false)
    private Double longitude;
    
    @Column(nullable = false)
    private String status;
    
    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt = LocalDateTime.now();

    public Sensor() {}

    public UUID getId() { return id; }
    public void setId(UUID id) { this.id = id; }
    public String getType() { return type; }
    public void setType(String type) { this.type = type; }
    public Double getLatitude() { return latitude; }
    public void setLatitude(Double latitude) { this.latitude = latitude; }
    public Double getLongitude() { return longitude; }
    public void setLongitude(Double longitude) { this.longitude = longitude; }
    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
}
"""
write_file(os.path.join(base_pkg, "entity", "Sensor.java"), sensor_java)

# Entity: SensorData
sensor_data_java = """
package com.synapse.sensorservice.entity;

import jakarta.persistence.*;
import java.util.UUID;
import java.time.LocalDateTime;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;

@Entity
@Table(name = "sensor_data")
public class SensorData {
    
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;
    
    @Column(name = "sensor_id", nullable = false)
    private UUID sensorId;
    
    @JdbcTypeCode(SqlTypes.JSON)
    @Column(name = "payload", columnDefinition = "jsonb")
    private String payload;
    
    @Column(nullable = false)
    private LocalDateTime timestamp = LocalDateTime.now();

    public SensorData() {}

    public UUID getId() { return id; }
    public void setId(UUID id) { this.id = id; }
    public UUID getSensorId() { return sensorId; }
    public void setSensorId(UUID sensorId) { this.sensorId = sensorId; }
    public String getPayload() { return payload; }
    public void setPayload(String payload) { this.payload = payload; }
    public LocalDateTime getTimestamp() { return timestamp; }
    public void setTimestamp(LocalDateTime timestamp) { this.timestamp = timestamp; }
}
"""
write_file(os.path.join(base_pkg, "entity", "SensorData.java"), sensor_data_java)

# DTO: SensorDTO
sensor_dto = """
package com.synapse.sensorservice.dto;

import java.util.UUID;
import java.time.LocalDateTime;

public class SensorDTO {
    private UUID id;
    private String type;
    private Double latitude;
    private Double longitude;
    private String status;
    
    public UUID getId() { return id; }
    public void setId(UUID id) { this.id = id; }
    public String getType() { return type; }
    public void setType(String type) { this.type = type; }
    public Double getLatitude() { return latitude; }
    public void setLatitude(Double latitude) { this.latitude = latitude; }
    public Double getLongitude() { return longitude; }
    public void setLongitude(Double longitude) { this.longitude = longitude; }
    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
}
"""
write_file(os.path.join(base_pkg, "dto", "SensorDTO.java"), sensor_dto)

# DTO: SensorDataDTO
sensor_data_dto = """
package com.synapse.sensorservice.dto;

import java.util.UUID;
import java.time.LocalDateTime;

public class SensorDataDTO {
    private UUID id;
    private UUID sensorId;
    private String payload;
    private LocalDateTime timestamp;
    
    public UUID getId() { return id; }
    public void setId(UUID id) { this.id = id; }
    public UUID getSensorId() { return sensorId; }
    public void setSensorId(UUID sensorId) { this.sensorId = sensorId; }
    public String getPayload() { return payload; }
    public void setPayload(String payload) { this.payload = payload; }
    public LocalDateTime getTimestamp() { return timestamp; }
    public void setTimestamp(LocalDateTime timestamp) { this.timestamp = timestamp; }
}
"""
write_file(os.path.join(base_pkg, "dto", "SensorDataDTO.java"), sensor_data_dto)


# Repository: SensorRepository
sensor_repo = """
package com.synapse.sensorservice.repository;

import com.synapse.sensorservice.entity.Sensor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.UUID;

@Repository
public interface SensorRepository extends JpaRepository<Sensor, UUID> {
}
"""
write_file(os.path.join(base_pkg, "repository", "SensorRepository.java"), sensor_repo)

# Repository: SensorDataRepository
sensor_data_repo = """
package com.synapse.sensorservice.repository;

import com.synapse.sensorservice.entity.SensorData;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.UUID;
import java.util.List;

@Repository
public interface SensorDataRepository extends JpaRepository<SensorData, UUID> {
    List<SensorData> findBySensorIdOrderByTimestampDesc(UUID sensorId);
}
"""
write_file(os.path.join(base_pkg, "repository", "SensorDataRepository.java"), sensor_data_repo)


# Controller: SensorController
sensor_controller = """
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
"""
write_file(os.path.join(base_pkg, "controller", "SensorController.java"), sensor_controller)

print("Sensor Service Java files scaffolded successfully.")
