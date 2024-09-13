import { createContext, useReducer, useContext } from "react";
import * as SecureStore from "expo-secure-store";

type StateType = typeof initialState;
type ActionType =
  | { type: "setProfile"; profile: StateType }
  | { type: "setIsFirstOpen"; payload: boolean }
  | { type: "signOut" };

const initialState = {
  isFirstOpen: true,
  loading: false,
  id: "",
  email: "",
  username: "",
  password: "",
  profilePicture: "",
  name: {
    firstname: "",
    lastname: "",
  },
  address: {
    city: "",
    street: "",
    number: null,
    zipcode: "",
    geolocation: {
      lat: "",
      long: "",
    },
  },
  phone: "",
  favorites: [],
};

const ProfileContext = createContext<StateType>(initialState);
const ProfileDispatchContext = createContext<React.Dispatch<ActionType> | null>(
  null
);

function reducer(
  state: StateType = initialState,
  action: ActionType
): StateType {
  switch (action.type) {
    case "setProfile": {
      SecureStore.setItemAsync("profile", JSON.stringify(action.profile));
      return {
        ...state,
        ...action.profile,
      };
    }
    case "setIsFirstOpen": {
      const newState = {
        ...state,
        isFirstOpen: action.payload,
      };
      SecureStore.setItemAsync("profile", JSON.stringify(newState));

      return newState;
    }
    case "signOut": {
      SecureStore.setItemAsync("profile", JSON.stringify(initialState));
      return {
        ...initialState,
      };
    }
    default:
      return state;
  }
}

export const ProfileProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [auth, dispatch] = useReducer(reducer, {
    ...initialState,
    ...JSON.parse(SecureStore.getItem("profile") ?? "{}"),
  });

  return (
    <ProfileContext.Provider value={auth}>
      <ProfileDispatchContext.Provider value={dispatch}>
        {children}
      </ProfileDispatchContext.Provider>
    </ProfileContext.Provider>
  );
};

export function useProfile() {
  return useContext(ProfileContext);
}

export function useProfileDispatch() {
  return useContext(ProfileDispatchContext);
}
