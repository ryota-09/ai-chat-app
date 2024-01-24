import { OpenAIStream } from "@/util";
import { IncomingMessage } from "http";
import { NextRequest, NextResponse } from "next/server";

export const config = {
  runtime: "edge",
};

export async function GET(req: NextRequest) {
  console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
  
  const stream = await OpenAIStream("http://localhost:3000/api/python");
  
  console.log("bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb")
  return new Response(stream)
  // const stream = data as unknown as IncomingMessage;
  // for await (const chunk of stream) {
  //   console.log("ccccccccccccccccccccccccccccccccccc")
  //   console.log(chunk)
  //   const lines: string[] = chunk
  //     .toString("utf8")
  //     .split("\n")
  //     .filter((line: string) => line.trim().startsWith("data: "));

  //   for (const line of lines) {
  //     const message = line.replace(/^data: /, "");
  //     if (message === "[DONE]") {
  //       return NextResponse.json({ });
  //     }

  //     const json = JSON.parse(message);
  //     const token: string | undefined = json.choices[0].delta.content;
  //     if (token) {
  //       return NextResponse.json(token);
  //     }
  //   }
  // }
}
