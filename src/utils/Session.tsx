import type { RootState } from "./store";
import { useSelector } from "react-redux";
import Login from "../components/Login";
import Chat from "../components/Chat";

export default function Session() {
  const session = useSelector((state: RootState) => state.session.uid);

  console.log(session);

  return (
    <div className="w-[300px] h-[350px] border border-white">
      {session ? <Chat /> : <Login />}
    </div>
  );
}
