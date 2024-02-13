import { Inter, Roboto_Mono } from 'next/font/google'
import './globals.css'

import GoogleAnalytics from './GoogleAnalytics'

const inter = Inter({ subsets: ['latin'] })
const robotoMono = Roboto_Mono({ subsets: ['latin'], weight: "100" })

export const metadata = {
  title: '[nu]motics | Soluciones de Domótica',
  description: '[nu]motics es una empresa que ofrece servicios de automatización y soluciones de domótica de vanguardia para personas que estan adelantadas a los tiempos.',
  keywords: ['Domotica', 'Domótica', 'Chile', 'Instalación', 'Santiago', 'Startup'],
  icons: [{
    rel: 'icon', url: '/favicon.svg'
  }]
}

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body className={robotoMono.className + ' scrollbar-hide'}>
        <GoogleAnalytics />  
        {children}
      </body>
    </html>
  )
}
