type Props = {
  id: string;
};

export default async function ServerChatHistoryItem({ id }: Props) {
  const response = await fetch(`http://localhost:3000/api/chat/test/${id}`);
  const data = await response.json();
  return (
    <div>
      <div>
        {data.data.map((message: any, index: any) => (
          <div key={index}>
            <p>{message.role}</p>
            <p>{message.content}</p>
            <hr />
          </div>
        ))}
      </div>
    </div>
  );
}
