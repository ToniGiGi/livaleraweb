'use client'

import { motion } from 'framer-motion'
import { Truck, CheckCircle2 } from 'lucide-react'

const fleet = [
  {
    type: 'Rabones',
    description: 'Ideales para cargas medias y rutas urbanas. Versatilidad y rapidez.',
    capacity: 'Hasta 8-10 toneladas',
  },
  {
    type: 'Camionetas 3.5',
    description: 'Perfectas para entregas exprés de última milla o cargas ligeras urgentes.',
    capacity: 'Hasta 3.5 toneladas',
  },
  {
    type: "Caja 48' y 53'",
    description: 'La columna vertebral del transporte en carretera. Gran volumen de carga seca.',
    capacity: 'Volumen estándar y extendido',
  },
  {
    type: 'Full y Sencillo',
    description: 'Configuraciones flexibles para mover grandes volúmenes de mercancía a nivel nacional.',
    capacity: 'Máxima capacidad permitida',
  },
]

export function FlotillaSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  }

  return (
    <section id="flotilla" className="py-32 bg-slate-50 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-16 lg:px-24 xl:px-12 relative z-10">
        
        <motion.div 
          className="text-center max-w-3xl mx-auto mb-20"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
        >
          <motion.div variants={itemVariants} className="flex items-center justify-center gap-4 mb-6">
            <div className="h-[2px] w-8 bg-secondary" />
            <span className="text-sm font-bold tracking-widest text-primary uppercase">
              Nuestra Flotilla
            </span>
            <div className="h-[2px] w-8 bg-secondary" />
          </motion.div>
          <motion.h2 
            variants={itemVariants}
            className="font-heading text-4xl sm:text-5xl font-black text-slate-900 mb-6"
          >
            Unidades preparadas para <br className="hidden sm:block" />
            <span className="text-primary">cualquier desafío</span>
          </motion.h2>
          <motion.p variants={itemVariants} className="text-lg text-slate-500 font-light">
            Contamos con equipos de reciente modelo, monitoreados 24/7 y sometidos 
            a estrictos programas de mantenimiento para garantizar que tu carga llegue segura.
          </motion.p>
        </motion.div>

        <motion.div 
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={containerVariants}
        >
          {fleet.map((item, index) => (
            <motion.div
              key={item.type}
              variants={itemVariants}
              whileHover={{ y: -8 }}
              className="bg-white rounded-2xl p-8 border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 relative group overflow-hidden"
            >
              {/* Subtle accent line on hover */}
              <div className="absolute top-0 left-0 w-full h-1 bg-secondary translate-y-[-100%] group-hover:translate-y-0 transition-transform duration-300" />
              
              <div className="size-12 rounded-xl bg-primary/5 flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-white text-primary transition-colors duration-300">
                <Truck className="size-6" />
              </div>
              
              <h3 className="font-heading font-bold text-xl text-slate-900 mb-3">
                {item.type}
              </h3>
              <p className="text-slate-500 font-light text-sm mb-6 leading-relaxed">
                {item.description}
              </p>
              
              <div className="flex items-center gap-2 mt-auto pt-4 border-t border-slate-100">
                <CheckCircle2 className="size-4 text-secondary" />
                <span className="text-xs font-semibold text-slate-700 uppercase tracking-wider">
                  {item.capacity}
                </span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
