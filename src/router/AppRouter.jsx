import { Search } from "@mui/icons-material";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavBar from "../components/Navbar";
import SearchBar from "../components/SearchBar";
import Home from "../pages/Home";
import Login from "../pages/Login";
import MovieDetail from "../pages/MovieDetail";
import Register from "../pages/Register";
import PrivateRouter from "./PrivateRouter";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <NavBar />
      <SearchBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/moviedetail" element={<PrivateRouter />}>
          <Route path="" element={<MovieDetail />} />
        </Route>
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
