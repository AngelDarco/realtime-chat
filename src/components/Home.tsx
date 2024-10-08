import type { RootState } from "../utils/store";
import { useSelector } from "react-redux";
import { Link, Route, useLocation } from "wouter";
import Login from "./Login";
import SignUp from "./SignedUp";
import { useEffect } from "react";
import Users from "./Users";
export default function Home() {
  const uid = useSelector((state: RootState) => state.session.uid);
  const [location, navigate] = useLocation();

  useEffect(() => {
    if (uid && location === "/") navigate("/users");
    else if (!uid && location !== "/login" && location !== "/signup")
      navigate("/");
  }, [uid, location]);

  return (
    <div className="App min-w-96 w-full gradient">
      {!uid ? (
        <div className="w-full h-dvh relative">
          <ul
            className={`${
              location !== "/"
                ? "glass flex absolute [&>a]:text-xs"
                : "flex-col h-dvh [&>a]:text-sm"
            }
            w-full flex items-center justify-center [&>a]:p-1 [&>a]:border-b-[1px] [&>a]:font-bold [&>a]:m-2  [&>a]:px-5 [&>a]:rounded-md 
            [&>a:hover]:animate-jump [&>a:hover]:animate-once [&>a:hover]:animate-duration-[1000ms]
            `}
          >
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
      ) : (
        <Users />
      )}
    </div>
  );
}
