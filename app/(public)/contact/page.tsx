import type { Metadata } from "next";
import { Mail, Phone, MapPin, MessageCircle, Clock } from "lucide-react";
import ContactForm from "./ContactForm";

export const metadata: Metadata = {
  title: "Contact Us — Book a Free Consultation",
  description: "Get in touch with AnvithBizCap for investment advice, SIP planning, or any queries about mutual funds and wealth management.",
};

export default function ContactPage() {
  return (
    <>
      <section className="gradient-hero py-20">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <span className="inline-block px-4 py-1.5 mb-6 text-xs font-semibold tracking-widest uppercase rounded-full bg-[#c9a84c]/20 text-[#c9a84c] border border-[#c9a84c]/30">Get In Touch</span>
          <h1 className="text-4xl md:text-5xl font-bold text-white font-display mb-4">
            Let&apos;s Talk About <span className="text-gradient-gold">Your Financial Goals</span>
          </h1>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">Book a free, no-obligation consultation. Our advisor will understand your goals and suggest the most suitable investment path.</p>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Contact info */}
          <div>
            <h2 className="text-2xl font-bold text-[#0a1628] font-display mb-8">Contact Information</h2>
            <div className="space-y-6">
              {[
                { icon: Phone, label: "Phone", value: "+91 98765 43210", href: "tel:+919876543210" },
                { icon: Mail, label: "Email", value: "hello@anvithbizcap.com", href: "mailto:hello@anvithbizcap.com" },
                { icon: MapPin, label: "Office", value: "Vadodara, Gujarat, India", href: null },
                { icon: Clock, label: "Working Hours", value: "Monday – Saturday, 10am – 6pm", href: null },
              ].map(({ icon: Icon, label, value, href }) => (
                <div key={label} className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-[#c9a84c]/10 flex items-center justify-center shrink-0">
                    <Icon className="w-5 h-5 text-[#c9a84c]" />
                  </div>
                  <div>
                    <div className="text-xs text-gray-400 mb-0.5">{label}</div>
                    {href ? (
                      <a href={href} className="text-[#0a1628] font-medium hover:text-[#c9a84c] transition-colors">{value}</a>
                    ) : (
                      <span className="text-[#0a1628] font-medium">{value}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* WhatsApp CTA */}
            <div className="mt-10 p-6 bg-green-50 rounded-2xl border border-green-100">
              <MessageCircle className="w-8 h-8 text-green-600 mb-3" />
              <h3 className="font-bold text-green-800 mb-2">Quick Query? WhatsApp Us</h3>
              <p className="text-green-700 text-sm mb-4">For quick queries, you can reach us on WhatsApp. We typically respond within a few hours during working hours.</p>
              <a
                href="https://wa.me/919876543210?text=Hi%20AnvithBizCap%2C%20I%20would%20like%20to%20know%20more%20about%20your%20investment%20services."
                target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-green-600 text-white font-semibold text-sm rounded-xl hover:bg-green-700 transition-colors"
              >
                <MessageCircle className="w-4 h-4" /> WhatsApp Now
              </a>
            </div>

            {/* Login CTA */}
            <div className="mt-6 p-6 bg-[#0a1628] rounded-2xl">
              <h3 className="font-bold text-white mb-2">Already a Client?</h3>
              <p className="text-gray-400 text-sm mb-4">Login to your investment account to view portfolio, place transactions, and track your SIP.</p>
              <a
                href="https://anvithbizcap.investwell.app/app/#/login"
                target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-[#c9a84c] to-[#d4b86a] text-[#0a1628] font-bold text-sm rounded-xl hover:opacity-90"
              >
                Login to Portal →
              </a>
            </div>
          </div>

          {/* Form */}
          <div className="bg-[#f8fafc] rounded-2xl p-8 border border-gray-100">
            <h2 className="text-xl font-bold text-[#0a1628] font-display mb-2">Book a Free Consultation</h2>
            <p className="text-gray-500 text-sm mb-6">Fill in your details and our advisor will reach out within 24 hours.</p>
            <ContactForm />
          </div>
        </div>
      </section>

      {/* Map placeholder */}
      <section className="py-8 bg-[#f8fafc] border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="h-64 rounded-2xl bg-gradient-to-br from-[#0a1628] to-[#1a3560] flex items-center justify-center">
            <div className="text-center text-white">
              <MapPin className="w-10 h-10 text-[#c9a84c] mx-auto mb-3" />
              <p className="font-bold text-lg">AnvithBizCap</p>
              <p className="text-gray-300 text-sm">Vadodara, Gujarat, India</p>
              <a
                href="https://maps.google.com?q=Vadodara+Gujarat"
                target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-1 mt-3 text-[#c9a84c] text-sm hover:underline"
              >
                View on Google Maps →
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
