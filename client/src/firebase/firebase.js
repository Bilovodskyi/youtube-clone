import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyAcC2ZyD2Rc-Svo2kMvS3J6EJbVtT52RBg",
    authDomain: "youclone-1cddc.firebaseapp.com",
    projectId: "youclone-1cddc",
    storageBucket: "youclone-1cddc.appspot.com",
    messagingSenderId: "839202559158",
    appId: "1:839202559158:web:4c9c67e79be06f1ece8217",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const provider = new GoogleAuthProvider();

export default app;
