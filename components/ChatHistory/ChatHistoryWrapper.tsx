"use client"
import { ChatMessageType } from "@/domains/form";
import { AppStateContext } from "@/provider/AppProvider";
import { Conversation } from "@/types/models";
import { getChatId, getConversationId, sseFetcher } from "@/util";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { SubmitHandler } from "react-hook-form";
import PromptInput from "../PromptInput/PromptInput";

type Props = {};

export default function ChatHistoryWrapper() {
  const router = useRouter();
  const appStateContext = useContext(AppStateContext);
  const [text, setText] = useState("");
  const [isTurnEnd, setIsTurnEnd] = useState(false);
  const [currentConversation, setCurrentConversation] =
    useState<Conversation | null>(null);

  const sendPrompt: SubmitHandler<ChatMessageType> = async (
    data: ChatMessageType
  ) => {
    const userChat = {
      id: data.id,
      role: "user",
      content: data.content,
      date: `${Date.now()}`,
    };

    const currentConversation = {
      id: getConversationId(),
      title: data.content,
      messages: [userChat],
      date: `${Date.now()}`,
    };

    setCurrentConversation(currentConversation);

    sseFetcher("/api/chat", data, (event) => {
      setText((pre) => (pre += event.data));
      if (event.data === "turn_end") {
        setIsTurnEnd(true);
      }
    });

    appStateContext?.dispatch({
      type: "UPDATE_CHAT_HISTORY",
      payload: currentConversation,
    });
  };

  useEffect(() => {
    if (isTurnEnd && currentConversation) {
      const postConversation = async () => {
        const chatId = getChatId();
        const postConversation = {
          ...currentConversation,
          messages: [
            ...(currentConversation?.messages ?? []),
            {
              id: chatId,
              role: "system",
              content: text,
              date: `${Date.now()}`,
            },
          ],
        };
        appStateContext?.dispatch({
          type: "UPDATE_CHAT_HISTORY",
          payload: postConversation,
        });
        await fetch("/api/conversations", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(postConversation),
        });
        router.push(`/chat/${currentConversation?.id}`);
      };
      postConversation();
    }
  }, [currentConversation, isTurnEnd, router, text]);

  return (
    <div>
      <div>
        {appStateContext?.state.chatHistory.map((chat, index) => (
          <div key={index}>
            {chat.messages.map((message, index) => (
              <div key={index}>
                <p>{message.role}</p>
                <p>{message.content}</p>
              </div>
            ))}
          </div>
        ))}
      </div>
      <PromptInput submitHandler={sendPrompt} />
    </div>
  );
}
