import { useDispatch } from "react-redux";
import { FormEvent } from "react";

import FirebaseSessions from "../utils/FirebaseSessions";

export default function Login() {
  const dispatch = useDispatch();
  const sessions = new FirebaseSessions();

  const handlerLogin = (e: FormEvent) => {
    e.preventDefault();
    const user: { [key: string]: string } = {};
    e.currentTarget.childNodes.forEach((item) => {
      if (item instanceof HTMLInputElement) {
        user[item.name] = item.value;
      }
    });
    sessions.login(user, dispatch);
  };
  return (
    <form
      onSubmit={handlerLogin}
      className="w-full h-full flex flex-col items-center justify-center [&>label]:text-center [&>input]:rounded [&>input]:bg-inherit [&>input]:border [&>input]:p-1 [&>input]:mb-4"
    >
      <label htmlFor="email">email</label>
      <input name="name" type="text" />
      <label htmlFor="password">password</label>
      <input name="password" type="password" />
      <button className="py-1 px-5 mt-3 border border-white rounded">
        login
      </button>
    </form>
  );
}
