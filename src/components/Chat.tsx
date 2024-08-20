import { useDispatch } from "react-redux";
import { logout } from "../features/session/sessionSlice";
export default function Home() {
  const dispatch = useDispatch();
  const handlerLogout = () => {
    dispatch(logout());
  };
  return (
    <div>
      <button
        onClick={handlerLogout}
        className="p-1 px-5 border border-white rounded"
      >
        logout
      </button>
    </div>
  );
}
