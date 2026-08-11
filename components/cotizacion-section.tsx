'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Calculator, CheckCircle, Truck, Info, PackageOpen, MapPin, AlertTriangle, ShieldAlert } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Switch } from '@/components/ui/switch'
const CITIES = [
  'Aguascalientes', 'Guadalajara', 'León', 'Salamanca', 'Silao', 'Irapuato', 
  'Celaya / Apaseo el Grande / Villagrán', 'Guanajuato / Valle de Santiago', 
  'Querétaro', 'San Miguel De Allende', 'San Francisco del Rincón', 
  'San José Iturbide', 'San Juan del Río', 'San Luis Potosí', 
  'Saltillo / Ramos Arizpe', 'México', 'Toluca (Lerdo, San Mateo)', 
  'Cuernavaca', 'Puebla', 'Tlaxcala', 'Monterrey'
]

const PORTS = ['Manzanillo', 'Veracruz', 'Altamira']
const ALL_LOCATIONS = [...PORTS, ...CITIES].sort()

interface QuoteResult {
  serviceType: 'Dedicado' | 'Ruta Establecida (Consolidado)'
  reason: string
  distance: number
  basePrice: number
  surchargeNoEstibable: number
  surchargeIMO: number
  subtotal: number
  iva: number
  total: number
  warnings: string[]
}

