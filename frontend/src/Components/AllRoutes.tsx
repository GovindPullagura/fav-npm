import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../Pages/Home";
import Favourites from "../Pages/Favourites";

const AllRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/favourites" element={<Favourites />} />
    </Routes>
  );
};

export default AllRoutes;
