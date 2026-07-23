-- PostgreSQL Schema for SYNAPSE
-- Highly normalized, production-grade schema for smart city platform.

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ==========================================
-- 1. USERS & AUTHENTICATION
-- ==========================================
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role VARCHAR(20) NOT NULL CHECK (role IN ('ADMIN', 'OPERATOR', 'RESEARCHER')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- ==========================================
-- 2. INFRASTRUCTURE (ROADS & SENSORS)
-- ==========================================
CREATE TABLE roads (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(100) NOT NULL,
    type VARCHAR(20) NOT NULL, -- e.g., HIGHWAY, ARTERIAL, LOCAL
    capacity INT,
    status VARCHAR(20) DEFAULT 'ACTIVE',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE sensors (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    road_id UUID REFERENCES roads(id) ON DELETE CASCADE,
    type VARCHAR(50) NOT NULL, -- e.g., CAMERA, RADAR, INDUCTIVE_LOOP
    latitude DECIMAL(10, 8) NOT NULL,
    longitude DECIMAL(11, 8) NOT NULL,
    status VARCHAR(20) DEFAULT 'ONLINE',
    installed_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- ==========================================
-- 3. TIME-SERIES DATA
-- ==========================================
-- In production, this might be a partitioned table (e.g., using pg_partman) or TimescaleDB hypertable
CREATE TABLE sensor_data (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    sensor_id UUID REFERENCES sensors(id) ON DELETE CASCADE,
    vehicle_count INT NOT NULL DEFAULT 0,
    average_speed DECIMAL(5, 2),
    timestamp TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX idx_sensor_data_timestamp ON sensor_data(timestamp);
CREATE INDEX idx_sensor_data_sensor ON sensor_data(sensor_id);

-- ==========================================
-- 4. EVENTS & INCIDENTS
-- ==========================================
CREATE TABLE incidents (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    road_id UUID REFERENCES roads(id) ON DELETE CASCADE,
    type VARCHAR(50) NOT NULL, -- ACCIDENT, CLOSURE, CONSTRUCTION
    severity VARCHAR(20) NOT NULL CHECK (severity IN ('LOW', 'MEDIUM', 'HIGH', 'CRITICAL')),
    description TEXT,
    status VARCHAR(20) DEFAULT 'OPEN',
    reported_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    resolved_at TIMESTAMP WITH TIME ZONE
);

-- ==========================================
-- 5. MACHINE LEARNING
-- ==========================================
CREATE TABLE model_versions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    model_name VARCHAR(100) NOT NULL, -- e.g., XGBoost_Congestion
    version VARCHAR(20) NOT NULL,
    accuracy DECIMAL(5, 4),
    status VARCHAR(20) DEFAULT 'ACTIVE',
    deployed_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE predictions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    model_id UUID REFERENCES model_versions(id),
    road_id UUID REFERENCES roads(id),
    prediction_type VARCHAR(50) NOT NULL, -- CONGESTION, ACCIDENT_PROB
    probability DECIMAL(5, 4) NOT NULL,
    predicted_for TIMESTAMP WITH TIME ZONE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX idx_predictions_road_time ON predictions(road_id, predicted_for);

-- ==========================================
-- 6. INTELLIGENCE & NOTIFICATIONS
-- ==========================================
CREATE TABLE recommendations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    prediction_id UUID REFERENCES predictions(id),
    action_type VARCHAR(50) NOT NULL, -- REROUTE, SIGNAL_TIMING
    description TEXT NOT NULL,
    status VARCHAR(20) DEFAULT 'PENDING',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE alerts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    incident_id UUID REFERENCES incidents(id) NULL,
    recommendation_id UUID REFERENCES recommendations(id) NULL,
    message TEXT NOT NULL,
    level VARCHAR(20) NOT NULL CHECK (level IN ('INFO', 'WARNING', 'CRITICAL')),
    is_read BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- ==========================================
-- 7. ANALYTICS (Data Warehouse / Aggregation)
-- ==========================================
CREATE TABLE analytics_daily (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    road_id UUID REFERENCES roads(id),
    date DATE NOT NULL,
    total_vehicles INT NOT NULL,
    avg_speed DECIMAL(5, 2),
    incidents_count INT DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(road_id, date)
);
