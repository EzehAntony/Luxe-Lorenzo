"use client"
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function Home() {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShowSplash(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <main className="min-h-screen flex items-center justify-center bg-hot-pink-gradient select-none">
      {showSplash ? (
        <div className="flex flex-col items-center justify-center w-full h-full">
          <h1
            className="text-5xl md:text-7xl font-bold text-white font-[cursive]"
            style={{
              fontFamily: "'Dancing Script', 'Pacifico', cursive",
              letterSpacing: "0.05em",
            }}
          >
            Luxe Lorenzo
          </h1>
        </div>
      ) : (
        <>
          <section className="w-full max-w-4xl mx-auto flex flex-col items-center gap-6 sm:gap-10 p-3 sm:p-4 mt-6">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4 sm:mb-6 text-center">What would you like to do today?</h2>
            <div className="flex flex-col md:flex-row gap-4 sm:gap-8 w-full justify-center">
              {/* Buy a Wig Card */}
              <Link href="/buy-wig" className="group flex-1 bg-white/10 border border-white/30 rounded-2xl p-4 sm:p-8 flex flex-col items-center gap-3 sm:gap-4 transition-all duration-200 cursor-pointer min-w-[200px] text-center hover:scale-[1.02] hover:bg-white/15 hover:shadow-lg">
                <div className="relative w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 overflow-hidden rounded-lg transition-transform duration-200 group-hover:scale-105">
                  <Image
                    src="/wig1.png"
                    alt="Buy a Wig"
                    fill
                    className="object-cover"
                  />
                </div>
                <span className="text-lg sm:text-xl font-semibold text-white group-hover:text-pink-200 transition-colors duration-200">Buy a Wig</span>
                <span className="text-white/80 text-center text-sm sm:text-base group-hover:text-white/90 transition-colors duration-200">Shop our premium collection of new wigs.</span>
              </Link>
              {/* Revamp/Color Card */}
              <Link href="/revamp-wig" className="group flex-1 bg-white/10 border border-white/30 rounded-2xl p-4 sm:p-8 flex flex-col items-center gap-3 sm:gap-4 transition-all duration-200 cursor-pointer min-w-[200px] text-center hover:scale-[1.02] hover:bg-white/15 hover:shadow-lg">
                <div className="relative w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 overflow-hidden rounded-lg transition-transform duration-200 group-hover:scale-105">
                  <Image
                    src="/wig.jpg"
                    alt="Revamp or Color Old Wig"
                    fill
                    className="object-cover"
                  />
                </div>
                <span className="text-lg sm:text-xl font-semibold text-white group-hover:text-pink-200 transition-colors duration-200">Revamp or Color Old Wig</span>
                <span className="text-white/80 text-center text-sm sm:text-base group-hover:text-white/90 transition-colors duration-200">Give your old wig a fresh look with our expert services.</span>
              </Link>
              {/* Buy Hair & Wigging Items Card */}
              <Link href="/buy-items" className="group flex-1 bg-white/10 border border-white/30 rounded-2xl p-4 sm:p-8 flex flex-col items-center gap-3 sm:gap-4 transition-all duration-200 cursor-pointer min-w-[200px] text-center hover:scale-[1.02] hover:bg-white/15 hover:shadow-lg">
                <div className="relative w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 overflow-hidden rounded-lg transition-transform duration-200 group-hover:scale-105">
                  <Image
                    src="/hairitem.jpg"
                    alt="Buy Hair & Wigging Items"
                    fill
                    className="object-cover"
                  />
                </div>
                <span className="text-lg sm:text-xl font-semibold text-white group-hover:text-pink-200 transition-colors duration-200">Buy Hair & Wigging Items</span>
                <span className="text-white/80 text-center text-sm sm:text-base group-hover:text-white/90 transition-colors duration-200">Bundles, glue, caps, combs & more.</span>
              </Link>
            </div>
          </section>
        </>
      )}
    </main>
  );
}
