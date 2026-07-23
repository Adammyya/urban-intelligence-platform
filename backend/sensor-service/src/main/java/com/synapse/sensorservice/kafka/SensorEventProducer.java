package com.synapse.sensorservice.kafka;

import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;

@Service
public class SensorEventProducer {

    private static final String TOPIC = "sensor-telemetry-events";
    private final KafkaTemplate<String, Object> kafkaTemplate;

    public SensorEventProducer(KafkaTemplate<String, Object> kafkaTemplate) {
        this.kafkaTemplate = kafkaTemplate;
    }

    public void sendSensorData(Object sensorData) {
        kafkaTemplate.send(TOPIC, sensorData);
        System.out.println("Produced sensor data to topic: " + TOPIC);
    }
}
