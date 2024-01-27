"use client";

import { ChatMessageType } from "@/domains/form";
import { SubmitHandler, useFormContext } from "react-hook-form";

export default function PromptInput() {
  const { register, handleSubmit } = useFormContext<ChatMessageType>();

  const sendPrompt: SubmitHandler<ChatMessageType> = async (
    data: ChatMessageType
  ) => {
    console.log(data);
  };

  return (
    <div className="container mx-auto">
      <form
        method="post"
        onSubmit={handleSubmit(sendPrompt)}
        className="flex gap-3"
      >
        <input
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-basic focus:border-transparent"
          placeholder="プロンプトを入力してください"
          {...register("content")}
          onBlur={async () => {
            console.log("onBlur");
            register("id", { value: "1" })
          }}
        />
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
