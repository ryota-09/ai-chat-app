import os
import openai
from fastapi import FastAPI
from dotenv import load_dotenv

load_dotenv()

OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")

openai.api_key = OPENAI_API_KEY

app = FastAPI()

@app.get("/api/python")
async def hello_world():
    # response = openai.ChatCompletion.create(
    #     model="gpt-3.5-turbo",
    #     messages=[
    #         {"role": "user", "content": "大谷翔平について教えて"},
    #     ],
    # )
    # text = response.choices[0]["message"]["content"]
    return {"message": "Hello World"}
