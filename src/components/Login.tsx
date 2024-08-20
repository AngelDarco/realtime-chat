import { useDispatch } from "react-redux";
import { login } from "../features/session/sessionSlice";
import { FormEvent } from "react";

import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { app } from "../utils/firebase";
import { Dispatch } from "@reduxjs/toolkit";

export default function Login() {
  const dispatch = useDispatch();

  const handlerLogin = (e: FormEvent) => {
    e.preventDefault();
    const user: { [key: string]: string } = {};
    e.currentTarget.childNodes.forEach((item) => {
      if (item instanceof HTMLInputElement) {
        user[item.name] = item.value;
      }
    });
    loginAuth(user, dispatch);
  };
  return (
    <form
      onSubmit={handlerLogin}
      className="w-full h-full flex flex-col items-center justify-center [&>label]:text-center [&>input]:rounded [&>input]:bg-inherit [&>input]:border [&>input]:p-1 [&>input]:mb-4"
    >
      <label htmlFor="name">email</label>
      <input name="name" type="text" />
      <label htmlFor="password">password</label>
      <input name="password" type="password" />
      <button className="py-1 px-5 mt-3 border border-white rounded">
        login
      </button>
    </form>
  );
}

function loginAuth(userData: { [key: string]: string }, dispatch: Dispatch) {
  const auth = getAuth(app);

  signInWithEmailAndPassword(auth, userData.name, userData.password)
    .then((userCredentials) => {
      dispatch(login(userCredentials.user.uid));
    })
    .catch((err) => {
      console.error(err);
    });
}
