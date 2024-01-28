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

def add_chat_message(chat_data):
    data = supabase.table('chat_messages').insert(chat_data).execute()
    return data

def add_conversation(conversation_data):
    data = supabase.table('conversations').insert(conversation_data).execute()
    return data

def get_conversation_by_id(conversation_id):
    res = supabase.table('conversations').select('*').eq('id', conversation_id).execute()
    return res

def get_messages_by_conversation_id(conversation_id):
    data = supabase.table('chat_messages').select('*').eq('conversation_id', conversation_id).execute()
    return data

def chatgpt_stream(response):
    for chunk in response:
        if chunk is not None:
            content = chunk["choices"][0]["delta"].get("content")
            if content is not None:
                yield "data: " + content + "\n\n"
    yield "data: turn_end\n\n"

@app.post("/api/chat")
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

@app.post("/api/conversations")
async def post_conversation(request: Request):
    data = await request.json()
    conversation_data = {
        'id': data.get('id'),
        'title': data.get('title'),
        'date': data.get('date'),
    }
    add_conversation(conversation_data)
    
    current_messages = data.get('messages')
    for message in current_messages:
        chat_data = {
            "id" : message.get('id'),
            "role" : message.get('role'),
            "date" : message.get('date'),
            "conversation_id" : data.get('id'),
            "content" : message.get('content'),
            # "feedback" : "good"
        }
        add_chat_message(chat_data)

@app.get("/api/chat/test/{conversation_id}")
async def get_chat_detail(conversation_id):
    messages_data = get_messages_by_conversation_id(conversation_id)
    return messages_data
