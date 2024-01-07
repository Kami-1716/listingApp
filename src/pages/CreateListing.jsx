import React, { useState } from 'react'
import { Spinner } from '../components'
import { getAuth } from 'firebase/auth'
import { toast } from 'react-toastify'
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'
import { addDoc, collection, serverTimestamp } from 'firebase/firestore'
import {v4 as uuidv4} from 'uuid'
import { db } from '../firebase/firebase'
import { useNavigate } from 'react-router'

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
    discountedPrice: 0,
    images: [],
    latitude: 0,
    longitude: 0

  })

  const { type, fullName, beds, rooms, parkingSpot, furnished, completeAddress, description, offer, regularPrice, discountedPrice, images, latitude, longitude } = formData

  const [isOffer, setIsOffer] = useState(true)
  const [geoLocationEnabled, setGeoLocationEnabled] = useState(true)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const listingFormSubmitHandler = async (e) => {
    e.preventDefault()
    setLoading(true)
    if (+discountedPrice >= +regularPrice) {
      toast.error('Discounted price must be lower than regular price');
      setLoading(false);
      return;
    }
    
    if (images.length > 6) {
      toast.error('You can only upload 6 images')
      setLoading(false)
      return
    }
    let geoLocation = {}
    let location = {}

    if (geoLocationEnabled) {

      try {
        const response = await fetch(`http://dev.virtualearth.net/REST/v1/Locations?q=${encodeURIComponent(completeAddress)}&key=${import.meta.env.VITE_BING_API_KEY}`)
        const data = await response.json()
        const coordinates = data.resourceSets[0].resources[0].point.coordinates;
        // Latitude
        geoLocation.lat = coordinates[0] ? coordinates[0] : 0;
        // Longitude
        geoLocation.lang = coordinates[1] ? coordinates[1] : 0;
      } catch (error) {
        console.log(error)
        setLoading(false)
      }
    } else {
      geoLocation.lat = latitude
      geoLocation.lang = longitude
    }

    const storeImage = async (image) => {
      
      return new Promise((resolve, reject) => {
        const auth = getAuth()
        const storage = getStorage()
        const storageRef = ref(storage, `${auth.currentUser.uid}-${image.name}-${uuidv4()}`)
        const uplaodTask = uploadBytesResumable(storageRef, image)
        uplaodTask.on('state_changed', (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          console.log(`Upload is ${progress}% done`)
        }, (error) => {
          toast.error('Error uploading images')
          reject(error)
        }, async () => {
          const downloadURL = await getDownloadURL(uplaodTask.snapshot.ref)
          location[image.name] = downloadURL
          resolve(downloadURL)
        })
      })

    }

    const imgUrls = await Promise.all(
      [...images].map(async (image) => {
        try {
          return await storeImage(image);
        } catch (error) {
          console.log(error);
          throw new Error('Error uploading images');
        }
      })
    ).catch((error) => {
      console.log(error);
      setLoading(false);
      toast.error('Error uploading images');
      return [];
    });   

    const formDataCopy = { ...formData, 
      imgUrls, 
      geoLocation, 
      timestamp: serverTimestamp(),
    }
    delete formDataCopy.images
    delete formDataCopy.latitude
    delete formDataCopy.longitude
    !formDataCopy.offer && delete formDataCopy.discountedPrice
  
    const docRef = await addDoc(collection(db, 'listings'), formDataCopy)
    toast.success('Listing created successfully')
    setLoading(false)
    navigate(`/category/${formDataCopy.type}/${docRef.id}`)
  }

  if (loading) return (<Spinner />)
  return (
    <main className='max-w-md  px-3 mx-auto'>
      <h1 className='text-3xl font-bold text-center mt-6'>Create New Listing</h1>

      <form className=""
        onSubmit={listingFormSubmitHandler}
      >
        <p className='text-lg font-semibold mt-6'>Sell / Rent</p>
        <div className='flex justify-between'>
          <button
            type='button'
            className={`px-16 py-2 mt-2 text-lg font-semibold text-center ${type === 'sell' ? 'text-white bg-gray-800 rounded hover:bg-gray-700' : 'text-gray-800 bg-white border border-gray-800 rounded hover:bg-gray-100'}`}
            value={"sell"}
            id='sell'
            onClick={(e) => setFormData(prevData => ({ ...prevData, type: "sell" }))}
          >
            Sell
          </button>
          <button
            type='button'
            className={`px-16 py-2 mt-2 text-lg font-semibold text-center ${type === 'rent' ? 'text-white bg-gray-800 rounded hover:bg-gray-700' : 'text-gray-800 bg-white border border-gray-800 rounded hover:bg-gray-100'}`}
            value={"sell"}
            id='rent'
            onClick={(e) => setFormData(prevData => ({ ...prevData, type: "rent" }))}
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
          onChange={(e) => setFormData((prevData => ({ ...prevData, fullName: e.target.value })))}
          className='w-full px-4 py-2 mt-2 text-lg border border-gray-400 rounded-sm focus:outline-none' />

        <div className='flex gap-x-6'>
          <div className='w-full'>
            <p className='text-lg font-semibold mt-6'>Beds</p>
            <input
              type='number'
              id='beds'
              value={beds}
              onChange={(e) => setFormData(prevData => ({ ...prevData, beds: e.target.value }))}
              className='w-full px-4 py-2 mt-2 text-lg border border-gray-400 rounded-sm focus:outline-none' />
          </div>
          <div className='w-full'>
            <p className='text-lg font-semibold mt-6'>Rooms</p>
            <input
              type='number'
              id='rooms'
              value={rooms}
              onChange={(e) => setFormData(prevData => ({ ...prevData, rooms: e.target.value }))}
              className='w-full px-4 py-2 mt-2 text-lg border border-gray-400 rounded-sm focus:outline-none' />
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
              onClick={(e) => setFormData(prevData => ({ ...prevData, parkingSpot: true }))}
            >
              Yes
            </button>

            <button
              type='button'
              className={`px-16 py-2 mt-2 text-lg font-semibold text-center ${!parkingSpot ? 'text-white bg-gray-800 rounded hover:bg-gray-700' : 'text-gray-800 bg-white border border-gray-800 rounded hover:bg-gray-100'}`}
              value={parkingSpot}
              id='sell'
              onClick={(e) => setFormData(prevData => ({ ...prevData, parkingSpot: false }))}
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
            onChange={(e) => setFormData(prevData => ({ ...prevData, completeAddress: e.target.value }))}
            className='w-full px-4 py-2 mt-2 text-lg border border-gray-400 rounded-sm focus:outline-none' />
        </div>
        {!geoLocationEnabled && (
          <div className='flex gap-x-6'>
            <div className='w-full'>
              <p className='text-lg font-semibold mt-6'>Latitude</p>
              <input
                type='number'
                id='latitude'
                value={latitude}
                min={-90}
                max={90}
                required
                onChange={(e) => setFormData(prevData => ({ ...prevData, latitude: e.target.value }))}
                className='w-full px-4 py-2 mt-2 text-lg border border-gray-400 rounded-sm focus:outline-none' />
            </div>
            <div className='w-full'>
              <p className='text-lg font-semibold mt-6'>Longitude</p>
              <input
                type='number'
                id='longitude'
                value={longitude}
                min={-180}
                max={180}
                required
                onChange={(e) => setFormData(prevData => ({ ...prevData, longitude: e.target.value }))}
                className='w-full px-4 py-2 mt-2 text-lg border border-gray-400 rounded-sm focus:outline-none' />
            </div>
          </div>

        )}
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
            onChange={(e) => setFormData(prevData => ({ ...prevData, description: e.target.value }))}
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
                setFormData(prevData => ({ ...prevData, offer: true }))
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
                setFormData(prevData => ({ ...prevData, offer: false }))
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
              onChange={(e) => setFormData(prevData => ({ ...prevData, regularPrice: e.target.value }))}
              className={`w-48 px-4 py-2 mt-2 text-lg border border-gray-400 rounded-sm focus:outline-none `} />
            {
              type === 'sell' ? <p>$US</p> : <p>$US / month</p>
            }
          </div>
        </div>
        <div className={`${isOffer ? `block` : `hidden`}`}>
          <p className='text-lg font-semibold mt-6'>Discounted Price</p>
          <div className='flex items-center space-x-2'>
            <input
              type='number'
              id='discountedPrice'
              value={discountedPrice}
              disabled={!isOffer}
              onChange={(e) => setFormData(prevData => ({ ...prevData, discountedPrice: e.target.value }))}
              className={`w-48 px-4 py-2 mt-2 text-lg border border-gray-400 rounded-sm focus:outline-none ${isOffer ? `bg-white` : `bg-gray-300`}`} />
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
            onChange={(e) => setFormData(prevData => ({ ...prevData, images: e.target.files }))}
            className='w-full px-4 py-2 mt-2 text-lg bg-white border border-gray-400 rounded-sm focus:outline-none' />
        </div>
        <button
          type='submit'
          className='w-full px-4 py-3 mt-6 mb-6 text-lg font-semibold text-white bg-blue-700 rounded hover:bg-blue-600 transition ease-in-out duration-200'>Submit Listing
        </button>
      </form>
    </main>
  )
}

export default CreateListing