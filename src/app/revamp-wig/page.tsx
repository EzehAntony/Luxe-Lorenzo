"use client"
import Link from "next/link";
import { useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import Header from "../../components/Header";

const services = [
  {
    id: "revamp",
    name: "Wig Revamp",
    description: "Complete restoration and styling of your old wig",
    price: 150,
    features: ["Deep cleaning", "Detangling", "Restyling", "Quality check"]
  },
  {
    id: "recolor",
    name: "Wig Recoloring",
    description: "Professional color treatment and dyeing",
    price: 200,
    features: ["Color consultation", "Professional dyeing", "Color protection", "Final styling"]
  },
  {
    id: "combo",
    name: "Revamp + Recolor",
    description: "Complete restoration with new color",
    price: 300,
    features: ["All revamp services", "All recoloring services", "Priority processing", "Extended warranty"]
  },
  {
    id: "custom",
    name: "Custom Service",
    description: "Tell us exactly what you need - we'll create a custom quote",
    price: "Custom",
    features: ["Custom consultation", "Personalized quote", "Flexible services", "Direct communication"]
  }
];

function hasIcon(obj: unknown): obj is { icon: string } {
  return (
    typeof obj === 'object' &&
    obj !== null &&
    'icon' in obj &&
    typeof (obj as { icon?: unknown }).icon === 'string'
  );
}

export default function RevampWig() {
  const [selectedService, setSelectedService] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    wigType: "",
    wigCondition: "",
    desiredColor: "",
    specialInstructions: "",
    preferredDate: "",
    customServices: "",
    budgetRange: "",
    timeline: "",
    urgency: ""
  });
  const [submitted, setSubmitted] = useState(false);
  const [serviceId, setServiceId] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    const newServiceId = uuidv4().substring(0, 8).toUpperCase();
    setServiceId(newServiceId);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <main className="min-h-screen bg-hot-pink-gradient select-none">
        <div className="flex items-center justify-center min-h-screen px-6">
          <div className="text-center max-w-md bg-white/10 border border-white/20 rounded-2xl p-8 shadow-lg">
            <div className="text-6xl mb-6">✨</div>
            <h1 className="text-3xl font-bold text-white mb-4">Request Submitted!</h1>
            <p className="text-white/80 mb-6">
              Thank you! We&apos;ll contact you within 24 hours to confirm your details.
            </p>
            <div className="bg-white/10 border border-white/20 rounded-lg p-4 mb-8">
              <p className="text-white/80 mb-2">Your Unique Service ID:</p>
              <p className="text-2xl font-bold text-pink-300 tracking-widest selectable">{serviceId}</p>
            </div>
            <p className="text-white/70 text-sm mb-8">
              Please write this ID on the package when you send us your wig.
            </p>
            <div className="space-y-4">
              <button 
                onClick={() => setSubmitted(false)}
                className="w-full bg-gradient-to-r from-pink-500 to-pink-600 text-white px-6 py-3 rounded-full font-semibold hover:from-pink-600 hover:to-pink-700 transition-all duration-200 hover:scale-105"
              >
                Submit Another Request
              </button>
              <Link 
                href="/"
                className="inline-flex items-center gap-2 bg-transparent border border-white/20 rounded-full px-6 py-3 text-white/90 hover:bg-white/10 transition-all duration-200"
              >
                <span>Back to Home</span>
              </Link>
            </div>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-hot-pink-gradient select-none pt-16 sm:pt-20">
      <Header />
      {/* Page Title */}
      <section className="text-center mb-3 sm:mb-8 px-3 sm:px-6 mt-6">
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-bold text-white mb-2 sm:mb-4">Revamp or Recolor Old Wig</h1>
        <p className="text-base sm:text-lg md:text-xl text-white/80 max-w-2xl mx-auto">
          Give your old wig a fresh look with our expert services. Fill out the form below to get started.
        </p>
      </section>

      <div className="max-w-6xl mx-auto px-3 sm:px-6 pb-6 sm:pb-12">
        {/* Service Selection */}
        <section className="max-w-4xl mx-auto px-3 sm:px-6 pb-6 sm:pb-12">
          <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-white mb-3 sm:mb-6 text-center">Select a Service</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6">
            {services.map((service) => {
              const icon = hasIcon(service) ? service.icon : null;
              return (
                <div
                  key={service.id}
                  onClick={() => setSelectedService(service.id)}
                  className={`p-3 sm:p-6 rounded-2xl border-2 cursor-pointer transition-all duration-200 ${
                    selectedService === service.id
                      ? "border-pink-500 bg-pink-500/10"
                      : "border-white/30 bg-white/10 hover:bg-white/15"
                  }`}
                >
                  {icon && (
                    <div className="text-2xl sm:text-3xl lg:text-4xl mb-2 sm:mb-4">{icon}</div>
                  )}
                  <h3 className="text-base sm:text-lg lg:text-xl font-semibold text-white mb-1 sm:mb-2">{service.name}</h3>
                  <p className="text-xs sm:text-sm lg:text-base text-white/80">{service.description}</p>
                  <div className="text-pink-300 font-bold text-base sm:text-lg lg:text-xl mt-2 sm:mt-4">${service.price}</div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Contact & Wig Form */}
        <div className="mt-8 sm:mt-12 bg-white/10 border border-white/30 rounded-2xl p-4 sm:p-6 lg:p-8">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-4 sm:mb-6 text-center">Your Details</h2>
          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              <div className="relative">
                <input
                  type="text"
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 bg-white/10 border border-white/30 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-pink-500 transition-colors"
                  placeholder="Your Name"
                  required
                />
              </div>
              <div className="relative">
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 bg-white/10 border border-white/30 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-pink-500 transition-colors"
                  placeholder="Your Email"
                  required
                />
              </div>
            </div>
            <div className="relative">
              <select
                id="service"
                value={selectedService}
                onChange={(e) => setSelectedService(e.target.value)}
                className="w-full px-4 py-3 bg-white/10 border border-white/30 rounded-lg text-white focus:outline-none focus:border-pink-500 transition-colors"
                required
              >
                <option value="">Select a service</option>
                {services.map((service) => (
                  <option key={service.id} value={service.id}>
                    {service.name} - ${service.price}
                  </option>
                ))}
                <option value="Custom Service">Custom Service</option>
              </select>
            </div>
            <div className="relative">
              <textarea
                id="description"
                value={formData.specialInstructions}
                onChange={(e) => setFormData({ ...formData, specialInstructions: e.target.value })}
                className="w-full px-4 py-3 bg-white/10 border border-white/30 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-pink-500 transition-colors resize-none"
                placeholder="Describe your wig and what you'd like us to do..."
                rows={4}
                required
              ></textarea>
            </div>
            
            {/* Conditional Fields for Custom Service */}
            {selectedService === 'custom' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 p-4 bg-white/10 rounded-lg">
                <div className="relative">
                  <input
                    type="text"
                    id="budget"
                    value={formData.customServices}
                    onChange={(e) => setFormData({ ...formData, customServices: e.target.value })}
                    className="w-full px-4 py-3 bg-white/10 border border-white/30 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-pink-500 transition-colors"
                    placeholder="Specific Services Needed"
                  />
                </div>
                <div className="relative">
                  <input
                    type="text"
                    id="timeline"
                    value={formData.budgetRange}
                    onChange={(e) => setFormData({ ...formData, budgetRange: e.target.value })}
                    className="w-full px-4 py-3 bg-white/10 border border-white/30 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-pink-500 transition-colors"
                    placeholder="Budget Range"
                  />
                </div>
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-pink-500 to-pink-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full font-semibold hover:from-pink-600 hover:to-pink-700 transition-all duration-200 hover:scale-105 shadow-lg text-base sm:text-lg"
            >
              Submit Request
            </button>
          </form>
        </div>
      </div>
    </main>
  );
} 