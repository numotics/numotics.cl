import { useState, useEffect, useRef } from "react";

export default function WSChatBox({ inputValue, setInputValue, sendMessageRef, ...props }) {
  const [messages, setMessages] = useState([{ role: "assistant", msg: "Hola, soy Nia, la asistente virtual de [nu]motics. Te puedo ayudar a solicitar un presupuesto, o resolver dudas sobre los servicios de [nu]motics. No tienes porque hablarme como si fuera un robot, puedo conversar igual que un humano!" }]);
  const ws = useRef(null);
  const lastMessageRef = useRef(null);

  const sendMessage = () => {
    if (inputValue.trim()) {
      const newMessage = { role: "user", msg: inputValue };
      setMessages(prevMessages => [...prevMessages, newMessage]);
      // Clear input
      setInputValue("");
      // scroll to bottom
    }
  };

  // Keep a reference to the latest `sendMessage` function
  sendMessageRef.current = sendMessage;

  // Connect to websocket and set up Enter key event listener
  useEffect(() => {

    ws.current = new WebSocket("wss://quotachat.numotics.cl/ws");
    ws.current.onopen = () => {
      console.log("connected");
    };
    ws.current.onmessage = (e) => {
      setMessages(prevMessages => [...prevMessages, { role: "assistant", msg: e.data }]);
    };

    lastMessageRef.current.scrollIntoView({behavior: "smooth"})

    return () => {
      ws.current.close();
    };
  }, []);

  // Send message over websocket when user messages are added
  useEffect(() => {
    const lastMessage = messages[messages.length - 1];
    if (lastMessage && lastMessage.role === "user") {
      ws.current.send(lastMessage.msg);
    }
    lastMessageRef.current.scrollIntoView({behavior: "smooth"})
  }, [messages]);

  return (
    <div {...props} className={`${props.className} 2xl:w-5/12 2xl:mx-40 lg:w-3/4 mx-0 sm:mx-12 w-screen sm:w-5/6 md:text-2xl sm:text-xl text-base overflow-y-scroll scrollbar-hide`}>
      <div className="chatbox">
        {messages && messages.map((message, index) => (
          <div key={index} ref={index == messages.length-1 ? lastMessageRef : null} className={`message font-extrabold w-fit my-3 ${message.role === "assistant" ? "ml-8 mr-auto pr-8 text-left" : "mr-8 ml-auto pl-8 text-right"}`}>
            {message.role === "assistant" ? "> " : ""}{message.msg} {message.role === "user" ? " <" : ""}
          </div>
        ))}
      </div>
    </div>
  )
}
