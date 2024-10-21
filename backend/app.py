# app.py
from flask import Flask, jsonify, request
from flask_cors import CORS  # Import CORS
import requests

app = Flask(__name__)
CORS(app)

@app.route('/')
def home():
    return "Welcome to the Flask API for Journal and Paper Search"

# Replace with your actual Scopus API Key
API_KEY = 'put ur api key'

# Scopus Journal search API endpoint
SCOPUS_API_JOURNAL_URL = "https://api.elsevier.com/content/serial/title"

# Endpoint to search for journal
@app.route('/api/journal', methods=['GET'])
def get_journal_status():
    journal_name = request.args.get('title')
    params = {'title': journal_name, 'apiKey': API_KEY}
    response = requests.get(SCOPUS_API_JOURNAL_URL, params=params)
    
    if response.status_code == 200:
        data = response.json()
        if 'serial-metadata-response' in data:
            journal_info = data['serial-metadata-response']['entry']
            if journal_info:
                journal_title = journal_info[0].get('dc:title', 'Unknown')
                issn = journal_info[0].get('prism:issn', 'N/A')
                publisher_name = journal_info[0].get('dc:publisher', 'N/A')
                active_status = journal_info[0].get('status', 'N/A')
                status_text = "Active" if active_status == 'Active' else "Inactive"

                return jsonify({
                    'journal_title': journal_title,
                    'issn': issn,
                    'publisher': publisher_name,
                    'status': status_text,
                })
            return jsonify({'error': f"Journal '{journal_name}' not found in Scopus."}), 404
        return jsonify({'error': "No journal metadata found."}), 404
    return jsonify({'error': "Failed to fetch data from Scopus API."}), response.status_code


# Run the Flask server
if __name__ == '__main__':
    app.run(debug=True)
