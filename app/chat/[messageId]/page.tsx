import ClientChatHistoryList from "@/components/ChatHistory/ChatHistoryList.client";

export default function ChatDetailPage({ params }: { params: string }) {
  return (
    <main>
      <p>でテールページ</p>
      <ClientChatHistoryList isNewChat={false} />
    </main>
  );
}
