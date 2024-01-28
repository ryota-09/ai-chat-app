"use client";
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

    appStateContext?.dispatch({
      type: "UPDATE_CHAT_HISTORY",
      payload: currentConversation,
    });

    sseFetcher("/api/chat", data, (event) => {
      appStateContext?.dispatch({
        type: "UPDATE_STREAMING_TEXT",
        payload: event.data,
      });
      if (event.data === "turn_end") {
        setIsTurnEnd(true);
      }
    });
  };

  useEffect(() => {
    if (isTurnEnd && currentConversation) {
      const postConversation = async () => {
        const botChat = {
          id: getChatId(),
          role: "system",
          content: appStateContext?.state.streamingText ?? "",
          date: `${Date.now()}`,
        };
        const postConversation = {
          ...currentConversation,
          messages: [...(currentConversation?.messages ?? []), botChat],
        };
        appStateContext?.dispatch({
          type: "UPDATE_CHAT_MESSAGE",
          payload: botChat,
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
  }, [currentConversation, isTurnEnd, router]);

  return (
    <div>
      <PromptInput submitHandler={sendPrompt} />
    </div>
  );
}
