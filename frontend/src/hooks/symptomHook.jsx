import { useState } from "react";
import { SymptomRequest } from "../api/request/symptom";

function useSymptomHook() {
  const [loading, setLoading] = useState(false);
  const [symptoms, setSymptoms] = useState([]);

  const getSymptoms = async () => {
    setLoading(true);

    const symptomList = await SymptomRequest.getSymptoms();
    setSymptoms(symptomList);
    setLoading(false);
  };

  return { loading, symptoms, getSymptoms };
}

export default useSymptomHook;
