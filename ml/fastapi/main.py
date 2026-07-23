from fastapi import FastAPI
from routers import predict

app = FastAPI(title="SYNAPSE ML Inference API", version="1.0.0")

app.include_router(predict.router)

@app.get("/health")
def health_check():
    return {"status": "healthy", "service": "ml-inference"}
