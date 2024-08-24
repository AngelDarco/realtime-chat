import { useDispatch } from "react-redux";
import { FormEvent, useState } from "react";

import FirebaseSessions from "../utils/FirebaseSessions";
import FirebaseRealtimeDatabase from "../utils/FirebaseRealtimeDatabase";
import { SignOutUserData } from "../types";
import { BounceLoader } from "react-spinners";
import { useLocation } from "wouter";
import { Bounce, toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function SignUp() {
  const dispatch = useDispatch();
  const sessions = new FirebaseSessions();
  const users = new FirebaseRealtimeDatabase();
  const [, navigate] = useLocation();
  const [loader, setLoader] = useState(false);

  const handlerSignup = async (e: FormEvent) => {
    e.preventDefault();
    setLoader(true);
    const userData: { [key: string]: string } = {};
    e.currentTarget.childNodes.forEach((item) => {
      if (item instanceof HTMLInputElement) {
        userData[item.name] = item.value;
      }
    });
    const response = await sessions.signup(userData, dispatch);
    let id: Timer;
    if (typeof response === "string") {
      if (response.includes("Firebase")) {
        toast.error(response, {
          position: "top-center",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        });
        id = setTimeout(() => setLoader(false), 3000);
      } else {
        userData["uid"] = response;
        users.write(userData as SignOutUserData, null);
        setLoader(false);
        navigate("/users");
      }
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
          onSubmit={handlerSignup}
          className="w-full h-dvh flex flex-col items-center justify-center 
       [&>label]:w-full [&>label]:pl-10 
      [&>input]:rounded [&>input]:bg-inherit [&>input]:border-b-2 [&>input]:p-1 [&>input]:mb-4"
        >
          <label htmlFor="name">name:</label>
          <input name="name" type="text" required />
          <label htmlFor="email">email:</label>
          <input name="email" type="text" required />
          <label htmlFor="password">password:</label>
          <input name="password" type="password" required />
          <button
            className="
      py-1 px-5 mt-3 border rounded-lg
      hover:font-bold
      hover:animate-wiggle hover:animate-once hover:animate-duration-[1000ms]"
            disabled={loader ? true : false}
          >
            signup
          </button>
        </form>
      )}
    </>
  );
}
