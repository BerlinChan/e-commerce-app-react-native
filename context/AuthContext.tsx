import { createContext, useReducer, useContext } from "react";
import * as SecureStore from "expo-secure-store";

type StateType = typeof initialState;
type ActionType =
  | { type: "setToken"; token: string }
  | { type: "setLoading"; loading: boolean }
  | { type: "SIGN_OUT" };

const initialState = {
  token: "",
  loading: false,
};

const AuthContext = createContext<StateType>(initialState);
const AuthDispatchContext = createContext<React.Dispatch<ActionType>>(() => {});

function reducer(
  state: StateType = initialState,
  action: ActionType
): StateType {
  switch (action.type) {
    case "setToken": {
      SecureStore.setItemAsync("token", action.token);
      return {
        ...state,
        token: action.token,
      };
    }
    case "setLoading": {
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
  const [auth, dispatch] = useReducer(reducer, {
    ...initialState,
    token: SecureStore.getItem("token") ?? "",
  });

  return (
    <AuthContext.Provider value={auth}>
      <AuthDispatchContext.Provider value={dispatch}>
        {children}
      </AuthDispatchContext.Provider>
    </AuthContext.Provider>
  );
};

export function useAuth() {
  return useContext(AuthContext);
}

export function useAuthDispatch() {
  return useContext(AuthDispatchContext);
}
