"use client"
import Image from "next/image";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addItem } from "../../store/cartSlice";
import { wigs, wigTypes } from "../../data";
import Header from "../../components/Header";

type Wig = {
  id: number;
  name: string;
  type: string;
  price: number;
  displayPrice?: string;
  image: string;
  description: string;
  inStock?: boolean;
  colors?: string[];
  material?: string;
  length?: string;
};

export default function BuyWig() {
  const [selectedType, setSelectedType] = useState("All");
  const [addedItems, setAddedItems] = useState<Set<number>>(new Set());
  const dispatch = useDispatch();

  const filteredWigs = selectedType === "All"
    ? wigs
    : wigs.filter(wig => wig.type === selectedType);

  const handleAddToCart = (wig: Wig) => {
    dispatch(addItem({ product: wig, quantity: 1 }));
    setAddedItems(prev => new Set([...prev, wig.id]));
    setTimeout(() => {
      setAddedItems(prev => {
        const newSet = new Set(prev);
        newSet.delete(wig.id);
        return newSet;
      });
    }, 2000);
  };

  return (
    <main className="min-h-screen bg-hot-pink-gradient select-none pt-16 sm:pt-20">
      <Header />
      <section className="text-center mb-4 sm:mb-8 px-4 sm:px-6 mt-6">
        <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold text-white mb-2 sm:mb-4">Buy a Wig</h1>
        <p className="text-lg sm:text-xl text-white/80 max-w-2xl mx-auto mb-4 sm:mb-8">
          Discover our handcrafted wigs made with the finest materials for a natural, luxurious look.
        </p>
      </section>
      <section className="max-w-7xl mx-auto px-3 sm:px-6 mb-4 sm:mb-6">
        <div className="flex flex-wrap gap-1 sm:gap-2 justify-center">
          {wigTypes.map((type) => (
            <button
              key={type}
              onClick={() => setSelectedType(type)}
              className={`px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 border border-white/30 focus:outline-none focus:ring-2 focus:ring-pink-400 ${
                selectedType === type
                  ? "bg-gradient-to-r from-pink-500 to-pink-600 text-white scale-105"
                  : "bg-white/10 text-white hover:bg-white/20"
              }`}
            >
              {type}
            </button>
          ))}
        </div>
      </section>
      <section className="max-w-7xl mx-auto px-3 sm:px-6 pb-8 sm:pb-12">
        {filteredWigs.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-white/80 text-lg">No wigs found for the selected type.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6">
            {filteredWigs.map((wig: Wig) => (
              <div
                key={wig.id}
                className="bg-white/10 border border-white/30 rounded-2xl p-3 sm:p-4 flex flex-col items-center hover:bg-white/15 hover:scale-[1.02] hover:shadow-lg transition-all duration-200"
              >
                <div className="relative w-full h-24 sm:h-32 lg:h-40 mb-3 sm:mb-4 overflow-hidden rounded-lg">
                  <Image src={wig.image} alt={wig.name} fill className="object-cover" />
                </div>
                <div className="flex flex-col flex-grow w-full text-center">
                  <h3 className="text-sm sm:text-base lg:text-lg font-semibold text-white mb-1 sm:mb-2 flex-grow">{wig.name}</h3>
                  <span className="text-xs sm:text-sm text-white/60 bg-white/10 px-2 py-1 rounded-full mb-1">{wig.type}</span>
                  <p className="text-xs sm:text-sm text-white/80 mb-2 sm:mb-3">{wig.description}</p>
                </div>
                <div className="text-pink-300 font-bold text-base sm:text-lg lg:text-xl mt-auto mb-2 sm:mb-4">${wig.price}</div>
                <button
                  onClick={() => handleAddToCart(wig)}
                  className={`w-full px-3 sm:px-4 py-2 rounded-full font-semibold bg-gradient-to-r from-pink-500 to-pink-600 text-white hover:from-pink-600 hover:to-pink-700 transition-all duration-200 hover:scale-105 ${addedItems.has(wig.id) ? 'bg-green-500' : ''}`}
                  disabled={addedItems.has(wig.id)}
                >
                  {addedItems.has(wig.id) ? '✓ Added' : 'Add to Cart'}
                </button>
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  );
} 