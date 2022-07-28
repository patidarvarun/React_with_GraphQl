import { TextareaAutosize } from "@mui/material";
import { useState } from "react";
import { gql } from "apollo-boost";
import { useMutation } from "@apollo/react-hooks";

const AddProduct = () => {
  const [user, setUser] = useState({ cat_id: "62c2c13e90cd5d792fc50a0d" });
  const handleOnChange = (event) => {
    setUser({ ...user, [event.target.name]: event.target.value });
  };
  const ADD_PRODUCT = gql`
    mutation createProduct(
      $name: String!
      $price: String!
      $description: String!
      $quantity: String!
      $cat_id: String!
    ) {
      createProduct(
        product: {
          name: $name
          price: $price
          description: $description
          quantity: $quantity
          cat_id: $cat_id
        }
      ) {
        name
        price
        description
        quantity
        cat_id
      }
    }
  `;
  const [createUser, { data }] = useMutation(ADD_PRODUCT);

  const handleSubmit = async (e) => {
    e.preventDefault();
    createUser({ variables: { ...user } });
  };
  return (
    <div className="container-scroller">
      <div className="container-fluid page-body-wrapper">
        <div className="main-panel formalign">
          <span className="heading ml-4 ">Add Product</span>
          <form
            id="prodvali"
            className="mx-1 mx-md-4 myFormCss"
            onSubmit={handleSubmit}
          >
            <div className="d-flex flex-row align-items-center mb-4">
              <div className="form-outline flex-fill mb-0">
                <label className="form-label" htmlFor="name">
                  Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="form-control"
                  placeholder="Enter Product Name"
                  onChange={handleOnChange}
                />{" "}
                <span id="demo2"></span>
              </div>
            </div>
            <div className="d-flex flex-row align-items-center mb-4">
              <div className="form-outline flex-fill mb-0">
                <label className="form-label" htmlFor="form3Example3c">
                  Image *
                </label>
                <input
                  type="file"
                  id="image"
                  name="image"
                  className="form-control"
                  placeholder="upload image"
                  style={{
                    border: "1px solid #bfe9ae",
                  }}
                  onChange={handleOnChange}
                />
              </div>
            </div>
            <div className="d-flex flex-row align-items-center mb-4">
              <div className="form-outline flex-fill mb-0">
                <label className="form-label" htmlFor="description">
                  Description *
                </label>
                <TextareaAutosize
                  style={{
                    height: "47px",
                    overflow: "hidden",
                    marginTop: "0px",
                    marginBottom: " 0px",
                    border: "1px solid #b8ebb8",
                    width: "-webkit-fill-available",
                  }}
                  id="description"
                  name="description"
                  className="form-control"
                  placeholder="Description"
                  onChange={handleOnChange}
                />
                <span id="demo2"></span>
              </div>
            </div>
            <div className="d-flex flex-row align-items-center mb-4">
              <div className="form-outline flex-fill mb-0">
                <label className="form-label" htmlFor="quantity">
                  Quantity *
                </label>
                <input
                  type="number"
                  id="quantity"
                  name="quantity"
                  className="form-control"
                  placeholder="Enter quantity"
                  onChange={handleOnChange}
                />{" "}
                <span id="demo2"></span>
              </div>
            </div>
            <div className="d-flex flex-row align-items-center mb-4">
              <div className="form-outline flex-fill mb-0">
                <label className="form-label" htmlFor="price">
                  Price *
                </label>
                <input
                  type="number"
                  id="price"
                  name="price"
                  className="form-control"
                  placeholder="Enter price"
                  onChange={handleOnChange}
                />{" "}
                <span id="demo2"></span>
              </div>
            </div>
            <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
              <button
                type="submit"
                className="btn btn-primary pl-5 pr-5 pt-2 pb-2 "
              >
                Add
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;
