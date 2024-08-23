import { useDispatch } from "react-redux";
import { FormEvent } from "react";

import FirebaseSessions from "../utils/FirebaseSessions";
import { useLocation } from "wouter";

export default function Login() {
  const dispatch = useDispatch();
  const sessions = new FirebaseSessions();
  const [, navigate] = useLocation();

  const handlerLogin = (e: FormEvent) => {
    e.preventDefault();
    const user: { [key: string]: string } = {};
    e.currentTarget.childNodes.forEach((item) => {
      if (item instanceof HTMLInputElement) {
        user[item.name] = item.value;
      }
    });
    sessions.login(user, dispatch);
    navigate("/users");
  };

  return (
    <form
      onSubmit={handlerLogin}
      className="w-full h-full flex flex-col items-center justify-center
      [&>label]:w-full [&>label]:pl-10 [&>label]:font-bold [&>label]:italic
      [&>input]:rounded [&>input]:bg-inherit [&>input]:border-b-2 [&>input]:p-1 [&>input]:mb-4"
    >
      <label htmlFor="email">email:</label>
      <input name="name" type="text" />
      <label htmlFor="password">password:</label>
      <input name="password" type="password" />
      <button
        className="py-1 px-5 mt-3 border rounded-lg
      hover:font-bold
      hover:animate-wiggle hover:animate-once hover:animate-duration-[1000ms]
      "
      >
        login
      </button>
    </form>
  );
}
