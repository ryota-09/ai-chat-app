"use client";
import { useContext } from "react";
import ChatHistoryClientItem from "./ChatHistoryItem.client";
import { AppStateContext } from "@/provider/AppProvider";
import WelcomeMessage from "./WelcomeMessage";

type Props = {
  isNewChat: boolean;
};
export default function ClientChatHistoryList({ isNewChat }: Props) {
  const appStateContext = useContext(AppStateContext);
  const chatHistory = appStateContext?.state.chatHistory;
  const isStreaming =
    appStateContext?.state.chatHistory &&
    appStateContext?.state.chatHistory.length % 2 === 1;

  if (isNewChat && chatHistory && chatHistory.length === 0) {
    return <WelcomeMessage />;
  }

  return (
    <>
      {chatHistory &&
        chatHistory.length > 0 &&
        chatHistory[0].messages.map((chat, index) => (
          <ChatHistoryClientItem key={index} chat={chat} />
        ))}
        {isStreaming && <div>ストリーミング中...</div>}
    </>
  );
}
