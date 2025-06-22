"use client"
import Link from "next/link";
import Image from "next/image";
import { useSelector, useDispatch } from "react-redux";
import { removeItem, updateQuantity, clearCart } from "../../store/cartSlice";
import { RootState } from "../../store/store";
import Header from "../../components/Header";

type CartItem = {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
  description: string;
};

export default function Cart() {
  const items = useSelector((state: RootState) => state.cart.items) as CartItem[];
  const dispatch = useDispatch();

  const itemCount = items.reduce((total, item) => total + item.quantity, 0);
  const subtotal = items.reduce((total, item) => total + (item.price * item.quantity), 0);
  const shipping = subtotal > 500 ? 0 : 15;
  const tax = subtotal * 0.08;
  const finalTotal = subtotal + shipping + tax;

  const handleRemoveItem = (id: number) => {
    dispatch(removeItem(id));
  };

  const handleUpdateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity === 0) {
      dispatch(removeItem(id));
    } else {
      dispatch(updateQuantity({ productId: id, quantity: newQuantity }));
    }
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  const handleCheckout = () => {
    // TODO: Implement checkout logic
    alert('Checkout functionality coming soon!');
  };

  return (
    <main className="min-h-screen bg-hot-pink-gradient select-none pt-16 sm:pt-20">
      <Header />
      
      {/* Title Section */}
      <section className="text-center mb-4 sm:mb-8 px-4 sm:px-6 mt-6">
        <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold text-white mb-2 sm:mb-4">Your Cart</h1>
        <p className="text-lg sm:text-xl text-white/80 max-w-2xl mx-auto">
          Review your items and proceed to checkout.
        </p>
      </section>

      {/* Cart Content */}
      <section className="max-w-6xl mx-auto px-3 sm:px-6 pb-8 sm:pb-12">
        {items.length === 0 ? (
          // Empty Cart
          <div className="text-center py-8 sm:py-12">
            <div className="text-6xl mb-4 sm:mb-6">🛒</div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2 sm:mb-4">Your cart is empty</h2>
            <p className="text-white/80 mb-6 sm:mb-8">Start shopping to add some amazing products to your cart!</p>
            <Link
              href="/buy-wig"
              className="inline-block bg-gradient-to-r from-pink-500 to-pink-600 text-white px-6 sm:px-8 py-3 rounded-full font-semibold hover:from-pink-600 hover:to-pink-700 transition-all duration-200 hover:scale-105"
            >
              Start Shopping
            </Link>
          </div>
        ) : (
          // Cart with Items - 2 Column Layout
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
            {/* Left Column - Cart Items */}
            <div className="lg:col-span-2 space-y-3 sm:space-y-4">
              <h2 className="text-xl sm:text-2xl font-bold text-white">Your Cart</h2>
                  {items.map((item: CartItem) => (
                    <div 
                      key={item.id}
                      className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 p-3 sm:p-4 bg-white/10 rounded-2xl border border-white/20"
                    >
                      {/* Product Image */}
                      <div className="relative w-20 h-20 sm:w-24 sm:h-24 lg:w-32 lg:h-32 overflow-hidden rounded-lg flex-shrink-0">
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          className="object-cover"
                        />
                      </div>

                      {/* Product Info & Quantity */}
                      <div className="flex flex-col sm:flex-row flex-grow items-center w-full">
                        <div className="flex-grow text-center sm:text-left mb-3 sm:mb-0">
                          <h3 className="text-base sm:text-lg font-semibold text-white mb-1">{item.name}</h3>
                          <p className="text-pink-300 font-bold text-base sm:text-lg">${item.price}</p>
                        </div>
                        
                        {/* Quantity Controls */}
                        <div className="flex items-center gap-2 sm:gap-3 lg:gap-4 flex-shrink-0">
                          <button
                            onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                            className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white/20 text-white hover:bg-white/30 transition-colors duration-200 flex items-center justify-center font-bold text-sm sm:text-base"
                          >
                            -
                          </button>
                          <span className="text-white font-semibold text-base sm:text-lg min-w-[1.5rem] sm:min-w-[2rem] text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                            className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white/20 text-white hover:bg-white/30 transition-colors duration-200 flex items-center justify-center font-bold text-sm sm:text-base"
                          >
                            +
                          </button>
                        </div>
                      </div>

                      {/* Remove Button */}
                      <button
                        onClick={() => handleRemoveItem(item.id)}
                        className="text-red-400 hover:text-red-300 transition-colors duration-200 text-xl sm:text-2xl flex-shrink-0"
                      >
                        &times;
                      </button>
                    </div>
                  ))}
            </div>

            {/* Right Column - Checkout Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white/10 border border-white/30 rounded-2xl p-4 sm:p-6 sticky top-6">
                <h2 className="text-xl sm:text-2xl font-bold text-white mb-4 sm:mb-6">Order Summary</h2>
                
                {/* Summary Details */}
                <div className="space-y-3 sm:space-y-4 mb-6 sm:mb-8">
                  <div className="flex justify-between text-white/80">
                    <span>Subtotal ({itemCount} items)</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-white/80">
                    <span>Shipping</span>
                    <span>${shipping.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-white/80">
                    <span>Tax</span>
                    <span>${tax.toFixed(2)}</span>
                  </div>
                  <div className="border-t border-white/20 pt-3 sm:pt-4">
                    <div className="flex justify-between text-white font-bold text-lg sm:text-xl">
                      <span>Total</span>
                      <span>${finalTotal.toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                {/* Checkout Button */}
                <button
                  onClick={handleCheckout}
                  className="w-full bg-gradient-to-r from-pink-500 to-pink-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full font-semibold hover:from-pink-600 hover:to-pink-700 transition-all duration-200 hover:scale-105 shadow-lg text-base sm:text-lg"
                >
                  Proceed to Checkout
                </button>

                {/* Clear Cart Button */}
                <button
                  onClick={handleClearCart}
                  className="w-full mt-3 sm:mt-4 bg-white/10 text-white px-6 sm:px-8 py-2 sm:py-3 rounded-full font-semibold hover:bg-white/20 transition-all duration-200 text-sm sm:text-base"
                >
                  Clear Cart
                </button>
              </div>
            </div>
          </div>
        )}
      </section>
    </main>
  );
} 