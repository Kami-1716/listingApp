import React from "react";
import { FcGoogle } from "react-icons/fc";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../firebase/firebase";

const GoogleAuth = () => {
  const naivgate = useNavigate();
  const goWithGoogle = async () => {
    try {
      const auth = getAuth();
      const provider = new GoogleAuthProvider();
      const userCredential = await signInWithPopup(auth, provider);
      const user = userCredential.user;
      // check if user is new or not
      const docRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(docRef);
      if (!docSnap.exists()) {
        const userData = {
          fullName: user.displayName,
          email: user.email,
          timestamp: user.metadata.creationTime,
        };
        await setDoc(docRef, userData);
      }
      // navigate to home page
      naivgate("/");
    } catch (error) {
      toast.error("Something went wrong!");
    }
  };

  return (
    <button
      onClick={goWithGoogle}
      type="button"
      className="flex items-center justify-center w-full px-7 py-3 text-sm sm:text-lg uppercase font-medium text-white bg-red-500 rounded-sm transition duration-200 ease-in-out hover:bg-red-600 active:bg-red-700 focus:outline-none"
    >
      <span className="bg-white rounded-full p-1 mr-2 text-2xl">
        <FcGoogle />
      </span>{" "}
      Continue With Google
    </button>
  );
};

export default GoogleAuth;
