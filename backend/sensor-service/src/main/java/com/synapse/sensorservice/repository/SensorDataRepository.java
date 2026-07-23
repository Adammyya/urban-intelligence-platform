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
