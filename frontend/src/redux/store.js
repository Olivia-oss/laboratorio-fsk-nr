import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth";
import patientReducer from "./patient";

const store = configureStore({
  reducer: {
    auth: authReducer,
    patinets: patientReducer,
  },
});

export default store;
