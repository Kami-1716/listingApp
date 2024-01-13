import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { db } from "../firebase/firebase";
import { doc, getDoc } from "firebase/firestore";
import { Spinner } from "../components";
import { toast } from "react-toastify";
import { Navigation, Pagination, EffectFade, Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/bundle";
import { FaShareSquare } from "react-icons/fa";

const ViewListing = () => {
  const params = useParams();
  const { listingId, categoryName } = params;
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [linkCopied, setLinkCopied] = useState(false)

  // SwiperCore.use(Navigation, Pagination, EffectFade, Autoplay);
  //Swiper.use([Navigation, Pagination, Autoplay]);

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
    </main>
  );
};

export default ViewListing;
