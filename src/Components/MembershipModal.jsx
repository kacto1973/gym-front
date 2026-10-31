import React from "react";
import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { updateClient, deleteClient } from "../services/clientService.js";
import { toast } from "react-toastify";

const MembershipModal = ({ client, modalActive, setModalActive }) => {
  const queryClient = useQueryClient();
  const [selectedExtension, setSelectedExtension] = useState(null);
  if (modalActive) {
    console.log("Current Selected Client:", client);
  }

  const updateClientMutation = useMutation({
    mutationFn: async (newClient) => {
      const response = await updateClient(newClient);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["clients"] });
      toast.success("Operación exitosa");

      //clean client info
      setSelectedExtension(0);

      //close modal
      setModalActive(false);
    },
    onError: (error) => {
      const errorMsg =
        error.response?.data?.message || "Error inesperado de conexión";
      toast.error(errorMsg);
    },
  });

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  const isActive = (endOfTerm) => {
    const now = new Date();
    const expirationDate = new Date(endOfTerm);
    return expirationDate >= now;
  };

  const deleteClientMutation = useMutation({
    mutationFn: async (clientId) => {
      const response = await deleteClient(clientId);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["clients"] });
      toast.success("Operación exitosa");

      //clean client info
      setSelectedExtension(0);

      //close modal
      setModalActive(false);
    },
    onError: (error) => {
      const errorMsg =
        error.response?.data?.message || "Error inesperado de conexión";
      toast.error(errorMsg);
    },
  });

  const validate = () => {
    if (
      !(
        selectedExtension === 1 ||
        selectedExtension === 2 ||
        selectedExtension === 3
      )
    ) {
      toast.warning("Please select an initial membership duration");
      return false;
    }
    return true;
  };

  if (!modalActive) return null;

  return (
    <div className="fixed inset-0 bg-black/70 z-40 flex justify-center items-center">
      <div
        className={
          "relative max-w-[50%] z-50 p-4 bg-white rounded-md flex flex-col gap-3"
        }
      >
        <h2 className="font-bold text-lg">{client?.name}</h2>

        <div className="flex flex-row gap-4 items-center">
          <span className="text-gray-500">
            Expires:{" "}
            <span className="font-semibold text-gray-700">
              {formatDate(client.endOfTerm)}
            </span>
          </span>
          {/* Badge active or not */}
          {isActive(client.endOfTerm) ? (
            <span className="bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-medium">
              Active
            </span>
          ) : (
            <span className="bg-red-100 text-red-700 px-2 py-0.5 rounded-full font-medium">
              Expired
            </span>
          )}
        </div>
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
        </div>
        <div className="p-4 b border-gray-200">
          <p className="text-gray-400">Notes / Info</p>
          <p>{client?.notes || "N/A"}</p>
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
          <img
            onClick={async () => {
              const confirmDelete = window.confirm(
                "Are you sure you want to delete this client?",
              );

              if (confirmDelete) {
                deleteClientMutation.mutate(client._id);
              }
            }}
            className="absolute left-4 bottom-4 cursor-pointer"
            src="/trashbin.svg"
            alt="delete Btn"
            width={25}
          />
          <button
            className="cursor-pointer  px-4 py-1 rounded-md bg-gray-300 text-gray-500 mr-2"
            onClick={() => setModalActive(false)}
          >
            Cancel
          </button>
          <button
            onClick={async () => {
              if (!validate) {
                return;
              }

              const newEndOfTerm = new Date(client.endOfTerm);

              if (selectedExtension === 1) {
                newEndOfTerm.setMonth(newEndOfTerm.getMonth() + 1);
              } else if (selectedExtension === 2) {
                newEndOfTerm.setMonth(newEndOfTerm.getMonth() + 3);
              } else if (selectedExtension === 3) {
                newEndOfTerm.setFullYear(newEndOfTerm.getFullYear() + 1);
              }

              const newClient = {
                ...client,
                endOfTerm: newEndOfTerm,
              };

              updateClientMutation.mutate(newClient);
            }}
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
