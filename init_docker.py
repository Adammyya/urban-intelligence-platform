import os

def write_file(path, content):
    os.makedirs(os.path.dirname(path), exist_ok=True)
    with open(path, "w") as f:
        f.write(content.strip() + "\n")

java_dockerfile = """
FROM maven:3.9.6-eclipse-temurin-21-alpine AS build
WORKDIR /app
COPY pom.xml .
RUN mvn dependency:go-offline
COPY src ./src
RUN mvn clean package -DskipTests

FROM eclipse-temurin:21-jre-alpine
WORKDIR /app
COPY --from=build /app/target/*.jar app.jar
ENTRYPOINT ["java", "-jar", "app.jar"]
"""

write_file(r"C:\Users\Dell\Desktop\Adamya\Projects\SYNAPSE\backend\auth-service\Dockerfile", java_dockerfile)
write_file(r"C:\Users\Dell\Desktop\Adamya\Projects\SYNAPSE\backend\gateway-service\Dockerfile", java_dockerfile)
write_file(r"C:\Users\Dell\Desktop\Adamya\Projects\SYNAPSE\backend\sensor-service\Dockerfile", java_dockerfile)
write_file(r"C:\Users\Dell\Desktop\Adamya\Projects\SYNAPSE\backend\prediction-service\Dockerfile", java_dockerfile)

fastapi_dockerfile = """
FROM python:3.10-slim
WORKDIR /app
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
COPY . .
EXPOSE 8000
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
"""
write_file(r"C:\Users\Dell\Desktop\Adamya\Projects\SYNAPSE\ml\fastapi\Dockerfile", fastapi_dockerfile)

frontend_dockerfile = """
FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
# SPA configuration for nginx
RUN echo 'server { \\
    listen 80; \\
    location / { \\
        root /usr/share/nginx/html; \\
        index index.html index.htm; \\
        try_files $uri $uri/ /index.html; \\
    } \\
}' > /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
"""
write_file(r"C:\Users\Dell\Desktop\Adamya\Projects\SYNAPSE\frontend\Dockerfile", frontend_dockerfile)

docker_compose = """
version: '3.8'

services:
  zookeeper:
    image: confluentinc/cp-zookeeper:7.4.4
    environment:
      ZOOKEEPER_CLIENT_PORT: 2181
      ZOOKEEPER_TICK_TIME: 2000
    networks:
      - synapse-network

  kafka:
    image: confluentinc/cp-kafka:7.4.4
    depends_on:
      - zookeeper
    ports:
      - "9092:9092"
    environment:
      KAFKA_BROKER_ID: 1
      KAFKA_ZOOKEEPER_CONNECT: 'zookeeper:2181'
      KAFKA_LISTENER_SECURITY_PROTOCOL_MAP: PLAINTEXT:PLAINTEXT,PLAINTEXT_HOST:PLAINTEXT
      KAFKA_ADVERTISED_LISTENERS: PLAINTEXT://kafka:29092,PLAINTEXT_HOST://localhost:9092
      KAFKA_OFFSETS_TOPIC_REPLICATION_FACTOR: 1
      KAFKA_GROUP_INITIAL_REBALANCE_DELAY_MS: 0
    networks:
      - synapse-network

  postgres:
    image: postgres:15-alpine
    environment:
      POSTGRES_USER: admin
      POSTGRES_PASSWORD: password
      POSTGRES_DB: synapse
    ports:
      - "5432:5432"
    volumes:
      - pgdata:/var/lib/postgresql/data
    networks:
      - synapse-network

  redis:
    image: redis:7-alpine
    ports:
      - "6379:6379"
    networks:
      - synapse-network

  auth-service:
    build: ./backend/auth-service
    ports:
      - "8083:8083"
    environment:
      - JWT_SECRET=${JWT_SECRET:-default-secret-key-that-must-be-at-least-256-bits}
    networks:
      - synapse-network

  sensor-service:
    build: ./backend/sensor-service
    ports:
      - "8081:8081"
    environment:
      - SPRING_KAFKA_BOOTSTRAP-SERVERS=kafka:29092
      - SPRING_DATASOURCE_URL=jdbc:postgresql://postgres:5432/synapse
      - SPRING_DATASOURCE_USERNAME=admin
      - SPRING_DATASOURCE_PASSWORD=password
    depends_on:
      - kafka
      - postgres
    networks:
      - synapse-network

  prediction-service:
    build: ./backend/prediction-service
    ports:
      - "8082:8082"
    environment:
      - SPRING_KAFKA_BOOTSTRAP-SERVERS=kafka:29092
      - PREDICTION_API_URL=http://ml-engine:8000
    depends_on:
      - kafka
      - ml-engine
    networks:
      - synapse-network

  gateway-service:
    build: ./backend/gateway-service
    ports:
      - "8080:8080"
    environment:
      - JWT_SECRET=${JWT_SECRET:-default-secret-key-that-must-be-at-least-256-bits}
    depends_on:
      - auth-service
      - sensor-service
      - prediction-service
    networks:
      - synapse-network

  ml-engine:
    build: ./ml/fastapi
    ports:
      - "8000:8000"
    volumes:
      - ./ml/saved_models:/app/saved_models
    networks:
      - synapse-network

  frontend:
    build: ./frontend
    ports:
      - "5173:80"
    networks:
      - synapse-network

networks:
  synapse-network:
    driver: bridge

volumes:
  pgdata:
"""
write_file(r"C:\Users\Dell\Desktop\Adamya\Projects\SYNAPSE\docker-compose.yml", docker_compose)

print("Dockerization files generated successfully.")
