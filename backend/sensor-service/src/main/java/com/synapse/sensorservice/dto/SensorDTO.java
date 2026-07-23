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
