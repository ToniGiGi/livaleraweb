'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MapPin, Building2, PhoneCall } from 'lucide-react'

const branches = [
  {
    id: 'manzanillo',
    name: 'Manzanillo',
    title: 'Sede Principal y Corporativo',
    address: 'Nutria del Mar #102, Col. Océano, Manzanillo, Colima, C.P. 28219',
    isHQ: true,
    mapsUrl: 'https://maps.google.com/?q=Nutria+del+Mar+102,+Col.+Oceano,+Manzanillo,+Colima,+28219',
  },
  {
    id: 'mexico',
    name: 'México',
    title: 'Sucursal Estado de México',
    address: 'Blvd. Tultitlán Pte. 200, Ext. 228, Bodega 2, Col. Los Reyes, 54900 Tultitlán, Edo. De México',
    isHQ: false,
    mapsUrl: 'https://maps.app.goo.gl/oop38tzNdk7gFwkj9', // provided by user
  },
  {
    id: 'guadalajara',
    name: 'Guadalajara',
    title: 'Sucursal Jalisco',
    address: 'Av. Ferrocarril No. 79 Interior C, Colonia Lopez Cotilla, Tlaquepaque, Jal., C.P. 45615',
    isHQ: false,
    mapsUrl: 'https://maps.google.com/?q=Av.+Ferrocarril+No.+79+Interior+C,+Colonia+Lopez+Cotilla,+Tlaquepaque,+Jal.,+45615',
  },
  {
    id: 'queretaro',
    name: 'Querétaro',
    title: 'Sucursal Querétaro',
    address: 'Av. Industria Agropecuaría, Lt 9, Mz. 6 y 7, Parq. Ind. PyME IV, Huimilpan, Qro.',
    isHQ: false,
    mapsUrl: 'https://maps.google.com/?q=Av.+Industria+Agropecuaria,+Parq.+Ind.+PyME+IV,+Huimilpan,+Qro.',
  },
  {
    id: 'silao',
    name: 'Silao',
    title: 'Sucursal Guanajuato',
    address: 'Parque industrial Novo Tech, Manzana 4, Lote 5, San Isidro el Arenal, Silao, Guanajuato, C.P. 36293',
    isHQ: false,
    mapsUrl: 'https://maps.google.com/?q=Parque+industrial+Novo+Tech,+San+Isidro+el+Arenal,+Silao,+Guanajuato,+36293',
  },
  {
    id: 'san-luis-potosi',
    name: 'San Luis Potosí',
    title: 'Sucursal SLP',
    address: 'Circuito Brúcelas 1, Parque industrial Logistik 2, San Luis Potosí, San Luis Potosí, C.P. 79525',
    isHQ: false,
    mapsUrl: 'https://maps.google.com/?q=Circuito+Brucelas+1,+Parque+industrial+Logistik+2,+San+Luis+Potosi,+79525',
  },
  {
    id: 'veracruz',
    name: 'Veracruz',
    title: 'Sucursal Veracruz',
    address: 'Av. Expansión #535 Lote 5, Mzn. 9, Parke 2000, Veracruz, Veracruz, CP. 91808',
    isHQ: false,
    mapsUrl: 'https://maps.google.com/?q=Av.+Expansion+535,+Parke+2000,+Veracruz,+Veracruz,+91808',
  },
  {
    id: 'monterrey',
    name: 'Monterrey',
    title: 'Sucursal Nuevo León',
    address: 'Av. Centro Logístico Oriente #122 Bodega 12, Fracc. Centro Logístico Libramiento, Cd. General Escobedo, N.L., C.P. 66082',
    isHQ: false,
    mapsUrl: 'https://maps.google.com/?q=Av.+Centro+Logistico+Oriente+122,+Cd.+General+Escobedo,+N.L.,+66082',
  },
  {
    id: 'altamira',
    name: 'Altamira',
    title: 'Sucursal Tamaulipas',
    address: 'Parque de la pequeña y mediana industria, Bahía Adair 512, 89603 Altamira, Tamps.',
    isHQ: false,
    mapsUrl: 'https://maps.google.com/?q=Bahia+Adair+512,+89603+Altamira,+Tamps.',
  },
]

