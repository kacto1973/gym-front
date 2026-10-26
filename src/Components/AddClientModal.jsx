import React from "react";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { validate } from "zod";
import { addClient } from "../services/clientService.js";
import api from "../services/api.js";

const AddClientModal = ({ setModalActive, modalActive }) => {
  const queryClient = useQueryClient();
  const [selectedExtension, setSelectedExtension] = useState(0);
  const [newClient, setNewClient] = useState({
    name: "",
    phoneNumber: "",
    emergencyContact: "",
    notes: "",
    /*
    These get removed because the user actually does not type it in
    startOfTerm: new Date(),
    endOfTerm: new Date(),
    active: false,
    */
  });

  const addClientMutation = useMutation({
    mutationFn: async (newClientData) => {
      const response = await addClient(newClientData);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["clients"] });
      toast.success("Operación exitosa");
      //clean client info
      setNewClient({
        name: "",
        phoneNumber: "",
        emergencyContact: "",
        notes: "",
      });
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

  const validateInfo = (client) => {
    const { name, phoneNumber, emergencyContact } = client;
    if (
      name.trim() === "" ||
      phoneNumber.trim() === "" ||
      emergencyContact.trim() === ""
    ) {
      toast.warning("Please do not leave empty info boxes");
      return false;
    }
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
        <div className="flex flex-col gap-3 mx-2">
          <h2 className="font-bold text-lg">Add Client</h2>
          <span
            className="cursor-pointer font-bold absolute right-4 top-4"
            onClick={() => setModalActive(false)}
          >
            X
          </span>
          <div className="flex flex-col gap-2 items-start">
            <span>Full Name</span>
            <input
              className="border border-gray-300 rounded-md w-full p-2"
              type="text"
              placeholder="John Doe"
              onChange={(e) => {
                setNewClient({ ...newClient, name: e.target.value });
              }}
            />
          </div>
          <div className="flex flex-row gap-5">
            <div className="flex flex-col gap-2 items-start">
              <span>Phone Number</span>
              <input
                onChange={(e) => {
                  setNewClient({ ...newClient, phoneNumber: e.target.value });
                }}
                className="border border-gray-300 rounded-md w-full p-2"
                type="text"
                placeholder="+52 662 423 7920"
              />
            </div>
            <div className="flex flex-col gap-2 items-start">
              <span>Emergency Contact</span>
              <input
                onChange={(e) => {
                  setNewClient({
                    ...newClient,
                    emergencyContact: e.target.value,
                  });
                }}
                className="border border-gray-300 rounded-md w-full p-2"
                type="text"
                placeholder="Jane > +52 662 423 7920"
              />
            </div>
          </div>
          <span>Notes / Important Info</span>
          <input
            onChange={(e) => {
              setNewClient({ ...newClient, notes: e.target.value });
            }}
            className="border border-gray-300 rounded-md w-full p-2"
            type="text"
            placeholder="conditions, goals, or notes..."
          />
          <h2 className="font-bold">Initial Membership</h2>
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
              1 Month
            </button>
            <button
              onClick={() => setSelectedExtension(2)}
              className={`cursor-pointer px-2 py-1 rounded-md border border-blue-600 transition-colors ${
                selectedExtension === 2
                  ? "bg-blue-600 text-white font-semibold shadow-inner"
                  : "bg-white text-blue-400 hover:bg-blue-50"
              }`}
            >
              3 Months
            </button>
            <button
              onClick={() => setSelectedExtension(3)}
              className={`cursor-pointer px-2 py-1 rounded-md border border-blue-600 transition-colors ${
                selectedExtension === 3
                  ? "bg-blue-600 text-white font-semibold shadow-inner"
                  : "bg-white text-blue-400 hover:bg-blue-50"
              }`}
            >
              1 Year
            </button>
          </div>

          <div className="flex flex-row justify-end">
            <button
              className="cursor-pointer  px-4 py-1 rounded-md bg-gray-300 text-gray-500 mr-2"
              onClick={() => {
                setNewClient({
                  name: "",
                  phoneNumber: "",
                  emergencyContact: "",
                  notes: "",
                });
                setSelectedExtension(0);

                //close modal
                setModalActive(false);
              }}
            >
              Cancel
            </button>
            <button
              onClick={async () => {
                if (!validateInfo(newClient)) {
                  return;
                }

                //add new client to DB logic
                const startOfTerm = new Date();
                const endOfTerm = new Date();
                if (selectedExtension === 1) {
                  endOfTerm.setMonth(endOfTerm.getMonth() + 1);
                } else if (selectedExtension === 2) {
                  endOfTerm.setMonth(endOfTerm.getMonth() + 3);
                } else if (selectedExtension === 3) {
                  endOfTerm.setFullYear(endOfTerm.getFullYear() + 1);
                }

                const clientToAdd = {
                  ...newClient,
                  startOfTerm: startOfTerm,
                  endOfTerm: endOfTerm,
                  active: true,
                };

                addClientMutation.mutate(clientToAdd);
              }}
              className="cursor-pointer px-4 py-1 rounded-md  bg-blue-600 text-white "
            >
              Confirm
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddClientModal;
