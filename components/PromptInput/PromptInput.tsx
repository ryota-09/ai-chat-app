"use client";
import { useRouter } from "next/navigation";

import { ChatMessageType } from "@/domains/form";
import { SubmitHandler, useFormContext } from "react-hook-form";
import { getChatId, getConversationId, sseFetcher } from "@/util";
import { useContext, useEffect, useState } from "react";
import { AppStateContext } from "@/provider/AppProvider";
import { Conversation } from "@/types/models";

type Props = {
  submitHandler: SubmitHandler<ChatMessageType>;
};

export default function PromptInput({ submitHandler }: Props) {
  const { handleSubmit, register } = useFormContext<ChatMessageType>();
  return (
    <div>
      <form
        method="post"
        onSubmit={handleSubmit(submitHandler)}
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
