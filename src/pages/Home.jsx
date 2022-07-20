import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
// import Header from "../components/Header";
import MovieCard from "../components/MovieCard";
import { Container, Grid } from "@mui/material";

const Home = () => {
  const { user } = useSelector((state) => state.auth);

  const apiKey = process.env.REACT_APP_TMDB_KEY;
  const url = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}`;
  const getSearchMovie = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=`;

  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);

  const getMovie = async () => {
    try {
      const { data } = await axios.get(url);
      setMovies(data.results);
      setLoading(true);
    } catch (err) {
      toast.error("api error");
    }
  };
  useEffect(() => {
    getMovie();
  }, []);

  if (!loading) {
    return <h2>Loading wait</h2>;
  }

  return (
    <Container sx={{ marginTop: "4rem" }}>
      {/* <Header /> */}
      <Grid
        container
        justifyContent="center"
        spacing={4}
        sx={{ paddingTop: "2rem" }}
      >
        {movies.map((movie) => {
          return (
            <Grid key={movie.id} item xs={12} sm={6} md={4} lg={3}>
              <MovieCard {...movie} />
            </Grid>
          );
        })}
      </Grid>
    </Container>
  );
};

export default Home;
