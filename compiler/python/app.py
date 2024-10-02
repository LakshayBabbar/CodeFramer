from flask import Flask, request, jsonify
import tempfile
import shutil
import re
import sys
import io
import os
from dotenv import load_dotenv

app = Flask(__name__)

load_dotenv()

ACCESS_KEY = os.getenv('ACCESS_KEY')

DANGEROUS_KEYWORDS = [
    r'\bos\b',    
    r'\bsys\b',     
    r'\bimport\b',  
    r'\beval\b',      
    r'\bexec\b',    
    r'\bopen\b',      
    r'\bsubprocess\b'
]

def is_code_safe(code):
    for pattern in DANGEROUS_KEYWORDS:
        if re.search(pattern, code):
            return False
    return True

@app.route('/execute', methods=['POST'])
def execute_python_safely():
    access_key = request.json.get('access_key')
    code = request.json.get('code')
    inputs = request.json.get('inputs', [])

    if not access_key or access_key != ACCESS_KEY:
        return jsonify({"error": "Unauthorized access. Invalid access key."}), 403

    if not code:
        return jsonify({"error": "No code provided."}), 400

    if not is_code_safe(code):
        return jsonify({"error": "Code contains unsafe operations."}), 400

    temp_dir = tempfile.mkdtemp(prefix="user_code_")

    try:
        input_data = iter(inputs)
        output_capture = io.StringIO()
        sys.stdout = output_capture

        exec_env = {
            'input': lambda prompt: next(input_data, ''),
        }

        exec(code, exec_env)
        output = output_capture.getvalue()

        return jsonify({
            "output": output,
            "status": 0
        })
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    finally:
        shutil.rmtree(temp_dir)
        sys.stdout = sys.__stdout__


@app.route('/status', methods=['GET'])
def get_status():
    return jsonify({
        "status": "running",
        "message": "Server is up and running!"
    }), 200

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
