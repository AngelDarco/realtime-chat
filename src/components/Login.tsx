import { useDispatch } from "react-redux";
import { login } from "../features/session/sessionSlice";
import { v4 as uuid } from "uuid";
import { FormEvent } from "react";
export default function Login() {
  const dispatch = useDispatch();
  const handlerLogin = (e: FormEvent) => {
    e.preventDefault();
    const uid = uuid();
    dispatch(login(uid));
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
