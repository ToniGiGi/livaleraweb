'use client'

import { Button } from '@/components/ui/button'
import { ArrowRight, MapPin, Shield, Clock } from 'lucide-react'
import { motion } from 'framer-motion'

export function HeroSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1] } },
  }

  return (
    <section
      id="inicio"
      className="relative min-h-screen flex items-center overflow-hidden bg-slate-950"
    >
      {/* Background image with parallax effect */}
      <motion.div
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 10, ease: 'easeOut' }}
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-60"
        style={{ backgroundImage: "url('/hero-truck.png')" }}
        aria-hidden="true"
      />
      
      {/* Complex corporate gradient overlays */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'linear-gradient(105deg, rgba(10, 25, 47, 0.95) 0%, rgba(10, 25, 47, 0.8) 40%, rgba(10, 25, 47, 0.2) 80%, transparent 100%)',
        }}
        aria-hidden="true"
      />
      <div
        className="absolute bottom-0 left-0 w-full h-48 pointer-events-none bg-gradient-to-t from-background to-transparent"
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-16 lg:px-24 xl:px-12 pt-32 pb-20 w-full">
        <motion.div 
          className="max-w-3xl"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={itemVariants} className="flex items-center gap-3 mb-6">
            <div className="h-[1px] w-12 bg-secondary" />
            <p className="text-xs font-bold tracking-widest text-secondary uppercase">
              Conectamos, Movemos, Entregamos Valor
            </p>
          </motion.div>

          <motion.h1 
            variants={itemVariants}
            className="font-heading text-4xl sm:text-5xl lg:text-6xl 2xl:text-[5.5rem] font-black text-white leading-[1.1] mb-6 tracking-tight"
          >
            Logística que <br className="hidden sm:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary to-blue-400">
              Mueve México
            </span>
          </motion.h1>

          <motion.p 
            variants={itemVariants}
            className="text-base sm:text-lg lg:text-xl text-slate-300 leading-relaxed mb-10 text-pretty max-w-2xl font-light"
          >
            Empresa líder en transporte de carga terrestre con más de dos décadas
            de experiencia. Cubrimos todo el territorio nacional con una flota
            moderna y personal altamente capacitado.
          </motion.p>

          {/* Stats */}
          <motion.div variants={itemVariants} className="flex flex-wrap gap-8 mb-12">
            {[
              { icon: MapPin, label: '7 Sucursales', sub: 'Nivel nacional' },
              { icon: Shield, label: 'Carga Asegurada', sub: 'Protección total' },
              { icon: Clock, label: '24/7 Monitoreo', sub: 'GPS en tiempo real' },
            ].map((stat, i) => (
              <motion.div 
                key={stat.label} 
                className="flex items-center gap-4 group"
                whileHover={{ y: -2 }}
              >
                <div className="size-12 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0 group-hover:bg-secondary/20 group-hover:border-secondary/30 transition-colors duration-300">
                  <stat.icon className="size-5 text-slate-200 group-hover:text-secondary transition-colors" />
                </div>
                <div>
                  <p className="font-heading font-bold text-white text-base">
                    {stat.label}
                  </p>
                  <p className="text-sm text-slate-400">{stat.sub}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div variants={itemVariants} className="flex flex-wrap gap-4">
            <a href="#cotizacion">
              <Button
                size="lg"
                className="bg-secondary hover:bg-secondary/90 text-white font-semibold h-14 px-8 text-base shadow-lg shadow-secondary/25 transition-all hover:scale-[1.02]"
              >
                Cotizar Envío
                <ArrowRight className="size-4 ml-2" />
              </Button>
            </a>
            <a href="#servicios">
              <Button
                size="lg"
                variant="outline"
                className="border-white/20 text-white hover:bg-white/10 h-14 px-8 text-base bg-transparent font-medium backdrop-blur-sm"
              >
                Nuestros Servicios
              </Button>
            </a>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <motion.div 
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="size-6 rounded-full border-2 border-white/20 flex items-center justify-center"
        >
          <div className="size-1.5 rounded-full bg-white/40" />
        </motion.div>
      </motion.div>
    </section>
  )
}
