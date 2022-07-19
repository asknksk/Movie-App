import React from "react";
import { useSelector } from "react-redux";

const Home = () => {
  const { user } = useSelector((state) => state.auth);

  if (user) {
    return (
      <div>
        <h1>Oturumun Açık ({user.email})</h1>
      </div>
    );
  }

  return <div>Home</div>;
};

export default Home;
