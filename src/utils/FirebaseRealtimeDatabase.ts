import {
  Database,
  getDatabase,
  onValue,
  push,
  ref,
  set,
} from "firebase/database";
import { MessagesStored, SignOutUserData } from "../types";

export default class FirebaseRealtimeDatabase {
  database: Database;

  constructor() {
    this.database = getDatabase();
  }

  write(data: SignOutUserData | null, message: MessagesStored | null) {
    const timestamp = Date.now().toString();
    if (message) {
      // my messages store
      push(ref(this.database, `users/${message.from}/messages/${message.to}`), {
        message: message.message,
        timestamp,
        uid: message.from,
      });
      // friend message store
      push(ref(this.database, `users/${message.to}/messages/${message.from}`), {
        message: message.message,
        timestamp,
        uid: message.from,
      });

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
      const res = Object.values(data) as T[];
      callback(res);
      // }
    });
    return dbData;
  }
}
