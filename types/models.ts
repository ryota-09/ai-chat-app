export type ChatMessage = {
  id: string;
  role: string;
  content: string;
  end_turn?: boolean; // stream終了を表すフラグ
  date: string;
  // feedback?: Feedback;
};

export type Conversation = {
  id: string;
  title: string;
  messages: ChatMessage[];
  date: string;
}
