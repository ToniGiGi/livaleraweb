# 🚛 LI Valera - ERP Logístico y Portal de Clientes

Plataforma de software integral diseñada específicamente para optimizar los procesos de cotización, ventas y operaciones logísticas de transporte de carga pesada.

Este repositorio contiene la Plataforma Web principal, la cual sirve tanto como Panel de Control Administrativo (ERP) para los agentes y operativos, así como un Portal Interactivo para los clientes, centralizando toda la información en un solo ecosistema.

## ✨ Características Principales

* **📊 Panel de Control (Dashboard):** Analíticas en tiempo real del flujo de cotizaciones, tasas de conversión, clientes activos y facturación mensual.
* **🧮 Calculadora Inteligente de Fletes:** Módulo público para clientes donde ingresan origen, destino y tipo de carga para obtener una estimación de costos al instante, generando un *Lead* automático en el sistema.
* **💼 Gestión de Prospectos y Clientes:** Embudo de ventas (Pipeline) para dar seguimiento a los prospectos desde que solicitan información hasta que se convierten en clientes oficiales de la empresa.
* **📝 Generación y Firma de Cotizaciones en PDF:** Creación dinámica de documentos PDF formales que se envían al cliente. Incluye un portal para que el cliente pueda visualizar, aprobar y dibujar su firma digital directamente en el navegador.
* **🚚 Órdenes de Traslado:** Conversión automática de cotizaciones aprobadas a órdenes de operación activas, permitiendo asignar choferes, vehículos y estimar tiempos de llegada (ETA).
* **🏢 Gestión de Empleados y Permisos:** Administración del equipo de ventas y operaciones con diferentes niveles de acceso (Administrador y Agente Logístico).

## 🛠️ Stack Tecnológico

* **Frontend:** Next.js 14 (App Router), React, Tailwind CSS (Diseño Custom UI)
* **Backend:** Server Actions (Next.js), Node.js
* **Base de Datos:** PostgreSQL (Neon DB) gestionada a través de **Prisma ORM**
* **Librerías Adicionales:** 
  * `Framer Motion` (Micro-animaciones e interacciones fluidas)
  * `Recharts` (Gráficas interactivas para analíticas)
  * `Lucide React` (Iconografía)
  * `Shadcn UI` (Componentes base accesibles y personalizables)
  * `jspdf` & `html2canvas` (Generación de documentos PDF en cliente)
