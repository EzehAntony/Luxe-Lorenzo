"use client"
import Link from "next/link";
import Image from "next/image";

export default function Home() {
  // Splash screen removed from here
  return (
    <main className="min-h-screen flex items-center justify-center bg-hot-pink-gradient select-none">
      <section className="w-full max-w-3xl mx-auto flex flex-col items-center gap-8 p-4 mt-10 bg-white/10 rounded-3xl shadow-lg border border-white/20">
        <h2 className="text-3xl sm:text-4xl font-bold text-white mb-2 text-center drop-shadow-lg">What would you like to do today?</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 w-full">
          {/* Buy a Wig Card */}
          <Link href="/buy-wig" className="group flex flex-col items-center bg-white/20 rounded-2xl p-6 transition-all duration-200 hover:scale-105 hover:bg-white/30 shadow-md border border-white/20">
            <div className="relative w-20 h-20 mb-3">
              <Image src="/wig1.png" alt="Buy a Wig" fill className="object-cover rounded-xl shadow" />
            </div>
            <span className="text-lg font-semibold text-white group-hover:text-pink-200 transition-colors duration-200">Buy a Wig</span>
            <span className="text-white/80 text-center text-sm mt-1">Shop our premium collection of new wigs.</span>
          </Link>
          {/* Revamp/Color Card */}
          <Link href="/revamp-wig" className="group flex flex-col items-center bg-white/20 rounded-2xl p-6 transition-all duration-200 hover:scale-105 hover:bg-white/30 shadow-md border border-white/20">
            <div className="relative w-20 h-20 mb-3">
              <Image src="/wig.jpg" alt="Revamp or Color Old Wig" fill className="object-cover rounded-xl shadow" />
            </div>
            <span className="text-lg font-semibold text-white group-hover:text-pink-200 transition-colors duration-200">Revamp or Color Old Wig</span>
            <span className="text-white/80 text-center text-sm mt-1">Give your old wig a fresh look with our expert services.</span>
          </Link>
          {/* Buy Hair & Wigging Items Card */}
          <Link href="/buy-items" className="group flex flex-col items-center bg-white/20 rounded-2xl p-6 transition-all duration-200 hover:scale-105 hover:bg-white/30 shadow-md border border-white/20">
            <div className="relative w-20 h-20 mb-3">
              <Image src="/hairitem.jpg" alt="Buy Hair & Wigging Items" fill className="object-cover rounded-xl shadow" />
            </div>
            <span className="text-lg font-semibold text-white group-hover:text-pink-200 transition-colors duration-200">Buy Hair & Wigging Items</span>
            <span className="text-white/80 text-center text-sm mt-1">Bundles, glue, caps, combs & more.</span>
          </Link>
        </div>
      </section>
    </main>
  );
}
