import { configureStore } from "@reduxjs/toolkit";
import auth from "./auth";
import movie from "./movie";

const store = configureStore({
  reducer: {
    auth,
    movie,
  },
});

export default store;
