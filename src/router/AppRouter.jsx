import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavBar from "../components/Navbar";
import Home from "../pages/Home";
import Login from "../pages/Login";
import MovieDetail from "../pages/MovieDetail";
import Register from "../pages/Register";
import PrivateRouter from "./PrivateRouter";
import { Provider } from "react-redux";
import store from "../store/index";
import { Toaster } from "react-hot-toast";
import UpdateProfile from "../components/UpdateProfile";

const AppRouter = () => {
  return (
    <Provider store={store}>
      <Toaster position="top-right" />

      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/update" element={<UpdateProfile />} />

          <Route path="/detail:id" element={<PrivateRouter />}>
            <Route path="" element={<MovieDetail />} />
          </Route>
          <Route path="/register" element={<Register />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
};

export default AppRouter;
