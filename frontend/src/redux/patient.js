import { createSlice } from "@reduxjs/toolkit";
import { PatientRequest } from "../api/request/patient";

export const requstAllPatinet = () => async (dispatch) => {
  dispatch(fetchStartPatient());
  try {
    const response = await PatientRequest.getPatients();

    if (response) {
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
const patientSlice = createSlice({
  name: "patient",
  initialState: {
    data: [],
    status: "idle",
    error: null,
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

      const index = state.data.findIndex((item) => item.id === id);
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
    resetStatusPatient: (state) => {
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
} = patientSlice.actions;

export default patientSlice.reducer;
