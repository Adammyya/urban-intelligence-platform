import os

def write_file(path, content):
    os.makedirs(os.path.dirname(path), exist_ok=True)
    with open(path, "w") as f:
        f.write(content.strip() + "\n")

# 1. SensorEventProducer in sensor-service
sensor_producer = """
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
"""
write_file(r"C:\Users\Dell\Desktop\Adamya\Projects\SYNAPSE\backend\sensor-service\src\main\java\com\synapse\sensorservice\kafka\SensorEventProducer.java", sensor_producer)

# 2. PredictionApplication in prediction-service
prediction_app = """
package com.synapse.predictionservice;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class PredictionApplication {
    public static void main(String[] args) {
        SpringApplication.run(PredictionApplication.class, args);
    }
}
"""
write_file(r"C:\Users\Dell\Desktop\Adamya\Projects\SYNAPSE\backend\prediction-service\src\main\java\com\synapse\predictionservice\PredictionApplication.java", prediction_app)

# 3. application.yml in prediction-service
prediction_yml = """
server:
  port: 8082

spring:
  application:
    name: prediction-service
  kafka:
    bootstrap-servers: localhost:9092
    consumer:
      group-id: synapse-prediction-group
      auto-offset-reset: earliest
      key-deserializer: org.apache.kafka.common.serialization.StringDeserializer
      value-deserializer: org.springframework.kafka.support.serializer.JsonDeserializer
      properties:
        spring.json.trusted.packages: "*"
"""
write_file(r"C:\Users\Dell\Desktop\Adamya\Projects\SYNAPSE\backend\prediction-service\src\main\resources\application.yml", prediction_yml)

# 4. SensorEventConsumer in prediction-service
prediction_consumer = """
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
"""
write_file(r"C:\Users\Dell\Desktop\Adamya\Projects\SYNAPSE\backend\prediction-service\src\main\java\com\synapse\predictionservice\kafka\SensorEventConsumer.java", prediction_consumer)

print("Kafka implementation files generated successfully.")
