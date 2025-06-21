"use client"
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addItem } from "../../store/cartSlice";
import { wigs, wigTypes } from "../../data";
import CartIcon from "../../components/CartIcon";

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
    <main className="min-h-screen bg-hot-pink-gradient select-none">
      <CartIcon />
      
      {/* Header */}
      <header className="p-6">
        <Link 
          href="/" 
          className="inline-flex items-center gap-3 bg-gradient-to-r from-pink-500 to-pink-600 text-white px-6 py-3 rounded-full font-semibold hover:from-pink-600 hover:to-pink-700 transition-all duration-200 hover:scale-105 shadow-lg"
        >
          <span>Back to Home</span>
        </Link>
      </header>

      {/* Title Section */}
      <section className="text-center mb-8 px-6">
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
          Premium Wig Collection
        </h1>
        <p className="text-xl text-white/80 max-w-2xl mx-auto mb-8">
          Discover our handcrafted wigs made with the finest materials for a natural, luxurious look
        </p>
      </section>

      {/* Filter Section */}
      <section className="max-w-4xl mx-auto px-6 mb-12">
        <div className="flex flex-wrap justify-center gap-4">
          {wigTypes.map((type) => (
            <button
              key={type}
              onClick={() => setSelectedType(type)}
              className={`px-6 py-3 rounded-full font-semibold transition-all duration-200 ${
                selectedType === type
                  ? "bg-gradient-to-r from-pink-500 to-pink-600 text-white shadow-lg"
                  : "bg-white/10 border border-white/30 text-white/80 hover:bg-white/20 hover:text-white"
              }`}
            >
              {type}
            </button>
          ))}
        </div>
      </section>

      {/* Wig Grid */}
      <section className="max-w-7xl mx-auto px-6 pb-12">
        {filteredWigs.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-6xl mb-6">🔍</div>
            <h2 className="text-2xl font-bold text-white mb-4">No wigs found</h2>
            <p className="text-white/80 mb-8">Try adjusting your filters to see more results.</p>
            <button
              onClick={() => setSelectedType("All")}
              className="inline-block bg-gradient-to-r from-pink-500 to-pink-600 text-white px-8 py-3 rounded-full font-semibold hover:from-pink-600 hover:to-pink-700 transition-all duration-200 hover:scale-105"
            >
              Clear All Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredWigs.map((wig) => (
              <div 
                key={wig.id}
                className="group bg-white/10 border border-white/30 rounded-2xl p-6 transition-all duration-200 hover:scale-[1.02] hover:bg-white/15 hover:shadow-lg"
              >
                {/* Wig Image */}
                <div className="relative w-full h-64 mb-4 overflow-hidden rounded-lg transition-transform duration-200 group-hover:scale-105">
                  <Image
                    src={wig.image}
                    alt={wig.name}
                    fill
                    className="object-cover"
                  />
                </div>

                {/* Wig Info */}
                <div className="text-center">
                  <div className="mb-2">
                    <span className="inline-block bg-pink-500/20 text-pink-300 text-xs px-3 py-1 rounded-full border border-pink-500/30">
                      {wig.type}
                    </span>
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-pink-200 transition-colors duration-200">
                    {wig.name}
                  </h3>
                  <p className="text-white/80 text-sm mb-3 group-hover:text-white/90 transition-colors duration-200">
                    {wig.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-pink-300">
                      ${wig.price}
                    </span>
                    <button 
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        handleAddToCart(wig);
                      }}
                      className={`px-6 py-2 rounded-full font-semibold transition-all duration-200 cursor-pointer ${
                        addedItems.has(wig.id)
                          ? "bg-green-500 text-white scale-105"
                          : "bg-gradient-to-r from-pink-500 to-pink-600 text-white hover:from-pink-600 hover:to-pink-700 hover:scale-105"
                      }`}
                    >
                      {addedItems.has(wig.id) ? "✓ Added!" : "Add to Cart"}
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