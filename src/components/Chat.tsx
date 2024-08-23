import { useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import { RootState } from "../utils/store";
import FirebaseRealtimeDatabase from "../utils/FirebaseRealtimeDatabase";
import { useLocation } from "wouter";
import { MessageRetrieve } from "../types";
export default function Home() {
  const uid = useSelector((state: RootState) => state.session.uid);
  const uidTo = useSelector((state: RootState) => state.uidTo.uid);
  const [, navigate] = useLocation();

  const messageDB = new FirebaseRealtimeDatabase();

  const [messages, setMessages] = useState<MessageRetrieve[]>();
  const messageRef = useRef<HTMLInputElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);

  // get database messages
  useEffect(() => {
    const getMessages = messageDB.read(setMessages, `${uid}/${uidTo}`);
    return () => getMessages();
  }, []);

  // activate the enter key to send messages
  useEffect(() => {
    if (!messageRef.current || messageRef.current.value.trim() === "") return;

    messageRef.current.addEventListener("keyup", (e: KeyboardEvent) => {
      if (e.key === "Enter") {
        handlerSendMessages();
      }
    });
    return () => messageRef.current?.removeEventListener("keyup", () => {});
  }, []);

  // send the messages
  const handlerSendMessages = () => {
    if (!messageRef.current) return;
    const message = messageRef.current.value;
    if (message.trim() === "") return;

    // write messages in the database
    if (uid)
      messageDB.write(null, {
        message,
        from: uid,
        to: uidTo,
      });

    // clear input
    messageRef.current.value = "";
  };

  // scroll to the last message
  useEffect(() => {
    if (!uid || !uidTo) navigate("/users");
    if (!messagesContainerRef.current?.lastElementChild) return;
    messagesContainerRef.current.lastElementChild.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }, [messages]);

  return (
    <>
      {!uid || !uidTo ? (
        <></>
      ) : (
        <div className="h-[90%]">
          <div className="w-full h-full">
            <div
              ref={messagesContainerRef}
              className="w-full h-full p-2 pt-10 flex items-end flex-col overflow-y-scroll"
            >
              {messages &&
                messages.map((item, index) => {
                  return (
                    <div
                      key={index}
                      className={`w-full flex items-center ${
                        item.uid === uid ? " justify-end" : " justify-start"
                      }
                    `}
                    >
                      <span
                        className={`border p-[2px] px-3 m-1 rounded-md text-center`}
                      >
                        {item.message}
                      </span>
                    </div>
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
