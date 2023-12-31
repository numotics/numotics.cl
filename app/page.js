"use client";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { Noto_Serif_SC } from "next/font/google";
import Typewriter from "typewriter-effect";
import DynamicTextArea from "@/components/misc/DynamicTextArea";
import NavBar from "@/components/NavBar";
import MDIcon from "@/components/misc/MDIcon";
import WSChatBox from "@/components/WSChatBox";

const notoSerifSC = Noto_Serif_SC({ subsets: ["latin"], weight: "900" });

export default function Home() {
  const [messages, setMessages] = useState([
    "Estas a un paso de la casa del futuro.",
    "[nu]motics ofrece servicios de automatización para personas que estan adelantadas a los tiempos.",
    "Nuestros servicios son completamente a la medida; por esta razón, no contamos con una tienda online. Preferimos atenderte por medio de una conversación.",
  ]);

  const [scrollState, setScrollState] = useState(0);
  const [scrollSoonState, setScrollSoonState] = useState(0);
  const [screensCount, setScreensCount] = useState(messages.length);
  const [isTyping, setIsTyping] = useState(false);
  const [startupDone, setStartupDone] = useState(false);
  const [value, setValue] = useState("");
  const sendMessageRef = useRef(null);
  const chatBoxRef = useRef(null);
  const scrollTargetRef = useRef(null);
  const scrollStateRef = useRef(scrollState); 

  useEffect(() => {
    const onScroll = () => {
      const pageY = window.innerHeight;
      const value = window.scrollY;
      let x = 0;
      if (value > 100 && value < pageY) {
        x = 1;
      } else if (value > pageY) {
        x = Math.floor(value / pageY);
        if (value / pageY - x > 0.60 && !startupDone) {
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

    const handleMessageSend = (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        sendMessageRef.current();
        setValue("");
        chatBoxRef.current.value = "";
      }
    };

    window.addEventListener("keydown", handleMessageSend)

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("keydown", handleMessageSend);
    };
  }, [scrollState, startupDone]);

  useEffect(() => {
    scrollStateRef.current = scrollState;
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

  const scrollToNextView = () => {
    let cachedScrollState = scrollStateRef.current;
    const interval = setInterval(() => {
      scrollTargetRef.current.scrollIntoView({behavior: "smooth"})
      if (scrollStateRef.current !== cachedScrollState) clearInterval(interval)
      cachedScrollState = scrollStateRef.current;
    }, 250)
  }

  return (
    <main className="scroll-smooth">
      <NavBar />

      {/* Hidden logo (placeholder) */}
      <div className="logo flex justify-center items-center h-screen flex-col">
        <div className="my-auto transition-all duration-100 opacity-0">
          <Image src="/logo.svg" alt="logo" width="400" height="400"  />
        </div>
      </div>

      {/* TEXT 1 */}
      <div className="sticky top-0 flex justify-center items-center h-screen flex-col">
        { startupDone && scrollState > messages.length && (
          <WSChatBox className="mt-32" inputValue={value} setInputValue={setValue} sendMessageRef={sendMessageRef} />
        )}
        <div className={`my-auto flex flex-row items-center bg-transparent ${(startupDone) ? "mb-10 mt-2 sm:mt-auto" : ""}`}>
          <span className={`mx-4 text-9xl transition-all duration-300 ${scrollSoonState == 1 ? "opacity-0" : "opacity-100"}`}>[</span>
          <span className={`${notoSerifSC.className} text-xl sm:text-4xl max-w-3xl w-fit mt-2 text-center transition-all duration-300 ${scrollSoonState == 1 ? "opacity-0" : "opacity-100"}`} ref={scrollTargetRef}>
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
            <DynamicTextArea className="z-10 appearance-none bg-transparent outline-none text-2xl resize-none h-fit" autoFocus placeholder="Habla con Nia..." setValue={setValue} chatBoxRef={chatBoxRef}/>
          }
            {/*<DynamicTextArea className="z-10 appearance-none bg-transparent outline-none text-2xl resize-none h-fit" autoFocus placeholder="Habla con Nia..." />*/}
          </span>
          <span className={`mx-4 text-9xl transition-all duration-300 ${scrollSoonState == 1 ? "opacity-0" : "opacity-100"}`}>]</span>
        </div>
      </div>

      { Array.from({ length: screensCount }).map((_, index) => (
          <div key={index} className="h-screen" />
        )) }

      
      { !startupDone && (
          <MDIcon icon="mdi-arrow-down" className={"mb-24 text-8xl fixed inset-x-0 bottom-1 w-screen animate-bounce flex transition-all duration-300 z-50 " + ((!isTyping || scrollState == 0) ? "opacity-100" : "opacity-0")} onClick={() => scrollToNextView()} />
        )
      }

      <div className={`fixed inset-0 flex justify-center items-center transition-all duration-300 \
                    ${scrollState >= 1 ? "opacity-0" : "opacity-100"} \
                    ${startupDone && scrollState !== 0 ? " hidden" : ""}`}>
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
