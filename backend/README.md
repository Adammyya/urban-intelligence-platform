# Backend Services

This directory contains all Spring Boot microservices for the SYNAPSE platform. Each service is independently deployable and scalable.

## Purpose
Provide robust, secure, and scalable REST APIs, handle authentication, process data streams, and serve as the intermediary between the frontend and data layers.

## Responsibility
Business logic, data persistence, and API orchestration.

## Technologies
Java 21, Spring Boot, Spring Cloud Gateway, Hibernate, PostgreSQL, Redis, Apache Kafka.

## Scalability
Microservices can be scaled horizontally and deployed independently. `common` library ensures DRY principles.
