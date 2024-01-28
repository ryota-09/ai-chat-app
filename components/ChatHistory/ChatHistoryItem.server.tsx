
type Props = {
  id: string;
}

export default async function ServerChatHistoryItem({ id }: Props) {
  const response = await fetch(`http://localhost:3000/api/chat/${id}`);
  const data = await response.json();
  console.log(data);
  return (
    <div>
      <p>でテールアイテム</p>
      <p>{data.data[0].title}</p>
    </div>
  );
}
