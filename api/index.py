import os
import openai
from fastapi import FastAPI
from fastapi.responses import StreamingResponse
from dotenv import load_dotenv

load_dotenv()

OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")

openai.api_key = OPENAI_API_KEY

app = FastAPI()

@app.get("/api/python")
async def hello_world():
    async def response_generator():
        response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "user", "content": "大谷翔平について教えて"},
            ],
            stream=True,
        )
        # 返答を受け取り、逐次yield
        for chunk in response:
            chunk_message = chunk['choices'][0]['delta'].get('content', '')
            yield f"{chunk_message}"

    return StreamingResponse(response_generator(), media_type="text/plain")
