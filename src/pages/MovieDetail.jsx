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
    videoKey,
  } = movieDetails;

  const API_KEY = process.env.REACT_APP_TMDB_KEY;
  const movieDetailBaseUrl = `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}`;
  const baseImageUrl = "https://image.tmdb.org/t/p/w1280";
  const defaultImage =
    "https://images.unsplash.com/photo-1581905764498-f1b60bae941a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=700&q=80";
  const discoverUrl = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}`;

  useEffect(() => {
    axios
      .get(movieDetailBaseUrl)
      .then((res) => setMovieDetails(res.data))
      .catch((err) => console.log(err));
  }, [movieDetailBaseUrl]);

  const getMovies = async () => {
    try {
      const { data } = await axios.get(discoverUrl);
      setMovies(data.results);
    } catch (err) {
      toast.error(err);
    }
  };
  console.log(title);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  return (
    <>
      <div class="video-background">
        <div class="video-foreground">
          <iframe
            src={`https://www.youtube.com/embed/${videoKey}?autoplay=1&mute=1&loop=1&playlist=${videoKey}`}
            title={title}
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
          ></iframe>
        </div>
      </div>

      <Container maxWidth="md" sx={{ marginTop: "4rem" }}>
        <Typography
          variant="h3"
          noWrap
          component="div"
          color="primary"
          textAlign="center"
          sx={{ display: { xs: "block", sm: "none", cursor: "pointer" } }}
          onClick={() => {
            navigate("/");
            getMovies();
          }}
        >
          MOVIE APP
        </Typography>
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
                <span style={{ color: "orangered" }}>Release Date :</span>{" "}
                {release_date}
              </Typography>
              <Typography
                variant="h5"
                color="text.secondary"
                component="div"
                sx={{ marginTop: "1rem", marginBottom: "1rem" }}
              >
                <span style={{ color: "orangered" }}>Rate :</span>{" "}
                {vote_average}
              </Typography>
              <Button
                variant="contained"
                color="secondary"
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
            alt="Live from space album cover"
          />
        </Card>
      </Container>
    </>
  );
}

export default Details;
