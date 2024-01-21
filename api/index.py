import os
from fastapi import FastAPI
from dotenv import load_dotenv

load_dotenv()

text = os.getenv("TEXT")

app = FastAPI()

@app.get("/api/python")
def hello_world():
    return {"message": text}
