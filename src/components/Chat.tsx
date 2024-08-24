import { useDispatch } from "react-redux";
import { logout } from "../features/session/sessionSlice";
import { useEffect, useRef, useState } from "react";
export default function Home() {
  const dispatch = useDispatch();
  const handlerLogout = () => {
    dispatch(logout());
  };

  const [messages, setMessages] = useState(["done"]);
  const messageRef = useRef<HTMLInputElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);

  const handlerSendMessages = () => {
    if (!messageRef.current) return;
    const message = messageRef.current.value;
    setMessages((item) => [...item, message]);
  };

  useEffect(() => {
    if (!messagesContainerRef.current?.lastElementChild) return;
    messagesContainerRef.current.lastElementChild.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }, [messages]);

  return (
    <div className="h-[90%]">
      <div className="w-full h-full">
        <div
          ref={messagesContainerRef}
          className="w-full h-full p-2 pt-10 flex items-end flex-col overflow-y-scroll"
        >
          {messages.map((item, index) => {
            return (
              <span
                key={index}
                className="border p-[2px] px-3 m-1 rounded-md text-center"
              >
                {item}
              </span>
            );
          })}
        </div>
        <div className="w-full flex">
          <input
            ref={messageRef}
            className="w-full outline-none text-indigo-700 px-2"
            type="text"
          />
          <button onClick={handlerSendMessages} className="p-1 px-3">
            send
          </button>
        </div>
      </div>
      <button
        onClick={handlerLogout}
        className="fixed top-3 left-3 p-1 border border-white rounded"
      >
        logout
      </button>
    </div>
  );
}
