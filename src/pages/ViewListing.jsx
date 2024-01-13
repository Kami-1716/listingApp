import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { db } from "../firebase/firebase";
import { doc, getDoc } from "firebase/firestore";
import { Contact, Spinner } from "../components";
import { toast } from "react-toastify";
import { Navigation, Pagination, EffectFade, Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/bundle";
import { FaShareSquare } from "react-icons/fa";
import { FaMapMarkerAlt } from "react-icons/fa";
import { IoIosBed } from "react-icons/io";
import { MdOutlineMeetingRoom } from "react-icons/md";
import { RiParkingBoxFill } from "react-icons/ri";
import { FaChair } from "react-icons/fa";
import { getAuth } from "firebase/auth";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";

const ViewListing = () => {
  const params = useParams();
  const { listingId, categoryName } = params;
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [linkCopied, setLinkCopied] = useState(false)
  const [contactSeller, setContactSeller] = useState(false)

  // SwiperCore.use(Navigation, Pagination, EffectFade, Autoplay);
  //Swiper.use([Navigation, Pagination, Autoplay]);

  const auth = getAuth()

  useEffect(() => {
    const fetchListing = async () => {
      try {
        // fetch listing from firestore
        const listingRef = doc(db, "listings", listingId);
        const listingDoc = await getDoc(listingRef);

        if (listingDoc.exists()) {
          setListing(listingDoc.data());
          setLoading(false);
        }
      } catch (error) {
        toast.error(error.message);
        setLoading(false);
      }
    };

    fetchListing();
  }, []);

  if (loading) {
    return <Spinner />;
  }
  console.log(listing);
  return (
    <main className="relative">
      <Swiper
        // install Swiper modules
        modules={[EffectFade, Autoplay, Pagination, Navigation]}
        slidesPerView={1}
        navigation
        autoplay={{ delay: 3000 }}
        pagination={{ type: "progressbar", clickable: true }}
        scrollbar={{ draggable: true }}
      >
        {listing.imgUrls.map((url, index) => (
          <SwiperSlide key={index}>
            <div
              className="relative w-full overflow-hidden h-[500px]"
              style={{
                background: `url(${listing.imgUrls[index]}) center no-repeat`,
                backgroundSize: "cover",
              }}
            ></div>
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="fixed top-[18%] right-[3%] z-20 bg-white cursor-pointer h-12 w-12 rounded-full flex justify-center items-center border-gray-400"
        onClick={() => {
          navigator.clipboard.writeText(window.location.href)
          setLinkCopied(true)
          setTimeout(() => {
            setLinkCopied(false)
          }, 2000);
        }}
      >
        <FaShareSquare className="text-2xl text-black" />
      </div>
      {linkCopied && <div className="fixed top-[28%] right-[3%] z-20 bg-white cursor-pointer rounded px-2 py-4 font-semibold flex justify-center items-center border-gray-400">Link Copied</div>}

      <div className="max-w-6xl md:mx-auto flex flex-col md:flex-row m-4 p-4 rounded-lg shadow-lg lg:space-x-4 bg-white">
        <div className="w-full ">
          <p className="text-2xl font-bold mb-3 text-blue-900">
            {listing.fullName} - ${listing.offer ? listing.discountedPrice
              .toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, ',')
              : listing.regularPrice
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
            {listing.type === "rent" ? "/month" : ""}
          </p>
          <p className="font-semibold mt-6 mb-3 text-blue-900 felx items-center">
            <FaMapMarkerAlt className="inline-block mr-1 mb-1 text-green-600" />
            {listing.completeAddress}
          </p>
          <div className="flex justify-start space-x-4 items-center w-[75%]">
            <p className="w-full max-w-[200px] p-1 text-center font-semibold shadow-md bg-red-600 text-white rounded">{listing.type === "rent" ? `For Rent` : `For Sale`}</p>
            {listing.offer && (
              <p className="w-full max-w-[200px] p-1 text-center font-semibold shadow-md bg-green-800 text-white rounded">
                ${listing.regularPrice - listing.discountedPrice} Off
              </p>
            )}
          </div>
          <p className="mb-3 mt-3">
            <span className="font-semibold">Description - </span> {listing.description}
          </p>
          <ul className="flex items-center space-x-2 lg:space-x-4 mb-6 flex-wrap">
            <li className="flex items-center whitespace-nowrap">
              <IoIosBed className="inline-block mr-1  text-black-600 text-xl" />
              {listing.beds > 1 ? `${listing.beds} Beds` : '1 Bed'}
            </li>
            <li className="flex items-center whitespace-nowrap">
              <MdOutlineMeetingRoom className="inline-block mr-1  text-black-600 text-xl" />
              {listing.rooms > 1 ? `${listing.rooms} Rooms` : '1 Rooms'}
            </li>
            <li className="flex items-center whitespace-nowrap">
              <RiParkingBoxFill className="inline-block mr-1  text-black-600 text-xl" />
              {listing.parkingSpot ? `Parking` : 'No Parking'}
            </li>
            <li className="flex items-center whitespace-nowrap">
              <FaChair className="inline-block mr-1  text-black-600 text-xl" />
              {listing.furnished ? `Furnished` : 'Not Furnished'}
            </li>
          </ul>
          {listing.userRef !== auth.currentUser?.uid && !contactSeller && (
            <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-4 rounded mt-6 w-full flex justify-center items-center"
              onClick={() => setContactSeller(true)}
            >
              Contact Seller
            </button>
          )}
          {
            contactSeller && (
              <Contact listing={listing} userRef={listing.userRef} setContactSeller={setContactSeller} />
            )
          }
        </div>
        <div className="w-full h-[200px] md:h-[300px] mt-6 md:mt-0 md:ml-2 z-10 overflow-x-hidden">
          <MapContainer center={[listing.geoLocation.lat, listing.geoLocation.lang]} zoom={13} 
          scrollWheelZoom={false}
          style={{ height: "100%", width: "100%" }}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={[listing.geoLocation.lat, listing.geoLocation.lang]}>
              <Popup>
                A pretty CSS3 popup. <br /> Easily customizable.
              </Popup>
            </Marker>
          </MapContainer>
        </div>
      </div>
    </main>
  );
};

export default ViewListing;
