import { useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import { RootState } from "../utils/store";
import FirebaseRealtimeDatabase from "../utils/FirebaseRealtimeDatabase";
export default function Home() {
  const uid = useSelector((state: RootState) => state.session.uid);
  const uidTo = useSelector((state: RootState) => state.uidTo.uid);

  const messageDB = new FirebaseRealtimeDatabase();

  const [messages, setMessages] = useState(["not done yet"]);
  const messageRef = useRef<HTMLInputElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);

  const handlerSendMessages = () => {
    if (!messageRef.current) return;
    const message = messageRef.current.value;
    setMessages((item) => [...item, message]);
    if (uid)
      messageDB.write(null, {
        message,
        from: uid,
        to: uidTo,
      });
  };

  useEffect(() => {
    if (!messagesContainerRef.current?.lastElementChild) return;
    messagesContainerRef.current.lastElementChild.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }, [messages]);

  return (
    <>
      {!uid ? (
        <></>
      ) : (
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
        </div>
      )}
    </>
  );
}
