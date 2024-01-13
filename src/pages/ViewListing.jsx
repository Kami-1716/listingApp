import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { db } from "../firebase/firebase";
import { doc, getDoc } from "firebase/firestore";
import { Spinner } from "../components";
import { toast } from "react-toastify";

import { Navigation, Pagination, EffectFade, Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/bundle";

const ViewListing = () => {
  const params = useParams();
  const { listingId, categoryName } = params;
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);

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
    <main>
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
    </main>
  );
};

export default ViewListing;
