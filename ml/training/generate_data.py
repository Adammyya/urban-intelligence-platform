import pandas as pd
import numpy as np
import os

def generate_synthetic_data(num_samples=5000):
    np.random.seed(42)
    
    # Features
    # time_of_day: 0-23
    time_of_day = np.random.randint(0, 24, num_samples)
    
    # weather_severity: 0 (Clear) to 5 (Severe Storm)
    weather_severity = np.random.randint(0, 6, num_samples)
    
    # active_sensors: Number of sensors reporting in the zone (e.g. 5 to 50)
    active_sensors = np.random.randint(5, 51, num_samples)
    
    # historical_flow: average vehicles per hour historically
    historical_flow = np.random.randint(100, 5000, num_samples)
    
    # Target (Congestion Probability 0.0 to 1.0)
    # We create a synthetic relationship where rush hours (7-9, 16-18) and bad weather increase probability
    
    base_prob = np.random.uniform(0.0, 0.3, num_samples)
    
    # Rush hour impact
    rush_hour_mask = ((time_of_day >= 7) & (time_of_day <= 9)) | ((time_of_day >= 16) & (time_of_day <= 18))
    base_prob[rush_hour_mask] += 0.4
    
    # Weather impact
    base_prob += (weather_severity * 0.08)
    
    # High flow impact
    base_prob += (historical_flow / 5000.0) * 0.2
    
    # Cap between 0 and 1
    congestion_prob = np.clip(base_prob, 0.0, 1.0)
    
    # Convert to binary target for classification (is_congested: 1 if prob > 0.6 else 0)
    is_congested = (congestion_prob > 0.6).astype(int)
    
    df = pd.DataFrame({
        'time_of_day': time_of_day,
        'weather_severity': weather_severity,
        'active_sensors': active_sensors,
        'historical_flow': historical_flow,
        'is_congested': is_congested
    })
    
    # Save to CSV
    output_dir = os.path.dirname(os.path.abspath(__file__))
    output_path = os.path.join(output_dir, 'synthetic_traffic_data.csv')
    df.to_csv(output_path, index=False)
    print(f"Generated {num_samples} samples of synthetic data at {output_path}")

if __name__ == "__main__":
    generate_synthetic_data()
