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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [serviceId, setServiceId] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const newServiceId = uuidv4().substring(0, 8).toUpperCase();
    setServiceId(newServiceId);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSubmitting(false);
    setSubmitted(true);
  };

  const selectedServiceData = services.find(service => service.id === selectedService);

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
    <main className="min-h-screen bg-hot-pink-gradient select-none pt-20">
      <Header />
      
      {/* Title Section */}
      <section className="text-center mb-12 px-6">
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
          Wig Revamp & Recolor
        </h1>
        <p className="text-xl text-white/80 max-w-3xl mx-auto">
          Give your old wigs new life with our professional restoration and recoloring services. 
          Our expert stylists will transform your wigs to look brand new.
        </p>
      </section>

      <div className="max-w-6xl mx-auto px-6 pb-12">
        {/* Service Selection */}
        <section className="max-w-4xl mx-auto px-6 pb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-6 text-center">Select a Service</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service) => (
              <div
                key={service.id}
                onClick={() => setSelectedService(service.id)}
                className={`p-6 rounded-2xl border-2 cursor-pointer transition-all duration-200 hover:scale-105 ${
                  selectedService === service.id
                    ? "border-pink-500 bg-pink-500/10"
                    : "border-white/20 bg-white/5 hover:border-white/40"
                }`}
              >
                <div className="text-center">
                  <h3 className="text-xl font-semibold text-white mb-2">{service.name}</h3>
                  <p className="text-white/70 text-sm mb-4">{service.description}</p>
                  <div className="text-2xl font-bold text-pink-300 mb-4">${service.price}</div>
                  <ul className="text-white/80 text-sm space-y-1">
                    {service.features.map((feature, index) => (
                      <li key={index} className="flex items-center justify-center gap-2">
                        <span className="text-green-400">✓</span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Service Details */}
        {selectedService && (
          <section className="mb-12">
            <div className="bg-white/10 border border-white/20 rounded-2xl p-8">
              <h3 className="text-xl font-semibold text-white mb-4">Selected Service: {selectedServiceData?.name}</h3>
              <p className="text-white/80 mb-4">{selectedServiceData?.description}</p>
              <div className="text-2xl font-bold text-pink-300">Price: ${selectedServiceData?.price}</div>
            </div>
          </section>
        )}

        {/* Contact Form */}
        <section className="mt-12 bg-white/10 border border-white/30 rounded-2xl p-6 sm:p-8">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-6 text-center">Your Details</h2>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Personal Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-white mb-4">Personal Information</h3>
                
                <div>
                  <label className="block text-white/80 mb-2">Full Name *</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-pink-500 transition-colors"
                    placeholder="Enter your full name"
                  />
                </div>

                <div>
                  <label className="block text-white/80 mb-2">Email Address *</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-pink-500 transition-colors"
                    placeholder="Enter your email"
                  />
                </div>

                <div>
                  <label className="block text-white/80 mb-2">Phone Number</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-pink-500 transition-colors"
                    placeholder="Enter your phone number"
                  />
                </div>
              </div>

              {/* Wig Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-white mb-4">Wig Information</h3>
                
                <div>
                  <label className="block text-white/80 mb-2">Wig Type</label>
                  <select
                    name="wigType"
                    value={formData.wigType}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:border-pink-500 transition-colors"
                  >
                    <option value="">Select wig type</option>
                    <option value="synthetic">Synthetic</option>
                    <option value="human-hair">Human Hair</option>
                    <option value="blend">Synthetic Blend</option>
                    <option value="lace-front">Lace Front</option>
                    <option value="full-lace">Full Lace</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-white/80 mb-2">Current Condition</label>
                  <select
                    name="wigCondition"
                    value={formData.wigCondition}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:border-pink-500 transition-colors"
                  >
                    <option value="">Select condition</option>
                    <option value="good">Good - Minor wear</option>
                    <option value="fair">Fair - Some damage</option>
                    <option value="poor">Poor - Significant damage</option>
                    <option value="unknown">Unknown</option>
                  </select>
                </div>

                <div>
                  <label className="block text-white/80 mb-2">Desired Color (for recoloring)</label>
                  <input
                    type="text"
                    name="desiredColor"
                    value={formData.desiredColor}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-pink-500 transition-colors"
                    placeholder="e.g., Blonde, Brown, Red, etc."
                  />
                </div>
              </div>
            </div>

            {/* Additional Information */}
            <div>
              <label className="block text-white/80 mb-2">Special Instructions</label>
              <textarea
                name="specialInstructions"
                value={formData.specialInstructions}
                onChange={handleInputChange}
                rows={4}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-pink-500 transition-colors resize-none"
                placeholder="Any specific requirements or notes about your wig..."
              />
            </div>

            <div>
              <label className="block text-white/80 mb-2">Preferred Completion Date</label>
              <input
                type="date"
                name="preferredDate"
                value={formData.preferredDate}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:border-pink-500 transition-colors"
              />
            </div>

            {/* Custom Service Fields */}
            {selectedService === "custom" && (
              <div className="space-y-6 pt-6 border-t border-white/20">
                <h3 className="text-lg font-semibold text-white mb-4">Custom Service Details</h3>
                
                <div>
                  <label className="block text-white/80 mb-2">Specific Services Needed *</label>
                  <textarea
                    name="customServices"
                    value={formData.customServices}
                    onChange={handleInputChange}
                    required
                    rows={4}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-pink-500 transition-colors resize-none"
                    placeholder="Please describe in detail what services you need (e.g., specific styling, color changes, repairs, etc.)"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-white/80 mb-2">Budget Range</label>
                    <select
                      name="budgetRange"
                      value={formData.budgetRange}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:border-pink-500 transition-colors"
                    >
                      <option value="">Select budget range</option>
                      <option value="under-200">Under $200</option>
                      <option value="200-400">$200 - $400</option>
                      <option value="400-600">$400 - $600</option>
                      <option value="600-800">$600 - $800</option>
                      <option value="over-800">Over $800</option>
                      <option value="flexible">Flexible - depends on quality</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-white/80 mb-2">Timeline Preference</label>
                    <select
                      name="timeline"
                      value={formData.timeline}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:border-pink-500 transition-colors"
                    >
                      <option value="">Select timeline</option>
                      <option value="asap">As soon as possible</option>
                      <option value="1-2-weeks">1-2 weeks</option>
                      <option value="2-4-weeks">2-4 weeks</option>
                      <option value="1-2-months">1-2 months</option>
                      <option value="flexible">Flexible - no rush</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-white/80 mb-2">Urgency Level</label>
                  <select
                    name="urgency"
                    value={formData.urgency}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:border-pink-500 transition-colors"
                  >
                    <option value="">Select urgency</option>
                    <option value="low">Low - No rush</option>
                    <option value="medium">Medium - Within a few weeks</option>
                    <option value="high">High - Need it soon</option>
                    <option value="urgent">Urgent - Special event coming up</option>
                  </select>
                </div>
              </div>
            )}

            {/* Submit Button */}
            <div className="text-center pt-6">
              <button
                type="submit"
                disabled={isSubmitting || !selectedService || (selectedService === "custom" && !formData.customServices)}
                className={`px-8 py-4 rounded-full font-semibold text-lg transition-all duration-200 ${
                  isSubmitting || !selectedService || (selectedService === "custom" && !formData.customServices)
                    ? "bg-gray-500 text-gray-300 cursor-not-allowed"
                    : "bg-gradient-to-r from-pink-500 to-pink-600 text-white hover:from-pink-600 hover:to-pink-700 hover:scale-105 shadow-lg"
                }`}
              >
                {isSubmitting ? (
                  <span className="flex items-center gap-2">
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    Submitting...
                  </span>
                ) : (
                  "Submit Request"
                )}
              </button>
            </div>
          </form>
        </section>

        {/* Information Section */}
        <section className="mt-12 text-center">
          <h2 className="text-2xl font-bold text-white mb-6">What to Expect</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white/5 border border-white/10 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-white mb-2">Initial Consultation</h3>
              <p className="text-white/70 text-sm">We&apos;ll contact you within 24 hours to discuss your project details and timeline.</p>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-white mb-2">Shipping Instructions</h3>
              <p className="text-white/70 text-sm">We&apos;ll provide detailed shipping instructions and a prepaid shipping label.</p>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-white mb-2">Quality Guarantee</h3>
              <p className="text-white/70 text-sm">All services come with our satisfaction guarantee and quality assurance.</p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
} 