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
