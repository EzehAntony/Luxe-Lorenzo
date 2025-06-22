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
    
    // Reset the added state after 2 seconds
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
      
      {/* Title Section */}
      <section className="text-center mb-4 sm:mb-8 px-4 sm:px-6 mt-9">
        <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold text-white mb-2 sm:mb-4">Buy a Wig</h1>
        <p className="text-lg sm:text-xl text-white/80 max-w-2xl mx-auto">
          Discover our handcrafted wigs made with the finest materials for a natural, luxurious look.
        </p>
      </section>

      {/* Filter Section */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 mb-6 sm:mb-8">
        <div className="flex flex-wrap gap-2 sm:gap-4 justify-center">
          {wigTypes.map((type) => (
            <button
              key={type}
              onClick={() => setSelectedType(type)}
              className={`px-3 sm:px-6 py-2 rounded-full font-semibold transition-all duration-200 ${
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

      {/* Products Grid */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 pb-8 sm:pb-12">
        {filteredWigs.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-white/80 text-lg">No wigs found for the selected type.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            {filteredWigs.map((wig: Wig) => (
              <div 
                key={wig.id}
                className="group bg-white/10 border border-white/30 rounded-2xl p-3 sm:p-6 transition-all duration-200 hover:scale-[1.02] hover:bg-white/15 hover:shadow-lg"
              >
                {/* Wig Image */}
                <div className="relative w-full h-40 sm:h-48 lg:h-64 mb-3 sm:mb-4 overflow-hidden rounded-lg transition-transform duration-200 group-hover:scale-105">
                  <Image
                    src={wig.image}
                    alt={wig.name}
                    fill
                    className="object-cover"
                  />
                </div>

                {/* Wig Info */}
                <div className="text-center">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <span className="text-xs sm:text-sm text-white/60 bg-white/10 px-2 py-1 rounded-full">
                      {wig.type}
                    </span>
                  </div>
                  <h3 className="text-base sm:text-lg lg:text-xl font-semibold text-white mb-1 sm:mb-2 group-hover:text-pink-200 transition-colors duration-200">
                    {wig.name}
                  </h3>
                  <p className="text-xs sm:text-sm text-white/80 mb-2 sm:mb-3 group-hover:text-white/90 transition-colors duration-200">
                    {wig.description}
                  </p>
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-2 sm:gap-4">
                    <span className="text-lg sm:text-xl lg:text-2xl font-bold text-pink-300">
                      ${wig.price}
                    </span>
                    <button 
                      onClick={() => {
                        handleAddToCart(wig);
                      }}
                      className={`w-full sm:w-auto px-4 sm:px-6 py-2 rounded-full font-semibold transition-all duration-200 cursor-pointer ${
                        addedItems.has(wig.id)
                          ? "bg-green-500 text-white scale-105"
                          : "bg-gradient-to-r from-pink-500 to-pink-600 text-white hover:from-pink-600 hover:to-pink-700 hover:scale-105"
                      }`}
                    >
                      {addedItems.has(wig.id) ? "✓ Added" : "Add to Cart"}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  );
} 