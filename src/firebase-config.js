import { initializeApp } from "firebase/app";
import {getFirestore} from '@firebase/firestore'


const firebaseConfig = {
  apiKey: "AIzaSyCfEw4kx6iGvVI28UaVR1B4ITsfJB6YC_Y",
  authDomain: "fir-crud-9f380.firebaseapp.com",
  projectId: "fir-crud-9f380",
  storageBucket: "fir-crud-9f380.appspot.com",
  messagingSenderId: "847794997369",
  appId: "1:847794997369:web:59b3f00ffe40eed82e2ca8"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);

