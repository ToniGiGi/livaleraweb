'use client'

import { Target, Eye, Star } from 'lucide-react'
import { motion } from 'framer-motion'

const values = [
  {
    icon: Target,
    title: 'Misión',
    description:
      'Brindar soluciones integrales de transporte terrestre con eficiencia, seguridad y puntualidad, conectando el origen y destino a lo largo de toda la República.',
  },
  {
    icon: Eye,
    title: 'Visión',
    description:
      'Ser la empresa de logística terrestre más confiable de México, reconocida por nuestra excelencia operativa y compromiso absoluto con nuestros socios comerciales.',
  },
  {
    icon: Star,
    title: 'Valores',
    description:
      'Integridad, puntualidad, seguridad y servicio al cliente. Pilares que guían cada decisión y cada kilómetro que recorremos para tu tranquilidad.',
  },
]

export function NosotrosSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
  }

  return (
    <section id="nosotros" className="py-32 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-16 lg:px-24 xl:px-12 relative z-10">
        
        {/* Top Header */}
        <motion.div 
          className="flex flex-col md:flex-row justify-between items-start md:items-end gap-10 mb-24"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
        >
          <div className="max-w-3xl">
            <motion.div variants={itemVariants} className="flex items-center gap-4 mb-8">
              <div className="h-[2px] w-12 bg-secondary" />
              <span className="text-sm font-bold tracking-widest text-primary uppercase">
                Conócenos
              </span>
            </motion.div>
            
            <motion.h2 
              variants={itemVariants}
              className="font-heading text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 leading-[1.1] tracking-tight"
            >
              Nuestra ruta es clara: <br/>
              <span className="text-primary font-light">Tu éxito comercial.</span>
            </motion.h2>
          </div>
          
          <motion.div variants={itemVariants} className="max-w-md md:text-right">
            <p className="text-slate-500 text-lg leading-relaxed font-light">
              Nacimos en Manzanillo con la convicción de llevar la logística al siguiente nivel. 
              Hoy, somos el engrane que mantiene en movimiento a las industrias de México.
            </p>
          </motion.div>
        </motion.div>

        {/* Values Grid - Clean and borderless */}
        <motion.div 
          className="grid md:grid-cols-3 gap-12 lg:gap-20"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={containerVariants}
        >
          {values.map((v, index) => (
            <motion.div
              key={v.title}
              variants={itemVariants}
              className="relative group"
            >
              {/* Subtle line separator on top */}
              <div className="absolute top-0 left-0 w-full h-[1px] bg-slate-200 group-hover:bg-secondary transition-colors duration-500" />
              
              <div className="pt-10">
                <div className="mb-6 inline-flex size-14 rounded-2xl bg-slate-50 items-center justify-center text-primary group-hover:scale-110 group-hover:bg-primary group-hover:text-white transition-all duration-500">
                  <v.icon className="size-6" />
                </div>
                <h3 className="font-heading font-bold text-2xl text-slate-900 mb-4">
                  {v.title}
                </h3>
                <p className="text-slate-500 leading-relaxed font-light text-lg">
                  {v.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
        
      </div>
    </section>
  )
}
