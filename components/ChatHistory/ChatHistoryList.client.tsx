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
  console.log(chatHistory);

  if (isNewChat) {
    return <WelcomeMessage />
  }

  return (
    <>
      {chatHistory && chatHistory.length > 0 ? (
        chatHistory.map((chat, index) => (
          <ChatHistoryClientItem key={index} chat={chat.messages[0]} />
        ))
      ) : (
        <p>既存チャット</p>
      )}
    </>
  );
}
