import { useState } from "react";
import { motion } from "framer-motion";
import { CalendarIcon, MapPin, Navigation } from "lucide-react";
import { toast } from "sonner";

export function BookingWidget() {
  const [loading, setLoading] = useState(false);

  const handleBooking = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast.success("Reservation request received. Our team will contact you shortly.");
    }, 1500);
  };

  return (
    <section id="booking" className="py-24 relative z-10 px-6">
      <div className="max-w-4xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="glass-panel rounded-3xl p-8 md:p-12 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-[var(--primary)] opacity-10 rounded-full blur-[80px] pointer-events-none" />
          
          <div className="text-center mb-10 relative z-10">
            <h2 className="text-3xl md:text-4xl font-display font-semibold mb-3 text-white">Reserve Your Journey</h2>
            <p className="text-white/50 font-light">Experience the pinnacle of luxury transportation.</p>
          </div>

          <form onSubmit={handleBooking} className="relative z-10 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs uppercase tracking-widest text-white/50 ml-1">Pickup Location</label>
                <div className="relative">
                  <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
                  <input 
                    type="text" 
                    required
                    placeholder="Enter pickup address" 
                    className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-11 pr-4 text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-white/20 transition-all"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs uppercase tracking-widest text-white/50 ml-1">Drop-off Location</label>
                <div className="relative">
                  <Navigation className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
                  <input 
                    type="text" 
                    required
                    placeholder="Enter destination" 
                    className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-11 pr-4 text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-white/20 transition-all"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs uppercase tracking-widest text-white/50 ml-1">Date</label>
                <div className="relative">
                  <CalendarIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
                  <input 
                    type="date" 
                    required
                    className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-11 pr-4 text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-white/20 transition-all [color-scheme:dark]"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs uppercase tracking-widest text-white/50 ml-1">Vehicle Type</label>
                <select className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:ring-2 focus:ring-white/20 transition-all appearance-none font-light">
                  <option value="sedan" className="bg-[#1a1a1a]">Executive Sedan (1-3 Passengers)</option>
                  <option value="suv" className="bg-[#1a1a1a]">Luxury SUV (1-6 Passengers)</option>
                  <option value="sprinter" className="bg-[#1a1a1a]">Sprinter Van (Up to 14 Passengers)</option>
                  <option value="stretch" className="bg-[#1a1a1a]">Stretch Limousine</option>
                </select>
              </div>
            </div>

            <div className="pt-6 flex justify-center">
              <button 
                type="submit" 
                disabled={loading}
                className="glass-button glass-button-primary px-10 py-4 rounded-full text-base font-semibold w-full md:w-auto min-w-[200px]"
              >
                {loading ? "Processing..." : "Request Reservation"}
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </section>
  );
}
