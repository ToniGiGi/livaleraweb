import { Navbar } from '@/components/navbar'
import { HeroSection } from '@/components/hero-section'
import { NosotrosSection } from '@/components/nosotros-section'
import { StatsSection } from '@/components/stats-section'
import { ServiciosSection } from '@/components/servicios-section'
import { FlotillaSection } from '@/components/flotilla-section'
import { SucursalesSection } from '@/components/sucursales-section'
import { CotizacionSection } from '@/components/cotizacion-section'
import { ContactoSection } from '@/components/contacto-section'
import { Footer } from '@/components/footer'

export default function HomePage() {
  return (
    <main>
      <Navbar />
      <HeroSection />
      <NosotrosSection />
      <StatsSection />
      <ServiciosSection />
      <FlotillaSection />
      <SucursalesSection />
      <CotizacionSection />
      <ContactoSection />
      <Footer />
    </main>
  )
}
