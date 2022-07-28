import { Fragment, useEffect, useState } from "react";
import { gql } from "apollo-boost";
import { useMutation } from "@apollo/react-hooks";
import Box from "@mui/material/Box";
import { TextareaAutosize } from "@mui/material";
import Modal from "@mui/material/Modal";
const { request } = require("graphql-request");
const endpoint = `http://localhost:5000/graphql/`;

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

function GetAllProduct() {
  const [products, setProducts] = useState([]);
  const [open, setOpen] = useState(false);
  const [idd, setIdd] = useState("");
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [update, setUpdate] = useState();
  const handleOnChange = (event) => {
    setUpdate({ ...update, [event.target.name]: event.target.value });
  };
  const query = gql`
    {
      getAllProduct {
        name
        price
        quantity
        id
      }
    }
  `;

  const UPDATE_PRODUCT = gql`
    mutation updateProduct(
      $id: ID
      $name: String!
      $price: String!
      $description: String!
      $quantity: String!
    ) {
      updateProduct(
        id: $id
        product: {
          name: $name
          price: $price
          description: $description
          quantity: $quantity
        }
      ) {
        name
        price
        description
        quantity
      }
    }
  `;

  const product = async () => {
    const data = await request(endpoint, query);
    setProducts(data.getAllProduct);
  };
  useEffect(() => {
    product();
  }, []);

  const DELETE_PRODUCT = gql`
    mutation deleteProduct($id: ID) {
      deleteProduct(id: $id)
    }
  `;
  const [deletePro] = useMutation(DELETE_PRODUCT);
  const handleDelete = (id) => {
    deletePro({ variables: { id } });
    window.location = "/";
  };

  const [update_product, { data }] = useMutation(UPDATE_PRODUCT);

  const handleUpdate = (id) => {
    handleOpen();
    setIdd(id);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log("idd", idd);
    update_product({ variables: { ...update } });
  };

  return (
    <div className="App">
      <div>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <span className="heading ml-4 ">Update Product</span>
            <br />
            <form className="mx-1 mx-md-4 myFormCss" onSubmit={handleSubmit}>
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
                  Update
                </button>
              </div>
            </form>
          </Box>
        </Modal>
      </div>
      <a href="/addProduct">Add Product</a>
      <h1 style={{ color: "red" }}>Here my all Products</h1>
      <table>
        <th>Id</th>
        <th>Name</th>
        <th>Price</th>
        <th>Quantity</th>
        <th>Edit</th>
        <th>Delete</th>

        {products.map((item) => (
          <Fragment key={item.id}>
            <tr>
              <td>
                <p>{item.id}</p>
              </td>
              <td>
                <p>{item.name}</p>
              </td>
              <td>
                <p>{item.price}</p>
              </td>
              <td>
                <p>{item.quantity}</p>
              </td>
              <td>
                <button
                  onClick={() => {
                    handleUpdate(item.id);
                  }}
                >
                  Edit
                </button>
              </td>
              <td>
                <button
                  onClick={() => {
                    handleDelete(item.id);
                  }}
                >
                  Delete
                </button>
              </td>
            </tr>

            <br />
          </Fragment>
        ))}
      </table>
    </div>
  );
}

// function App() {
//   const [products, setProducts] = useState([]);
//   const id = "62de89a0aa4d2531d789c94c";
//   const query = gql`
//     {
//       getProductById(id:${id}) {
//         name
//         price
//         quantity
//         id
//       }
//     }
//   `;

//   const product = async () => {
//     const data = await request(endpoint, query);
//     setProducts(data.getProductById);
//   };
//   useEffect(() => {
//     product();
//   }, []);
//   console.log("@@@@@@@@@@@@@@@@", products);
//   return (
//     <div className="App">
//       <h1 style={{ color: "red" }}>Here my all Products</h1>
//
//       <>
//         <h3 style={{ color: "blue" }}>{products.id}</h3>
//         <p>{products.name}</p>
//         <p>{products.price}</p>
//         <p>{products.quantity}</p>
//       </>
//
//     </div>
//   );
// }

export default GetAllProduct;
