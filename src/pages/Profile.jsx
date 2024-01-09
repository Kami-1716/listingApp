import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getAuth, signOut, updateProfile } from "firebase/auth";
import { toast } from "react-toastify";
import { FcHome } from "react-icons/fc";
import { ListingItem, Spinner } from "../components";
import { collection, deleteDoc, doc, getDocs, orderBy, query, where } from "firebase/firestore";
import { db } from "../firebase/firebase";

const Profile = () => {
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [isEditable, setIsEditable] = useState(false);
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)
  const [listings, setListings] = useState(null)

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
  const auth = getAuth();
  const updateUserData = async () => {
    try {
      const auth = getAuth();
      if (auth.currentUser.displayName === fullName) return
      if (auth.currentUser.displayName !== fullName) {
        // to update the user profile in firebase
        await updateProfile(auth.currentUser, {
          displayName: fullName
        })
        toast.success("Profile Updated Successfully")
      }

      if (auth.currentUser.email === email) return
      if (auth.currentUser.email !== email) {
        // to update the user profile in firebase
        await updateProfile(auth.currentUser, {
          email
        })
        toast.success("Profile Updated Successfully")
      }

    } catch (error) {
      toast.error(error.message)
    }
  }

  useEffect(() => {
    const fetchUserListings = async () => {
      const listingRef = collection(db, "listings");
      const listingQuery = query(
        listingRef,
        where("userRef", "==", auth.currentUser.uid),
        orderBy("timestamp", "desc")
      );
      const snapshot = await getDocs(listingQuery);
      const listingArray = [];

      snapshot.forEach(listing => {
        listingArray.push({
          id: listing.id,
          data: listing.data() // Use data() method to retrieve the document data
        });
      });
      setListings(listingArray);
      setLoading(false);
    }
    fetchUserListings()
  }, [auth.currentUser.uid])

  const onDelete = (id) => async () => {
    if(window.confirm("Are you sure you want to delete this listing?")) {
      try {
        await deleteDoc(doc(db, "listings", id))
        const newListing = listings.filter(listing => listing.id !== id)
        setListings(newListing)
        toast.success("Listing deleted successfully")
      } catch (error) {
        toast.error(error.message)
        console.log(error)
      }
    }}

  const onUpdate = (id) => () => {
    navigate(`/update-listing/${id}`)

  }
  return (
    <>
      <section className="">
        <h1 className="text-3xl font-bold text-center mt-7">My Profile</h1>

        <div className="flex justify-center flex-wrap items-center px-6 py-12 max-w-6xl mx-auto ">
          <div className="w-full md:w-[50%] ">
            <form>
              <input
                type="text"
                id="fullName"
                value={fullName}
                placeholder="Email"
                disabled={!isEditable}
                onChange={(e) => setFullName(e.target.value)}
                className={`rounded-sm px-4 w-full py-2 text-xl border border-gray-400 transition duration-200 ease-in-out focus:outline-none ${!isEditable && "bg-gray-200"}`}
              />
              <input
                type="email"
                id="email"
                value={email}
                disabled={!isEditable}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                className={`rounded-sm px-4 w-full py-2 text-xl border border-gray-400 transition duration-200 ease-in-out focus:outline-none mt-4 ${!isEditable && "bg-gray-200"}`}
              />

              <div className="flex justify-between mt-6 whitespace-nowrap text-sm sm:text-lg">
                <p>
                  Want To Change Your Name?{" "}
                  <Link className="text-red-500 hover:text-red-600"
                    onClick={() => {
                      isEditable && updateUserData()
                      setIsEditable((prev) => !prev)
                    }}
                  >
                    {isEditable ? "Update" : "Edit"}
                  </Link>
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
            <Link
              type="submit"
              to="/create-listing"
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-4 rounded mt-6 w-full flex justify-center items-center"
            >
              <FcHome
                className="mr-2 rounded-full text-2xl"
              /> Sell or Rent Your Home
            </Link>
          </div>

        </div>
      </section>

      <div className="max-w-6xl px-3 mx-auto mt-6">
      {!loading && listings.length > 0 && (
        <>
          <h2 className="text-2xl font-bold text-center">My Listings</h2>
          <ul className="sm:grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 mt-6 mb-6">
            {listings.map((listing) => (
              <ListingItem
                key={listing.id}
                id={listing.id}
                listing={listing.data}
                onDelete={onDelete(listing.id)} 
                onUpdate={onUpdate(listing.id)} />
            ))}
          </ul>
        </>
      )}
      </div>
    </>

  );
};

export default Profile;
