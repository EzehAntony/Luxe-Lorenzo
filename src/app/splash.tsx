"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Splash() {
  const router = useRouter();
  useEffect(() => {
    const timer = setTimeout(() => router.replace("/"), 3000);
    return () => clearTimeout(timer);
  }, [router]);

  return (
    <main className="min-h-screen flex items-center justify-center bg-hot-pink-gradient select-none">
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
    </main>
  );
} 