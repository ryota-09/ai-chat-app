
type Props = {
  id: string;
}

export default async function ServerChatHistoryItem({ id }: Props) {
  const response = await fetch(`http://localhost:3000/api/chat/test/${id}`);
  const data = await response.json();
  // console.log("ああああああああ");
  // console.log(data);
  return (
    <div>
      <p>でテールアイテム</p>
      <p>{JSON.stringify(data)}</p>
    </div>
  );
}
