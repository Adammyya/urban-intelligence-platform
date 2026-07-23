package com.synapse.predictionservice.kafka;

import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

@Service
public class SensorEventConsumer {

    @KafkaListener(topics = "sensor-telemetry-events", groupId = "synapse-prediction-group")
    public void consumeSensorData(Object sensorData) {
        System.out.println("Consumed sensor data from Kafka topic: " + sensorData.toString());
        // Here we would eventually invoke the Python FastAPI ML microservice 
        // to get a prediction based on this sensor data.
    }
}
