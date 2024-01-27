export default function ChatDetailPage({ params }: { params: string }) {
  return (
    <main>
      <p>でテールページ</p>
      <p>{params.chatId}</p>
    </main>
  );
}
