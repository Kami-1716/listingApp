import React, {useState} from 'react'
import { Link, useNavigate } from "react-router-dom";
import GoogleAuth from "../components/GoogleAuth";
import {getAuth, createUserWithEmailAndPassword, updateProfile} from "firebase/auth";
import { db } from '../firebase/firebase';
import { doc, serverTimestamp, setDoc } from 'firebase/firestore';
import { toast } from 'react-toastify';

const SignUp = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });
  const {fullName, email, password } = formData
  const navigate = useNavigate()

  const  signUpFormHandler = async (e) => {
    e.preventDefault();
    try {
      const auth = getAuth();
      const userCredential =  await createUserWithEmailAndPassword(auth, email, password)
      await updateProfile(auth.currentUser, {displayName: fullName})
      const user = userCredential.user;
      const formDataCopy = {...formData}
      delete formDataCopy.password
      formDataCopy.timestamp = serverTimestamp()
      await setDoc(doc(db, "users", user.uid), formDataCopy)
      navigate("/")
    } catch (error) {
      toast.error(error.message)
    }
  };

  return (
    <section className="">
      <h1 className="text-3xl font-bold text-center mt-7">Sign Up</h1>

      <div className="flex justify-center flex-wrap items-center px-6 py-12 max-w-6xl mx-auto ">
        <div className="md:w-[67%] lg:w-[50%] mb-12 md:mb-6">
          <img
            src="https://images.pexels.com/photos/39624/padlock-lock-chain-key-39624.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            className="w-full rounded-2xl"
            alt=""
          />
        </div>
        <div className="w-full md:w-[67%] lg:w-[40%] lg:ml-20">
          <form 
          onSubmit={signUpFormHandler}
          >
            <input
              type="text"
              id="fullName"
              value={fullName}
              onChange={(e) =>
                setFormData({ ...formData, fullName: e.target.value })
              }
              placeholder="Full Name"
              className=" rounded-sm px-4 w-full py-2 text-xl border border-gray-400 transition duration-200 ease-in-out focus:outline-none mb-4"
            />
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              placeholder="Email"
              className=" rounded-sm px-4 w-full py-2 text-xl border border-gray-400 transition duration-200 ease-in-out focus:outline-none"
            />
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              placeholder="Password"
              className="rounded-sm px-4 w-full py-2 text-xl border border-gray-400 transition duration-200 ease-in-out focus:outline-none mt-4"
            />
            <button
              className="bg-blue-500 text-white rounded-sm px-4 w-full py-2 text-xl mt-4 uppercase transition duration-200 ease-in-out hover:bg-blue-600 active:bg-blue-700 focus:outline-none"
              type="submit"
            >
              Sign Up
            </button>

            <div className="flex justify-between mt-6 whitespace-nowrap text-sm sm:text-lg">
              <p>
                Have an Account?{" "}
                <Link
                  to="/sign-in"
                  className="text-blue-500 hover:text-blue-600"
                >
                  Sign In
                </Link>
              </p>
              <p>
                {" "}
                <Link
                  to={"/forgot-password"}
                  className="text-blue-500 hover:text-blue-600"
                >
                  Forgot Password?
                </Link>
              </p>
            </div>

            {/* horizontal line with text */}
            <div class="relative flex py-5 items-center">
              <div class="flex-grow border-t border-gray-400"></div>
              <span class="flex-shrink mx-4 text-gray-800 semibo">OR</span>
              <div class="flex-grow border-t border-gray-400 font-semibold"></div>
            </div>
              
              {/* continue with google btn */}
              <GoogleAuth />
          </form>
        </div>
      </div>
    </section>
  );
};

export default SignUp