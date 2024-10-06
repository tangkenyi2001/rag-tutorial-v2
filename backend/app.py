from flask import Flask, request, jsonify
from flask_cors import CORS
import os
import subprocess

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes
DATA_PATH = "data"
@app.route('/api/upload', methods=['POST'])
def upload_file():
    # Check if the post request has the file part
    if 'files' not in request.files:
        return jsonify({"error": "No file part"}), 400

    files = request.files.getlist('files')  # Get the list of files

    if not files:
        return jsonify({"error": "No selected files"}), 400

    saved_files = []  # To keep track of saved files
    for file in files:
        # Save each uploaded file to the data directory
        file_path = os.path.join(DATA_PATH, file.filename)
        file.save(file_path)
        saved_files.append(file.filename)  # Collect saved file names

    # Call your existing script here
    os.system('python populate_database.py')

    return jsonify({"message": f"Files uploaded successfully: {', '.join(saved_files)}!"}), 200
@app.route('/api/delete', methods=['POST'])
def clear_database():
    os.system('python cleardatainput.py')
    os.system('python populate_database.py --reset')
    return jsonify({"message": "Data Files Cleared successfully!"}), 200
    
@app.route('/api/query', methods=['POST'])
def query():
    # Get the input from the request
    input_data = request.json.get('input')  # Change 'input' to whatever key you use in the frontend

    if input_data is None:
        return jsonify({"error": "No input provided"}), 400
    print(['python', 'query_data.py', input_data])  # For debugging

    # Run the querydata.py script with the input as an argument
    try:
        result = subprocess.run(['venv/Scripts/python', './query_data.py', input_data], check=True, capture_output=True, text=True)
        output = result.stdout  # Get the output from the script
        return jsonify({"output": output}), 200
    except subprocess.CalledProcessError as e:
        print(e.stderr) 
        return jsonify({"error": f"Failed to run querydata.py: {str(e)}"}), 500
    
    
if __name__ == '__main__':
    app.run(debug=True)#5000