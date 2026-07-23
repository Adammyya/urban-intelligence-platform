from fastapi import APIRouter
from pydantic import BaseModel
import xgboost as xgb
import os

router = APIRouter(prefix="/predict", tags=["Predictions"])

# Define the request schema
class CongestionFeatures(BaseModel):
    road_id: str
    time_of_day: int
    weather_severity: int
    active_sensors: int
    historical_flow: int

# Load the model dynamically
model = None
model_path = os.path.join(os.path.dirname(__file__), '..', '..', 'saved_models', 'xgboost_congestion_v1.json')

def load_model():
    global model
    if model is None and os.path.exists(model_path):
        model = xgb.XGBClassifier()
        model.load_model(model_path)
        print("XGBoost model loaded successfully.")

@router.on_event("startup")
async def startup_event():
    load_model()

@router.post("/congestion")
def predict_congestion(features: CongestionFeatures):
    if model is None:
        load_model()
        
    if model is None:
        # Fallback if model doesn't exist yet
        return {"error": "Model not found. Please train the model first."}
        
    # Prepare features for prediction (2D array)
    input_data = [[
        features.time_of_day, 
        features.weather_severity, 
        features.active_sensors, 
        features.historical_flow
    ]]
    
    # predict_proba returns [[prob_0, prob_1]]
    probabilities = model.predict_proba(input_data)
    congestion_prob = float(probabilities[0][1])
    
    return {
        "road_id": features.road_id, 
        "congestion_probability": round(congestion_prob, 4), 
        "prediction_type": "CONGESTION",
        "model_version": "xgboost_v1"
    }

@router.post("/accident")
def predict_accident(road_id: str):
    # Placeholder for Accident Prediction
    return {"road_id": road_id, "accident_probability": 0.12, "prediction_type": "ACCIDENT_PROB"}
