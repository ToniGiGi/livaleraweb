'use client'

import { useState } from 'react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { MapPin, Phone, Mail, Clock, CheckCircle, Send } from 'lucide-react'

const contactInfo = [
  {
    icon: MapPin,
    label: 'Sede Principal',
    value: 'C. Nutria del Mar 102, Océano, 28219 Manzanillo, Col.',
  },
  {
    icon: Phone,
    label: 'Atención a Clientes',
    value: '+52 314 336 6037',
  },
  {
    icon: Mail,
    label: 'Correo Electrónico',
    value: 'camilaarzola80@gmail.com',
  },
  {
    icon: Clock,
    label: 'Horario Operativo',
    value: 'Lun - Vie: 7:00 - 20:00 | Sáb: 8:00 - 14:00',
  },
]

export function ContactoSection() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [message, setMessage] = useState('')
  const [hasCompany, setHasCompany] = useState<boolean | null>(null)
  const [companyName, setCompanyName] = useState('')
  const [sent, setSent] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!name || !email || !message) return
    setIsSubmitting(true)
    
    // Auto-format phone with +52
    let formattedPhone = phone.trim();
    if (formattedPhone && !formattedPhone.startsWith('+52')) {
      formattedPhone = '+52 ' + formattedPhone;
    }

    try {
      // Simulate API call for a static site
      await new Promise(r => setTimeout(r, 1000))
      setSent(true)
    } catch (error) {
      console.error(error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section id="contacto" className="py-24 bg-card">
      <div className="max-w-7xl mx-auto px-6 md:px-16 lg:px-24 xl:px-12 relative z-10">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <Badge className="bg-primary/20 text-primary border-primary/30 mb-4 uppercase tracking-widest text-xs">
            Contáctanos
          </Badge>
          <h2 className="font-heading text-4xl sm:text-5xl font-black text-foreground text-balance mb-4">
            Hablemos de{' '}
            <span className="text-primary">tu embarque</span>
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed">
            Estamos listos para atenderte. Completa el formulario o comunícate
            directamente con nosotros a nuestras líneas de atención.
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-10 items-start max-w-6xl mx-auto">
          
          {/* Contact info (Left column) */}
          <div className="lg:col-span-2 flex flex-col gap-5">
            <div className="flex flex-col gap-4">
              {contactInfo.map((info) => (
                <div
                  key={info.label}
                  className="p-5 rounded-2xl bg-background border border-border/50 shadow-sm hover:shadow-md transition-shadow flex items-start gap-4 group"
                >
                  <div className="size-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                    <info.icon className="size-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-[11px] uppercase tracking-widest text-muted-foreground mb-1 font-bold">
                      {info.label}
                    </p>
                    <p className="text-sm text-foreground font-semibold leading-relaxed">
                      {info.value}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Direct Call Banner */}
            <div className="p-6 rounded-2xl bg-primary text-primary-foreground mt-2 relative overflow-hidden shadow-lg">
              <div className="absolute -right-4 -bottom-4 opacity-10 pointer-events-none">
                <Phone className="size-32" />
              </div>
              <h4 className="font-heading font-bold text-lg mb-1 relative z-10">¿Atención Urgente?</h4>
              <p className="text-sm opacity-90 mb-4 relative z-10">
                Llámanos directamente y un asesor logístico te atenderá al instante.
              </p>
              <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg relative z-10">
                <Phone className="size-4" />
                <span className="font-heading font-black text-xl tracking-tight">+52 314 336 6037</span>
              </div>
            </div>
          </div>

          {/* Form (Right column) */}
          <div className="lg:col-span-3 bg-background border border-border/50 shadow-xl shadow-primary/5 rounded-3xl p-6 sm:p-10 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -z-10 -translate-y-1/2 translate-x-1/3" />
            
            <div className="flex items-center gap-3 mb-8">
              <div className="size-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <Send className="size-6 text-primary" />
              </div>
              <div>
                <h3 className="font-heading font-bold text-foreground text-2xl">
                  Envíanos un Mensaje
                </h3>
                <p className="text-sm text-muted-foreground">Responderemos a tu solicitud en menos de 30 minutos.</p>
              </div>
            </div>

            {sent ? (
              <div className="flex flex-col items-center justify-center py-16 text-center gap-4">
                <div className="size-20 rounded-full bg-green-500/10 flex items-center justify-center mb-2">
                  <CheckCircle className="size-10 text-green-500" />
                </div>
                <h4 className="font-heading font-black text-3xl text-foreground">
                  ¡Mensaje Recibido!
                </h4>
                <p className="text-muted-foreground text-base max-w-sm">
                  Gracias por contactarnos. Uno de nuestros ejecutivos revisará tu solicitud y se comunicará contigo enseguida.
                </p>
                  <Button
                    variant="outline"
                    size="lg"
                    className="mt-4 rounded-xl font-bold"
                    onClick={() => {
                      setSent(false)
                      setName('')
                      setEmail('')
                      setPhone('')
                      setMessage('')
                      setHasCompany(null)
                      setCompanyName('')
                    }}
                  >
                    Enviar otro mensaje
                  </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-bold text-foreground">
                      Nombre completo <span className="text-primary">*</span>
                    </label>
                    <Input
                      placeholder="Ej. Juan Pérez"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                      className="bg-muted/30 border-border/50 focus-visible:bg-background h-11 rounded-xl"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-bold text-foreground">
                      Correo corporativo o personal <span className="text-primary">*</span>
                    </label>
                    <Input
                      type="email"
                      placeholder="correo@ejemplo.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="bg-muted/30 border-border/50 focus-visible:bg-background h-11 rounded-xl"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-sm font-bold text-foreground">
                    ¿Representas a una empresa? <span className="text-primary">*</span>
                  </label>
                  <div className="flex gap-4">
                    <Button 
                      type="button" 
                      variant={hasCompany === true ? 'default' : 'outline'} 
                      onClick={() => setHasCompany(true)} 
                      className={`flex-1 h-11 rounded-xl transition-all ${hasCompany === true ? 'bg-primary font-bold shadow-md' : 'text-muted-foreground'}`}
                    >
                      Sí, soy empresa
                    </Button>
                    <Button 
                      type="button" 
                      variant={hasCompany === false ? 'default' : 'outline'} 
                      onClick={() => setHasCompany(false)} 
                      className={`flex-1 h-11 rounded-xl transition-all ${hasCompany === false ? 'bg-primary font-bold shadow-md' : 'text-muted-foreground'}`}
                    >
                      No, soy particular
                    </Button>
                  </div>
                </div>

                {hasCompany === true && (
                  <div className="flex flex-col gap-2 animate-in fade-in slide-in-from-top-2 duration-300">
                    <label className="text-sm font-bold text-foreground">
                      Nombre de tu Empresa <span className="text-primary">*</span>
                    </label>
                    <Input
                      placeholder="Ej. Industrias SA de CV"
                      value={companyName}
                      onChange={(e) => setCompanyName(e.target.value)}
                      required={hasCompany}
                      className="bg-muted/30 border-border/50 focus-visible:bg-background h-11 rounded-xl border-primary/50"
                    />
                  </div>
                )}

                <div className="flex flex-col gap-2">
                  <label className="text-sm font-bold text-foreground">
                    Teléfono (Opcional)
                  </label>
                  <div className="relative">
                    <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground text-sm font-semibold select-none">
                      +52
                    </span>
                    <Input
                      type="tel"
                      placeholder="314 000 0000"
                      value={phone}
                      onChange={(e) => {
                        // Optional: strip +52 if user pastes it so it doesn't double up visually
                        let val = e.target.value;
                        if (val.startsWith('+52')) val = val.replace('+52', '').trim();
                        setPhone(val);
                      }}
                      className="bg-muted/30 border-border/50 focus-visible:bg-background h-11 rounded-xl pl-12"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-sm font-bold text-foreground">
                    Detalles del embarque <span className="text-primary">*</span>
                  </label>
                  <Textarea
                    placeholder="Cuéntanos sobre tu necesidad: origen, destino, tipo de carga..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    rows={4}
                    required
                    className="bg-muted/30 border-border/50 focus-visible:bg-background rounded-xl resize-none"
                  />
                </div>

                  <Button
                    type="submit"
                    className="w-full h-12 bg-primary hover:bg-primary/90 text-primary-foreground font-bold rounded-xl text-base flex items-center gap-2"
                    disabled={isSubmitting}
                  >
                    <Send className="size-4" />
                    {isSubmitting ? 'Enviando...' : 'Enviar Solicitud'}
                  </Button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

