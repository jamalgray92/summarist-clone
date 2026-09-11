// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCGM0xP3d1IOG1z6cxjyoKYPMx7qYKhmlQ",
  authDomain: "summarist-clone-cfb11.firebaseapp.com",
  projectId: "summarist-clone-cfb11",
  storageBucket: "summarist-clone-cfb11.firebasestorage.app",
  messagingSenderId: "413271552491",
  appId: "1:413271552491:web:6bbc68d12fe2de1150a9ae"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;