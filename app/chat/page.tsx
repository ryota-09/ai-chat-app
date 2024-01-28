import ClientChatHistoryList from "@/components/ChatHistory/ChatHistoryList.client";

export default function ChatPage() {
  return (
    <main>
      <ClientChatHistoryList isNewChat={true} />
    </main>
  );
}
