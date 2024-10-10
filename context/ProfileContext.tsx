import { createContext, useReducer, useContext } from "react";
import * as SecureStore from "expo-secure-store";

export type StateType = typeof initialState;
type ActionType =
  | { type: "SET_PROFILE"; profile: StateType }
  | { type: "SIGN_OUT" }
  | { type: "ADD_TO_CART"; payload: any }
  | { type: "ADD_TO_FAVORITES"; payload: any }
  | { type: "REMOVE_FROM_FAVORITES"; payload: any };

const initialState = {
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
  favorites: [
    {
      id: 5,
      title:
        "John Hardy Women's Legends Naga Gold & Silver Dragon Station Chain Bracelet",
      price: 695,
      description:
        "From our Legends Collection, the Naga was inspired by the mythical water dragon that protects the ocean's pearl. Wear facing inward to be bestowed with love and abundance, or outward for protection.",
      category: "jewelery",
      image: "https://fakestoreapi.com/img/71pWzhdJNwL._AC_UL640_QL65_ML3_.jpg",
      rating: {
        rate: 4.6,
        count: 400,
      },
    },
  ],
};

const Context = createContext<{
  profile: StateType;
  profileDispatch: React.Dispatch<ActionType>;
}>({ profile: initialState, profileDispatch: () => {} });

function reducer(
  state: StateType = initialState,
  action: ActionType
): StateType {
  switch (action.type) {
    case "SET_PROFILE": {
      SecureStore.setItemAsync("profile", JSON.stringify(action.profile));
      return {
        ...state,
        ...action.profile,
      };
    }
    case "SIGN_OUT": {
      SecureStore.setItemAsync("profile", JSON.stringify(initialState));
      return {
        ...initialState,
      };
    }
    case "ADD_TO_FAVORITES": {
      return {
        ...state,
        favorites: [...state.favorites, action.payload],
      };
    }
    case "REMOVE_FROM_FAVORITES": {
      return {
        ...state,
        favorites: state.favorites.filter(
          (fav) => fav.id !== action.payload.id
        ),
      };
    }
    default:
      return state;
  }
}

export const ProfileProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [profile, profileDispatch] = useReducer(reducer, {
    ...initialState,
    ...JSON.parse(SecureStore.getItem("profile") ?? "{}"),
  });

  return (
    <Context.Provider value={{ profile, profileDispatch }}>
      {children}
    </Context.Provider>
  );
};

export function useProfile() {
  return useContext(Context);
}
