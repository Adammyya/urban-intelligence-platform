import http.server
import socketserver
import json
import random
import time

PORT = 5000

class SynapseAIHandler(http.server.SimpleHTTPRequestHandler):
    def do_OPTIONS(self):
        self.send_response(200, "ok")
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, OPTIONS')
        self.send_header("Access-Control-Allow-Headers", "X-Requested-With")
        self.send_header("Access-Control-Allow-Headers", "Content-Type")
        self.end_headers()

    def do_GET(self):
        if self.path == '/api/v1/predict':
            self.send_response(200)
            self.send_header('Content-Type', 'application/json')
            self.send_header('Access-Control-Allow-Origin', '*')
            self.end_headers()

            # Simulate an ML Heuristic Model processing current city telemetry
            time_factor = (int(time.time()) % 100) / 100.0  # 0.0 to 1.0

            predictions = [
                {
                    "id": "pred-1",
                    "model": "XGBoost-Grid",
                    "target": "Sector 7 Substation",
                    "probability": round(0.60 + (random.random() * 0.3) + (time_factor * 0.05), 2),
                    "impact": "CRITICAL",
                    "description": "High probability of cascading grid failure due to cascading load distribution anomalies."
                },
                {
                    "id": "pred-2",
                    "model": "TrafficNet-v4",
                    "target": "Route 4 & I-95",
                    "probability": round(0.40 + (random.random() * 0.4), 2),
                    "impact": "WARNING",
                    "description": "Impending gridlock predicted within 45 minutes based on current vehicle ingress rates."
                },
                {
                    "id": "pred-3",
                    "model": "Enviro-Heuristic",
                    "target": "Industrial Park Airspace",
                    "probability": round(0.85 + (random.random() * 0.1), 2),
                    "impact": "CRITICAL",
                    "description": "PM2.5 saturation likely to breach toxic thresholds if wind vectors remain constant."
                }
            ]

            response = {
                "status": "success",
                "timestamp": int(time.time()),
                "inferences": predictions
            }
            
            self.wfile.write(json.dumps(response).encode())
        else:
            self.send_response(404)
            self.end_headers()

if __name__ == "__main__":
    with socketserver.TCPServer(("", PORT), SynapseAIHandler) as httpd:
        print(f"[SYNAPSE NEURAL ENGINE] Artificial Intelligence Engine online.")
        print(f"[SYNAPSE NEURAL ENGINE] Serving inference API on port {PORT}")
        httpd.serve_forever()
