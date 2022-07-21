import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import MovieCard from "../components/MovieCard";
import { Container, Grid } from "@mui/material";

const Home = () => {
  const { user } = useSelector((state) => state.auth);

  const apiKey = process.env.REACT_APP_TMDB_KEY;
  const url = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}`;
  const searchApi = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=`;

  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchItem, setSearchItem] = useState("");

  const getMovie = async (API) => {
    try {
      const { data } = await axios.get(API);
      setMovies(data.results);
      setLoading(true);
    } catch (err) {
      toast.error("api error");
    }
  };
  useEffect(() => {
    getMovie(url);
  }, []);

  if (!loading) {
    return <h2>Loading wait</h2>;
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchItem && user) {
      getMovie(searchApi + searchItem);
    } else if (!user) {
      alert("Please login to search a movie");
    } else {
      alert("Please enter a text");
    }
  };

  return (
    <>
      <form className="search" onSubmit={handleSubmit}>
        <input
          type="search"
          className="search-input"
          placeholder="Search a movie..."
          onChange={(e) => setSearchItem(e.target.value)}
        />
        <button type="submit" className="search-button">Search</button>
      </form>
      <Container sx={{ marginTop: "4rem" }}>
        <Grid
          container
          justifyContent="center"
          spacing={4}
          sx={{ paddingTop: "2rem" }}
        >
          {movies.map((movie) => {
            return (
              <Grid key={movie.id} item xs={12} sm={6} md={4} lg={3}>
                <MovieCard {...movie} key={movie.id} />
              </Grid>
            );
          })}
        </Grid>
      </Container>
    </>
  );
};

export default Home;
