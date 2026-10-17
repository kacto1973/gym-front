import React from "react";
import { useState } from "react";
import MembershipModal from "../Components/MembershipModal.jsx";

const ClientCard = ({ client, setModalActive }) => {
  const getInitials = (name) => {
    return name.substring(0, 2).toUpperCase();
  };

  //date format method (D/M/Y)
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  return (
    <div className=" bg-white rounded-xl shadow-sm border border-gray-100 p-5 flex flex-col items-center text-center hover:shadow-md transition-shadow">
      {/* circle avatar */}
      <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center text-gray-700 font-bold mb-3">
        {getInitials(client.name)}
      </div>

      {/* name and data */}
      <h3 className="font-bold text-gray-800 text-sm mb-1 line-clamp-1">
        {client.name}
      </h3>

      {/* expiration date and state */}
      <div className="flex items-center gap-2 mt-4 mb-4 text-xs">
        <span className="text-gray-500">
          Expires:{" "}
          <span className="font-semibold text-gray-700">
            {formatDate(client.endOfTerm)}
          </span>
        </span>

        {/* Badge active or not */}
        {client.active ? (
          <span className="bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-medium">
            Active
          </span>
        ) : (
          <span className="bg-red-100 text-red-700 px-2 py-0.5 rounded-full font-medium">
            Expired
          </span>
        )}
      </div>

      {/* action button */}
      <button
        onClick={() => setModalActive((value) => !value)}
        className="w-full mt-auto border border-indigo-600 text-indigo-600 hover:bg-indigo-50 py-1.5 rounded-md text-sm font-medium transition-colors"
      >
        Manage Membership
      </button>
    </div>
  );
};

export default ClientCard;
