import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./auth-slice";
import aboutSlice from "./admin/about-slice";
import fundingSlice from "./admin/funding-slice";
import designationSlice from "./admin/designation-slice";

import { loginData } from "./loginData";

const store = configureStore({
  reducer: {
    auth: authSlice,
    about: aboutSlice,
    funding: fundingSlice,
    designation: designationSlice,
    loginData: loginData.reducer,
  },
});

export default store;
