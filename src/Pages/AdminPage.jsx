import React from "react";
import { useState } from "react";
import { mockClients } from "../mockData.js";
import ClientCard from "../Components/ClientCard.jsx";
import MembershipModal from "../Components/MembershipModal.jsx";

const AdminPage = () => {
  const [clients, setClients] = useState(mockClients);
  const [selectedClient, setSelectedClient] = useState(null);
  const [modalActive, setModalActive] = useState(false);

  return (
    <main className="relative">
      <MembershipModal
        client={selectedClient}
        setModalActive={setModalActive}
        modalActive={modalActive}
      />
      {/*Header*/}
      <header className="flex justify-between mx-10 items-center">
        <div className="gap-3 flex flex-row items-center">
          <img src="/dumbbell.svg" alt="logo" width={60} />
          <h1 className="text-xl font-bold">GYM DESKTOP MANAGER</h1>
        </div>
        <div className="flex flex-row items-center gap-3">
          <div className="cursor-pointer font-bold rounded-full w-10 h-10 bg-green-400 flex items-center justify-center">
            <span className="text-green-800">LA</span>
          </div>
          <img
            className="cursor-pointer"
            src="/gear.svg"
            width={30}
            alt="settings"
          />
        </div>
      </header>
      <hr />
      <div>
        {/*Search bar*/}
        <div className=" m-5 bg-white shadow-md rounded-lg p-4 flex flex-row justify-between ">
          <div className="flex flex-row gap-3 w-1/3 items-center">
            <img src="/filter.svg" alt="filter" width={20} />
            <div className="relative w-full">
              <input
                className="w-full bg-white border border-gray-400 pl-4 pr-10 py-1 rounded-md"
                type="search"
                placeholder="Search Client (Name or ID)"
              />
              <img
                src="/glass.svg"
                alt="Search icon"
                className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4"
              />
            </div>
          </div>
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Add Client
          </button>
        </div>
        {/*Client container*/}
        <div className="m-5 gap-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
          {clients.map((client) => (
            <ClientCard
              setModalActive={setModalActive}
              client={client}
            ></ClientCard>
          ))}
        </div>
      </div>
    </main>
  );
};

export default AdminPage;
