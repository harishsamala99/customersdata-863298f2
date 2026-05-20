import { motion } from "framer-motion";
import { Star } from "lucide-react";

const testimonials = [
  {
    quote: "The seamless booking experience and the immaculate state of the vehicle exceeded our expectations. Truly a next-level service.",
    name: "James L.",
    role: "Corporate Executive"
  },
  {
    quote: "Arriving in their premium fleet made our wedding day incredibly special. The chauffeur was professional and the ride was perfectly smooth.",
    name: "Sarah M.",
    role: "Private Client"
  },
  {
    quote: "I rely on Superior for all my airport transfers. The real-time tracking and constant communication make travel completely stress-free.",
    name: "Michael R.",
    role: "Frequent Traveler"
  }
];

export function Testimonials() {
  return (
    <section id="testimonials" className="py-24 relative z-10 px-6 overflow-hidden">
      <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none">
        <div className="w-[50vw] h-[50vw] bg-white/5 rounded-full blur-[100px] mix-blend-screen" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-display font-semibold mb-4 text-white">Uncompromising Quality.</h2>
          <p className="text-white/50 max-w-2xl mx-auto text-lg font-light">
            Hear from our clients who have experienced the difference of true luxury.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((test, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className="glass-panel rounded-3xl p-8 flex flex-col justify-between h-full group hover:-translate-y-2 transition-transform duration-500"
            >
              <div>
                <div className="flex gap-1 mb-6">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-[var(--gold)] fill-[var(--gold)]" />
                  ))}
                </div>
                <p className="text-white/70 font-light leading-relaxed mb-8">"{test.quote}"</p>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center font-semibold text-white border border-white/10">
                  {test.name.charAt(0)}
                </div>
                <div>
                  <h4 className="text-white font-medium">{test.name}</h4>
                  <p className="text-white/40 text-xs">{test.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
