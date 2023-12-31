"use client";
import { usePathname } from 'next/navigation'

export default function NavBar() {
  let currentPage = usePathname()

  return (
    <nav className="sticky z-10 w-screen top-10 left-10 right-10 flex flex-row">
      <div className="ml-0 mr-auto">
        <a href="/" className={"md:text-4xl sm:text-2xl font-semibold mx-6 underline-offset-4 decoration-numotics " + (currentPage == "/" ? "underline" : "")}>
          home
        </a>
        <a href="/contact" className={"md:text-4xl sm:text-2xl font-semibold mx-6 decoration-numotics " + (currentPage == "/contact" ? "underline" : "")}>
          contacto
        </a>
      </div>

      <div className="mr-0 ml-auto">
        <a href="/blog" className={"md:text-4xl sm:text-2xl font-semibold mx-6 decoration-numotics " + (currentPage.indexOf("/blog") !== -1 ? "underline" : "")}>
          blog
        </a>
        <a href="/info" className={"md:text-4xl sm:text-2xl font-semibold mx-6 decoration-gray-700 " + (currentPage == "/info" ? "underline" : "")}>
          info
        </a>
      </div>
    </nav>
  )
}
