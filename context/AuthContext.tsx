import { createContext, useReducer, useContext } from "react";
import * as SecureStore from "expo-secure-store";

type StateType = typeof initialState;
type ActionType =
  | { type: "SET_TOKEN"; token: string }
  | { type: "SET_LOADING"; loading: boolean }
  | { type: "SIGN_OUT" };

const initialState = {
  token: "",
  loading: false,
};

const Context = createContext<{
  auth: StateType;
  authDispatch: React.Dispatch<ActionType>;
}>({ auth: initialState, authDispatch: () => {} });

function reducer(
  state: StateType = initialState,
  action: ActionType
): StateType {
  switch (action.type) {
    case "SET_TOKEN": {
      SecureStore.setItemAsync("token", action.token);
      return {
        ...state,
        token: action.token,
      };
    }
    case "SET_LOADING": {
      return {
        ...state,
        loading: action.loading,
      };
    }
    case "SIGN_OUT": {
      SecureStore.setItemAsync("token", "");
      return {
        ...state,
        token: "",
      };
    }
    default:
      return state;
  }
}

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [auth, authDispatch] = useReducer(reducer, {
    ...initialState,
    token: SecureStore.getItem("token") ?? "",
  });

  return (
    <Context.Provider value={{ auth, authDispatch }}>
      {children}
    </Context.Provider>
  );
};

export function useAuth() {
  return useContext(Context);
}