export function SucursalesSection() {
  const [activeBranchId, setActiveBranchId] = useState(branches[0].id)
  
  const activeBranch = branches.find(b => b.id === activeBranchId) || branches[0]

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
    <section id="sucursales" className="py-24 bg-slate-50 relative">
      <div className="max-w-7xl mx-auto px-6 md:px-16 lg:px-24 xl:px-12">
        
        {/* Top Centered Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <motion.div variants={itemVariants} className="flex items-center justify-center gap-4 mb-6">
            <div className="h-[2px] w-8 bg-secondary" />
            <span className="text-sm font-bold tracking-widest text-primary uppercase">
              Cobertura Nacional
            </span>
            <div className="h-[2px] w-8 bg-secondary" />
          </motion.div>
          <motion.h2 
            variants={itemVariants}
            className="font-heading text-4xl sm:text-5xl font-black text-slate-900 mb-6 leading-tight"
          >
            Cerca de tus <br className="hidden sm:block" />
            <span className="text-primary">centros de distribución</span>
          </motion.h2>
          <motion.p variants={itemVariants} className="text-lg text-slate-500 font-light">
            Operamos desde los puertos y polos logísticos más importantes de México. 
            Selecciona una sucursal para ver su ubicación exacta.
          </motion.p>
        </motion.div>

        {/* 3x3 Grid of Buttons (Perfect for 9 items) */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={containerVariants}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8"
        >
          {branches.map((branch) => {
            const isActive = activeBranchId === branch.id

            return (
              <motion.button
                key={branch.id}
                variants={itemVariants}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setActiveBranchId(branch.id)}
                className={`p-5 rounded-2xl border transition-all duration-300 flex items-center gap-4 text-left w-full group
                  ${isActive 
                    ? 'border-secondary bg-white shadow-md ring-1 ring-secondary' 
                    : 'border-slate-200 bg-white hover:border-secondary/50 hover:shadow-sm'
                  }
                `}
              >
                <div className={`size-10 rounded-full flex items-center justify-center shrink-0 transition-colors
                  ${isActive ? 'bg-secondary text-white' : 'bg-slate-100 text-slate-400 group-hover:bg-secondary/10 group-hover:text-secondary'}
                `}>
                  <MapPin className="size-4" />
                </div>
                <div>
                  <h4 className={`font-bold transition-colors ${isActive ? 'text-secondary' : 'text-slate-900'}`}>
                    {branch.name}
                  </h4>
                  {branch.isHQ ? (
                    <p className="text-[10px] sm:text-xs text-primary font-semibold uppercase tracking-wider mt-0.5">
                      Oficina Matriz
                    </p>
                  ) : (
                    <p className="text-[10px] sm:text-xs text-slate-500 font-medium mt-0.5">
                      Ver detalles
                    </p>
                  )}
                </div>
              </motion.button>
            )
          })}
        </motion.div>

        {/* Full-width Horizontal Interactive Card at the Bottom */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={containerVariants}
        >
          <motion.div 
            variants={itemVariants}
            className="bg-slate-950 rounded-3xl p-8 sm:p-12 text-white relative overflow-hidden shadow-2xl flex flex-col md:flex-row items-center gap-8 justify-between group"
          >
            <div className="absolute top-1/2 -translate-y-1/2 right-0 p-8 opacity-5 transition-opacity duration-500 group-hover:opacity-10 pointer-events-none">
              <Building2 className="size-64" />
            </div>
            
            <AnimatePresence mode="wait">
              <motion.div 
                key={activeBranch.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="relative z-10 flex-1 w-full"
              >
                <p className="text-secondary text-xs uppercase tracking-[0.2em] font-bold mb-3">
                  {activeBranch.title}
                </p>
                <h3 className="font-heading text-3xl sm:text-4xl font-bold mb-4">
                  Logística Integral Valera <span className="text-white/70 font-light">{activeBranch.name}</span>
                </h3>
                <div className="flex items-start gap-3">
                  <MapPin className="size-5 text-secondary shrink-0 mt-0.5" />
                  <p className="text-slate-300 font-light text-lg">
                    {activeBranch.address}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>

            <div className="relative z-10 w-full md:w-auto shrink-0 md:pl-8 md:border-l md:border-white/10 flex flex-col items-start md:items-center">
              <p className="text-xs text-slate-400 mb-3 font-light uppercase tracking-widest hidden md:block">
                Ubicación Exacta
              </p>
              <a 
                href={activeBranch.mapsUrl}
                target="_blank"
                rel="noopener noreferrer" 
                className="inline-flex items-center gap-3 bg-secondary hover:bg-secondary/90 text-white px-6 py-4 rounded-xl transition-colors w-full md:w-auto justify-center font-bold tracking-wide"
              >
                <MapPin className="size-5" />
                Ver en Google Maps
              </a>
            </div>
          </motion.div>
        </motion.div>

      </div>
    </section>
  )
}
