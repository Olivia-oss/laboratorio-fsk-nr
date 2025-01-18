import { configureStore } from "@reduxjs/toolkit";
import authRedux from "./auth";

const store = configureStore({
  reducer: {
    auth: authRedux,
  },
});

export default store;
