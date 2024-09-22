import pypdf
from openai import OpenAI

from dotenv import load_dotenv
import os

# Load environment variables from .env file
load_dotenv()

client = OpenAI(api_key=os.getenv('OPENAI_API_KEY'))
# Set the OpenAI API key
def read_pdf(file, page_number=0):
    reader = pypdf.PdfReader(file)

    # Check if the page number is valid
    if page_number < 0 or page_number >= len(reader.pages):
        raise ValueError("Invalid page number")

    # Extract text from the specified page
    page_text = reader.pages[page_number].extract_text()

    return page_text
##splits a given text into chunks for possibly quicker displays instead of having openAI translate 10000 words have it translate 100 words
#at a time
##
#possible challenge displaying each chunk 
# 
#@avgReadTime = 250 wpm
def chunk_split(text, chunk_size=1000):
    chunks = []
    for i in range(0,len(text),chunk_size):
        chunks.append(text[i:i+chunk_size])
    return chunks  

def translate_in_chunks(text, known_language, target_lang):
    chunks = chunk_split(text)
    translated_chunks = []

    for chunk in chunks:
        translated_chunk = translate_text(chunk, known_language, target_lang)
        translated_chunks.append(translated_chunk)

    # Join all the translated chunks
    return ''.join(translated_chunks)

def translate_text(text, known_language, target_lang):
    #print(len(text))
    completion = client.chat.completions.create(model="gpt-4o-mini",
    messages=[
        {"role": "system", "content": "You are fluent in almost every language and you are here to help translate a given text. give just the translation with no additional text. with /n(enter) at the end of every period"},
        {"role": "user", "content": f"Translate the following text from {known_language} to {target_lang}: {text}"}
    ],
    max_tokens=3000)
    translated_text = completion.choices[0].message.content.strip()
    return translated_text