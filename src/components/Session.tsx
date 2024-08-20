import type { RootState } from "../utils/store";
import { useSelector } from "react-redux";
import Login from "./Login";
import Chat from "./Chat";

export default function Session() {
  const session = useSelector((state: RootState) => state.session.uid);

  console.log(session);

  return (
    <div className="w-[300px] h-[350px] border border-white">
      {session ? <Chat /> : <Login />}
    </div>
  );
}
