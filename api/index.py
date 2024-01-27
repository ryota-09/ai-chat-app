import os
import openai
from fastapi import Request, FastAPI
from fastapi.responses import StreamingResponse
from dotenv import load_dotenv

load_dotenv()

OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")

openai.api_key = OPENAI_API_KEY

app = FastAPI()

def chatgpt_stream(response):
    for chunk in response:
        if chunk is not None:
            content = chunk["choices"][0]["delta"].get("content")
            if content is not None:
                yield "data: " + content + "\n\n"

# @app.post("/api/chat")
async def hello_world(request: Request):
        data = await request.json()
        content = data.get('content')
        id = data.get('id')
        response = openai.ChatCompletion.create(
                model="gpt-3.5-turbo",
                messages=[
                    {"role": "user", "content": content},
                ],
                stream=True,
            )

        return StreamingResponse(
            chatgpt_stream(response),media_type="text/event-stream"
        )
