import {
  EventSourceMessage,
  fetchEventSource,
} from "@microsoft/fetch-event-source";

export const sseFetcher = async (
  url: string,
  onMessage: (event: EventSourceMessage) => void
) => {
  await fetchEventSource(`${url}`, {
    method: "GET",
    headers: { Accept: "text/event-stream" },
    onopen: async (res) => {
      if (res.ok && res.status === 200) {
        console.log("Connection made ");
      } else if (res.status >= 400 && res.status < 500 && res.status !== 429) {
        console.log("Client-side error ");
      }
    },
    async onmessage(event) {
      console.log("Message", event);
      console.log(event.data);
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
