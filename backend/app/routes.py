from flask import request, jsonify
from app import app
from app.utils import read_pdf, translate_text

@app.route('/')
def index():
    return "Welcome to the Language Learning E-Reader Backend!"

@app.route('/upload', methods=['POST'])
def upload_file():
    file = request.files['file']
    known_language = request.form['known_language']
    learning_language = request.form['learning_language']
    page_number = int(request.form['page_number']) - 1

    if file.filename.endswith('.pdf'):
        text = read_pdf(file, page_number=page_number)
    elif file.filename.endswith('.txt'):
        text = file.read().decode('utf-8')

    translated_text = translate_text(text, known_language, learning_language)

    return jsonify({
        'original_text': text,
        'translated_text': translated_text
    })
