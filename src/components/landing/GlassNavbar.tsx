import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Car, User } from "lucide-react";

export function GlassNavbar() {
  return (
    <motion.nav 
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-0 left-0 right-0 z-50 px-6 py-4 flex justify-between items-center"
    >
      <div className="absolute inset-0 bg-background/20 backdrop-blur-xl border-b border-white/5 pointer-events-none" />
      
      <div className="relative flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center border border-white/20">
          <Car className="w-5 h-5 text-white" />
        </div>
        <span className="text-xl font-display font-semibold tracking-tight">SUPERIOR</span>
      </div>

      <div className="relative hidden md:flex items-center gap-8 text-sm font-medium text-white/70">
        <a href="#fleet" className="hover:text-white transition-colors">Fleet</a>
        <a href="#services" className="hover:text-white transition-colors">Services</a>
        <a href="#testimonials" className="hover:text-white transition-colors">Testimonials</a>
      </div>

      <div className="relative flex items-center gap-4">
        <Link to="/dashboard" className="flex items-center gap-2 text-sm font-medium hover:text-white/80 transition-colors">
          <User className="w-4 h-4" />
          <span className="hidden sm:inline">Admin Dashboard</span>
        </Link>
        <a href="#booking" className="glass-button glass-button-primary px-5 py-2 rounded-full text-sm font-semibold">
          Book Now
        </a>
      </div>
    </motion.nav>
  );
}
