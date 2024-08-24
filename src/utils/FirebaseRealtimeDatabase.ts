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
      push(ref(this.database, `messages/${message.from}/${message.to}`), {
        message: message.message,
        timestamp,
        uid: message.from,
      });

      // friend messages store
      push(ref(this.database, `messages/${message.to}/${message.from}`), {
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

  read<T>(callback: (e: T[]) => void, messageDB: string | null) {
    const users = `users/`;
    const messages = `messages/${messageDB}`;

    const reference = ref(this.database, messageDB ? messages : users);
    const dbData = onValue(reference, (snapshot) => {
      const data = snapshot.val();
      if (!data) return;
      const res = Object.values(data) as T[];
      callback(res);
    });
    return dbData;
  }
}
