import { useDispatch, useSelector } from "react-redux";
import FirebaseRealtimeDatabase from "../utils/FirebaseRealtimeDatabase";
import FirebaseSessions from "../utils/FirebaseSessions";
import { Link, Route, useLocation } from "wouter";
import { useEffect, useState } from "react";
import { UserData } from "../types";
import Chat from "./Chat";
import { RootState } from "../utils/store";

import { uidTo } from "../features/uids/uuidToSlice";
import { BounceLoader } from "react-spinners";

export default function Users() {
  const database = new FirebaseRealtimeDatabase();
  const sessions = new FirebaseSessions();
  const dispatch = useDispatch();

  const uid = useSelector((state: RootState) => state.session.uid);

  const [location, navigate] = useLocation();
  const [loader, setLoader] = useState(false);
  const [usersData, setUsersData] = useState<UserData[]>();

  // navigate to home if the uid is not found
  useEffect(() => {
    if (!uid) navigate("/");
  }, [uid, location]);

  // get the register users from the database
  useEffect(() => {
    setLoader(true);
    const realtimeData = database.read(setUsersData, null);
    return () => realtimeData();
  }, []);

  useEffect(() => {
    if (usersData) setLoader(false);
  }, [usersData]);

  // logout and clean the uid
  const handlerLogout = () => {
    sessions.logout(dispatch);
    navigate("/");
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
        <div className="w-full h-dvh pt-12 relative flex flex-col">
          <ul
            className="glass absolute top-0 flex w-full px-4 py-2 border-b gap-2 border-none
          [&>a]:border-b-2 [&>a]:rounded-2xl hover:[&>a]:rounded-2xl
          hover:[&>a]:font-serif
          [&>a]:py-1 [&>a]:px-3 hover:[&>a]:glass hover:[&>a]:animate-wiggle hover:[&>a]:animate-duration-[500ms]"
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
          {loader ? (
            <BounceLoader
              color="#fff"
              size={100}
              className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]"
            />
          ) : (
            <>
              <div className={`${location !== "/users" ? "hidden" : ""} pt-5`}>
                <h1 className="text-3xl font-bold text-center">Users</h1>
                <h2 className="text-sm font-bold px-8">start a new chat</h2>
              </div>
              <div
                className={`${location !== "/users" ? "hidden" : "flex"} 
            w-full h-dvh flex-col justify-center items-center p-3 overflow-y-scroll no-scrollbar `}
              >
                {usersData &&
                  usersData.map((item, index) => {
                    return (
                      <div
                        key={index}
                        onClick={() => handlerChatroom(item.uid)}
                        className="glass w-full h-24 my-2 flex items-center justify-center flex-col rounded cursor-pointer"
                      >
                        <img
                          className="w-12 h-12 rounded-full"
                          src={`${
                            item.image
                              ? item.image
                              : "https://cdn-icons-png.flaticon.com/512/149/149071.png"
                          }`}
                          alt={`${item.username}-icon`}
                        />
                        <span className="px-4 m-1">{item.username}</span>
                      </div>
                    );
                  })}
              </div>
              <Route path={"/chat"} component={Chat} />
            </>
          )}
        </div>
      )}
    </>
  );
}
