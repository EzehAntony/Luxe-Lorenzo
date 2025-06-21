"use client";
import Link from "next/link";
import Image from "next/image";
import CartIcon from "../../components/CartIcon";
import { useDispatch } from "react-redux";
import { addItem } from "../../store/cartSlice";
import { useState } from "react";

type Item = {
  id: number;
  name: string;
  price: number;
  image: string;
  description: string;
};

const items: Item[] = [
  {
    id: 1,
    name: 'Virgin Hair Bundle (12" - 30")',
    price: 120,
    image: "/hairitem.jpg",
    description: "Premium quality, tangle-free, natural look."
  },
  {
    id: 2,
    name: "Wig Cap (2pcs)",
    price: 8,
    image: "/hairitem.jpg",
    description: "Breathable, stretchable, perfect for wig installs."
  },
  {
    id: 3,
    name: "Wig Glue (Strong Hold)",
    price: 18,
    image: "/hairitem.jpg",
    description: "Waterproof, invisible finish, all-day hold."
  },
  {
    id: 4,
    name: "Edge Control Brush",
    price: 5,
    image: "/hairitem.jpg",
    description: "Dual-sided, perfect for styling baby hairs."
  },
  {
    id: 5,
    name: "Wig Stand",
    price: 20,
    image: "/hairitem.jpg",
    description: "Collapsible, lightweight, easy storage."
  },
];

export default function BuyItems() {
  const dispatch = useDispatch();
  const [addedItems, setAddedItems] = useState(new Set());

  const handleAddToCart = (item: Item) => {
    dispatch(addItem({ product: item, quantity: 1 }));
    setAddedItems(prev => new Set([...prev, item.id]));
    setTimeout(() => {
      setAddedItems(prev => {
        const newSet = new Set(prev);
        newSet.delete(item.id);
        return newSet;
      });
    }, 2000);
  };

  return (
    <main className="min-h-screen bg-hot-pink-gradient select-none">
      <CartIcon />
      <header className="p-6">
        <Link
          href="/"
          className="inline-flex items-center gap-3 bg-gradient-to-r from-pink-500 to-pink-600 text-white px-6 py-3 rounded-full font-semibold hover:from-pink-600 hover:to-pink-700 transition-all duration-200 hover:scale-105 shadow-lg"
        >
          <span>Back to Home</span>
        </Link>
      </header>
      <section className="text-center mb-8 px-6">
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">Buy Hair & Wigging Items</h1>
        <p className="text-xl text-white/80 max-w-2xl mx-auto mb-8">
          Shop premium hair bundles and all the essentials for wig making and installs.
        </p>
      </section>
      <section className="max-w-5xl mx-auto px-6 pb-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {items.map((item) => (
            <div key={item.id} className="bg-white/10 border border-white/30 rounded-2xl p-6 flex flex-col items-center hover:bg-white/15 hover:scale-[1.02] hover:shadow-lg transition-all duration-200">
              <div className="relative w-32 h-32 mb-4 overflow-hidden rounded-lg">
                <Image src={item.image} alt={item.name} fill className="object-cover" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2 text-center">{item.name}</h3>
              <p className="text-white/80 text-sm mb-3 text-center">{item.description}</p>
              <div className="text-pink-300 font-bold text-xl mb-4">${item.price}</div>
              <button
                onClick={() => handleAddToCart(item)}
                className={`px-6 py-2 rounded-full font-semibold bg-gradient-to-r from-pink-500 to-pink-600 text-white hover:from-pink-600 hover:to-pink-700 transition-all duration-200 hover:scale-105 w-full ${addedItems.has(item.id) ? 'bg-green-500 text-white scale-105' : ''}`}
                disabled={addedItems.has(item.id)}
              >
                {addedItems.has(item.id) ? '✓ Added!' : 'Add to Cart'}
              </button>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
} 