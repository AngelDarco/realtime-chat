import { Database, getDatabase, onValue, ref, set } from "firebase/database";
import { SignOutUserData, UserData } from "../types";

export default class FirebaseRealtimeDatabase {
  database: Database;

  constructor() {
    this.database = getDatabase();
  }

  write(data: SignOutUserData) {
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
