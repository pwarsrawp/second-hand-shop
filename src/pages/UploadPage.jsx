import Navbar from "../components/Navbar";
import { useState } from "react";
import axios from "axios";
import "./UploadPage.css";
import { useContext } from 'react';
import { AuthContext } from "../context/auth.context";

function UploadPage() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [res, setRes] = useState({});
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Arts and Crafts");
  const [price, setPrice] = useState(0);
  const [uploadDone, setUploadDone] = useState(false);
  const { user } = useContext(AuthContext);
  
  const handleUpload = async (event) => {
    event.preventDefault()
    try {
      setLoading(true);
      const data = new FormData();
      data.append("title", title);
      data.append("description", description);
      data.append("category", category);
      data.append("price", price);
      data.append("seller", user._id);
      data.append("imageUrl", event.target.image.files[0]);
      const res = await axios.post("http://localhost:5005/products", data);
      console.log(res.data);
      setRes(res.data);
      setUploadDone(true);
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div>
        <div>
          <form onSubmit={handleUpload} encType="multipart/form-data">
            <div>
              <label>
                Title:
                <input
                  value={title}
                  name="title"
                  placeholder="Title"
                  onChange={(event) => setTitle(event.target.value)}
                  required
                />
              </label>
            </div>

            <div>
              <label>
                Description:
                <textarea
                  name="description"
                  value={description}
                  onChange={(event) => setDescription(event.target.value)}
                  required
                >
                  {""}
                </textarea>
              </label>
            </div>

            <div>
              <label>
                Price:
                <input
                  type="number"
                  value={price}
                  name="price"
                  placeholder="Price"
                  onChange={(event) => setPrice(event.target.value)}
                  required
                />
              </label>
            </div>

            <div>
              <label>Select an option:</label>
              <div className="dropdown-container">
                <select
                  name="category"
                  required
                  onChange={(event) => setCategory(event.target.value)}
                >
                  <option value="Arts and Crafts">Arts and Crafts</option>
                  <option value="Musical Instruments">
                    Musical Instruments
                  </option>
                  <option value="Literature">Literature</option>
                  <option value="Bycicles">Bycicles</option>
                  <option value="Fashion and Accesories">
                    Fashion and Accesories
                  </option>
                  <option value="Electronics">Electronics</option>
                  <option value="Automotive">Automotive</option>
                  <option value="Miscellaneous">Miscellaneous</option>
                </select>
              </div>
            </div>

            {/* CLOUDINARY */}
            <div className="App">
              <label htmlFor="file" className="btn-grey">
                {" "}
                select file
              </label>
              {file && <center> {file.name}</center>}             
              <input
                name="image"
                id="file"
                type="file"
               // multiple={false}
                accept="image/jpg, image/png"
              />         
              {file && (
                <button onClick={deleteSelectedFile}>Remove File</button>
              )}
              <div>
                <button className="btn-green">
                  {loading ? "uploading..." : "upload"}
                </button>
              </div>
            </div>
          </form>
          {uploadDone ? (
        <p>Upload done!</p>
      ) : (
        <code>
          {Object.keys(res).length > 0
            ? Object.keys(res).map((key) => (
                <p className="output-item" key={key}>
                  <span>{key}:</span>
                  <span>
                    {typeof res[key] === "object" ? "object" : res[key]}
                  </span>
                </p>
              ))
            : null}
        </code>
      )}


        </div>
      </div>
    </>
  );
}

export default UploadPage;
