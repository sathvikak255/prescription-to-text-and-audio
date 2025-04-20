from flask import Flask, request, jsonify, send_file, render_template
from flask import send_from_directory
from ml_model import detect_text, InitiateNER
from gtts import gTTS  # type:ignore
import os
import uuid
from werkzeug.utils import secure_filename

# Inside your handle_upload function

app = Flask(__name__)
ner_model = InitiateNER()
ner_model.load_model("./content/model")

@app.route('/')
def upload_page():
    return render_template('index.html')
    
    # return '''
    #     <h1>Upload a Prescription Image</h1>
    #     <form method="post" action="/upload" enctype="multipart/form-data">
    #         <input type="file" name="image">
    #         <input type="submit" value="Upload">
    #     </form>
    # '''


@app.route('/audio_files/<filename>')
def serve_audio(filename):
    return send_from_directory('audio_files', filename)


@app.route('/upload', methods=['POST'])
def handle_upload():
    if 'image' not in request.files:
        return jsonify({'error': 'No image uploaded'}), 400

    image = request.files['image']

    # filepath = os.path.join("uploads", f"{uuid.uuid4()}.jpg")
    # image.save("./images/prescriptions")

    filename = secure_filename(image.filename)
    save_path = os.path.join("./images/prescriptions", filename)
    image.save(save_path)

    # Step 1: OCR
    extracted_text = detect_text(save_path)

    # Step 2: NER
    entities = ner_model.predict(extracted_text)

    # Step 3: Convert NER output to string for audio
    medicine_names = entities.get("Medicine", [])  # or whatever your entity type is
    if not medicine_names:
        return jsonify({"error": "No medicine names detected."})
    

    # medicine_text = " ".join([name[0] for name in medicine_names])

    medicine_text = ", ".join([name[0].lower() for name in medicine_names])

    tts = gTTS(text=f"Medicines prescribed are: {medicine_text}", lang='en')
    
    # audio_path = f"audio_{uuid.uuid4()}.mp3"
    # tts.save(audio_path)

    # return send_file(audio_path, as_attachment=True)

    audio_filename = f"audio_{uuid.uuid4()}.mp3"
    audio_path = os.path.join("audio_files", audio_filename)
    tts.save(audio_path)

    return jsonify({
    "medicines": medicine_text,  # comma-separated string of medicine names
    "audio_url": f"/audio_files/{audio_filename}"
    })

if __name__ == "__main__":
    os.makedirs("uploads", exist_ok=True)
    app.run(host="0.0.0.0", port=5000)
