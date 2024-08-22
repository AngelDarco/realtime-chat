import { useDispatch } from "react-redux";
import FirebaseRealtimeDatabase from "../utils/FirebaseRealtimeDatabase";
import FirebaseSessions from "../utils/FirebaseSessions";
import { Link } from "wouter";
import { useEffect, useState } from "react";
import { UserData } from "../types";
export default function Users() {
  const database = new FirebaseRealtimeDatabase();
  const sessions = new FirebaseSessions();
  const dispatch = useDispatch();

  const [usersData, setUsersData] = useState<UserData[]>();

  useEffect(() => {
    const realtimeData = database.read(setUsersData);
    return () => realtimeData();
  }, []);

  const handlerLogout = () => {
    sessions.logout(dispatch);
  };

  const handlerChatroom = () => {};

  return (
    <div className="w-full h-full">
      <Link
        className="px-3 py-1 border rounded-lg absolute top-1 left-2"
        href="/"
        onClick={handlerLogout}
      >
        logout
      </Link>
      <div className="w-full h-full flex flex-col justify-end items-end">
        {usersData &&
          usersData.map((item, index) => {
            return (
              <span
                onClick={handlerChatroom}
                key={index}
                className="px-4 py-1 m-1 border rounded-lg"
              >
                {item.username}
              </span>
            );
          })}
      </div>
    </div>
  );
}
