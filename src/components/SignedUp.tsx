import { useDispatch } from "react-redux";
import { FormEvent } from "react";

import FirebaseSessions from "../utils/FirebaseSessions";
import FirebaseRealtimeDatabase from "../utils/FirebaseRealtimeDatabase";
import { SignOutUserData } from "../types";

export default function SignUp() {
  const dispatch = useDispatch();
  const sessions = new FirebaseSessions();
  const users = new FirebaseRealtimeDatabase();

  const handlerLogin = async (e: FormEvent) => {
    e.preventDefault();
    const userData: { [key: string]: string } = {};
    e.currentTarget.childNodes.forEach((item) => {
      if (item instanceof HTMLInputElement) {
        userData[item.name] = item.value;
      }
    });
    const response = await sessions.signup(userData, dispatch);
    if (typeof response === "string") {
      userData["uid"] = response;
      users.write(userData as SignOutUserData);
    }
  };
  return (
    <form
      onSubmit={handlerLogin}
      className="w-full h-full flex flex-col items-center justify-center [&>label]:text-center [&>input]:rounded [&>input]:bg-inherit [&>input]:border [&>input]:p-1 [&>input]:mb-4"
    >
      <label htmlFor="name">name</label>
      <input name="name" type="text" />
      <label htmlFor="email">email</label>
      <input name="email" type="text" />
      <label htmlFor="password">password</label>
      <input name="password" type="password" />
      <button className="py-1 px-5 mt-3 border border-white rounded">
        login
      </button>
    </form>
  );
}
