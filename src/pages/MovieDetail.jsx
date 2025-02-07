import { Box, Button, Container, useMediaQuery } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useTheme } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const IMG_API = "https://image.tmdb.org/t/p/w1280";

function Details() {
  const navigate = useNavigate();
  const [movieDetails, setMovieDetails] = useState({});
  const [movies, setMovies] = useState([]);

  const { id } = useParams();
  const {
    title,
    poster_path,
    overview,
    vote_average,
    release_date,
    vote_count,
  } = movieDetails;
  const { key } = movies;
  const API_KEY = process.env.REACT_APP_TMDB_KEY;
  const movieDetailBaseUrl = `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}`;
  const defaultImage =
    "https://images.unsplash.com/photo-1581905764498-f1b60bae941a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=700&q=80";
  const videoUrl = `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${API_KEY}`;
  useEffect(() => {
    axios
      .get(movieDetailBaseUrl)
      .then((res) => setMovieDetails(res.data))
      .catch((err) => console.log(err));
    getMovies();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [movieDetailBaseUrl]);

  const getMovies = async () => {
    try {
      const { data } = await axios.get(videoUrl);
      setMovies(data.results[0]);
    } catch (err) {
      toast.error(err);
    }
  };
  useEffect(() => {
    getMovies();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  return (
    <>
      <div class="video-background">
        <div class="video-foreground">
          <iframe
            src={`https://www.youtube.com/embed/${key}?autoplay=1&mute=1&loop=1&playlist=${key}`}
            title={title}
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen="true"
          ></iframe>
        </div>
      </div>

      <Container maxWidth="md" sx={{ marginTop: "4rem" }}>
        <Card
          className="detail-card"
          sx={{
            display: "flex",
            marginTop: isMobile ? "3rem" : "8rem",
            flexDirection: isMobile ? "column" : "row",
          }}
        >
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <CardContent sx={{ flex: "1 0 auto" }}>
              <Typography component="div" variant="h4">
                {title}
              </Typography>
              <Typography
                variant="subtitle1"
                color="text.secondary"
                component="div"
              >
                {overview}
              </Typography>
              <Typography
                variant="h6"
                color="text.secondary"
                component="div"
                sx={{ marginTop: "1rem" }}
              >
                <span style={{ color: "#1976d2" }}>Release Date :</span>{" "}
                {release_date}
              </Typography>
              <Typography
                variant="h5"
                color="text.secondary"
                component="div"
                sx={{ marginTop: "1rem", marginBottom: "1rem" }}
              >
                <span style={{ color: "#1976d2" }}>Rate :</span> {vote_average}
              </Typography>
              <Typography
                variant="h5"
                color="text.secondary"
                component="div"
                sx={{ marginTop: "1rem", marginBottom: "1rem" }}
              >
                <span style={{ color: "#1976d2" }}>Vote Count :</span>{" "}
                {vote_count}
              </Typography>
              <Button
                variant="contained"
                color="success"
                onClick={() => navigate(-1)}
              >
                Back
              </Button>
            </CardContent>
          </Box>
          <CardMedia
            component="img"
            sx={{
              maxWidth: 300,
              height: 400,
              objectFit: "contain",
              display: "block",
              margin: "auto",
              order: isMobile ? "-1" : "1",
            }}
            image={poster_path ? IMG_API + poster_path : defaultImage}
            alt="film poster"
          />
        </Card>
      </Container>
    </>
  );
}

export default Details;
