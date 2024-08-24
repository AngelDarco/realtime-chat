import {
  Auth,
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { app } from "../utils/firebase";
import { Dispatch } from "@reduxjs/toolkit";
import {
  login as loginState,
  logout as logoutState,
} from "../features/session/sessionSlice";

type UserData = { [key: string]: string };
export default class FirebaseSessions {
  auth: Auth;

  constructor() {
    this.auth = getAuth(app);
  }

  signup(data: UserData, dispatch: Dispatch) {
    return new Promise((resolve) => {
      createUserWithEmailAndPassword(this.auth, data.email, data.password)
        .then((userCredentials) => {
          const { uid } = userCredentials.user;
          dispatch(loginState(uid));
          resolve(uid);
        })
        .catch((err) => {
          console.error(err);
          resolve(err.message);
        });
    });
  }

  login(data: UserData, dispatch: Dispatch) {
    return new Promise((resolve) => {
      signInWithEmailAndPassword(this.auth, data.name, data.password)
        .then((userCredentials) => {
          const { uid } = userCredentials.user;
          dispatch(loginState(uid));
          resolve(uid);
        })
        .catch((err) => {
          console.error(err);
          resolve(err.message);
        });
    });
  }

  logout(dispatch: Dispatch) {
    signOut(this.auth).then(() => {
      dispatch(logoutState());
    });
  }
}
