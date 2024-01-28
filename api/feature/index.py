import os
from supabase import create_client, Client

SUPABASE_PROJECT_URL = os.getenv("SUPABASE_PROJECT_URL")
SUPABASE_API_KEY = os.getenv("SUPABASE_API_KEY")

supabase: Client  = create_client(SUPABASE_PROJECT_URL, SUPABASE_API_KEY)

def add_chat_message(chat_data):
    res = supabase.table('chat_messages').insert(chat_data).execute()
    data = res.get('data')
    return data

def add_conversation(conversation_data):
    res = supabase.table('conversations').insert(conversation_data).execute()
    data = res.get('data')
    return data

def get_conversation(conversation_id):
    res = supabase.table('conversations').select('*').eq('conversation_id', conversation_id).execute()
    data = res.get('data')
    return data

def get_messages_by_conversation_id(conversation_id):
    res = supabase.table('chat_messages').select('*').eq('conversation_id', conversation_id).execute()
    data = res.get('data')
    return data
