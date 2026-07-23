import pandas as pd
import xgboost as xgb
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score, classification_report
import os
import json

def train():
    current_dir = os.path.dirname(os.path.abspath(__file__))
    data_path = os.path.join(current_dir, 'synthetic_traffic_data.csv')
    
    if not os.path.exists(data_path):
        print(f"Data file not found at {data_path}. Run generate_data.py first.")
        return
        
    print("Loading dataset...")
    df = pd.read_csv(data_path)
    
    X = df[['time_of_day', 'weather_severity', 'active_sensors', 'historical_flow']]
    y = df['is_congested']
    
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
    
    print("Training XGBoost Classifier...")
    model = xgb.XGBClassifier(
        n_estimators=100,
        max_depth=5,
        learning_rate=0.1,
        objective='binary:logistic',
        eval_metric='logloss'
    )
    
    model.fit(X_train, y_train)
    
    print("Evaluating model...")
    y_pred = model.predict(X_test)
    accuracy = accuracy_score(y_test, y_pred)
    print(f"Accuracy: {accuracy:.4f}")
    print("Classification Report:")
    print(classification_report(y_test, y_pred))
    
    # Save model
    models_dir = os.path.abspath(os.path.join(current_dir, '..', 'saved_models'))
    os.makedirs(models_dir, exist_ok=True)
    model_path = os.path.join(models_dir, 'xgboost_congestion_v1.json')
    
    model.save_model(model_path)
    print(f"Model successfully saved to {model_path}")

if __name__ == "__main__":
    train()
