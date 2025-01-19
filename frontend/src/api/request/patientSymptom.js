import api from "../api";

export const PatientSymptomRequest = {
  getSymptom: async (id) => {
    const response = await api.get("/patient-symptom/patient/" + id);

    if (response.status === 200) {
      if (response.data.message === "Request successfully") {
        return response.data.patients;
      }
    }
    return null;
  },
  postPatientSymptom: async (data) => {
    const response = await api.post("/patient-symptom", data);

    if (response.status === 201) {
      if (response.data.message === "Created patientSymptom successfully") {
        return response.data.symptom;
      }
    }
    return false;
  },

  deleteSymptom: async (id) => {
    const response = await api.delete("/patient-symptom/" + id);

    if (response.status === 200) {
      if (response.data.message === "Delete patientSymptom successfully") {
        return true;
      }
    }
    return false;
  },
};
