import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import spinner from "../assets/spinner.gif";

const imgUrl = "https://image.tmdb.org/t/p/w1280";
const defaultImage =
  "https://images.unsplash.com/photo-1581905764498-f1b60bae941a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=700&q=80";
export default function MovieCard({
  title,
  poster_path,
  overview,
  vote_average,
  id,
}) {
  // const {getMovieDetails} = useContext(AppContext);
  const navigate = useNavigate();
  const [loaded, setLoaded] = React.useState(false);
  const { user } = useSelector((state) => state.auth);

  const onImageLoaded = () => {
    setLoaded(true);
  };

  return (
    <div>
      <Card
        className="card"
        sx={{ maxWidth: 300, margin: "auto" }}
        onClick={() => {
          navigate("/detail/" + id);
          // !user && alert("Please login to see detail");
        }}
      >
        <Typography className="overview" variant="body1" color="text.primary">
          {overview}
        </Typography>
        <CardMedia
          component="img"
          height="300"
          onLoad={onImageLoaded}
          image={
            loaded
              ? poster_path
                ? imgUrl + poster_path
                : defaultImage
              : spinner
          }
          alt={title}
          sx={{ objectFit: "contain" }}
        />

        <CardActions>
          {/* onClick={()=>getMovieDetails(id,navigate,title)} */}
          <Button size="small">DETAILS</Button>
          <Typography variant="h4" color="primary" sx={{ marginLeft: "auto" }}>
            {vote_average}
          </Typography>
        </CardActions>
      </Card>
    </div>
  );
}
