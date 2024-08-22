import {
  Database,
  getDatabase,
  onValue,
  ref,
  set,
  update,
} from "firebase/database";
import { Messages, SignOutUserData } from "../types";

export default class FirebaseRealtimeDatabase {
  database: Database;

  constructor() {
    this.database = getDatabase();
  }

  write(data: SignOutUserData | null, message: Messages | null) {
    const timestamp = Date.now().toString();
    if (message) {
      update(
        ref(this.database, `users/${message.from}/messages/${message.to}`),
        {
          [timestamp]: message.message,
        }
      );
      update(
        ref(this.database, `users/${message.to}/messages/${message.from}`),
        {
          [timestamp]: message.message,
        }
      );

      return;
    }
    if (data)
      set(ref(this.database, "users/" + data.uid), {
        username: data.name,
        uid: data.uid,
      });
  }

  read<T>(callback: (e: T[]) => void, url?: string | null) {
    const reference = ref(this.database, !url ? "/users" : "/users/" + url);
    const dbData = onValue(reference, (snapshot) => {
      const data = snapshot.val();
      if (url) {
        const res = Object.values(data) as T[];
        callback(res);
      } else {
        const res = Object.values(data) as T[];
        callback(res);
      }
    });
    return dbData;
  }
}
