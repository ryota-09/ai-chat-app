"use client";

import { fetchEventSource } from "@microsoft/fetch-event-source";
import { useState } from "react";

export default function Home() {
  const [responseText, setResponseText] = useState("");
  return (
    <main>
      <button onClick={onClick}>ボタン</button>
      <p>テキスト</p>
      <div>{responseText}</div>
    </main>
  );
}
