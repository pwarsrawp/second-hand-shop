import Navbar from "../components/Navbar";
import { useState } from "react";
import axios from "axios";
import { useContext } from 'react';
import { AuthContext } from "../context/auth.context";
import { postOne } from "../functions/api.calls";

function UploadPage() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [res, setRes] = useState({});
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Arts and Crafts");
  const [condition, setCondition] = useState("new");
  const [price, setPrice] = useState(0);
  const [sold, setSold] = useState("false");
  const [uploadDone, setUploadDone] = useState(false);
  const { user } = useContext(AuthContext);
  const api_url = import.meta.env.VITE_API_URL;
  
  const handleUpload = async (event) => {
    event.preventDefault()
    try {
      setLoading(true);
      const data = new FormData();
      data.append("title", title);
      data.append("description", description);
      data.append("category", category);
      data.append("price", price);
      data.append("sold", sold);
      data.append("seller", user._id);
      data.append("imageUrl", event.target.image.files[0]);
      data.append("item_condition", condition);
      const res = await postOne(`${api_url}/products`, data);
      console.log(res.data);
      setRes(res.data);
      setUploadDone(true);
      setSold(false);
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="upload-page-container">
      <h1>Post new product</h1>
          <form onSubmit={handleUpload} encType="multipart/form-data">
            
              <label>Title:</label>
                <input
                  value={title}
                  name="title"
                  onChange={(event) => setTitle(event.target.value)}
                  required
                />              
            
            
              <label>Description:</label>
                <textarea
                  name="description"
                  value={description}
                  onChange={(event) => setDescription(event.target.value)}
                  required
                >
                  {""}
                </textarea>              
            
            
              <label>Price:</label>
                <input
                  type="number"
                  value={price}
                  name="price"
                  onChange={(event) => setPrice(event.target.value)}
                  required
                />              
            
            
              <label>Select a Category:</label>
              <div className="upload-page-dropdown-container">
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
            
            
              <label>Select a Condition:</label>
              <div className="dropdown-container">
                <select
                  name="state"
                  required
                  onChange={(event) => setCondition(event.target.value)}
                >
                  <option value="new">new</option>
                  <option value="as good as new">
                    as good as new
                  </option>
                  <option value="good">good</option>
                  <option value="fair">fair</option>
                  <option value="has given it all">
                    has given it all
                  </option>
                </select>
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
    </>
  );
}

export default UploadPage;
