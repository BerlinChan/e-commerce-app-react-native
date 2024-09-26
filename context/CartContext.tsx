import { createContext, useReducer, useContext } from "react";

type StateType = typeof initialState;
type ActionType =
  | { type: "ADD_TO_CART"; item: any }
  | { type: "FETCH_CART"; items: any }
  | { type: "REMOVE_FROM_CART"; itemId: string }
  | { type: "DEC_CART_QUANTITY"; itemId: string }
  | { type: "RESET_CART"; payload: any }
  | { type: "CART_LOADING" }
  | { type: "CART_FAILURE" };

const initialState = {
  id: "",
  items: [],
  isLoading: false,
};

const Context = createContext<{
  cart: StateType;
  cartDispatch: React.Dispatch<ActionType>;
}>({ cart: initialState, cartDispatch: () => {} });

function reducer(
  state: StateType = initialState,
  action: ActionType
): StateType {
  switch (action.type) {
    case "CART_LOADING":
      return {
        ...state,
        isLoading: true,
      };
    case "CART_FAILURE":
      return {
        ...state,
        isLoading: false,
      };
    case "FETCH_CART":
      return {
        ...state,
        items: action.items,
        isLoading: false,
      };
    case "ADD_TO_CART": {
      const index = state.items.findIndex(({ id }) => id === action.item.id);

      return {
        ...state,
        items:
          index >= 0
            ? state.items.map((item, i) =>
                i === index ? { ...item, quantity: item.quantity + 1 } : item
              )
            : [...state.items, { ...action.item, quantity: 1 }],
      };
    }
    case "REMOVE_FROM_CART":
      return {
        ...state,
        items: state.items.filter(({ id }) => id !== action.itemId),
      };
    case "DEC_CART_QUANTITY":
      return {
        ...state,
        items: state.items.map((item) =>
          item.id === action.itemId
            ? { ...item, quantity: item.quantity - 1 }
            : item
        ),
      };
    case "RESET_CART":
      return {
        ...initialState,
      };
    default:
      return state;
  }
}

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [cart, cartDispatch] = useReducer(reducer, initialState);

  return (
    <Context.Provider value={{ cart, cartDispatch }}>
      {children}
    </Context.Provider>
  );
};

export function useCart() {
  return useContext(Context);
}
