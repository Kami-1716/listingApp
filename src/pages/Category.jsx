import { collection, getDocs, limit, orderBy, query, startAfter, where } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { db } from '../firebase/firebase'
import { ListingItem, Spinner } from '../components'

const Category = () => {

  const { categoryName } = useParams()
  const [categoryListings, setCategoryListings] = useState(null)
  const [loading, setLoading] = useState(true)
  const [lastListing, setLastListing] = useState(null) // for load more

  useEffect(() => {
    const fetchCategoryListings = async () => {
      try {
         const categoryRef = collection(db, 'listings')
          const categoryQuery = query(categoryRef, where('type', '==', `${categoryName}`), orderBy('timestamp', 'desc'), limit(8))
          const categorySnapshot = await getDocs(categoryQuery) 
          const lastVisible = categorySnapshot.docs[categorySnapshot.docs.length - 1]
          setLastListing(lastVisible)

          const categoryListings = []
          categorySnapshot.forEach(doc => {
            categoryListings.push({
              id: doc.id,
              data: doc.data()
            })
          })
          setCategoryListings(categoryListings)
          setLoading(false)
      } catch (error) {
        console.log(error.message)
        setLoading(false)
      }
    }

    fetchCategoryListings()
  }, [categoryName])

   // load more
   const loadMore = async () => {
    try {
      const categoryRef = collection(db, 'listings')
      const categoryQuery = query(categoryRef, where('type', '==', `${categoryName}`), orderBy('timestamp', 'desc'), limit(4), startAfter(lastListing))
      const categorySnapshot = await getDocs(categoryQuery)
      const lastVisible = categorySnapshot.docs[categorySnapshot.docs.length - 1]
      setLastListing(lastVisible)

      const category = []
      categorySnapshot.forEach(doc => {
        category.push({
          id: doc.id,
          data: doc.data()
        })
      })
      setCategoryListings([...categoryListings, ...category])
      setLoading(false)
    } catch (error) {
      console.log(error.message)
      setLoading(false)
    }
  }

  return (
    <div className='max-w-6xl mx-auto px-3'>
      <h1 className='mt-6 mb-6 text-3xl font-bold text-center capitalize'>{categoryName}</h1>
      {loading ? <Spinner/> : null}
      {categoryListings && categoryListings.length > 0 ? (
       <main>
         <ul className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-6'>
          {categoryListings.map((listing) => (
            <ListingItem key={listing.id} id={listing.id} listing={listing.data} />
          ))}
        </ul>
       </main>
       
      ):  (
        <p>No Listing is Active</p>
      )} 
        {lastListing ? (
          <div className='flex justify-center mt-6 mb-6'>
             <button className='bg-blue-600 text-white px-4 py-2 rounded-md mt-6' onClick={() => loadMore()}>Load More</button>
          </div>
        ) : null}
    </div>
  )
}

export default Category