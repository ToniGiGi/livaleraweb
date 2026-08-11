'use client'

import { Badge } from '@/components/ui/badge'
import {
  Package,
  Route,
  Clock,
  ShieldCheck,
  BarChart3,
  Headphones,
} from 'lucide-react'
import useEmblaCarousel from 'embla-carousel-react'
import AutoScroll from 'embla-carousel-auto-scroll'

const services = [
  {
    icon: Package,
    title: 'Transporte de Carga General',
    description:
      'Movimiento de mercancía en todo tipo de presentaciones: pallets, cajas y granel. Optimizamos rutas para garantizar la entrega a tiempo.',
  },
  {
    icon: Route,
    title: 'Rutas Nacionales',
    description:
      'Cobertura total en los corredores logísticos más importantes de México. Desde Manzanillo hasta los principales centros industriales del país.',
  },
  {
    icon: Clock,
    title: 'Servicio Urgente',
    description:
      'Para cargas que no admiten demora, contamos con unidades disponibles para salida inmediata con seguimiento en tiempo real.',
  },
  {
    icon: ShieldCheck,
    title: 'Carga Asegurada',
    description:
      'Tu mercancía viaja protegida. Contamos con pólizas de seguro de carga que cubren desde la recolección hasta la entrega final.',
  },
  {
    icon: BarChart3,
    title: 'Gestión Logística',
    description:
      'Soluciones integrales de supply chain: planificación, coordinación y seguimiento para optimizar tu cadena de suministro.',
  },
  {
    icon: Headphones,
    title: 'Soporte 24/7',
    description:
      'Nuestro equipo de atención al cliente está disponible las 24 horas para responder cualquier consulta sobre tus embarques.',
  },
]

export function ServiciosSection() {
  const [emblaRef] = useEmblaCarousel({ loop: true, align: 'start', dragFree: true }, [
    AutoScroll({ playOnInit: true, speed: 1, stopOnInteraction: false, stopOnMouseEnter: true }),
  ])

  return (
    <section id="servicios" className="py-24 bg-card">
      <div className="max-w-7xl mx-auto px-6 md:px-16 lg:px-24 xl:px-12">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <Badge className="bg-primary/20 text-primary border-primary/30 mb-4 uppercase tracking-widest text-xs">
            Nuestros Servicios
          </Badge>
          <h2 className="font-heading text-4xl sm:text-5xl font-black text-foreground text-balance mb-4">
            Soluciones a la medida{' '}
            <span className="text-primary">de tu negocio</span>
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed">
            Ofrecemos una gama completa de servicios logísticos diseñados para
            adaptarse a las necesidades específicas de cada cliente.
          </p>
        </div>

        {/* Services Carousel with fade effect */}
        <div className="relative -mx-4 px-4 sm:mx-0 sm:px-0">
          <div
            className="overflow-hidden w-full [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]"
            ref={emblaRef}
          >
            <div className="flex -ml-4 py-4">
              {services.map((service) => (
                <div
                  key={service.title}
                  className="flex-[0_0_85%] min-w-0 sm:flex-[0_0_50%] lg:flex-[0_0_33.333333%] pl-4"
                >
                  <div className="group h-full p-6 rounded-lg bg-white border border-border hover:border-primary/40 hover:shadow-md transition-all duration-200">
                    <div className="size-12 rounded-sm bg-primary/15 flex items-center justify-center mb-4 group-hover:bg-primary/25 transition-colors">
                      <service.icon className="size-6 text-primary" />
                    </div>
                    <h3 className="font-heading font-bold text-foreground mb-2 text-lg">
                      {service.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {service.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
