"use client";
import Image from "next/image";
import NavBar from "@/components/NavBar";

export default function MdxLayout({ children }) {
  // Create any shared layout or styles here
  return (
    <main className="scroll-smooth h-screen">
      <NavBar />

      <div className="logo flex justify-center items-center flex-col md:-mt-4 mt-16">
        <div className="my-auto transition-all duration-100">
          <Image src="/logo.svg" alt="logo" width="200" height="200" />
        </div>
      </div>

      <div className="content flex flex-col my-auto sm:mx-auto mx-2 mt-32 items-center text-center md:w-[800px] w-5/6">
        {children}
      </div>
    </main>
  );
}
