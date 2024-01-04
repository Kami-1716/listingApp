import React, { useState } from "react";
import { Link } from "react-router-dom";
import GoogleAuth from "../components/GoogleAuth";


const ForgotPassword = () => {
  const [email, setEmail] = useState("");

  return (
    <section className="">
      <h1 className="text-3xl font-bold text-center mt-7">Forgot Password</h1>

      <div className="flex justify-center flex-wrap items-center px-6 py-12 max-w-6xl mx-auto ">
        <div className="md:w-[67%] lg:w-[50%] mb-12 md:mb-6">
          <img
            src="https://images.pexels.com/photos/39624/padlock-lock-chain-key-39624.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            className="w-full rounded-2xl"
            alt=""
          />
        </div>
        <div className="w-full md:w-[67%] lg:w-[40%] lg:ml-20">
          <form className="">
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
              placeholder="Email"
              className=" rounded-sm px-4 w-full py-2 text-xl border border-gray-400 transition duration-200 ease-in-out focus:outline-none"
            />
            
            <button
              className="bg-blue-500 text-white rounded-sm px-4 w-full py-2 text-xl mt-4 uppercase transition duration-200 ease-in-out hover:bg-blue-600 active:bg-blue-700 focus:outline-none"
              type="submit"
            >
              Reset Password
            </button>

            <div className="flex justify-between mt-6 whitespace-nowrap text-sm sm:text-lg">
              <p>
                Don't have an Account?{" "}
                <Link
                  to="/sign-up"
                  className="text-blue-500 hover:text-blue-600"
                >
                  Sign Up
                </Link>
              </p>
              <p>
                {" "}
                <Link
                  to={"/sign-in"}
                  className="text-blue-500 hover:text-blue-600"
                >
                  Sign In Instead 
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

export default ForgotPassword;
