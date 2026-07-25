const { Kafka } = require('kafkajs');

const kafka = new Kafka({
  clientId: 'city-simulator',
  brokers: ['localhost:9092'],
  // Retry mechanism since it might take a few seconds for Kafka to fully boot
  retry: {
    initialRetryTime: 1000,
    retries: 10
  }
});

const producer = kafka.producer();

// Mock Data Generators
const generateSensorReading = (id, type, baseLat, baseLng) => {
  return {
    id,
    type,
    lat: baseLat + (Math.random() - 0.5) * 0.05,
    lng: baseLng + (Math.random() - 0.5) * 0.05,
    timestamp: Date.now(),
    reading: type === 'AIR_QUALITY' 
      ? { aqi: Math.floor(Math.random() * 100), pm25: Math.random() * 20 }
      : { status: 'ONLINE', battery: Math.floor(Math.random() * 100) }
  };
};

const generateTrafficReading = (nodeId) => {
  return {
    nodeId,
    timestamp: Date.now(),
    flowRate: Math.floor(Math.random() * 500) + 100, // vehicles per hour
    avgSpeed: Math.floor(Math.random() * 60) + 10,   // mph
    congestionLevel: Math.random()                   // 0.0 to 1.0
  };
};

const run = async () => {
  console.log('City Simulator initializing...');
  
  await producer.connect();
  console.log('Connected to Kafka Broker [localhost:9092]');

  console.log('Commencing telemetry broadcast...');

  // Send a burst of data every 2 seconds
  setInterval(async () => {
    try {
      const sensorEvents = [
        { value: JSON.stringify(generateSensorReading('S-101', 'AIR_QUALITY', 40.7128, -74.0060)) },
        { value: JSON.stringify(generateSensorReading('S-102', 'INFRASTRUCTURE', 40.7200, -74.0100)) }
      ];

      const trafficEvents = [
        { value: JSON.stringify(generateTrafficReading('T-NODE-A')) },
        { value: JSON.stringify(generateTrafficReading('T-NODE-B')) }
      ];

      await producer.send({
        topic: 'telemetry.sensors',
        messages: sensorEvents,
      });

      await producer.send({
        topic: 'telemetry.traffic',
        messages: trafficEvents,
      });

      console.log(`[${new Date().toISOString()}] Broadcasted 4 telemetry packets to Kafka.`);
    } catch (err) {
      console.error('Error broadcasting telemetry:', err);
    }
  }, 2000);
};

run().catch(console.error);
