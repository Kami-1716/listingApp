import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";
import { toast } from "react-toastify";

const Profile = () => {
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [isEditable, setIsEditable] = useState(false);
  const navigate = useNavigate()

  useEffect(() => {
    const auth = getAuth();
    const user = auth.currentUser;

    if (user) {
      setEmail(user.email);
      setFullName(user.displayName);
    } else {
      toast.error("No User Found");
    }
  }, []);

  const signOutHandler = async () => {
    try {
      const auth = getAuth();
      await signOut(auth);
      toast.success("Sign Out Successfully");
      navigate("/")
    } catch (error) {
      toast.error(error.message);
    }

  }

  return (
    <section className="">
      <h1 className="text-3xl font-bold text-center mt-7">My Profile</h1>

      <div className="flex justify-center flex-wrap items-center px-6 py-12 max-w-6xl mx-auto ">
        <div className="w-full md:w-[67%] lg:w-[40%] ">
          <form>
            <input
              type="text"
              id="fullName"
              value={fullName}
              placeholder="Email"
              disabled
              className=" rounded-sm px-4 w-full py-2 text-xl border border-gray-400 transition duration-200 ease-in-out focus:outline-none"
            />
            <input
              type="email"
              id="email"
              value={email}
              disabled
              placeholder="Email"
              className="rounded-sm px-4 w-full py-2 text-xl border border-gray-400 transition duration-200 ease-in-out focus:outline-none mt-4"
            />

            <div className="flex justify-between mt-6 whitespace-nowrap text-sm sm:text-lg">
              <p>
                Want To Change Your Name?{" "}
                <Link className="text-red-500 hover:text-red-600">Edit</Link>
              </p>
              <p>
                {" "}
                <Link className="text-blue-500 hover:text-blue-600"
                onClick={signOutHandler}
                >
                  Sign Out
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Profile;
