import type { RootState } from "./store";
import { useSelector, useDispatch } from "react-redux";
import { login, logout } from "../features/session/sessionSlice";

export default function Session() {
  const dispatch = useDispatch();
  const session = useSelector((state: RootState) => state.session);

  return (
    <div className="w-[300px] h-[350px] border border-white">
      <button
        className="px-3 py-1 border border-white rounded-lg m-2"
        onClick={() => dispatch(login())}
      >
        login
      </button>
      <button
        className="px-3 py-1 border border-white rounded-lg m-2"
        onClick={() => dispatch(logout())}
      >
        logout
      </button>
    </div>
  );
}
