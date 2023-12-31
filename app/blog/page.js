"use client";
import Image from "next/image";
import NavBar from "@/components/NavBar";
import { useEffect } from "react"

const Blog = ({params}) => {
    let fail = false;
    let entries = []
    for (; fail !== true;) {
      let entry = null
      try {
        entry = require(`./entries/${entries.length}/page.mdx`)
      } catch (e) {
        fail = true
      }
      if (entry !== null)
        entries.push(entry)
    }

    return (
      <main className="scroll-smooth h-screen">
        <NavBar />
        <div className="logo flex justify-center items-center flex-col md:-mt-4 mt-16">
          <div className="my-auto transition-all duration-100">
            <Image src="/logo.svg" alt="logo" width="200" height="200" />
          </div>
        </div>

        <div className="flex justify-center items-center flex-col">
          <h1 className="text-5xl font-bold text-center mb-3">Blog</h1>

            { entries.map((v, i) => (
              <div className="my-4 sm:w-5/6 md:w-3/6 lg:w-2/6 w-5/6 flex flex-row items-center" key={i}>
                <span className={`mr-1 text-3xl transition-all duration-300`}>[</span>
                  <a href={`/blog/entries/${i}`} className="text-4xl font-bold mx-auto hover:underline decoration-numotics">{v.metadata.title}</a>
                <span className={`ml-1 text-3xl transition-all duration-300`}>]</span>
              </div>
            )) }
          <p className="text-lg font-medium text-center">
          </p>
        </div>
      </main>
    )
};

export default Blog;
