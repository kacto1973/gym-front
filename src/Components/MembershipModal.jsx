import React from "react";
import { useState } from "react";

const MembershipModal = ({ client, modalActive, setModalActive }) => {
  const [selectedExtension, setSelectedExtension] = useState(null);
  if (modalActive) {
    console.log("Current Selected Client:", client);
  }

  if (!modalActive) return null;

  return (
    <div className="fixed inset-0 bg-black/70 z-40 flex justify-center items-center">
      <div
        className={
          "relative max-w-[50%] z-50 p-4 bg-white rounded-md flex flex-col gap-3"
        }
      >
        <h2 className="font-bold text-lg">Manage Membership</h2>
        <span
          className="cursor-pointer font-bold absolute right-4 top-4"
          onClick={() => setModalActive(false)}
        >
          X
        </span>

        <div className=" grid grid-cols-2">
          <div className="p-4 border-b border-r border-gray-200">
            <p className="text-gray-400">Phone Number</p>
            <p>{client?.phoneNumber || "N/A"}</p>
          </div>

          <div className="p-4 border-b border-gray-200">
            <p className="text-gray-400">Emergency Contact</p>
            <p>{client?.emergencyContact || "N/A"}</p>
          </div>

          <div className="p-4  border-r border-gray-200">
            <p className="text-gray-400">Current Status</p>
            <p>{client?.active ? "Active" : "Expired"}</p>
          </div>

          <div className="p-4 b border-gray-200">
            <p className="text-gray-400">Notes / Info</p>
            <p>{client?.notes || "N/A"}</p>
          </div>
        </div>
        <h2 className="font-bold">Extend Membership</h2>
        <div
          className={`py-4 rounded-md bg-blue-100 gap-3 flex flex-row items-center justify-center `}
        >
          <button
            onClick={() => setSelectedExtension(1)}
            className={`cursor-pointer px-2 py-1 rounded-md border border-blue-600 transition-colors ${
              selectedExtension === 1
                ? "bg-blue-600 text-white font-semibold shadow-inner"
                : "bg-white text-blue-400 hover:bg-blue-50"
            }`}
          >
            +1 Month
          </button>
          <button
            onClick={() => setSelectedExtension(2)}
            className={`cursor-pointer px-2 py-1 rounded-md border border-blue-600 transition-colors ${
              selectedExtension === 2
                ? "bg-blue-600 text-white font-semibold shadow-inner"
                : "bg-white text-blue-400 hover:bg-blue-50"
            }`}
          >
            +3 Months
          </button>
          <button
            onClick={() => setSelectedExtension(3)}
            className={`cursor-pointer px-2 py-1 rounded-md border border-blue-600 transition-colors ${
              selectedExtension === 3
                ? "bg-blue-600 text-white font-semibold shadow-inner"
                : "bg-white text-blue-400 hover:bg-blue-50"
            }`}
          >
            +1 Year
          </button>
        </div>
        <div className="flex flex-row justify-end">
          <button
            className="cursor-pointer  px-4 py-1 rounded-md bg-gray-300 text-gray-500 mr-2"
            onClick={() => setModalActive(false)}
          >
            Cancel
          </button>
          <button
            onClick={() => setModalActive(false)}
            className="cursor-pointer px-4 py-1 rounded-md  bg-blue-600 text-white "
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default MembershipModal;
