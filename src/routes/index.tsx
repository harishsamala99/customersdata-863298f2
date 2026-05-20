import { createFileRoute } from "@tanstack/react-router";
import { GlassNavbar } from "@/components/landing/GlassNavbar";
import { HeroSection } from "@/components/landing/HeroSection";
import { FleetShowcase } from "@/components/landing/FleetShowcase";
import { Testimonials } from "@/components/landing/Testimonials";
import { BookingWidget } from "@/components/landing/BookingWidget";

export const Route = createFileRoute("/")({
  component: LandingPage,
});

function LandingPage() {
  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)] selection:bg-[var(--primary)] selection:text-[var(--primary-foreground)] relative overflow-hidden font-sans">
      {/* Ambient background light */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[80vw] h-[80vw] bg-[var(--neon-blue)] opacity-[0.03] rounded-full blur-[150px] pointer-events-none -z-10" />
      
      <GlassNavbar />
      
      <main>
        <HeroSection />
        <FleetShowcase />
        <Testimonials />
        <BookingWidget />
      </main>

      {/* Futuristic Footer */}
      <footer className="py-12 border-t border-white/5 relative z-10 mt-20 backdrop-blur-md bg-background/50">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <div className="flex items-center justify-center gap-3 mb-6 opacity-80">
            <span className="text-xl font-display font-semibold tracking-tight text-white">SUPERIOR</span>
          </div>
          <p className="text-white/30 text-sm font-light">
            © {new Date().getFullYear()} Superior Limousine LLC. All rights reserved. <br/>
            Premium Executive Transportation
          </p>
        </div>
      </footer>
    </div>
  );
}
