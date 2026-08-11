'use client'

import { motion, useInView, useMotionValue, useTransform, animate } from 'framer-motion'
import { useEffect, useRef } from 'react'

const stats = [
  { value: 20, suffix: '+', label: 'Años de experiencia' },
  { value: 7, suffix: '', label: 'Sucursales en México' },
  { value: 500, suffix: '+', label: 'Unidades en ruta' },
  { value: 98, suffix: '%', label: 'Entregas a tiempo' },
]

function AnimatedCounter({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '-50px' })
  const count = useMotionValue(0)
  const rounded = useTransform(count, (latest) => Math.round(latest))

  useEffect(() => {
    if (inView) {
      const controls = animate(count, value, { 
        duration: 2.5, 
        ease: [0.22, 1, 0.36, 1] // Custom easeOut cubic bezier for a slot-machine-like deceleration
      })
      return controls.stop
    }
  }, [count, inView, value])

  return (
    <span ref={ref} className="inline-flex items-center justify-center">
      <motion.span>{rounded}</motion.span>
      <span>{suffix}</span>
    </span>
  )
}

export function StatsSection() {
  return (
    <section className="py-24 bg-slate-950 relative overflow-hidden">
      {/* Background abstract gradient */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-4xl bg-secondary/10 blur-[120px] rounded-full pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 md:px-16 lg:px-24 xl:px-12 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 divide-x divide-white/10">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, delay: i * 0.15, ease: "easeOut" }}
              className="text-center px-4"
            >
              <p className="font-heading text-5xl sm:text-7xl font-black text-white mb-3 tracking-tighter">
                <AnimatedCounter value={s.value} suffix={s.suffix} />
              </p>
              <p className="text-sm sm:text-base text-slate-400 font-light">
                {s.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
