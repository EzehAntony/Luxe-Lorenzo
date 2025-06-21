"use client"
import Link from "next/link";
import { useSelector } from "react-redux";

export default function CartIcon() {
  const { itemCount } = useSelector((state) => state.cart);

  return (
    <div className="fixed top-6 right-6 z-50">
      <Link 
        href="/cart"
        className="relative inline-flex items-center justify-center w-12 h-12 bg-white/10 border border-white/30 rounded-full hover:bg-white/20 transition-colors duration-200"
      >
        <span className="text-2xl text-white">🛒</span>
        {itemCount > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center">
            {itemCount > 99 ? '99+' : itemCount}
          </span>
        )}
      </Link>
    </div>
  );
} 