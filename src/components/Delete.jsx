import { useContext } from "react";
import { AuthContext } from "../context/auth.context";
import { deleteOne } from "../functions/api.calls";
import { useNavigate } from "react-router-dom";
const api_url = import.meta.env.VITE_API_URL;


function Delete() {
  const { user, logout } = useContext(AuthContext)
  const navigate = useNavigate()

  const handleDelete = async () => {
    if(window.confirm("Are you sure? Your account will be permanently deleted")){
      await deleteOne(`${api_url}/users/${user._id}`) 
      logout()
      navigate("/")
    }
  }
 
  return (
  <div>
    <button onClick={handleDelete} className="profile-page-delete-button">Delete</button>
  </div>
  );
}

export default Delete;


