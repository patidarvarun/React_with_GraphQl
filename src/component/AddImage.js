// import { gql, useMutation } from "@apollo/client";
import { gql, useMutation } from "@apollo/react-hooks";
import { useState } from "react";

const ADD_IMAGE = gql`
  mutation uploadFile($file: Upload!) {
    uploadFile(file: $file) {
      filename
    }
  }
`;

const AddImage = () => {
  const [files, setFiless] = useState([]);

  const [uploadFilee] = useMutation(ADD_IMAGE, {
    onCompleted: (data) => console.log(data),
  });

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFiless(file);
    // console.log("##########", file);
    // if (!file) return UploadFile({ variables: { file } });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    getBase64(file, cb) {
      let reader = new FileReader();
      reader.readAsDataURL(files);
      reader.onload = function () {
          cb(reader.result)
      };
      reader.onerror = function (error) {
          console.log('Error: ', error);
      };
  }
    console.log("@#$$$$$$$$$$$Submit", files);
    uploadFilee({ variables: { name: "varun", filename: "okkk2" } });

    // setTimeout(() => {
    //   window.location = "./";
    // }, 2000);
  };

  return (
    <div className="d-flex flex-row align-items-center mb-4">
      <div className="form-outline flex-fill mb-0">
        <form onSubmit={handleSubmit}>
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
            onChange={handleFileChange}
          />
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default AddImage;
