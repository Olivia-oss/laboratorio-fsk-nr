import { createSlice } from "@reduxjs/toolkit";
import { AuthRequest } from "../api/request/auth";

export const requstLogin = (data) => async (dispatch) => {
  dispatch(fetchStartAuth());
  try {
    const response = await AuthRequest.postLogin(data);

    if (response) {
      dispatch(fetchSuccesAuth(response));
    } else {
      dispatch(fetchFailureAuth("request-empty"));
    }
  } catch (error) {
    dispatch(fetchFailureAuth(error.message));
  }
};

export const requstSingIn = (data) => async (dispatch) => {
  dispatch(fetchStartAuth());
  try {
    const response = await AuthRequest.postSign(data);

    if (response) {
      dispatch(fetchSuccesAuth(true));
    } else {
      dispatch(fetchFailureAuth("request-empty"));
    }
  } catch (error) {
    dispatch(fetchFailureAuth(error.message));
  }
};

const authSlice = createSlice({
  name: "auth",
  initialState: {
    login: false,
    status: "idle",
    error: null,
  },

  reducers: {
    setAuth: (state, action) => {
      state.login = action.payload;
    },
    fetchStartAuth: (state) => {
      state.status = "loading";
    },
    fetchSuccesAuth: (state, action) => {
      state.status = "succeeded";
      state.login = action.payload;
    },
    fetchFailureAuth: (state, action) => {
      state.status = "failed";
      state.error = action.payload;
    },
  },
});

export const { setAuth, fetchStartAuth, fetchSuccesAuth, fetchFailureAuth } =
  authSlice.actions;
export default authSlice.reducer;
