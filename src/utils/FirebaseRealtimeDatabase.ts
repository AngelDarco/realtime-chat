import { Database, getDatabase, onValue, ref, set } from "firebase/database";
import { Messages, SignOutUserData, UserData } from "../types";

export default class FirebaseRealtimeDatabase {
  database: Database;

  constructor() {
    this.database = getDatabase();
  }

  write(data: SignOutUserData | null, message: Messages | null) {
    if (message) {
      set(ref(this.database, `users/${message.from}/messages/${message.to}`), {
        messages: message.message,
      });
      set(ref(this.database, `users/${message.to}/messages/${message.from}`), {
        messages: message.message,
      });

      return;
    }
    if (data)
      set(ref(this.database, "users/" + data.uid), {
        username: data.name,
        uid: data.uid,
      });
  }

  read(callback: (e: UserData[]) => void) {
    const reference = ref(this.database, "/users");
    const dbData = onValue(reference, async (snapshot) => {
      const data = await snapshot.val();
      const res = Object.values(data) as UserData[];
      callback(res);
    });
    return dbData;
  }
}
