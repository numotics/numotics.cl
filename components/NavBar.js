"use client";

export default function NavBar(props) {
  return (
    <nav className="sticky z-10 w-screen top-10 left-10 right-10 flex flex-row">
      <div className="ml-0 mr-auto">
        <a href="/" className={"md:text-4xl sm:text-2xl font-semibold mx-6 underline-offset-4 decoration-zinc-700 " + (props.currentPage == "home" ? "underline" : "")}>
          home
        </a>
        <a href="/contact" className={"md:text-4xl sm:text-2xl font-semibold mx-6 decoration-zinc-700 " + (props.currentPage == "contact" ? "underline" : "")}>
          contacto
        </a>
      </div>

      <div className="mr-0 ml-auto">
        <a href="/blog" className={"md:text-4xl sm:text-2xl font-semibold mx-6 decoration-zinc-700 " + (props.currentPage == "blog" ? "underline" : "")}>
          blog
        </a>
        <a href="/info" className={"md:text-4xl sm:text-2xl font-semibold mx-6 decoration-zinc-700 " + (props.currentPage == "info" ? "underline" : "")}>
          info
        </a>
      </div>
    </nav>
  )
}
