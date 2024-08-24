import { useDispatch } from "react-redux";
import { FormEvent, useState } from "react";

import FirebaseSessions from "../utils/FirebaseSessions";
import { useLocation } from "wouter";
import { BounceLoader } from "react-spinners";
import { Bounce, toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Login() {
  const dispatch = useDispatch();
  const sessions = new FirebaseSessions();
  const [, navigate] = useLocation();
  const [loader, setLoader] = useState(false);

  const handlerLogin = async (e: FormEvent) => {
    e.preventDefault();
    setLoader(true);
    const user: { [key: string]: string } = {};
    e.currentTarget.childNodes.forEach((item) => {
      if (item instanceof HTMLInputElement) {
        user[item.name] = item.value;
      }
    });

    const response = await sessions.login(user, dispatch);
    let id: Timer;
    if (response) {
      id = setTimeout(() => setLoader(false), 2000);
      if ((response as string).includes("Error")) {
        toast.error(response as string, {
          position: "top-center",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        });
      } else navigate("/users");
    }
    return () => clearTimeout(id);
  };

  return (
    <>
      <ToastContainer />
      {loader ? (
        <BounceLoader
          color="#fff"
          size={100}
          className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]"
        />
      ) : (
        <form
          onSubmit={handlerLogin}
          className="w-full h-dvh flex flex-col items-center justify-center
      [&>label]:w-full [&>label]:pl-10 [&>label]:italic
      [&>input]:rounded [&>input]:bg-inherit [&>input]:border-b-2 [&>input]:p-1 [&>input]:mb-4"
        >
          <label htmlFor="email">email:</label>
          <input name="name" type="text" required />
          <label htmlFor="password">password:</label>
          <input name="password" type="password" required />
          <button
            className="py-1 px-5 mt-3 border rounded-lg
      hover:font-bold
      hover:animate-wiggle hover:animate-once hover:animate-duration-[1000ms]"
            disabled={loader ? true : false}
          >
            login
          </button>
        </form>
      )}
    </>
  );
}
