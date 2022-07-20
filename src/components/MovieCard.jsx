import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

import { useNavigate } from "react-router-dom";
// import { CardContent } from '@mui/material';
import backupImage from "../assets/tmdb.jfif";
import spinner from "../assets/spinner.gif";

const imgUrl = "https://image.tmdb.org/t/p/w1280";

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

  const onImageLoaded = () => {
    setLoaded(true);
  };

  return (
    <div>
      <Card className="card" sx={{ maxWidth: 300, margin: "auto" }}>
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
                : backupImage
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
