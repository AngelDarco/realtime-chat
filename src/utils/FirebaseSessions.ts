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
    createUserWithEmailAndPassword(this.auth, data.email, data.password)
      .then((userCredentials) => {
        const user = userCredentials.user;
        dispatch(loginState(user.uid));
      })
      .catch((err) => console.log(err));
  }

  login(data: UserData, dispatch: Dispatch) {
    signInWithEmailAndPassword(this.auth, data.name, data.password)
      .then((userCredentials) => {
        dispatch(loginState(userCredentials.user.uid));
      })
      .catch((err) => {
        console.error(err);
      });
  }

  logout(dispatch: Dispatch) {
    signOut(this.auth).then(() => {
      dispatch(logoutState());
    });
  }
}
