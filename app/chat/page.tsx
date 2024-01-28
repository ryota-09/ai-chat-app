import ClientChatHistoryList from "@/components/ChatHistory/ChatHistoryList.client";
import WelcomeMessage from "@/components/ChatHistory/WelcomeMessage";

export default function ChatPage() {
  return (
    <main>
      <ClientChatHistoryList isNewChat={true} />
    </main>
  );
}
