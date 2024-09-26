import { createContext, useReducer, useContext } from "react";

type StateType = typeof initialState;
type ActionType =
  | { type: "ORDER_LOADING" }
  | { type: "ORDER_FAILURE" }
  | { type: "FETCH_ORDER"; orders: StateType["orders"] }
  | { type: "ADD_ORDER"; order: StateType["orders"][number] };

const initialState = {
  orders: [],
  isLoading: false,
};

const OrderContext = createContext<StateType>(initialState);
const OrderDispatchContext = createContext<React.Dispatch<ActionType>>(
  () => {}
);

function reducer(
  state: StateType = initialState,
  action: ActionType
): StateType {
  switch (action.type) {
    case "ORDER_LOADING":
      return {
        ...state,
        isLoading: true,
      };
    case "ORDER_FAILURE":
      return {
        ...state,
        isLoading: false,
      };
    case "FETCH_ORDER":
      return {
        ...state,
        orders: action.orders,
        isLoading: false,
      };
    case "ADD_ORDER":
      const newOrder = action.order;
      return {
        ...state,
        orders: state.orders.concat(newOrder),
        isLoading: false,
      };
    default:
      return state;
  }
}

export const OrderProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [auth, dispatch] = useReducer(reducer, initialState);

  return (
    <OrderContext.Provider value={auth}>
      <OrderDispatchContext.Provider value={dispatch}>
        {children}
      </OrderDispatchContext.Provider>
    </OrderContext.Provider>
  );
};

export function useOrder() {
  return useContext(OrderContext);
}

export function useOrderDispatch() {
  return useContext(OrderDispatchContext);
}
