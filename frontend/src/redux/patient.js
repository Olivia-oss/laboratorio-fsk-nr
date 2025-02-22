import { createSlice } from "@reduxjs/toolkit";
import { PatientRequest } from "../api/request/patient";
import { PatientSymptomRequest } from "../api/request/patientSymptom";
import { setAuth } from "./auth";

export const requstAllPatinet = () => async (dispatch) => {
  dispatch(fetchStartPatient());
  try {
    const response = await PatientRequest.getPatients();

    if (response) {
      dispatch(setAuth(true));

      dispatch(fetchSuccesPatient(response));
    } else {
      dispatch(fetchFailurePatient("request-empty"));
    }
  } catch (error) {
    dispatch(fetchFailurePatient(error.message));
  }
};

export const requstCreatePatinet = (data) => async (dispatch) => {
  dispatch(fetchStartPatient());
  try {
    const response = await PatientRequest.postPatient(data);

    if (response) {
      dispatch(fetchCreateSuccessePatient(response));
    } else {
      dispatch(fetchFailurePatient("request-empty"));
    }
  } catch (error) {
    dispatch(fetchFailurePatient(error.message));
  }
};

export const requstUpdatePatinet = (id, data) => async (dispatch) => {
  dispatch(fetchStartPatient());
  try {
    const response = await PatientRequest.putPatient(data, id);

    if (response) {
      dispatch(
        fetchCupdateSuccessPartient({
          id,
          updateData: response,
        })
      );
    } else {
      dispatch(fetchFailurePatient("request-empty"));
    }
  } catch (error) {
    dispatch(fetchFailurePatient(error.message));
  }
};

export const requstDeletePatinet = (id) => async (dispatch) => {
  dispatch(fetchStartPatient());
  try {
    const response = await PatientRequest.deletePatient(id);

    if (response) {
      dispatch(fechDeleteSuccessPatient(id));
    } else {
      dispatch(fetchFailurePatient("request-empty"));
    }
  } catch (error) {
    dispatch(fetchFailurePatient(error.message));
  }
};

export const requstUpdatePatinetSymptom =
  (id, data, symptom) => async (dispatch) => {
    dispatch(fetchStartPatientSymptom());
    try {
      const response = await PatientSymptomRequest.postPatientSymptom(data);

      if (response) {
        dispatch(
          fetchCupdateSuccessPartientSymptom({
            symptomNew: {
              symptom,
            },
            id,
          })
        );
      } else {
        //dispatch(fetchFailurePatient("request-empty"));
      }
    } catch {
      //   dispatch(fetchFailurePatient(error.message));
    }
  };

const patientSlice = createSlice({
  name: "patient",
  initialState: {
    data: [],
    status: "idle",
    error: null,
    statusSymptom: "idle",
  },

  reducers: {
    fetchStartPatient: (state) => {
      state.status = "loading";
    },
    fetchSuccesPatient: (state, action) => {
      state.status = "succeeded";
      state.data = action.payload;
    },
    fetchFailurePatient: (state, action) => {
      state.status = "failed";
      state.error = action.payload;
    },
    fetchCreateSuccessePatient: (state, action) => {
      state.status = "succeeded";
      state.data.push(action.payload);
    },
    fetchCupdateSuccessPartient: (state, action) => {
      state.status = "succeeded";
      const { id, updateData } = action.payload;

      const index = state.data.findIndex((item) => item._id === id);

      if (index !== -1) {
        state.data[index] = {
          ...state.data[index],
          ...updateData,
        };
      }
    },
    fechDeleteSuccessPatient: (state, action) => {
      state.status = "succeeded";
      const id = action.payload;
      state.data = state.data.filter((item) => item._id !== id);
    },
    fetchCupdateSuccessPartientSymptom: (state, action) => {
      state.statusSymptom = "succeeded";
      const { id, symptomNew } = action.payload;

      const index = state.data.findIndex((item) => item._id === id);
      console.log(index, "index");

      if (index !== -1) {
        state.data[index] = {
          ...state.data[index],
          symptoms: [
            ...state.data[index].symptoms, // Spread the existing symptoms array
            symptomNew, // Append the new symptom
          ],
        };
      }
    },
    fetchStartPatientSymptom: (state) => {
      state.status = "loading";
    },
    resetStatusPatient: (state) => {
      state.status = "idle";
    },
    resetStatusPatientSymptom: (state) => {
      state.status = "idle";
    },
  },
});

export const {
  fetchStartPatient,
  fetchSuccesPatient,
  fetchFailurePatient,
  fetchCreateSuccessePatient,
  resetStatusPatient,
  fetchCupdateSuccessPartient,
  fechDeleteSuccessPatient,
  fetchCupdateSuccessPartientSymptom,
  fetchStartPatientSymptom,
  resetStatusPatientSymptom,
} = patientSlice.actions;

export default patientSlice.reducer;