export function CotizacionSection() {
  const [origen, setOrigen] = useState('')
  const [destino, setDestino] = useState('')
  const [largo, setLargo] = useState('')
  const [ancho, setAncho] = useState('')
  const [alto, setAlto] = useState('')
  const [peso, setPeso] = useState('')
  
  const [isIMO, setIsIMO] = useState(false)
  const [forceDedicado, setForceDedicado] = useState(false)
  
  const [quote, setQuote] = useState<QuoteResult | null>(null)
  const [isCalculating, setIsCalculating] = useState(false)
  
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [hasCompany, setHasCompany] = useState<boolean | null>(null)
  const [companyName, setCompanyName] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleCalculate = async () => {
    if (!origen || !destino || !largo || !ancho || !alto || !peso) return
    
    setIsCalculating(true)
    // Simulate API delay for a premium feel
    await new Promise(r => setTimeout(r, 1200))
    
    const numLargo = parseFloat(largo) || 0
    const numAncho = parseFloat(ancho) || 0
    const numAlto = parseFloat(alto) || 0
    const numPeso = parseFloat(peso) || 0

    let serviceType: 'Dedicado' | 'Ruta Establecida (Consolidado)' = 'Ruta Establecida (Consolidado)'
    let reason = 'Cumple con los requisitos para envío consolidado estándar.'
    let warnings: string[] = []

    // Decisión de tipo de servicio
    if (numLargo > 2.20) {
      serviceType = 'Dedicado'
      reason = 'La carga supera los 2.20m de largo, por lo que requiere una unidad exclusiva.'
      warnings.push('Carga sobredimensionada en longitud.')
    } else if (forceDedicado) {
      serviceType = 'Dedicado'
      reason = 'Servicio dedicado exclusivo solicitado por el cliente.'
    }

    if (numPeso > 2500) {
      warnings.push('Atención: Bultos mayores a 2.5 toneladas (2,500 kg) requieren evaluación especial de manejo.')
    }

    // Aproximación de Distancia (Mock heurístico)
    let distance = 600
    if (origen === destino) distance = 40
    else if (PORTS.includes(origen) && PORTS.includes(destino)) distance = 950

    // Cálculo Base Estimado
    let basePrice = 0
    if (serviceType === 'Dedicado') {
      basePrice = 4500 + (distance * 22) // Aproximación tipo Caja Seca
    } else {
      // Consolidado: peso volumétrico vs peso real
      const pesoVolumetrico = (numLargo * numAncho * numAlto) * 400
      const pesoCobro = Math.max(numPeso, pesoVolumetrico)
      basePrice = Math.max(1500, pesoCobro * 4.5) // Min 1500 MXN o $4.5 por kg
    }

    // Recargos (Reglas de negocio)
    let surchargeNoEstibable = 0
    let surchargeIMO = 0

    // Regla 11 y 13: Cargo no estibable del 40% (Alto > 1.20m o Base > 2m)
    if (numAlto > 1.20 || numLargo > 2.0 || numAncho > 2.0) {
      surchargeNoEstibable = basePrice * 0.40
      warnings.push('Aplica +40% por carga no estibable (dimensiones exceden límites estándar).')
    }

    // Regla 14: IMO 90%
    if (isIMO) {
      // IMO applies generally over the base
      surchargeIMO = basePrice * 0.90
      warnings.push('Aplica +90% por manejo de carga peligrosa (IMO). Sujeto a restricciones UN.')
    }

    const subtotal = basePrice + surchargeNoEstibable + surchargeIMO
    const iva = subtotal * 0.16
    const total = subtotal + iva

    setQuote({
      serviceType,
      reason,
      distance,
      basePrice,
      surchargeNoEstibable,
      surchargeIMO,
      subtotal,
      iva,
      total,
      warnings
    })
    setIsCalculating(false)
  }

  const handleSubmitFormal = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!name || !phone || !email || !quote) return
    
    setIsSubmitting(true)
    try {
      const payload = {
        origen,
        destino,
        largo,
        ancho,
        alto,
        peso,
        cargaPeligrosa: isIMO ? "Sí" : "No",
        forzarDedicado: forceDedicado ? "Sí" : "No",
        nombre: name,
        correo: email,
        telefono: phone,
        esEmpresa: hasCompany ? "Sí" : "No",
        nombreEmpresa: companyName || "N/A",
        servicioRecomendado: quote.serviceType,
        totalEstimado: quote.total
      }

      await fetch("https://script.google.com/macros/s/AKfycbxqPNlNHWiRA9cR0beC1ZSb1lxwErteH5wTmsU-3oYKO4pzrdDITdU2E1Sw-nttRZNB/exec", {
        method: "POST",
        mode: "no-cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      })
      
      setSubmitted(true)
    } catch (e: any) {
      alert('Hubo un error enviando la cotización. Intenta de nuevo.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const fmt = (n: number) => n.toLocaleString('es-MX', { style: 'currency', currency: 'MXN' })

  return (
    <section id="cotizacion" className="py-24 sm:py-32 bg-slate-50 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-16 lg:px-24 xl:px-12">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20 relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary/10 text-secondary text-xs font-bold tracking-widest uppercase mb-6 border border-secondary/20">
            <Calculator className="size-3" />
            Cotizador Inteligente
          </div>
          <h2 className="font-heading text-4xl sm:text-5xl font-black text-slate-900 mb-6 leading-tight">
            Proyecta tu envío en <span className="text-secondary">segundos</span>
          </h2>
          <p className="text-slate-600 text-lg font-light">
            Nuestro algoritmo evalúa tus requerimientos y te recomienda la ruta y el 
            servicio ideal, aplicando las reglas operativas en tiempo real.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-start relative z-10">
          
          {/* Left Column: Form */}
          <div className={`${submitted ? 'lg:col-span-12 max-w-3xl mx-auto w-full' : 'lg:col-span-7'} bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 p-6 sm:p-10`}>
            
            {submitted ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center py-16 text-center"
              >
                <div className="size-20 rounded-full bg-green-100 flex items-center justify-center mb-6">
                  <CheckCircle className="size-10 text-green-600" />
                </div>
                <h3 className="font-heading text-3xl font-black text-slate-900 mb-4">
                  ¡Solicitud Recibida!
                </h3>
                <p className="text-slate-500 max-w-md mx-auto mb-8">
                  Un especialista logístico está revisando los detalles de tu carga y 
                  te contactará al <strong>{phone}</strong> en los próximos minutos.
                </p>
                <Button 
                  onClick={() => {
                    setSubmitted(false); setQuote(null); setOrigen(''); setDestino('');
                    setLargo(''); setAncho(''); setAlto(''); setPeso(''); setIsIMO(false); setForceDedicado(false);
                    setHasCompany(null); setCompanyName('');
                  }}
                  variant="outline"
                  className="rounded-xl h-12 px-8"
                >
                  Calcular nuevo envío
                </Button>
              </motion.div>
            ) : (
              <div className="space-y-8">
                
                {/* Rutas */}
                <div>
                  <h3 className="flex items-center gap-2 text-lg font-bold text-slate-900 mb-4">
                    <MapPin className="size-5 text-secondary" /> Origen y Destino
                  </h3>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Origen</label>
                      <Select value={origen} onValueChange={setOrigen}>
                        <SelectTrigger className="h-12 rounded-xl bg-slate-50 border-slate-200">
                          <SelectValue placeholder="Ciudad o Puerto" />
                        </SelectTrigger>
                        <SelectContent>
                          {ALL_LOCATIONS.map(loc => (
                            <SelectItem key={loc} value={loc}>{loc}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Destino</label>
                      <Select value={destino} onValueChange={setDestino}>
                        <SelectTrigger className="h-12 rounded-xl bg-slate-50 border-slate-200">
                          <SelectValue placeholder="Ciudad o Puerto" />
                        </SelectTrigger>
                        <SelectContent>
                          {ALL_LOCATIONS.map(loc => (
                            <SelectItem key={loc} value={loc}>{loc}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                <div className="h-px w-full bg-slate-100" />

                {/* Dimensiones y Peso */}
                <div>
                  <h3 className="flex items-center gap-2 text-lg font-bold text-slate-900 mb-4">
                    <PackageOpen className="size-5 text-secondary" /> Dimensiones de la Carga
                  </h3>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Largo (m)</label>
                      <Input type="number" step="0.01" min="0" placeholder="Ej. 2.5" className="h-12 rounded-xl bg-slate-50 border-slate-200 text-center" value={largo} onChange={e => setLargo(e.target.value)} />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Ancho (m)</label>
                      <Input type="number" step="0.01" min="0" placeholder="Ej. 1.2" className="h-12 rounded-xl bg-slate-50 border-slate-200 text-center" value={ancho} onChange={e => setAncho(e.target.value)} />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Alto (m)</label>
                      <Input type="number" step="0.01" min="0" placeholder="Ej. 1.5" className="h-12 rounded-xl bg-slate-50 border-slate-200 text-center" value={alto} onChange={e => setAlto(e.target.value)} />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Peso (kg)</label>
                      <Input type="number" step="1" min="0" placeholder="Ej. 1500" className="h-12 rounded-xl bg-slate-50 border-slate-200 text-center" value={peso} onChange={e => setPeso(e.target.value)} />
                    </div>
                  </div>
                </div>

                <div className="h-px w-full bg-slate-100" />

                {/* Requerimientos Especiales */}
                <div>
                  <h3 className="flex items-center gap-2 text-lg font-bold text-slate-900 mb-4">
                    <ShieldAlert className="size-5 text-secondary" /> Requerimientos Especiales
                  </h3>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="flex flex-row items-center justify-between rounded-xl border border-slate-200 p-4 bg-slate-50">
                      <div className="space-y-0.5">
                        <label className="text-sm font-bold text-slate-900">Carga Peligrosa (IMO)</label>
                        <p className="text-xs text-slate-500">Materiales peligrosos regulados</p>
                      </div>
                      <Switch checked={isIMO} onCheckedChange={setIsIMO} />
                    </div>
                    <div className="flex flex-row items-center justify-between rounded-xl border border-slate-200 p-4 bg-slate-50">
                      <div className="space-y-0.5">
                        <label className="text-sm font-bold text-slate-900">Forzar Dedicado</label>
                        <p className="text-xs text-slate-500">Unidad exclusiva sin compartir</p>
                      </div>
                      <Switch checked={forceDedicado} onCheckedChange={setForceDedicado} />
                    </div>
                  </div>
                </div>

                <Button 
                  onClick={handleCalculate}
                  disabled={!origen || !destino || !largo || !ancho || !alto || !peso || isCalculating}
                  className="w-full h-14 rounded-xl font-bold text-lg bg-primary text-white shadow-lg shadow-primary/20 hover:bg-slate-900 transition-all"
                >
                  {isCalculating ? 'Procesando algoritmo...' : 'Generar Estimación Automática'}
                </Button>
              </div>
            )}
          </div>

          {/* Right Column: Result / Info */}
          <div className={`${submitted ? 'hidden' : 'lg:col-span-5 flex flex-col gap-6 lg:sticky lg:top-32'}`}>
            
            <AnimatePresence mode="wait">
              {!quote && !submitted && (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="bg-slate-900 rounded-3xl p-8 text-white border border-slate-800"
                >
                  <div className="size-12 rounded-xl bg-white/10 flex items-center justify-center mb-6">
                    <Info className="size-6 text-secondary" />
                  </div>
                  <h4 className="font-heading text-2xl font-bold mb-4">Información de Operaciones</h4>
                  <ul className="space-y-4 text-sm text-slate-400 font-light leading-relaxed">
                    <li className="flex gap-3">
                      <div className="size-1.5 rounded-full bg-secondary shrink-0 mt-1.5" />
                      Cargas con más de 2.20m de largo requieren servicio dedicado.
                    </li>
                    <li className="flex gap-3">
                      <div className="size-1.5 rounded-full bg-secondary shrink-0 mt-1.5" />
                      Se aplicará un cargo de 40% por "no estibabilidad" a bultos mayores de 1.20m de altura o bases mayores a 2m.
                    </li>
                    <li className="flex gap-3">
                      <div className="size-1.5 rounded-full bg-secondary shrink-0 mt-1.5" />
                      Materiales peligrosos (IMO) generan un 90% adicional sobre el flete.
                    </li>
                    <li className="flex gap-3">
                      <div className="size-1.5 rounded-full bg-secondary shrink-0 mt-1.5" />
                      Bultos mayores a 2.5 toneladas requieren evaluación especial previa a recolección.
                    </li>
                  </ul>
                </motion.div>
              )}

              {quote && !submitted && (
                <motion.div 
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="bg-slate-950 rounded-3xl p-8 text-white shadow-2xl relative overflow-hidden"
                >
                  <div className="absolute top-0 right-0 p-6 opacity-5 pointer-events-none">
                    <Truck className="size-32" />
                  </div>

                  <div className="relative z-10">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-500/20 text-green-400 text-xs font-bold tracking-widest uppercase mb-4">
                      Análisis Completado
                    </div>
                    
                    <h4 className="text-sm font-light text-slate-400 mb-1">Servicio Recomendado</h4>
                    <p className="font-heading text-2xl font-bold text-white mb-2">
                      {quote.serviceType}
                    </p>
                    <p className="text-xs text-secondary mb-6">{quote.reason}</p>

                    <div className="space-y-3 mb-6 pb-6 border-b border-white/10">
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-400">Tarifa Base Estimada</span>
                        <span className="font-medium">{fmt(quote.basePrice)}</span>
                      </div>
                      {quote.surchargeNoEstibable > 0 && (
                        <div className="flex justify-between text-sm">
                          <span className="text-amber-400/80">Recargo (No Estibable 40%)</span>
                          <span className="font-medium text-amber-400/80">+{fmt(quote.surchargeNoEstibable)}</span>
                        </div>
                      )}
                      {quote.surchargeIMO > 0 && (
                        <div className="flex justify-between text-sm">
                          <span className="text-red-400/80">Recargo (IMO 90%)</span>
                          <span className="font-medium text-red-400/80">+{fmt(quote.surchargeIMO)}</span>
                        </div>
                      )}
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-400">Subtotal</span>
                        <span className="font-medium">{fmt(quote.subtotal)}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-400">I.V.A. (16%)</span>
                        <span className="font-medium">{fmt(quote.iva)}</span>
                      </div>
                    </div>

                    <div className="flex items-end justify-between mb-8">
                      <div>
                        <p className="text-xs text-slate-400 uppercase tracking-wider font-bold mb-1">Total Estimado</p>
                        <p className="font-heading text-4xl font-black text-secondary">{fmt(quote.total)} <span className="text-sm font-medium text-slate-500">MXN</span></p>
                      </div>
                    </div>

                    {quote.warnings.length > 0 && (
                      <div className="mb-8 p-3 rounded-xl bg-white/5 border border-white/10 space-y-2">
                        {quote.warnings.map((w, i) => (
                          <div key={i} className="flex gap-2 items-start text-xs text-slate-300">
                            <AlertTriangle className="size-3.5 text-amber-500 shrink-0 mt-0.5" />
                            <p>{w}</p>
                          </div>
                        ))}
                      </div>
                    )}

                    <form onSubmit={handleSubmitFormal} className="space-y-4">
                      <p className="text-sm font-medium text-white mb-2">Solicitar Confirmación Formal</p>
                      <Input 
                        placeholder="Nombre Completo" 
                        required 
                        value={name} onChange={e=>setName(e.target.value)}
                        className="bg-white/10 border-white/10 text-white placeholder:text-slate-500 h-12 rounded-xl"
                      />
                      <Input 
                        placeholder="Correo Electrónico" 
                        required 
                        type="email"
                        value={email} onChange={e=>setEmail(e.target.value)}
                        className="bg-white/10 border-white/10 text-white placeholder:text-slate-500 h-12 rounded-xl"
                      />
                      <Input 
                        placeholder="Teléfono" 
                        required 
                        type="tel"
                        value={phone} onChange={e=>setPhone(e.target.value)}
                        className="bg-white/10 border-white/10 text-white placeholder:text-slate-500 h-12 rounded-xl"
                      />
                      
                      <div className="flex flex-col gap-2 pt-2">
                        <label className="text-sm font-medium text-slate-300">
                          ¿Representas a una empresa?
                        </label>
                        <div className="flex gap-4">
                          <Button 
                            type="button" 
                            variant="outline"
                            onClick={() => setHasCompany(true)} 
                            className={`flex-1 h-11 rounded-xl transition-all border-white/10 ${hasCompany === true ? 'bg-secondary text-white border-secondary font-bold' : 'bg-transparent text-slate-400 hover:bg-white/10 hover:text-white'}`}
                          >
                            Sí, soy empresa
                          </Button>
                          <Button 
                            type="button" 
                            variant="outline"
                            onClick={() => setHasCompany(false)} 
                            className={`flex-1 h-11 rounded-xl transition-all border-white/10 ${hasCompany === false ? 'bg-secondary text-white border-secondary font-bold' : 'bg-transparent text-slate-400 hover:bg-white/10 hover:text-white'}`}
                          >
                            No, particular
                          </Button>
                        </div>
                      </div>

                      {hasCompany === true && (
                        <motion.div 
                          initial={{ opacity: 0, height: 0 }} 
                          animate={{ opacity: 1, height: 'auto' }} 
                          className="pt-2"
                        >
                          <Input
                            placeholder="Nombre de la Empresa"
                            value={companyName}
                            onChange={(e) => setCompanyName(e.target.value)}
                            required={hasCompany}
                            className="bg-white/10 border-secondary/50 text-white placeholder:text-slate-500 h-12 rounded-xl"
                          />
                        </motion.div>
                      )}
                      <Button disabled={isSubmitting} type="submit" className="w-full h-12 rounded-xl bg-secondary hover:bg-secondary/90 text-white font-bold">
                        {isSubmitting ? 'Enviando...' : 'Solicitar Cotización Exacta'}
                      </Button>
                      <p className="text-[10px] text-center text-slate-500 font-light mt-4">
                        * Esta es una proyección matemática generada automáticamente y no representa una oferta vinculante.
                      </p>
                    </form>

                  </div>
                </motion.div>
              )}
            </AnimatePresence>

          </div>

        </div>
      </div>
    </section>
  )
}
