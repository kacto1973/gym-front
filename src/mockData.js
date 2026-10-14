// Obtienes la fecha actual (Date.now())
const today = new Date();

// Creas una función auxiliar para calcular +1 mes
const getNextMonth = (date) => {
  const nextMonth = new Date(date);
  nextMonth.setMonth(nextMonth.getMonth() + 1);
  return nextMonth;
};

export const mockClients = [
  {
    _id: "64a2c1f8e4b01a2c3d4e5f61",
    name: "Luis Alejandro Aguilar Baza",
    phoneNumber: "+52 662 423 7920",
    emergencyContact: "Maria Baza (Mother) - +52 662 111 2233",
    notes: "Asthma - carries inhaler.",
    startOfTerm: today.toISOString(),
    endOfTerm: getNextMonth(today).toISOString(),
    active: true,
  },
  {
    _id: "64a2c1f8e4b01a2c3d4e5f62",
    name: "Maria Fernandez Reyes",
    phoneNumber: "+52 554 123 4567",
    emergencyContact: "Carlos Reyes (Brother) - +52 554 987 6543",
    notes: "",
    startOfTerm: today.toISOString(),
    endOfTerm: getNextMonth(today).toISOString(),
    active: true,
  },
  {
    _id: "64a2c1f8e4b01a2c3d4e5f63",
    name: "David Chen",
    phoneNumber: "+1 415 987 6543",
    emergencyContact: "Sarah Chen (Wife) - +1 415 123 4567",
    notes: "Previous knee injury, modifies squats.",
    startOfTerm: today.toISOString(),
    endOfTerm: getNextMonth(today).toISOString(),
    active: true,
  },
  {
    _id: "64a2c1f8e4b01a2c3d4e5f64",
    name: "Sarah Johnson",
    phoneNumber: "+44 7700 900 123",
    emergencyContact: "Mark Johnson (Husband) - +44 7700 900 987",
    notes: "Student discount applied.",
    startOfTerm: today.toISOString(),
    endOfTerm: getNextMonth(today).toISOString(),
    active: true,
  },
  {
    _id: "64a2c1f8e4b01a2c3d4e5f65",
    name: "Pierre Dubois",
    phoneNumber: "+33 6 12 34 56 78",
    emergencyContact: "Marie Dubois (Sister) - +33 6 87 65 43 21",
    notes: "",
    startOfTerm: today.toISOString(),
    endOfTerm: getNextMonth(today).toISOString(),
    active: true,
  },
  {
    _id: "64a2c1f8e4b01a2c3d4e5f66",
    name: "Kenji Tanaka",
    phoneNumber: "+81 90 1234 5678",
    emergencyContact: "Yumi Tanaka (Mother) - +81 90 8765 4321",
    notes: "Only attends morning classes.",
    startOfTerm: today.toISOString(),
    endOfTerm: getNextMonth(today).toISOString(),
    active: true,
  },
  {
    _id: "64a2c1f8e4b01a2c3d4e5f67",
    name: "Luiras Alejandro",
    phoneNumber: "+52 662 423 7921",
    emergencyContact: "Ana Alejandro (Sister) - +52 662 111 0000",
    notes: "",
    startOfTerm: today.toISOString(),
    endOfTerm: getNextMonth(today).toISOString(),
    active: true,
  },
  {
    _id: "64a2c1f8e4b01a2c3d4e5f68",
    name: "Maria Frianzo",
    phoneNumber: "+52 554 123 4568",
    emergencyContact: "Juan Frianzo (Father) - +52 554 000 1111",
    notes: "Allergic to latex bands.",
    startOfTerm: today.toISOString(),
    endOfTerm: getNextMonth(today).toISOString(),
    active: true,
  },
];
