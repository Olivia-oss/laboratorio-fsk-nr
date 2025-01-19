import api from "../api";

export const PatientRequest = {
  getPatients: async () => {
    const response = await api.get("/patient");

    if (response.status === 200) {
      if (response.data.message === "Request successfully") {
        return response.data.patients;
      }
    }
    return null;
  },
  postPatient: async (data) => {
    const response = await api.post("/patient", data);

    if (response.status === 201) {
      if (response.data.message === "Created patient successfully") {
        return response.data.patient;
      }
    }
    return null;
  },
  putPatient: async (data, id) => {
    const response = await api.put("/patient/" + id, data);

    if (response.status === 200) {
      if (response.data.message === "Updated patient successfully") {
        return response.data.patient;
      }
    }
    return null;
  },
  deletePatient: async (id) => {
    const response = await api.delete("/patient/" + id);

    if (response.status === 200) {
      if (response.data.message === "Deleted patient successfully") {
        return true;
      }
    }
    return false;
  },
};
