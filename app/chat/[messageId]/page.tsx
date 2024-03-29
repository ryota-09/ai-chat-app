import ServerChatHistoryItem from "@/components/ChatHistory/ChatHistoryItem.server";
import ClientChatHistoryList from "@/components/ChatHistory/ChatHistoryList.client";

export default function ChatDetailPage({ params }: { params: { messageId: string } }) {

  return (
    <main>
      {/* @ts-expect-error Server Component */}
      <ServerChatHistoryItem id={params.messageId} />
    </main>
  );
}
