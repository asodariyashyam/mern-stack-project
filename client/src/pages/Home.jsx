import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/bundle";
import SwiperCore from "swiper";
import Listing from "./Listing";
import { Navigation } from "swiper/modules";
import ListingItem from "../components/ListingItem";

export default function Home() {
  SwiperCore.use([Navigation]);

  const [offerListing, setOfferListing] = useState([]);
  const [saleListing, setSaleListing] = useState([]);
  const [rentListing, setRentListing] = useState([]);

  useEffect(() => {
    const fetchOfferListing = async () => {
      try {
        const res = await fetch(`/api/listing/get?offer=true&limit=4`);
        const data = await res.json();
        setOfferListing(data);
        fetchRentListing();
      } catch (error) {
        console.log(error);
      }
    };

    const fetchRentListing = async () => {
      try {
        const res = await fetch(`/api/listing/get?type=rent&limit=4`);
        const data = await res.json();
        setRentListing(data);
        fetchSaleListing();
      } catch (error) {
        console.log(error);
      }
    };
    const fetchSaleListing = async () => {
      try {
        const res = await fetch(`/api/listing/get?type=sale&limit=4`);
        const data = await res.json();
        setSaleListing(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchOfferListing();
  }, []);

  return (
    <div>
      {/* top */}
      <div className="flex flex-col gap-6 p-28 px-3 max-w-6xl mx-auto">
        <h1 className="text-slate-700 font-bold text-3xl lg:text-6xl">
          Find your next <span className="text-slate-500 ">perfect</span>
          <br />
          place with ease
        </h1>
        <div className="text-gray-400 text-xs sm:text-sm">
          Sahand Estate will help you find your home fast, easy and comfortable.{" "}
          <br />
          Our expert support are always available.
        </div>
        <Link
          to={"/search"}
          className="text-xs sm:text-sm text-blue-800 font-bold hover:underline"
        >
          Let's get started...
        </Link>
      </div>

      {/* swiper */}

      <Swiper navigation spaceBetween={10} slidesPerView={1}>
        {offerListing.length > 0 &&
          offerListing.map((listing) => (
            <SwiperSlide key={listing._id}>
              <img
                style={{
                  objectFit: "cover",
                  width: "100%",
                  height: "500px",
                }}
                src={listing.imageUrls[0]}
                alt="Listing Image"
              />
            </SwiperSlide>
          ))}
      </Swiper>

      {/* listing results fro offer, sale and rent */}

      <div className="max-w-6xl mx-auto p-3 flex flex-col gap-8 my-10">
        {offerListing && offerListing.length > 0 && (
          <div>
            <div className="text-2xl font-semibold text-slate-600">
              <h2>Recent offers</h2>
              <Link to={`/search?offer=true`} className="text-sm text-blue-600">
                Show more offers
              </Link>
            </div>
            <div className="flex flex-wrap gap-6 m-auto">
              {offerListing.map((listing) => (
                <ListingItem listing={listing} key={listing._id} />
              ))}
            </div>
          </div>
        )}

        {rentListing && rentListing.length > 0 && (
          <div>
            <div className="text-2xl font-semibold text-slate-600">
              <h2>Recent places for rent</h2>
              <Link to={`/search?type=rent`} className="text-sm text-blue-600">
                Show more places for rent
              </Link>
            </div>
            <div className="flex flex-wrap gap-6 m-auto">
              {rentListing.map((listing) => (
                <ListingItem listing={listing} key={listing._id} />
              ))}
            </div>
          </div>
        )}

        {saleListing && saleListing.length > 0 && (
          <div>
            <div className="text-2xl font-semibold text-slate-600">
              <h2 >Recent places for sale</h2>
              <Link to={`/search?type=sale`} className="text-sm text-blue-600">
                Show more places for sale
              </Link>
            </div>
            <div className="flex flex-wrap gap-6 m-auto">
              {saleListing.map((listing) => (
                <ListingItem listing={listing} key={listing._id} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
