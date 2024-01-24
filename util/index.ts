import {
  createParser,
  ParsedEvent,
  ReconnectInterval,
} from 'eventsource-parser'

export async function OpenAIStream(url: string, payload?: any) {
  const encoder = new TextEncoder()
  const decoder = new TextDecoder()
  const res = await fetch(url)
  console.log("@@@@@@@@@@@@@")
  
  const stream = new ReadableStream({
    async start(controller) {
      function onParse(event: ParsedEvent | ReconnectInterval) {
        console.log(event)
        if (event.type === "event") {
          const data = event.data
          console.log(data)
          if (data === '[DONE]') {
            controller.close()
            return
          }
          try {
            const json = JSON.parse(data)
            const text = json.choices[0].delta.content
            console.log(text)
            const queue = encoder.encode(text)
            controller.enqueue(queue)
          } catch (e) {
            controller.error(e)
          }
        }
      }

      const parser = createParser(onParse)
      console.log("oooooooo", res.body)
      for await (const chunk of res.body as any) {
        parser.feed(decoder.decode(chunk))
      }
    },
  })

  return stream
}
