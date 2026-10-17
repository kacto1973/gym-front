import React from "react";

const MembershipModal = ({ client, modalActive, setModalActive }) => {
  if (!modalActive) return null;

  return (
    <div className="fixed inset-0 bg-black/70 z-40 flex justify-center items-center">
      <div
        className={"relative z-50 p-4 bg-white rounded-md flex flex-col gap-3"}
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
        <div className="py-4 rounded-md bg-blue-100 gap-3 flex flex-row items-center justify-center">
          <button className="cursor-pointer px-2 py-1 rounded-md bg-white border border-blue-600  text-blue-400">
            +1 Month
          </button>
          <button className=" cursor-pointer px-2 py-1 rounded-md bg-white border border-blue-600  text-blue-400">
            +3 Months
          </button>
          <button className=" cursor-pointer px-2 py-1 rounded-md bg-white border border-blue-600  text-blue-400">
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
