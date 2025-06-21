"use client"
import Link from "next/link";
import Image from "next/image";
import { useSelector, useDispatch } from "react-redux";
import { removeItem, updateQuantity, clearCart } from "../../store/cartSlice";
import CartIcon from "../../components/CartIcon";
import { RootState } from "../../store/types";

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
      dispatch(updateQuantity({ id, quantity: newQuantity }));
    }
  };

  const handleClearCart = () => {
    dispatch(clearCart());
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
          Shopping Cart
        </h1>
        <p className="text-xl text-white/80">
          {itemCount} item{itemCount !== 1 ? 's' : ''} in your cart
        </p>
      </section>

      {/* Cart Content */}
      <section className="max-w-5xl mx-auto px-6 pb-12">
        {items.length === 0 ? (
          // Empty Cart
          <div className="text-center py-16">
            <div className="text-6xl mb-6">🛒</div>
            <h2 className="text-2xl font-bold text-white mb-4">Your cart is empty</h2>
            <p className="text-white/80 mb-8">Start shopping to add some beautiful wigs to your cart!</p>
            <Link 
              href="/buy-wig"
              className="inline-block bg-gradient-to-r from-pink-500 to-pink-600 text-white px-8 py-3 rounded-full font-semibold hover:from-pink-600 hover:to-pink-700 transition-all duration-200 hover:scale-105"
            >
              Browse Wigs
            </Link>
          </div>
        ) : (
          // Cart with Items - 2 Column Layout
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
            {/* Left Column - Cart Items */}
            <div className="lg:col-span-3">
              <div className="bg-white/10 border border-white/30 rounded-2xl p-4 mb-6">
                <h2 className="text-xl font-bold text-white mb-4">Cart Items</h2>
                <div className="space-y-3">
                  {items.map((item) => (
                    <div 
                      key={item.id}
                      className="flex items-center gap-3 p-3 bg-white/5 rounded-lg border border-white/10"
                    >
                      {/* Product Image */}
                      <div className="relative w-16 h-16 overflow-hidden rounded-lg flex-shrink-0">
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          className="object-cover"
                        />
                      </div>

                      {/* Product Info */}
                      <div className="flex-1 min-w-0">
                        <h3 className="text-base font-semibold text-white mb-1 truncate">{item.name}</h3>
                        <p className="text-white/60 text-xs mb-1 truncate">{item.description}</p>
                        <span className="text-lg font-bold text-pink-300">${item.price}</span>
                      </div>

                      {/* Quantity Controls */}
                      <div className="flex items-center gap-2">
                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                            className="w-6 h-6 rounded-full bg-white/20 text-white hover:bg-white/30 transition-colors duration-200 flex items-center justify-center text-sm"
                          >
                            -
                          </button>
                          <span className="text-white font-semibold min-w-[1.5rem] text-center text-sm">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                            className="w-6 h-6 rounded-full bg-white/20 text-white hover:bg-white/30 transition-colors duration-200 flex items-center justify-center text-sm"
                          >
                            +
                          </button>
                        </div>
                        
                        {/* Remove Button */}
                        <button
                          onClick={() => handleRemoveItem(item.id)}
                          className="text-red-400 hover:text-red-300 transition-colors duration-200 text-xs ml-2"
                        >
                          Remove
                        </button>
                      </div>

                      {/* Item Total */}
                      <div className="text-right min-w-[70px]">
                        <span className="text-base font-bold text-pink-300">
                          ${(item.price * item.quantity).toFixed(2)}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column - Checkout Summary */}
            <div className="lg:col-span-2">
              <div className="bg-white/10 border border-white/30 rounded-2xl p-6 sticky top-6">
                <h2 className="text-2xl font-bold text-white mb-6">Order Summary</h2>
                
                {/* Price Breakdown */}
                <div className="space-y-3 mb-6">
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
                  <div className="border-t border-white/20 pt-3">
                    <div className="flex justify-between text-xl font-bold text-white">
                      <span>Total</span>
                      <span>${finalTotal.toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                {/* Shipping Info */}
                <div className="mb-6 p-4 bg-white/5 rounded-xl">
                  <h3 className="text-lg font-semibold text-white mb-3">Shipping</h3>
                  <p className="text-white/80 text-sm mb-2">
                    {shipping === 0 
                      ? 'Free shipping on orders over $500' 
                      : 'Standard shipping: $15.00'
                    }
                  </p>
                  <p className="text-white/60 text-xs">Estimated delivery: 3-5 business days</p>
                </div>

                {/* Action Buttons */}
                <div className="space-y-3">
                  <button className="w-full bg-gradient-to-r from-pink-500 to-pink-600 text-white py-3 rounded-full font-semibold hover:from-pink-600 hover:to-pink-700 transition-all duration-200 hover:scale-105">
                    Proceed to Checkout
                  </button>
                  <button
                    onClick={handleClearCart}
                    className="w-full bg-red-500/20 border border-red-500/30 text-red-300 py-3 rounded-full font-semibold hover:bg-red-500/30 transition-all duration-200"
                  >
                    Clear Cart
                  </button>
                  <Link 
                    href="/buy-wig"
                    className="block w-full text-center text-white/80 hover:text-white transition-colors duration-200 text-sm"
                  >
                    Continue Shopping
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </section>
    </main>
  );
} 