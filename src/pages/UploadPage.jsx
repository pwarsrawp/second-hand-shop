import Navbar from "../components/Navbar";
import { useState } from "react";
import axios from "axios";
import "./UploadPage.css";

function UploadPage() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [res, setRes] = useState({});
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState(0);

  const handleSelectFile = (e) => setFile(e.target.files[0]);
  const deleteSelectedFile = () => setFile(null);
  const handleUpload = async () => {
    try {
      setLoading(true);
      const data = new FormData();
      data.append("my_file", file);
      const res = await axios.post("http://localhost:5005/products", file);
      console.log(res.data);
      setRes(res.data);
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
          <form>
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
                id="file"
                type="file"
                onChange={handleSelectFile}
                multiple={false}
              />
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
              {file && (
                <button onClick={deleteSelectedFile}>Remove File</button>
              )}
              <div>
                <button onClick={handleUpload} className="btn-green">
                  {loading ? "uploading..." : "upload"}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default UploadPage;
