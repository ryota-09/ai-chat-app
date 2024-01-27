"use client";
import { useRouter } from "next/navigation";

import { ChatMessageType } from "@/domains/form";
import { SubmitHandler, useFormContext } from "react-hook-form";
import { getChatId } from "@/util";

export default function PromptInput() {
  const router = useRouter();
  const { register, handleSubmit } = useFormContext<ChatMessageType>();

  const sendPrompt: SubmitHandler<ChatMessageType> = async (
    data: ChatMessageType
  ) => {
    console.log(data);
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
