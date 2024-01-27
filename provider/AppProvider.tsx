"use client";
import { Conversation } from "@/types/models";
import { Dispatch, ReactNode, createContext, useReducer } from "react";

export type AppState = {
  chatHistory: Conversation[];
};

export type Action = { type: "UPDATE_CHAT_HISTORY"; payload: Conversation };

const initialState: AppState = {
  chatHistory: [],
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
    default:
      return state;
  }
};
