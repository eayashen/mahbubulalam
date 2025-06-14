import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./auth-slice";
import aboutSlice from "./admin/about-slice";
import awardSlice from "./admin/award-slice";
import fundingSlice from "./admin/funding-slice";
import designationSlice from "./admin/designation-slice";
import researchSlice from "./admin/research-slice";
import publicationSlice from "./admin/publication-slice";
import contactSlice from "./admin/contact-slice";
import sociallinksSlice from "./admin/sociallinks-slice";
import consultancySlice from "./admin/consultancy-slice";
import mentorshipSlice from "./admin/mentorship-slice";
import visitorSlice from "./admin/visitor-slice";

import { loginData } from "./loginData";

const store = configureStore({
  reducer: {
    auth: authSlice,
    about: aboutSlice,
    award: awardSlice,
    funding: fundingSlice,
    designation: designationSlice,
    research: researchSlice,
    publication: publicationSlice,
    contact: contactSlice,
    socialLinks: sociallinksSlice,
    consultancy: consultancySlice,
    mentorship: mentorshipSlice,
    visitor: visitorSlice,
    loginData: loginData.reducer,
  },
});

export default store;
