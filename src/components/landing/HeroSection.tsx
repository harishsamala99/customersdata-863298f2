import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Abstract Background Elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-[20%] left-[20%] w-[40vw] h-[40vw] bg-[var(--neon-blue)] opacity-20 rounded-full blur-[120px] mix-blend-screen" />
        <div className="absolute top-[40%] right-[10%] w-[30vw] h-[30vw] bg-[var(--primary)] opacity-10 rounded-full blur-[100px] mix-blend-screen" />
        <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-background to-transparent" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
        >
          <span className="inline-block py-1 px-3 rounded-full bg-white/5 border border-white/10 text-xs font-medium tracking-widest text-white/70 mb-8 backdrop-blur-md">
            NEXT-GENERATION TRAVEL
          </span>
        </motion.div>

        <motion.h1 
          className="text-5xl md:text-7xl lg:text-8xl font-display font-semibold tracking-tighter text-white mb-6 leading-[1.1]"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
        >
          Arrive in <span className="text-white/40">Style.</span><br />
          Experience <span className="text-gradient">Luxury.</span>
        </motion.h1>

        <motion.p 
          className="text-lg md:text-xl text-white/50 max-w-2xl mx-auto mb-10 font-light"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
        >
          Discover an uncompromising standard of executive transportation. 
          Immerse yourself in a fleet designed for those who demand excellence.
        </motion.p>

        <motion.div 
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <a href="#booking" className="glass-button glass-button-primary px-8 py-4 rounded-full text-base font-medium flex items-center gap-2 group w-full sm:w-auto justify-center">
            Book Your Ride
            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>
          <a href="#fleet" className="glass-button px-8 py-4 rounded-full text-base font-medium flex items-center justify-center w-full sm:w-auto">
            Explore Fleet
          </a>
        </motion.div>
      </div>
    </section>
  );
}
