import { Database, getDatabase, onValue, ref, set } from "firebase/database";
import { SignOutUserData } from "../types";

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

  read() {
    const reference = ref(this.database, "/users");
    onValue(reference, (snapshot) => {
      const data = snapshot.val();
      console.log(data);
    });
  }
}
