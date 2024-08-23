import { useDispatch, useSelector } from "react-redux";
import FirebaseRealtimeDatabase from "../utils/FirebaseRealtimeDatabase";
import FirebaseSessions from "../utils/FirebaseSessions";
import { Link, Route, useLocation } from "wouter";
import { useEffect, useState } from "react";
import { UserData } from "../types";
import Chat from "./Chat";
import { RootState } from "../utils/store";

import { uidTo } from "../features/uids/uuidToSlice";

export default function Users() {
  const database = new FirebaseRealtimeDatabase();
  const sessions = new FirebaseSessions();
  const dispatch = useDispatch();

  const uid = useSelector((state: RootState) => state.session.uid);

  const [location, navigate] = useLocation();
  const [usersData, setUsersData] = useState<UserData[]>();

  // get the register users from the database
  useEffect(() => {
    const realtimeData = database.read(setUsersData, null);
    return () => realtimeData();
  }, []);

  // logout and clean the uid
  const handlerLogout = () => {
    sessions.logout(dispatch);
  };

  // get the uid from the selected user, and go to the chat
  const handlerChatroom = (uid: string) => {
    navigate("/chat");
    dispatch(uidTo(uid));
  };

  // clean up the uidTo state
  const handlerCleanLinks = () => {
    dispatch(uidTo(""));
  };

  return (
    <>
      {!uid ? (
        <></>
      ) : (
        <div className="w-full h-full relative">
          <ul
            className="glass absolute top-0 flex w-full px-4 py-2 border-b 
          [&>a]:border-b-2 [&>a]:rounded-2xl [&>a]:hover:rounded-2xl
          [&>a]:hover:font-serif
          [&>a]:py-1 [&>a]:px-3 [&>a]:hover:glass [&>a]:hover:animate-wiggle [&>a]:hover:animate-duration-[500ms] "
          >
            <Link href="/" onClick={handlerLogout}>
              logout
            </Link>
            {location === "/chat" && (
              <Link onClick={handlerCleanLinks} href="/users">
                home
              </Link>
            )}
          </ul>
          <div
            className={`${
              location !== "/users" ? "hidden" : "flex"
            } w-full h-full flex-col justify-end items-end`}
          >
            {usersData &&
              usersData.map((item, index) => {
                return (
                  <span
                    key={index}
                    onClick={() => handlerChatroom(item.uid)}
                    className="px-4 py-1 m-1 border rounded-lg"
                  >
                    {item.username}
                  </span>
                );
              })}
          </div>
          <Route path={"/chat"} component={Chat} />
        </div>
      )}
    </>
  );
}
