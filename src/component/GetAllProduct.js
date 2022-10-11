import { Fragment, useEffect, useState } from "react";
import { gql } from "apollo-boost";
import { useMutation, useQuery } from "@apollo/react-hooks";
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

  const [name, setName] = useState();
  const [price, setPrice] = useState();
  const [description, setDescription] = useState();
  const [quantity, setQuantity] = useState();
  const [cat_id, setCat] = useState("62f1fb62a777920bd748b911");
  const [base, setBase] = useState("");

  const query = gql`
    {
      getAllProduct {
        name
        price
        image
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
      $image: String!
      $description: String!
      $quantity: String!
    ) {
      updateProduct(
        id: $id
        product: {
          name: $name
          price: $price
          image: $image
          description: $description
          quantity: $quantity
        }
      ) {
        name
        price
        image
        description
        quantity
      }
    }
  `;
  const saveFile = (e) => {
    let files = e.target.files;
    var allFiles = [];
    for (var i = 0; i < files.length; i++) {
      let file = files[i];

      let reader = new FileReader();

      reader.readAsDataURL(file);

      reader.onload = () => {
        let fileInfo = {
          name: file.name,
          type: file.type,
          size: Math.round(file.size / 1000) + " kB",
          base64: reader.result,
          file: file,
        };
        allFiles.push(fileInfo);
        setBase(allFiles[0].base64);
      };
    }
  };

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

    update_product({
      variables: {
        id: idd,
        name,
        image: base,
        quantity,
        price,
        description,
        cat_id,
      },
    });
    setTimeout(() => {
      window.location = "/";
    }, 2000);
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
                    onChange={(e) => setName(e.target.value)}
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
                    onChange={(e) => saveFile(e)}
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
                    onChange={(e) => setDescription(e.target.value)}
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
                    onChange={(e) => setQuantity(e.target.value)}
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
                    onChange={(e) => setPrice(e.target.value)}
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

      <h1 style={{ color: "red" }}>Here my all Products</h1>
      <a href="/addProduct">Add Product</a>
      <br />
      <hr />
      <a href="/checkout">Checkout</a>
      <hr />

      <br />
      <br />
      <br />
      <div>
        <table style={{ width: "100%" }}>
          <th>Id</th>
          <th>Name</th>
          <th>Price</th>
          <th>Quantity</th>
          <th>Image</th>
          <th>Edit</th>
          <th>Delete</th>
          <br />

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
                  <img
                    style={{ width: "80px", height: "80px" }}
                    src={`http://localhost:5000/${item.image}`}
                    alt={item.name}
                  />
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
    </div>
  );
}

export default GetAllProduct;
