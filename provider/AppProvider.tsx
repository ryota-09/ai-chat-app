"use client";
import { ChatMessage, Conversation } from "@/types/models";
import { Dispatch, ReactNode, createContext, useEffect, useReducer } from "react";

export type AppState = {
  chatHistory: Conversation[];
  streamingText: string;
};

export type Action =
  | { type: "UPDATE_CHAT_HISTORY"; payload: Conversation }
  | { type: "UPDATE_CHAT_MESSAGE"; payload: ChatMessage }
  | { type: "UPDATE_STREAMING_TEXT"; payload: string }
  | { type: "INITIALIZE" };

const initialState: AppState = {
  chatHistory: [],
  streamingText: "",
};

export const AppStateContext = createContext<
  | {
      state: AppState;
      dispatch: Dispatch<Action>;
    }
  | undefined
>(undefined);

export const AppStateProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(appStateReducer, initialState);

  useEffect(() => {
    dispatch({ type: "INITIALIZE" });
  }, []);

  return (
    <AppStateContext.Provider value={{ state, dispatch }}>
      {children}
    </AppStateContext.Provider>
  );
};

export const appStateReducer = (state: AppState, action: Action): AppState => {
  switch (action.type) {
    case "UPDATE_CHAT_HISTORY":
      return {
        ...state,
        chatHistory: [...state.chatHistory, action.payload],
      };
    case "UPDATE_CHAT_MESSAGE":
      return {
        ...state,
        chatHistory: [{
          ...state.chatHistory[state.chatHistory.length - 1],
          messages: [...state.chatHistory[state.chatHistory.length - 1].messages, action.payload]
        }],
      };
    case "UPDATE_STREAMING_TEXT":
      return {
        ...state,
        streamingText: state.streamingText + action.payload,
      };
    case "INITIALIZE":
      return initialState;
    default:
      return state;
  }
};
