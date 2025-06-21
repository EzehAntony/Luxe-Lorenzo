"use client";

import Link from "next/link";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";


function CartIcon() {
  const { itemCount } = useSelector((state: RootState) => state.cart);

  return (
    <Link
      href="/cart"
      className="relative inline-flex items-center justify-center w-12 h-12 bg-white/10 border border-white/30 rounded-full hover:bg-white/20 transition-colors duration-200"
    >
      <span className="text-2xl text-white">🛒</span>
      {itemCount > 0 && (
        <span className="absolute -top-2 -right-2 bg-pink-500 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center border-2 border-black/50">
          {itemCount > 99 ? '99+' : itemCount}
        </span>
      )}
    </Link>
  );
}

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 p-4 bg-black/50 backdrop-blur-sm flex justify-between items-center">
      <Link
        href="/"
        className="inline-flex items-center gap-2 bg-gradient-to-r from-pink-500 to-pink-600 text-white px-4 py-2 rounded-full font-semibold hover:from-pink-600 hover:to-pink-700 transition-all duration-200 hover:scale-105 shadow-lg"
      >
        <span>Back to Home</span>
      </Link>
      <CartIcon />
    </header>
  );
} 