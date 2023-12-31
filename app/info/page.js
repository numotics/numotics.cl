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
          <Image src="/logo.svg" alt="logo" width="200" height="200" />
        </div>
      </div>


      <div className="flex flex-col my-auto sm:mx-auto mx-2 mt-12 items-center text-center w-full">
        <div className="flex flex-col justify-between items-center mt-1 w-full text-xl font-semibold mx-auto">
          <div className="my-4 w-fit flex flex-row items-center mx-0">
            <span className={`mr-1 text-3xl transition-all duration-300`}>[</span>
              <a href={`/`} className="text-4xl font-bold mx-auto hover:underline decoration-numotics flex"> <MDIcon icon="mdi-xml mr-2" />  En Construcción</a>
            <span className={`ml-1 text-3xl transition-all duration-300`}>]</span>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Contact;
