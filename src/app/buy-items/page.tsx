"use client";

import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { addItem } from "../../store/cartSlice";
import Header from "../../components/Header";
import { hairItems } from "../../data";
import { RootState } from "../../store/store";

type Item = {
  id: number;
  name: string;
  price: number;
  image: string;
  description: string;
};

export default function BuyItems() {
  const dispatch = useDispatch();
  const addedItems = new Set(
    useSelector((state: RootState) => state.cart.items.map((i) => i.id))
  );

  const handleAddToCart = (item: Item) => {
    dispatch(addItem({ product: item, quantity: 1 }));
    setTimeout(() => {
      // This is a placeholder for the removed addedItems state
    }, 2000);
  };

  return (
    <main className="min-h-screen bg-hot-pink-gradient select-none pt-16 sm:pt-20">
      <Header />
      <section className="text-center mb-4 sm:mb-8 px-4 sm:px-6 mt-6">
        <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold text-white mb-2 sm:mb-4">Buy Hair & Wigging Items</h1>
        <p className="text-lg sm:text-xl text-white/80 max-w-2xl mx-auto mb-4 sm:mb-8">
          Shop premium hair bundles and all the essentials for wig making and installs.
        </p>
      </section>
      <section className="max-w-7xl mx-auto px-3 sm:px-6 pb-8 sm:pb-12">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6">
          {hairItems.map((item) => (
            <div key={item.id} className="bg-white/10 border border-white/30 rounded-2xl p-3 sm:p-4 flex flex-col items-center hover:bg-white/15 hover:scale-[1.02] hover:shadow-lg transition-all duration-200">
              <div className="relative w-full h-24 sm:h-32 lg:h-40 mb-3 sm:mb-4 overflow-hidden rounded-lg">
                <Image src={item.image} alt={item.name} fill className="object-cover" />
              </div>
              <div className="flex flex-col flex-grow w-full text-center">
                <h3 className="text-sm sm:text-base lg:text-lg font-semibold text-white mb-1 sm:mb-2 flex-grow">{item.name}</h3>
                <p className="text-xs sm:text-sm text-white/80 mb-2 sm:mb-3">{item.description}</p>
              </div>
              <div className="text-pink-300 font-bold text-base sm:text-lg lg:text-xl mt-auto mb-2 sm:mb-4">${item.price}</div>
              <button
                onClick={() => handleAddToCart(item)}
                className={`w-full px-3 sm:px-4 py-2 rounded-full font-semibold bg-gradient-to-r from-pink-500 to-pink-600 text-white hover:from-pink-600 hover:to-pink-700 transition-all duration-200 hover:scale-105 ${addedItems.has(item.id) ? 'bg-green-500' : ''}`}
                disabled={addedItems.has(item.id)}
              >
                {addedItems.has(item.id) ? '✓ Added' : 'Add to Cart'}
              </button>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
} 