import React, { useEffect, useState } from 'react'
import { ListingItem, Slider } from '../components'
import { collection, getDocs, limit, orderBy, query, where } from 'firebase/firestore'
import { db } from '../firebase/firebase'
import { Link } from 'react-router-dom'


const Home = () => {

  // for offers
  const [offersListings, setOffersListings] = useState(null)
  const [rentListings, setRentListings] = useState(null)
  const [sellListings, setSellListings] = useState(null)

  useEffect(() => {
    const fetchOfferListings = async () => {
      try {
        const listingRef = collection(db, 'listings')
        const offersQuery = query(listingRef,  where('offer', '==', true), orderBy('timestamp', 'desc'), limit(4))
        const offersSnapshot = await getDocs(offersQuery)
        const listings = []
        offersSnapshot.forEach(doc => {
          listings.push({
            id: doc.id,
            data: doc.data()
          })
        })
        setOffersListings(listings)
      } catch (error) {
        console.log(error)        
      }
    }

    fetchOfferListings()
  }, [])

  // place for rent
  useEffect(() => {
    const fetchRentListings = async () => {
      try {
        const listingRef = collection(db, 'listings')
        const rentQuery = query(listingRef,  where('type', '==', 'rent'), orderBy('timestamp', 'desc'), limit(4))
        const rentSnapshot = await getDocs(rentQuery)
        const listings = []
        rentSnapshot.forEach(doc => {
          listings.push({
            id: doc.id,
            data: doc.data()
          })
        })
        setRentListings(listings)
        console.log(listings)
      } catch (error) {
        console.log(error)        
      }
    }

    fetchRentListings()
  }, [])

  // places for sale
  useEffect(() => {
    const fetchSaleListings = async () => {
      try {
        const listingRef = collection(db, 'listings')
        const sellQuery = query(listingRef,  where('type', '==', 'sell'), orderBy('timestamp', 'desc'), limit(4))
        const sellSnapshot = await getDocs(sellQuery)
        const listings = []
        sellSnapshot.forEach(doc => {
          listings.push({
            id: doc.id,
            data: doc.data()
          })
        })
        setSellListings(listings)
        console.log(listings)
      } catch (error) {
        console.log(error)        
      }
    }

    fetchSaleListings()
  }, [])
  
  return (
    <div>
      <Slider />
      <div className='max-w-6xl mx-auto pt-4 space-y-6 mb-6'>
        {/* for offer listings */}
        {offersListings && offersListings.length > 0 && (
          <div className='m-2 mb-6'>
            <h2 className='text2xl font-semibold px-3 mt-6'>Recent Offers</h2>
            <Link to={'/offers'}>
              <p className='px-3 text-sm text-blue-600 hover:text-blue-800 transition duration-150 ease-in-out'>Show more offers</p>
            </Link>
            <ul className='sm:grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
              {offersListings.map((listing) => (
                <ListingItem key={listing.id} id={listing.id} listing={listing.data} />
              ))}
            </ul>
          </div>
        )}

        {/* for rent listings */}
        {rentListings && rentListings.length > 0 && (
          <div className='m-2 mb-6'>
            <h2 className='text2xl font-semibold px-3 mt-6'>Places for Rent</h2>
            <Link to={'/category/rent'}>
              <p className='px-3 text-sm text-blue-600 hover:text-blue-800 transition duration-150 ease-in-out'>Show more places</p>
            </Link>
            <ul className='sm:grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
              {rentListings.map((listing) => (
                <ListingItem key={listing.id} id={listing.id} listing={listing.data} />
              ))}
            </ul>
          </div>
        )}

        {/* for sell listings */}
        {sellListings && sellListings.length > 0 && (
          <div className='m-2 mb-6'>
            <h2 className='text2xl font-semibold px-3 mt-6'>Places for Sell</h2>
            <Link to={'/category/sell'}>
              <p className='px-3 text-sm text-blue-600 hover:text-blue-800 transition duration-150 ease-in-out'>Show more places</p>
            </Link>
            <ul className='sm:grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
              {sellListings.map((listing) => (
                <ListingItem key={listing.id} id={listing.id} listing={listing.data} />
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  )
}

export default Home