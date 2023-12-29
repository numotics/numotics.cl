"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import { Noto_Serif_SC } from "next/font/google";
import Typewriter from "typewriter-effect";
import DynamicTextArea from "@/components/misc/DynamicTextArea";
import NavBar from "@/components/NavBar";
import MDIcon from "@/components/misc/MDIcon";

const notoSerifSC = Noto_Serif_SC({ subsets: ["latin"], weight: "900" });

export default function Home() {
  const [messages, setMessages] = useState([
    "Estas a un paso de la casa del futuro.",
    "[nu]motics es una empresa que ofrece servicios de automatización para personas que estan adelantadas a los tiempos.",
  ]);

  const [scrollState, setScrollState] = useState(0);
  const [scrollSoonState, setScrollSoonState] = useState(0);
  const [screensCount, setScreensCount] = useState(messages.length);
  const [isTyping, setIsTyping] = useState(false);
  const [startupDone, setStartupDone] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      const pageY = window.innerHeight;
      const value = window.scrollY;
      let x = 0;
      if (value > 100 && value < pageY) {
        x = 1;
      } else if (value > pageY) {
        x = Math.floor(value / pageY);
        if (value / pageY - x > 0.5 && !startupDone) {
          setScrollSoonState(1);
        } else {
          setScrollSoonState(0);
        }
      }
      if (x > messages.length + 1) {
        x -= 1
      }
      setScrollState(x); // Set the scroll threshold here
    };
    onScroll();

    window.addEventListener("scroll", onScroll);
  }, [startupDone]);

  useEffect(() => {
    if (scrollState > messages.length) {
      setStartupDone(true);
      setMessages([]);
    }

    if (isTyping && scrollState-1 < messages.length + 1) {
      setScreensCount((scrollState-1));
    } else {
      setScreensCount(scrollState);
    }

  }, [scrollState, isTyping, messages.length]);

  return (
    <main className="scroll-smooth">
      <NavBar />

      {/* Hidden logo (placeholder) */}
      <div className="logo flex justify-center items-center h-screen flex-col">
        <div className="my-auto transition-all duration-100 opacity-0">
          <Image src="/logo.svg" alt="logo" width="400" height="400" />
        </div>
      </div>

      {/* TEXT 1 */}
      <div className="sticky top-0 flex justify-center items-center h-screen flex-col">
        <div className={`my-auto flex flex-row items-center ${(startupDone) ? "mb-10 " : ""}`}>
          <span className={`mx-4 text-9xl transition-all duration-300 ${scrollSoonState == 1 ? "opacity-0" : "opacity-100"}`}>[</span>
          <span className={`${notoSerifSC.className} text-4xl max-w-3xl w-fit mt-2 text-center transition-all duration-300 ${scrollSoonState == 1 ? "opacity-0" : "opacity-100"}`}>
            {scrollState-1 < messages.length ? (
              <Typewriter
                onInit={(type) => {
                  setIsTyping(true);
                  if (!startupDone) {
                    type.typeString(messages[scrollState - 1])
                  } else {
                    type.pasteString(messages[scrollState - 1])
                  }
                    type.callFunction((t) => {
                        const interval = setInterval(() => {
                          if (
                            t.elements.wrapper.textContent ==
                            messages[scrollState - 1]
                          ) {
                            setIsTyping(false);
                            clearInterval(interval);
                          }
                        }, 50);
                      })
                  type.start();
                }}
                key={scrollState}
                options={{
                  loop: false,
                  delay: 22,
                  deleteSpeed: 50,
                  pauseFor: 1000,
                }}
              />
            )
                :
            <DynamicTextArea className="z-10 appearance-none bg-transparent outline-none text-2xl resize-none h-fit" autoFocus placeholder="Habla con Nia..." />
          }
          </span>
          <span className={`mx-4 text-9xl transition-all duration-300 ${scrollSoonState == 1 ? "opacity-0" : "opacity-100"}`}>]</span>
        </div>
      </div>
      {/* and a little more for detection. */}
      <div className="h-5"></div>
      {
        Array.from({ length: screensCount }).map((_, index) => (
          <div key={index} className="h-screen"></div>
        ))
      }
      
      { !startupDone && (
          <MDIcon icon="mdi-arrow-down" className={"mb-24 text-8xl fixed inset-x-0 bottom-1 w-screen animate-bounce flex transition-all duration-300 " + ((!isTyping || scrollState == 0) ? "opacity-100" : "opacity-0")} />
        )
      }

      <div className={`fixed inset-0 flex justify-center items-center transition-all duration-300 \
                    ${scrollState >= 1 ? "opacity-0" : "opacity-100"} \
                    ${startupDone && scrollState > 1 ? " hidden" : ""}`}>
        <Image
          src="/logo.svg"
          alt="logo"
          width="400"
          height="400"
          className="mx-auto my-auto pb-36 "
        />
      </div>
    </main>
  );
}
