import React from 'react'
import { Link } from 'react-router-dom'
import moment from 'moment'
import { MdLocationOn } from "react-icons/md";

const ListingItem = ({ id, listing }) => {

  const date = listing.timestamp.toDate()
  return (
    <>
      <li className='bg-white flex flex-col justify-between items-center shadow-md hover:shadow-xl rounded-md overflow-hidden transition duration-200 relative m-[10px]'>
        <Link className='content' to={`/category/${listing.type}/${id}`} >
          <img className='h-[170px] w-full object-cover hover:scale-105 transition-scale duration-200 ease-in'
          loading='lazy'
          src={listing.imgUrls[0]} alt="" />
          <div className='absolute top-2 left-2 bg-[#3377cc] text-white px-2 py-1 rounded uppercase font-semibold text-xs'>{moment(date).fromNow()}</div>
          <div className='w-full p-[10px]'>
            <div className='flex items-center space-x-1'>
              <MdLocationOn className='h-4 w-4 text-green-400' />
              <p className='font-semibold text-sm mb-[2px] text-gray-600 truncate'>{listing.completeAddress}</p>
            </div>
            <p className='font-semibold mt-2 text-xl truncate'>{listing.fullName}</p>
            <p className='text-[#457b9d] font-semibold mt-2 '>${listing.offer ? listing.discountedPrice
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ',')
             : listing.regularPrice
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
            {listing.type === "rent" ? "/month" : ""}
            </p>
            <div>
              <div className='mt-[10px]'>
                <p className='text-xs font-bold'>
                  {listing.beds > 1 ? `${listing.beds} Beds` : '1 Bed'} {' '}
                  {listing.rooms > 1 ? `${listing.rooms} Rooms` : '1 Room'}
                </p>
              </div>
            </div>
          </div>
        </Link>
      </li>
    </>
  )
}

export default ListingItem