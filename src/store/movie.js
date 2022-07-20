import { createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import axios from "axios";

// const axios = require("axios");
const apiKey = process.env.REACT_APP_TMDB_KEY;
const url = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}`;
const getSearchMovie = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=`;

const movie = createSlice({
  name: "movie",
  initialState: {
    data: [],
  },
  reducers: {
    movieGet: (state, action) => {
      state.data = [action.payload];
    },
    movieSearch: (state, action) => {
      state.data = [action.payload];
    },
  },
});

export const getMovie = (data) => async (dispatch) => {
  try {
    const { data } = await axios.get(url);
    dispatch(movieGet(data.results));
  } catch (err) {
    toast.error("api error");
  }
};

export const searchMovie = (data) => async (dispatch) => {
  try {
    const { data } = await axios.get(getSearchMovie);
    dispatch(movieSearch(data.response));
  } catch (error) {
    toast.error("search error");
  }
};

export const { movieSearch, movieGet } = movie.actions;
export const { movies } = (state) => state.movie.data;
export default movie.reducer;

// const films = async () => {
//   const { data } = await axios.get(url);
//   console.log(data);
// };
// const initialState = {
//   searching: "",
//   movies: "",
//   detailMovie: "",
//   videoKey: "",
//   data,
// };
