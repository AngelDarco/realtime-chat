import type { RootState } from "../utils/store";
import { useSelector } from "react-redux";
import Users from "./Users";
import { Link, Route, useLocation } from "wouter";
import Login from "./Login";
import SignUp from "./SignedUp";

export default function Home() {
  const session = useSelector((state: RootState) => state.session.uid);
  const [location, _] = useLocation();

  return (
    <div className="w-[300px] h-[350px] border border-white">
      {session ? (
        <Users />
      ) : (
        <div className="w-full h-full flex flex-col items-center justify-center bg-slate-900">
          <ul className="[&>a]:p-1 [&>a]:border-b-2 [&>a]:m-2  [&>a]:px-5 [&>a]:rounded-lg [&>a:hover]:bg-orange-400">
            <Link href="/login">Login</Link>
            <Link href="/signup">Signout</Link>
            <Link
              className={`${location === "/" ? "hidden" : "flex-initial"}`}
              href="/"
            >
              Home
            </Link>
          </ul>
          <Route path={"/login"} component={Login} />
          <Route path={"/signup"} component={SignUp} />
        </div>
      )}
    </div>
  );
}
