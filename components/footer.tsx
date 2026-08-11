import Link from 'next/link'
import Image from 'next/image'
import { Separator } from '@/components/ui/separator'
import { MapPin, Phone, Mail } from 'lucide-react'

const FacebookIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" stroke="none" {...props}>
    <path d="M12 2C6.477 2 2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.879V14.89h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.989C18.343 21.129 22 16.99 22 12c0-5.523-4.477-10-10-10z" />
  </svg>
)

const TwitterIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" stroke="none" {...props}>
    <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" />
  </svg>
)

const YoutubeIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" stroke="none" {...props}>
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.5 12 3.5 12 3.5s-7.505 0-9.377.55a3.016 3.016 0 0 0-2.122 2.136C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.55 9.376.55 9.376.55s7.505 0 9.377-.55a3.016 3.016 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
  </svg>
)

const LinkedinIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" stroke="none" {...props}>
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
)

const navLinks = [
  { label: 'Inicio', href: '#inicio' },
  { label: 'Nosotros', href: '#nosotros' },
  { label: 'Servicios', href: '#servicios' },
  { label: 'Flotilla', href: '#flotilla' },
  { label: 'Sucursales', href: '#sucursales' },
  { label: 'Cotización', href: '#cotizacion' },
  { label: 'Contacto', href: '#contacto' },
]

const sucursales = [
  { name: 'Manzanillo (Sede)', url: 'https://maps.google.com/?q=Nutria+del+Mar+102,+Col.+Oceano,+Manzanillo,+Colima,+28219' },
  { name: 'México', url: 'https://maps.app.goo.gl/oop38tzNdk7gFwkj9' },
  { name: 'Guadalajara', url: 'https://maps.google.com/?q=Av.+Ferrocarril+No.+79+Interior+C,+Colonia+Lopez+Cotilla,+Tlaquepaque,+Jal.,+45615' },
  { name: 'Querétaro', url: 'https://maps.google.com/?q=Av.+Industria+Agropecuaria,+Parq.+Ind.+PyME+IV,+Huimilpan,+Qro.' },
  { name: 'Silao', url: 'https://maps.google.com/?q=Parque+industrial+Novo+Tech,+San+Isidro+el+Arenal,+Silao,+Guanajuato,+36293' },
  { name: 'San Luis Potosí', url: 'https://maps.google.com/?q=Circuito+Brucelas+1,+Parque+industrial+Logistik+2,+San+Luis+Potosi,+79525' },
  { name: 'Veracruz', url: 'https://maps.google.com/?q=Av.+Expansion+535,+Parke+2000,+Veracruz,+Veracruz,+91808' },
  { name: 'Monterrey', url: 'https://maps.google.com/?q=Av.+Centro+Logistico+Oriente+122,+Cd.+General+Escobedo,+N.L.,+66082' },
  { name: 'Altamira', url: 'https://maps.google.com/?q=Bahia+Adair+512,+89603+Altamira,+Tamps.' },
]

const socials = [
  { icon: LinkedinIcon, href: '#' },
  { icon: TwitterIcon, href: '#' },
  { icon: YoutubeIcon, href: '#' },
  { icon: FacebookIcon, href: 'https://www.facebook.com/LogisticaIntegralValera/?locale=es_LA' },
]

export function Footer() {
  return (
    <footer className="bg-[oklch(0.28_0.12_258)] text-white">
      <div className="max-w-7xl mx-auto px-6 md:px-16 lg:px-24 xl:px-12 py-14">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="mb-5 bg-white rounded-lg p-2 inline-block">
              <Image
                src="/logo.png"
                alt="Logística Integral Valera"
                width={150}
                height={52}
                className="h-14 w-auto object-contain"
              />
            </div>
            <p className="text-sm text-white/65 leading-relaxed mb-4">
              Empresa líder en transporte de carga terrestre en México. Con sede
              en Manzanillo y presencia en 7 estados del país.
            </p>
            <div className="flex flex-col gap-2 text-sm text-white/65 mb-6">
              <span className="flex items-center gap-1.5">
                <MapPin className="size-3.5 text-[oklch(0.57_0.16_228)]" />
                Manzanillo, Col. (Sede Central)
              </span>
              <span className="flex items-center gap-1.5">
                <Phone className="size-3.5 text-[oklch(0.57_0.16_228)]" />
                +52 314 336 6037
              </span>
              <span className="flex items-center gap-1.5">
                <Mail className="size-3.5 text-[oklch(0.57_0.16_228)]" />
                camilaarzola80@gmail.com
              </span>
            </div>

            {/* Redes Sociales */}
            <div className="flex items-center gap-3">
              {socials.map((social, index) => (
                <a 
                  key={index} 
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="size-10 rounded-full bg-black flex items-center justify-center hover:bg-[oklch(0.57_0.16_228)] transition-colors group"
                >
                  <social.icon className="size-4 text-white group-hover:scale-110 transition-transform" />
                </a>
              ))}
            </div>
          </div>

          {/* Nav */}
          <div>
            <h4 className="font-heading font-bold text-white mb-4 text-sm uppercase tracking-widest">
              Navegación
            </h4>
            <ul className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm text-white/65 hover:text-white transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Sucursales */}
          <div>
            <h4 className="font-heading font-bold text-white mb-4 text-sm uppercase tracking-widest">
              Sucursales
            </h4>
            <ul className="flex flex-col gap-2">
              {sucursales.map((s) => (
                <li key={s.name} className="flex items-center gap-1.5 group">
                  <span className="size-1 rounded-full bg-[oklch(0.57_0.16_228)] flex-shrink-0 group-hover:scale-150 transition-transform" />
                  <a 
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-white/65 hover:text-white transition-colors"
                  >
                    {s.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Unidades */}
          <div>
            <h4 className="font-heading font-bold text-white mb-4 text-sm uppercase tracking-widest">
              Unidades
            </h4>
            <ul className="flex flex-col gap-2">
              {[
                'Rabón',
                'Camioneta 3/2',
                "Caja 48' Sencillo",
                "Caja 48' Full",
                "Caja 53' Sencillo",
                "Caja 53' Full",
              ].map((u) => (
                <li key={u} className="text-sm text-white/65 flex items-center gap-1.5">
                  <span className="size-1 rounded-full bg-white/40 flex-shrink-0" />
                  {u}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <Separator className="bg-white/15 mb-6" />

        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-white/45">
          <p>
            © {new Date().getFullYear()} Logística Integral Valera S.A de C.V. Todos los derechos reservados.
          </p>
          <p>
            C. Nutria del Mar 102, Océano, 28219 Manzanillo, Col.
          </p>
        </div>
      </div>
    </footer>
  )
}
