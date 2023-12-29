"use client";

export default function NavBar() {
  return (
    <nav className="sticky z-10 w-screen top-10 left-10 right-10 flex flex-row">
      <div className="ml-0 mr-auto">
        <a href="/" className="text-4xl mx-6">
          home
        </a>
        <a href="/contact" className="text-4xl mx-6">
          contacto
        </a>
      </div>

      <div className="mr-0 ml-auto">
        <a href="/blog" className="text-4xl mx-6">
          blog
        </a>
        <a href="/info" className="text-4xl mx-6">
          info
        </a>
      </div>
    </nav>
  )
}
