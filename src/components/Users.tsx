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

  useEffect(() => {
    const realtimeData = database.read(setUsersData);
    return () => realtimeData();
  }, []);

  const handlerLogout = () => {
    sessions.logout(dispatch);
  };

  const handlerChatroom = (uid: string) => {
    navigate("/chat");
    dispatch(uidTo(uid));
  };

  return (
    <>
      {!uid ? (
        <></>
      ) : (
        <div className="w-full h-full relative">
          <ul className="flex w-full [&>a]:px-3 [&>a]:py-1 border-b absolute top-0">
            <Link href="/" onClick={handlerLogout}>
              logout
            </Link>
            {location === "/chat" && <Link href="/users">home</Link>}
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
