import React, { useEffect, useState } from 'react'
import { collection, getDocs, limit, orderBy, query, startAfter, where } from 'firebase/firestore'
import { db } from '../firebase/firebase'
import { ListingItem, Spinner } from '../components'
import { Link } from 'react-router-dom'


const Offers = () => {
  // states 
  const [offersListings, setOffersListings] = useState(null)
  const [loading, setLoading] = useState(true)
  const [lastListing, setLastListing] = useState(null) // for load more

  // all offers listings
  useEffect(() => {
    const fetchOffers = async () => {
      try {
        const offerRef = collection(db, 'listings')
        const offersQuery = query(offerRef, where('offer', '==', true), orderBy('timestamp', 'desc'), limit(8))
        const offersSnapshot = await getDocs(offersQuery)
        const lastVisible = offersSnapshot.docs[offersSnapshot.docs.length - 1]
        setLastListing(lastVisible)

        const offers = []
        offersSnapshot.forEach(doc => {
          offers.push({
            id: doc.id,
            data: doc.data()
          })
        })
        setOffersListings(offers)
        setLoading(false)
      } catch (error) {
        console.log(error.message)
        setLoading(false)
      }
    }

    fetchOffers()
  }, [])

  // load more
  const loadMore = async () => {
    try {
      const offerRef = collection(db, 'listings')
      const offersQuery = query(offerRef, where('offer', '==', true), orderBy('timestamp', 'desc'), limit(4), startAfter(lastListing))
      const offersSnapshot = await getDocs(offersQuery)
      const lastVisible = offersSnapshot.docs[offersSnapshot.docs.length - 1]
      setLastListing(lastVisible)

      const offers = []
      offersSnapshot.forEach(doc => {
        offers.push({
          id: doc.id,
          data: doc.data()
        })
      })
      setOffersListings([...offersListings, ...offers])
      setLoading(false)
    } catch (error) {
      console.log(error.message)
      setLoading(false)
    }
  }

if(loading) return <Spinner/>

  return (
    <div className='max-w-6xl mx-auto px-3'>
      <h1 className='mt-6 mb-6 text-3xl font-bold text-center'>Offers</h1>
      {offersListings && offersListings.length > 0 ? (
       <main>
         <ul className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-6'>
          {offersListings.map((listing) => (
            <ListingItem key={listing.id} id={listing.id} listing={listing.data} />
          ))}
        </ul>
       </main>
       
      ):  (
        <p> No Offer is Active Yet!</p>
      )} 
        {lastListing ? (
          <div className='flex justify-center mt-6'>
             <button className='bg-blue-600 text-white px-4 py-2 rounded-md mt-6' onClick={() => loadMore()}>Load More</button>
          </div>
        ) : null}
    </div>
  )
}

export default Offers