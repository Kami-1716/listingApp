import React, { useEffect, useState } from 'react'
import { Spinner } from '../components'
import { collection, doc, getDocs, limit, orderBy, query } from 'firebase/firestore'
import { db } from '../firebase/firebase'
import { toast } from 'react-toastify'
import { Navigation, Pagination, EffectFade, Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/bundle";
import { useNavigate } from 'react-router'

const Slider = () => {
  const [listings, setListings] = useState(null)
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const listingsRef = collection(db, 'listings')
        const listingsQuery = query(listingsRef, orderBy('timestamp', 'desc'), limit(5))
        const listingsSnap = await getDocs(listingsQuery)
        const listingsArray = []
        listingsSnap.forEach(listing => listingsArray.push({
          data: listing.data(),
          id: listing.id
        }))
        setListings(listingsArray)
        setLoading(false)
        console.log(listingsArray)

      } catch (error) {
        console.log(error.message)
        toast.error(error.message)
        setLoading(false)
      }

    }

    fetchListings()
  }, [])

  if (loading) return <Spinner />

  return (
    listings && (
      <>
        <Swiper
          slidesPerView={1}
          navigation
          modules={[EffectFade, Autoplay, Pagination, Navigation]}
          autoplay={{ delay: 3000 }}
          pagination={{ type: "progressbar", clickable: true }}
        >
          {listings.map(({ data, id }) => (
            <SwiperSlide
              className='cursor-pointer'
              key={id}
              onClick={() => navigate(`/category/${data.type}/${id}`)}
            >
              <div
                style={{
                  background: `url(${data.imgUrls[0]}) center, no-repeat`,
                  backgroundSize: "cover",
                }}
                className="relative w-full h-[500px] overflow-hidden"
              >
                <p className='absolute left-1 top-10 z-30 font-medium max-w-[90%] bg-red-500 text-white p-2 shadow-lg rounded-br-3xl opacity-90'>{data.fullName}</p>
                <p className='absolute left-1 bottom-10 z-30 font-medium max-w-[90%] bg-[#457b9d] text-white p-2 shadow-lg rounded-tr-3xl opacity-90'>${data.discountedPrice ?? data.regularPrice.toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                  {data.discountedPrice && <span className='line-through text-sm text-gray-300 ml-2'>${data.regularPrice.toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</span>}
                  {data.type === 'rent' && <span className='text-sm text-gray-300 ml-2'>/month</span>}
                </p>
              </div>

            </SwiperSlide>
          ))}
        </Swiper>
      </>
    )
  );
}

export default Slider