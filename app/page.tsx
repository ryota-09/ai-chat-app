"use client"

export default function Home() {
  const onClick = async () => {
    const response = await fetch("/route/chat");
    const data = await response.json();
    console.log(data);
  }
  return (
    <main>
      <button onClick={onClick}>ボタン</button>
    </main>
  );
}
