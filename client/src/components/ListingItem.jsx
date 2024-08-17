import React from "react";
import { FaMapMarkerAlt } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function ListingItem({ listing }) {
  return (
    <div
      className="bg-white shadow-md hover:shadow-lg transition-shadow overflow-hidden rounded-lg w-full sm:w-[330px]"
      key={listing._id}
    >
      <Link to={`/listing/${listing._id}`}>
        <img
          src={listing.imageUrls[0] || "https://www.google.com/url?sa=i&url=https%3A%2F%2Fstock.adobe.com%2Fsearch%3Fk%3Dhotel&psig=AOvVaw1BDpsDkZ6v9QhmoDY4WS-N&ust=1723721089968000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCNjz4dCv9IcDFQAAAAAdAAAAABAE"}
          alt="listing cover"
          className="h-[270px] sm:h-[220px]w-full object-cover hover:scale-105 transition-scale duration-300"
        />

        <div className="p-3 flex flex-col gap-2 w-full">
          <p className="truncate text-lg font-semibold text-slate-700">
            {listing.name}
          </p>
          <div className="flex items-center gap-3">
            <FaMapMarkerAlt className="h-4 w-4 text-green-700" />
            <p className="text-sm text-gray-600 truncate w-full">
              {listing.address}
            </p>
          </div>
          <p className="text-sm text-gray-600 line-clamp-2">
            {listing.description}
          </p>
          <p className="text-slate-500 mt-2 font-semibold flex items-center">
            $
            {listing.offer
              ? listing.discountPrice.toLocaleString("en-US")
              : listing.regularPrice.toLocaleString("en-US")}
              {listing.type ==='rent' && '/month'}
          </p>
          <div className="text-slate-700 gap-4 flex flex-wrap">
            <div className="font-bold text-xs">
                {listing.bedroom >1 ? `${listing.bedroom} beds` :`${listing.bedroom} bed`}
            </div>
            <div className="font-bold text-xs">
                {listing.bathroom >1 ? `${listing.bathroom} beds` :`${listing.bathroom} bed`}
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}
