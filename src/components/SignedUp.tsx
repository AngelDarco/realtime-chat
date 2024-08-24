import { useDispatch } from "react-redux";
import { FormEvent, useState } from "react";

import FirebaseSessions from "../utils/FirebaseSessions";
import FirebaseRealtimeDatabase from "../utils/FirebaseRealtimeDatabase";
import { SignOutUserData } from "../types";
import { BounceLoader } from "react-spinners";
import { useLocation } from "wouter";

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
    if (typeof response === "string") {
      userData["uid"] = response;
      users.write(userData as SignOutUserData, null);
      setLoader(false);
      navigate("/users");
    }
  };
  return (
    <>
      {loader ? (
        <BounceLoader
          color="#fff"
          size={100}
          className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]"
        />
      ) : (
        <form
          onSubmit={handlerSignup}
          className="w-full h-full flex flex-col items-center justify-center 
       [&>label]:w-full [&>label]:pl-10 
      [&>input]:rounded [&>input]:bg-inherit [&>input]:border-b-2 [&>input]:p-1 [&>input]:mb-4"
        >
          <label htmlFor="name">name:</label>
          <input name="name" type="text" />
          <label htmlFor="email">email:</label>
          <input name="email" type="text" />
          <label htmlFor="password">password:</label>
          <input name="password" type="password" />
          <button
            className="
      py-1 px-5 mt-3 border rounded-lg
      hover:font-bold
      hover:animate-wiggle hover:animate-once hover:animate-duration-[1000ms]"
          >
            signup
          </button>
        </form>
      )}
    </>
  );
}
