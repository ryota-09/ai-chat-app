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
    <div className="container mx-auto p-4">
      <form
        method="post"
        onSubmit={handleSubmit(sendPrompt)}
        className="space-y-4"
      >
        <input
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          placeholder="プロンプトを入力してください"
          {...register("content")}
          onBlur={async () => {
            console.log("onBlur");
            register("id", { value: "1" })
          }}
        />
        <button
          type="submit"
          className="w-full p-2 bg-indigo-500 text-white rounded-md hover:bg-indigo-600"
        >
          送信
        </button>
      </form>
    </div>
  );
}
