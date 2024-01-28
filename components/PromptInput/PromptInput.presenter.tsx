"use client";
import { useRouter } from "next/navigation";

import { ChatMessageType } from "@/domains/form";
import { SubmitHandler, useFormContext } from "react-hook-form";
import { getChatId, getConversationId } from "@/util";
import { useContext } from "react";
import { AppStateContext } from "@/provider/AppProvider";

export default function PromptInput() {
  const router = useRouter();
  const appStateContext = useContext(AppStateContext);
  const { register, handleSubmit, reset } = useFormContext<ChatMessageType>();

  const sendPrompt: SubmitHandler<ChatMessageType> = async (
    data: ChatMessageType
  ) => {
    const conversationId = getConversationId();
    const userChat = {
      id: data.id,
      role: "user",
      content: data.content,
      date: `${Date.now()}`,
    };
    const currentConversation = {
      id: conversationId,
      title: data.content,
      messages: [userChat],
      date: `${Date.now()}`,
    };
    appStateContext?.dispatch({
      type: "UPDATE_CHAT_HISTORY",
      payload: currentConversation,
    });
    reset();

    const response = await fetch("/api/conversations", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(currentConversation),
    });

    const resData = await response.json();
    console.log("response", resData);

    router.push(`/chat/${conversationId}`);
    // sseFetcher("/api/chat", data, (event) => {
    //   setText((pre) => (pre += event.data));
    // });
  };

  return (
    <div>
      <form
        method="post"
        onSubmit={handleSubmit(sendPrompt)}
        className="flex gap-3"
      >
        <textarea
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-basic focus:border-transparent"
          placeholder="プロンプトを入力してください"
          rows={1}
          {...register("content")}
          onBlur={() => {
            const id = getChatId();
            register("id", { value: id });
          }}
        ></textarea>
        <button
          type="submit"
          className="w-[10%] p-2 text-gray-basic bg-green-dark rounded-md hover:opacity-80"
        >
          送信
        </button>
      </form>
    </div>
  );
}
