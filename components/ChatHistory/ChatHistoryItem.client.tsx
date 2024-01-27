"use client";

import { ChatMessage } from "@/types/models";

type Props = {
  chat: ChatMessage;
};

export default function ChatHistoryClientItem({ chat }: Props) {
  return (
    <div>
      <p>{chat.id}</p>
      <p>{chat.role}</p>
      <p>{chat.content}</p>
      <hr />
    </div>
  )
}
