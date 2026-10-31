import React from "react";
import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { mockClients } from "../mockData.js";
import ClientCard from "../Components/ClientCard.jsx";
import MembershipModal from "../Components/MembershipModal.jsx";
import AddClientModal from "../Components/AddClientModal.jsx";
import { toast } from "react-toastify";
import { getClients } from "../services/clientService.js";

const AdminPage = () => {
  const queryClient = useQueryClient();
  const [search, setSearch] = useState("");

  const {
    //clients is here just an array of clients (returned by the backend)
    data: clients = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["clients"],
    queryFn: getClients,
  });

  const [selectedClient, setSelectedClient] = useState(null);
  const [modalActive, setModalActive] = useState(false);
  const [addClientModalActive, setAddClientModalActive] = useState(false);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-xl font-bold">Loading gym desktop database...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex justify-center items-center h-screen text-red-500">
        <p className="text-xl font-bold">Server connection error...</p>
        <p>{error.response?.data?.message}</p>
      </div>
    );
  }

  const searchLowerCase = search.toLowerCase();

  const filteredClients = clients.filter(
    (client) =>
      (client.name.toLowerCase().includes(searchLowerCase) ||
        client._id.includes(search)) &&
      client.active,
  );

  return (
    <main className="relative">
      <MembershipModal
        client={selectedClient}
        setModalActive={setModalActive}
        modalActive={modalActive}
      />
      <AddClientModal
        setModalActive={setAddClientModalActive}
        modalActive={addClientModalActive}
      />
      <div className="top-0 left-0 sticky z-30 pb-1 rounded-b-md bg-[#D5DCE4]">
        {/*Header*/}
        <header className="flex justify-between mx-10 items-center shadow-md">
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

        {/*Search bar*/}
        <div className=" m-5 bg-white shadow-md rounded-lg p-4 flex flex-row justify-between ">
          <div className="flex flex-row gap-3 w-1/3 items-center">
            <img src="/filter.svg" alt="filter" width={20} />
            <div className="relative w-full">
              <input
                className="w-full bg-white border border-gray-400 pl-4 pr-10 py-1 rounded-md"
                type="search"
                placeholder="Search Client (Name or ID)"
                onChange={(e) => setSearch(e.target.value)}
              />
              <img
                src="/glass.svg"
                alt="Search icon"
                className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4"
              />
            </div>
          </div>
          <button
            onClick={() => setAddClientModalActive(true)}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Add Client
          </button>
        </div>
      </div>

      <div className="relative">
        {/*Client container*/}
        <div className=" pb-6 m-5 gap-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 overflow-y-auto">
          {filteredClients.map((client) => (
            <ClientCard
              key={client._id}
              setSelectedClient={setSelectedClient}
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
