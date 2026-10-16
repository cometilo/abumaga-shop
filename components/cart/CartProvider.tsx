"use client";

import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  type ReactNode,
} from "react";

export type CartItem = {
  slug: string;
  quantity: number;
};

type CartState = {
  items: CartItem[];
};

type CartAction =
  | { type: "ADD"; slug: string; quantity?: number }
  | { type: "REMOVE"; slug: string }
  | { type: "SET_QTY"; slug: string; quantity: number }
  | { type: "CLEAR" }
  | { type: "HYDRATE"; state: CartState };

type CartContextValue = CartState & {
  add: (slug: string, quantity?: number) => void;
  remove: (slug: string) => void;
  setQty: (slug: string, quantity: number) => void;
  clear: () => void;
  totalCount: number;
};

const STORAGE_KEY = "abumaga-cart-v1";
const CartContext = createContext<CartContextValue | null>(null);

function reducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case "ADD": {
      const qty = action.quantity ?? 1;
      const existing = state.items.find((i) => i.slug === action.slug);
      if (existing) {
        return {
          items: state.items.map((i) =>
            i.slug === action.slug
              ? { ...i, quantity: i.quantity + qty }
              : i
          ),
        };
      }
      return { items: [...state.items, { slug: action.slug, quantity: qty }] };
    }
    case "REMOVE":
      return { items: state.items.filter((i) => i.slug !== action.slug) };
    case "SET_QTY": {
      if (action.quantity <= 0) {
        return { items: state.items.filter((i) => i.slug !== action.slug) };
      }
      return {
        items: state.items.map((i) =>
          i.slug === action.slug ? { ...i, quantity: action.quantity } : i
        ),
      };
    }
    case "CLEAR":
      return { items: [] };
    case "HYDRATE":
      return action.state;
    default:
      return state;
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, { items: [] });

  // Читаем localStorage при монтировании
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as CartState;
        if (Array.isArray(parsed.items)) {
          dispatch({ type: "HYDRATE", state: parsed });
        }
      }
    } catch {
      // битые данные — игнорируем
    }
  }, []);

  // Пишем localStorage при изменении
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      // quota — игнорируем
    }
  }, [state]);

  const value: CartContextValue = {
    ...state,
    add: (slug, quantity) => dispatch({ type: "ADD", slug, quantity }),
    remove: (slug) => dispatch({ type: "REMOVE", slug }),
    setQty: (slug, quantity) => dispatch({ type: "SET_QTY", slug, quantity }),
    clear: () => dispatch({ type: "CLEAR" }),
    totalCount: state.items.reduce((sum, i) => sum + i.quantity, 0),
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) {
    throw new Error("useCart must be used within <CartProvider>");
  }
  return ctx;
}