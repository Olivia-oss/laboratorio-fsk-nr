import api from "../api";

export const SymptomRequest = {
  getSymptoms: async () => {
    const response = await api.get("/symptom");

    if (response.status === 200) {
      if (response.data.message === "Request successfully") {
        return response.data.patients;
      }
    }
    return null;
  },
  postSymptom: async (data) => {
    const response = await api.post("/symptom", data);

    if (response.status === 201) {
      if (response.data.message === "Created symptom successfully") {
        return true;
      }
    }
    return false;
  },
  putSymptom: async (data, id) => {
    const response = await api.put("/symptom/" + id, data);

    if (response.status === 200) {
      if (response.data.message === "Updated symptom successfully") {
        return response.data.patient;
      }
    }
    return null;
  },
  deleteSymptom: async (id) => {
    const response = await api.delete("/symptom/" + id);

    if (response.status === 200) {
      if (response.data.message === "Deleted symptom successfully") {
        return true;
      }
    }
    return false;
  },
};
