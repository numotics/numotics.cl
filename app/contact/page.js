"use client";
import NavBar from "@/components/NavBar";
import MDIcon from "@/components/misc/MDIcon";
import { Noto_Serif_SC } from "next/font/google";
import Image from "next/image";

const notoSerifSC = Noto_Serif_SC({ subsets: ["latin"], weight: "300" });

const Contact = () => {
  return (
    <main className="scroll-smooth h-screen">
      <NavBar />

      <div className="logo flex justify-center items-center flex-col md:-mt-4 mt-16">
        <div className="my-auto transition-all duration-100">
          <Image src="/logo.svg" alt="logo" width="200" height="200"  />
        </div>
      </div>


      <div className="flex flex-col my-auto sm:mx-auto mx-2 mt-32 items-center text-center border border-zinc-700  rounded-lg w-fit p-1">
        <h1 className={"mx-auto text-4xl font-bold mb-4 " + notoSerifSC.className}>
          Puntos de contacto
        </h1>
        <span className="text-xl font-semibold">Puedes encontrarnos en los siguientes medios:</span>
        <div className="flex justify-center items-center space-x-8 mt-2 text-xl font-semibold">
            <div className="flex flex-col items-center">
                <MDIcon icon="mdi-email" /> <a href="mailto:hola@numotics.cl">hola@numotics.cl</a>
            </div>
            <div className="flex flex-col items-center">
                <MDIcon icon="mdi-instagram" /> <a href="//instagram.com/numotics">@numotics</a>
            </div>
        </div>
      </div>
    </main>
  );
};

export default Contact;
