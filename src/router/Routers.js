import React, { Component } from "react";
import { Routes, Route } from "react-router-dom";
import AddProduct from "../component/AddProduct";
import GetAllProduct from "../component/GetAllProduct";

class Routers extends Component {
  state = {};

  render() {
    return (
      <>
        <Routes>
          <Route exact path="/addProduct" element={<AddProduct />} />
          <Route exact path="/" element={<GetAllProduct />} />
        </Routes>
      </>
    );
  }
}

export default Routers;
