import React, { useState } from 'react'

const CreateListing = () => {
  const [formData, setFormData] = useState({
    type: 'sell',
    fullName: '',
    beds: 0,
    rooms: 0,
    parkingSpot: true,
    furnished: true,
    completeAddress: '',
    description: '',
    offer: true,
    regularPrice: 0,
    discountedPrice: 0

  })

  const { type, fullName, beds, rooms, parkingSpot, furnished, completeAddress, description, offer, regularPrice, discountedPrice } = formData

  const [isOffer, setIsOffer] = useState(true)
  return (
    <main className='max-w-md  px-3 mx-auto'>
      <h1 className='text-3xl font-bold text-center mt-6'>Create New Listing</h1>

      <form className="">
        <p className='text-lg font-semibold mt-6'>Sell / Rent</p>
        <div className='flex justify-between'>
          <button
            type='button'
            className={`px-16 py-2 mt-2 text-lg font-semibold text-center ${type === 'sell' ? 'text-white bg-gray-800 rounded hover:bg-gray-700' : 'text-gray-800 bg-white border border-gray-800 rounded hover:bg-gray-100'}`}
            value={"sell"}
            id='sell'
            onClick={(e) => setFormData({ ...formData, type: "sell" })}
          >
            Sell
          </button>
          <button
            type='button'
            className={`px-16 py-2 mt-2 text-lg font-semibold text-center ${type === 'rent' ? 'text-white bg-gray-800 rounded hover:bg-gray-700' : 'text-gray-800 bg-white border border-gray-800 rounded hover:bg-gray-100'}`}
            value={"sell"}
            id='rent'
            onClick={(e) => setFormData({ ...formData, type: "rent" })}
          >
            Rent
          </button>
        </div>
        <p className='text-lg font-semibold mt-6'>Full Name</p>
        <input
          type='text'
          id='fullName'
          placeholder='Full Name'
          required
          minLength={10}
          maxLength={30}
          value={fullName}
          onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
          className='w-full px-4 py-2 mt-2 text-lg border border-gray-400 rounded-sm focus:outline-none' />

        <div className='flex justify-between'>
          <div>
            <p className='text-lg font-semibold mt-6'>Beds</p>
            <input
              type='number'
              id='beds'
              value={beds}
              onChange={(e) => setFormData({ ...formData, beds: e.target.value })}
              className='w-24 px-4 py-2 mt-2 text-lg border border-gray-400 rounded-sm focus:outline-none' />
          </div>
          <div>
            <p className='text-lg font-semibold mt-6'>Rooms</p>
            <input
              type='number'
              id='rooms'
              value={rooms}
              onChange={(e) => setFormData({ ...formData, rooms: e.target.value })}
              className='w-24 px-4 py-2 mt-2 text-lg border border-gray-400 rounded-sm focus:outline-none' />
          </div>
        </div>
        <div>
          <p className='text-lg font-semibold mt-6'>Parking Spot</p>
          <div className='flex justify-between'>
            <button
              type='button'
              className={`px-16 py-2 mt-2 text-lg font-semibold text-center ${parkingSpot ? 'text-white bg-gray-800 rounded hover:bg-gray-700' : 'text-gray-800 bg-white border border-gray-800 rounded hover:bg-gray-100'}`}
              value={parkingSpot}
              id='sell'
              onClick={(e) => setFormData({ ...formData, parkingSpot: true })}
            >
              Yes
            </button>

            <button
              type='button'
              className={`px-16 py-2 mt-2 text-lg font-semibold text-center ${!parkingSpot ? 'text-white bg-gray-800 rounded hover:bg-gray-700' : 'text-gray-800 bg-white border border-gray-800 rounded hover:bg-gray-100'}`}
              value={parkingSpot}
              id='sell'
              onClick={(e) => setFormData({ ...formData, parkingSpot: false })}
            >
              No
            </button>

          </div>
        </div>
        <div>
          <p className='text-lg font-semibold mt-6'>Furnished</p>
          <div className='flex justify-between'>
            <button
              type='button'
              className={`px-16 py-2 mt-2 text-lg font-semibold text-center ${furnished ? 'text-white bg-gray-800 rounded hover:bg-gray-700' : 'text-gray-800 bg-white border border-gray-800 rounded hover:bg-gray-100'}`}
              value={"sell"}
              id='sell'
              onClick={(e) => setFormData({ ...formData, furnished: true })}
            >
              Yes
            </button>

            <button
              type='button'
              className={`px-16 py-2 mt-2 text-lg font-semibold text-center ${!furnished ? 'text-white bg-gray-800 rounded hover:bg-gray-700' : 'text-gray-800 bg-white border border-gray-800 rounded hover:bg-gray-100'}`}
              value={"sell"}
              id='sell'
              onClick={(e) => setFormData({ ...formData, furnished: false })}
            >
              No
            </button>
          </div>
        </div>
        <div>
          <p className='text-lg font-semibold mt-6'>Address</p>
          <textarea
            type='text'
            id='completeAddress'
            placeholder='Address'
            required
            minLength={10}
            maxLength={150}
            value={completeAddress}
            onChange={(e) => setFormData({ ...formData, completeAddress: e.target.value })}
            className='w-full px-4 py-2 mt-2 text-lg border border-gray-400 rounded-sm focus:outline-none' />
        </div>
        <div>
          <p className='text-lg font-semibold mt-6'>Description</p>
          <textarea
            type='text'
            id='description'
            placeholder='Description'
            rows={5}
            required
            minLength={10}
            value={description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className='w-full px-4 py-2 mt-2 text-lg border border-gray-400 rounded-sm focus:outline-none' />
        </div>
        <div>
          <p className='text-lg font-semibold mt-6'>Offer</p>
          <div className='flex justify-between'>
            <button
              type='button'
              className={`px-16 py-2 mt-2 text-lg font-semibold text-center ${offer ? 'text-white bg-gray-800 rounded hover:bg-gray-700' : 'text-gray-800 bg-white border border-gray-800 rounded hover:bg-gray-100'}`}
              value={offer}
              id='offer'
              onClick={(e) => {
                setFormData({ ...formData, offer: true })
                setIsOffer(true)
              }}
            >
              Yes
            </button>

            <button
              type='button'
              className={`px-16 py-2 mt-2 text-lg font-semibold text-center ${!offer ? 'text-white bg-gray-800 rounded hover:bg-gray-700' : 'text-gray-800 bg-white border border-gray-800 rounded hover:bg-gray-100'}`}
              value={offer}
              id='offer'
              onClick={(e) => {
                setFormData({ ...formData, offer: false })
                setIsOffer(false)
              }}
            >
              No
            </button>
          </div>
        </div>
        <div>
          <p className='text-lg font-semibold mt-6'>Regular Price</p>
          <div className='flex items-center space-x-2'>
            <input
              type='number'
              id='regularPrice'
              value={regularPrice}
              required
              onChange={(e) => setFormData({ ...formData, regularPrice: e.target.value })}
              className={`w-48 px-4 py-2 mt-2 text-lg border border-gray-400 rounded-sm focus:outline-none `} />
            {
              type === 'sell' ? <p>$US</p> : <p>$US / month</p>
            }
          </div>
        </div>
        <div className={`${isOffer ? `block`: `hidden`}`}>
          <p className='text-lg font-semibold mt-6'>Discounted Price</p>
          <div className='flex items-center space-x-2'>
            <input
              type='number'
              id='discountedPrice'
              value={discountedPrice}
              disabled={!isOffer}
              onChange={(e) => setFormData({ ...formData, discountedPrice: e.target.value })}
              className={`w-48 px-4 py-2 mt-2 text-lg border border-gray-400 rounded-sm focus:outline-none ${isOffer ?`bg-white` : `bg-gray-300`}`} />
            {type === 'sell' ? <p>$US</p> : <p>$US / month</p>}
          </div>
        </div>
        <div>
          <p className='text-lg font-semibold mt-6'>Uploas Images</p>
          <p className='text-sm font-semibold text-slate-600'>The first image will be the cover image (max: 6)</p>
          <input
            type='file'
            id='images'
            multiple
            required
            accept='image/*'
            className='w-full px-4 py-2 mt-2 text-lg bg-white border border-gray-400 rounded-sm focus:outline-none' />
        </div>
        <button
          type='submit'
          className='w-full px-4 py-3 mt-6 mb-6 text-lg font-semibold text-white bg-blue-700 rounded hover:bg-blue-600 transition ease-in-out duration-200'>Submit Listing</button>
      </form>
    </main>
  )
}

export default CreateListing