import { ChatMessageType } from "@/domains/form";
import {
  EventSourceMessage,
  fetchEventSource,
} from "@microsoft/fetch-event-source";
import { v4 as uuid } from 'uuid';

export const sseFetcher = async (
  url: string,
  data: ChatMessageType,
  onMessage: (event: EventSourceMessage) => void
) => {
  await fetchEventSource(`${url}`, {
    method: "POST",
    headers: { Accept: "text/event-stream", "Content-Type": "application/json" },
    body: JSON.stringify(data),
    onopen: async (res) => {
      if (res.ok && res.status === 200) {
        console.log("Connection made ");
      } else if (res.status >= 400 && res.status < 500 && res.status !== 429) {
        console.log("Client-side error ");
      }
    },
    async onmessage(event) {
      onMessage(event);
    },
    onclose() {
      console.log("Connection closed by the server");
    },
    onerror(err) {
      console.log("There was an error from server", err);
    },
  });
};

export const getChatId = () => {
  const date = new Date();
  const year = date.getFullYear();
  const month = ("0" + (date.getMonth() + 1)).slice(-2);
  const day = ("0" + date.getDate()).slice(-2);
  const hours = ("0" + date.getHours()).slice(-2);
  const minutes = ("0" + date.getMinutes()).slice(-2);

  return `chat-${year}${month}${day}${hours}${minutes}_${uuid()}`;
}
