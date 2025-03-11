from flask import Flask, request, jsonify
import requests
from flask_cors import CORS

app = Flask(__name__)
CORS(app) 

EDEN_AI_API_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNDUyNmVlMDQtZmZjNC00NWJlLWEzN2QtODQ2MTQ2N2YxOGQyIiwidHlwZSI6ImFwaV90b2tlbiJ9.ahpqLOxhAt9klr7Ceg2KjthEdeJFDDQVXxkSZiVszKY"

@app.route('/ask', methods=['POST'])
def ask():
    data = request.get_json()
    user_input = data.get('question')

    headers = {
        'Authorization': f'Bearer {EDEN_AI_API_KEY}',
        'Content-Type': 'application/json'
    }

    payload = {
        "providers": "openai",  
        "text": user_input,
    }

    response = requests.post(
        "https://api.edenai.run/v2/text/generation",
        headers=headers,
        json=payload
    )

    if response.status_code == 200:
        response_data = response.json()
        # Parse response as needed, for example:
        generated_text = response_data['openai']['generated_text']
        return jsonify({"response": generated_text})
    else:
        return jsonify({"response": "Sorry, something went wrong."}), 500

if __name__ == '__main__':
    app.run(port=5000)