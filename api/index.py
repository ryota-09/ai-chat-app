import os
import openai
from fastapi import Request, FastAPI
from fastapi.responses import StreamingResponse
from dotenv import load_dotenv
from supabase import create_client, Client

load_dotenv()

OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")
SUPABASE_PROJECT_URL = os.getenv("SUPABASE_PROJECT_URL")
SUPABASE_API_KEY = os.getenv("SUPABASE_API_KEY")

openai.api_key = OPENAI_API_KEY

app = FastAPI()

supabase: Client  = create_client(SUPABASE_PROJECT_URL, SUPABASE_API_KEY)

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
@app.get("/api/test")
def get_all_messages():
    data = { "id": "aaaaa", "role": "user", "content": "Hello, how are you?", "date": "2021-09-01T00:00:00.000000+00:00" , "feedback": "good", "conversation_id": "test01"}
    messages = supabase.table('chat_messages').insert(data).execute()
    return messages
