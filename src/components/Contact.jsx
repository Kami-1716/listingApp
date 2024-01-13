import { doc, getDoc } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { db } from '../firebase/firebase'
import { toast } from 'react-toastify'

const Contact = ({ listing, userRef, setContactSeller }) => {
  const [sellerInfo, setSellerInfo] = useState(null)
  const [buyerInfo, setBuyerInfo] = useState({
    name: "",
    email: "",
    phone: "",
    message: ""
  })
  const { name, email, phone, message } = buyerInfo
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userRef = doc(db, "users", listing.userRef)
        const userDoc = await getDoc(userRef)
        if (userDoc.exists()) {
          setSellerInfo(userDoc.data())
        }
      } catch (error) {
        console.log(error.message)
        toast.error(error.message)
      }
    }

    fetchUser()
  }, [])

  return (
    <>
      <div className="flex flex-col space-y-4 mt-4 mb-6">
        <p>Contact {sellerInfo?.fullName} for {listing?.fullName}</p>
        <input type="text" placeholder="Name" className="rounded-sm px-4 w-full py-2 text-xl border border-gray-400 transition duration-200 ease-in-out focus:outline-none mt-4"
        id='name'
        value={name}
        onChange={(e) => setBuyerInfo({...buyerInfo, name: e.target.value})}
        />
        <input type="text" placeholder="Email" className="rounded-sm px-4 w-full py-2 text-xl border border-gray-400 transition duration-200 ease-in-out focus:outline-none mt-4" 
        id='email'
        value={email}
        onChange={(e) => setBuyerInfo({...buyerInfo, email: e.target.value})}
        />
        <input type="text" placeholder="Phone" className="rounded-sm px-4 w-full py-2 text-xl border border-gray-400 transition duration-200 ease-in-out focus:outline-none mt-4" 
        id='phone'
        value={phone}
        onChange={(e) => setBuyerInfo({...buyerInfo, phone: e.target.value})}
        />
        <textarea type="text" placeholder="Message" className="rounded-sm px-4 w-full py-2 text-xl border border-gray-400 transition duration-200 ease-in-out focus:outline-none mt-4"
        id='message'
        value={message}
        onChange={(e) => setBuyerInfo({...buyerInfo, message: e.target.value})}
        />
        <a href={`mailto:${sellerInfo?.email}?subject=Interested in ${listing?.fullName}&body=${message}`}>
            <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-4 rounded mt-6 w-full flex justify-center items-center"
            >
              Send Message
            </button>
        </a>
      </div>
    </>
  )
}

export default Contact