"use client";

import { createContext, useContext, useEffect, useState } from "react";

type CartType = {
  items: number;
  price: number;
  title: string;
  description: string;
  images: string[];
};

type CartContextType = {
  cart: CartType;
  setCart: React.Dispatch<React.SetStateAction<CartType>>;
};

const defaultCart: CartType = {
  items: 0,
  price: 0,
  images: [],
  title: "",
  description: "",
};

const CartContext = createContext<CartContextType | null>(null);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cart, setCart] = useState<CartType>(() => {
    // runs only once
    if (typeof window !== "undefined") {
      const storedCart = localStorage.getItem("cart");
      return storedCart ? JSON.parse(storedCart) : defaultCart;
    }
    return defaultCart;
  });

  //  Save to localStorage when cart changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  return (
    <CartContext.Provider value={{ cart, setCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used inside CartProvider");
  }
  return context;
};
