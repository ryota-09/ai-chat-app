"use client";

import { useState } from "react";

export default function Home() {
  const [responseText, setResponseText] = useState("");
  const onClick = async () => {
    const response = await fetch("/api/python");

    if (!response.body) return;
    const reader = response.body.getReader();
    // ストリームからのデータを逐次的に読み込む

    while (true) {
      console.log("while");
      const { done, value } = await reader.read();

      if (done) {
        break;
      }
      // テキストに変換
      let textChunk = new TextDecoder().decode(value);
      console.log(textChunk);
      // 状態を更新
      setResponseText((prev) => prev + textChunk);
    }
  };
  return (
    <main>
      <button onClick={onClick}>ボタン</button>
      <p>テキスト</p>
      <div>{responseText}</div>
    </main>
  );
}
