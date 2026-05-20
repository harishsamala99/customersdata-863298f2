import { motion } from "framer-motion";
import { Plane, Heart, Briefcase, GlassWater } from "lucide-react";

const services = [
  {
    title: "Airport Transportation",
    description: "Punctual, seamless airport transfers with real-time flight tracking.",
    icon: <Plane className="w-6 h-6 text-white" />,
    image: "https://images.unsplash.com/photo-1549643276-fdf2fab574f5?q=80&w=800&auto=format&fit=crop"
  },
  {
    title: "Corporate Executive",
    description: "A mobile office environment designed for productivity and privacy.",
    icon: <Briefcase className="w-6 h-6 text-white" />,
    image: "https://images.unsplash.com/photo-1563720223185-11003d516935?q=80&w=800&auto=format&fit=crop"
  },
  {
    title: "Wedding Service",
    description: "Elegant, pristine vehicles to make your special day unforgettable.",
    icon: <Heart className="w-6 h-6 text-white" />,
    image: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?q=80&w=800&auto=format&fit=crop"
  },
  {
    title: "VIP Nightlife",
    description: "Arrive at every destination with uncompromising prestige.",
    icon: <GlassWater className="w-6 h-6 text-white" />,
    image: "https://images.unsplash.com/photo-1560170425-46b02f06f7aa?q=80&w=800&auto=format&fit=crop"
  }
];

export function FleetShowcase() {
  return (
    <section id="services" className="py-24 relative z-10 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-display font-semibold mb-4 text-white">Excellence in Motion.</h2>
          <p className="text-white/50 max-w-2xl mx-auto text-lg font-light">
            Our luxury fleet is meticulously maintained to provide the ultimate comfort, safety, and elegance for any occasion.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {services.map((service, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className="glass-panel rounded-3xl p-2 relative overflow-hidden group h-[400px] flex flex-col justify-end cursor-pointer"
            >
              <div className="absolute inset-0 z-0 overflow-hidden rounded-[1.3rem] m-2">
                <img 
                  src={service.image} 
                  alt={service.title}
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105 opacity-40 group-hover:opacity-70 mix-blend-luminosity group-hover:mix-blend-normal"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--background)] via-[var(--background)]/80 to-transparent" />
              </div>

              <div className="relative z-10 p-8 pt-0">
                <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center mb-6 transition-transform duration-500 group-hover:-translate-y-2">
                  {service.icon}
                </div>
                <h3 className="text-2xl font-semibold text-white mb-2 transition-transform duration-500 group-hover:-translate-y-1">{service.title}</h3>
                <p className="text-white/50 font-light transition-transform duration-500 group-hover:-translate-y-1 group-hover:text-white/70">{service.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
