"use client"

export default function Home() {
  const onClick = async () => {
    const response = await fetch("/api/python");
    const data = await response.json();
    console.log(data);
  }
  return (
    <main>
      <button onClick={onClick}>ボタン</button>
    </main>
  );
}
