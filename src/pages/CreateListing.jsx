import React, { useState } from 'react'

const CreateListing = () => {
  const [formData, setFormData] = useState({
    type: 'sell',
    fullName: '', 
    beds: 0,
    rooms: 0,
    parkingSpot: true,
    furnished: true,
    completeAddress: ''

  })

  const {type, fullName, beds, rooms, parkingSpot, furnished, completeAddress} = formData

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
          onClick={(e) => setFormData({...formData, type: "sell"})}
          >
            Sell
          </button>
          <button 
          type='button'
          className={`px-16 py-2 mt-2 text-lg font-semibold text-center ${type === 'rent' ? 'text-white bg-gray-800 rounded hover:bg-gray-700' : 'text-gray-800 bg-white border border-gray-800 rounded hover:bg-gray-100'}`}
          value={"sell"}
          id='rent'
          onClick={(e) => setFormData({...formData, type: "rent"})}
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
          onChange={(e) => setFormData({...formData, fullName: e.target.value})}
          className='w-full px-4 py-2 mt-2 text-lg border border-gray-400 rounded-sm focus:outline-none' />

          <div className='flex justify-between'>
            <div>
            <p className='text-lg font-semibold mt-6'>Beds</p>
              <input
                type='number'
                id='beds'
                
                onChange={(e) => setFormData({...formData, beds: e.target.value})}
                className='w-24 px-4 py-2 mt-2 text-lg border border-gray-400 rounded-sm focus:outline-none' />
            </div>
            <div>
            <p className='text-lg font-semibold mt-6'>Rooms</p>
              <input
                type='number'
                id='rooms'
                onChange={(e) => setFormData({...formData, rooms: e.target.value})}
                className='w-24 px-4 py-2 mt-2 text-lg border border-gray-400 rounded-sm focus:outline-none' />
            </div>
          </div>
          <div>
          <p className='text-lg font-semibold mt-6'>Parking Spot</p>
        <div className='flex justify-between'>
          <button 
          type='button'
          className={`px-16 py-2 mt-2 text-lg font-semibold text-center ${parkingSpot ? 'text-white bg-gray-800 rounded hover:bg-gray-700' : 'text-gray-800 bg-white border border-gray-800 rounded hover:bg-gray-100'}`}
          value={"sell"}
          id='sell'
          onClick={(e) => setFormData({...formData, parkingSpot: true})}
          >
            Yes
          </button>

          <button 
          type='button'
          className={`px-16 py-2 mt-2 text-lg font-semibold text-center ${!parkingSpot ? 'text-white bg-gray-800 rounded hover:bg-gray-700' : 'text-gray-800 bg-white border border-gray-800 rounded hover:bg-gray-100'}`}
          value={"sell"}
          id='sell'
          onClick={(e) => setFormData({...formData, parkingSpot: false})}
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
          onClick={(e) => setFormData({...formData, furnished: true})}
          >
            Yes
          </button>

          <button 
          type='button'
          className={`px-16 py-2 mt-2 text-lg font-semibold text-center ${!furnished ? 'text-white bg-gray-800 rounded hover:bg-gray-700' : 'text-gray-800 bg-white border border-gray-800 rounded hover:bg-gray-100'}`}
          value={"sell"}
          id='sell'
          onClick={(e) => setFormData({...formData, furnished: false})}
          >
            No
          </button>
        </div>
          </div>
          <div>
          <p className='text-lg font-semibold mt-6'>Address</p>
        <input
          type='text'
          id='completeAddress'
          placeholder='Address'
          required
          minLength={10}
          maxLength={150}
          value={completeAddress}
          onChange={(e) => setFormData({...formData, completeAddress: e.target.value})}
          className='w-full px-4 py-2 mt-2 text-lg border border-gray-400 rounded-sm focus:outline-none' />
          </div>
      </form>
    </main>
  )
}

export default CreateListing