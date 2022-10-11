import React, { Component } from "react";
import { Routes, Route } from "react-router-dom";
import AddImage from "../component/AddImage";
import AddProduct from "../component/AddProduct";
import CheckoutButton from "../component/CheckoutButton";
import GetAllProduct from "../component/GetAllProduct";

class Routers extends Component {
  state = {};

  render() {
    return (
      <>
        <Routes>
          <Route exact path="/addProduct" element={<AddProduct />} />
          <Route exact path="/" element={<GetAllProduct />} />
          <Route exact path="/addImage" element={<AddImage />} />
          <Route exact path="/checkout" element={<CheckoutButton />} />
        </Routes>
      </>
    );
  }
}

export default Routers;
