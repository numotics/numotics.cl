import { Inter, Roboto_Mono } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })
const robotoMono = Roboto_Mono({ subsets: ['latin'], weight: "100" })

export const metadata = {
  title: '[nu]motics',
  description: '[nu]motics es una empresa que ofrece servicios de automatización para personas que estan adelantadas a los tiempos.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={robotoMono.className + ' scrollbar-hide'}>{children}</body>
    </html>
  )
}
