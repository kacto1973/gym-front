import React from "react";

const MembershipModal = ({ client, modalActive }) => {
  return (
    <div
      className={`relative h-[50%] bg-white rounded-md flex flex-col gap-3 ${modalActive ? "block" : "hidden"}`}
    >
      <h2>Manage Membership</h2>
      <span className="font-bold absolute left-4 top-4">X</span>

      <div className=" grid grid-cols-2"></div>

      <div className="p-4 border-b border-r border-gray-200">
        <p className="text-gray-400">Phone Number</p>
        <p>{client.phoneNumber}</p>
      </div>

      <div className="p-4 border-b border-gray-200">
        <p className="text-gray-400">Emergency Contact</p>
        <p>{client.emergencyContact}</p>
      </div>

      <div className="p-4  border-r border-gray-200">
        <p className="text-gray-400">Current Status</p>
        <p>{client.active ? "Active" : "Expired"}</p>
      </div>

      <div className="p-4 b border-gray-200">
        <p className="text-gray-400">Notes / Info</p>
        <p>{client.notes}</p>
      </div>
    </div>
  );
};

export default MembershipModal;
