import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchUser, sendUser } from "../utils/usersAPICalls";
import UserEditForm from "../components/UserEditForm";

const UpdateUserPage = () => {
  const navigate = useNavigate();
  const { userId } = useParams();
  const [user, setUser] = useState();

  useEffect(() => {
    fetchUser(userId, setUser);
  }, []);

  const handleUpdateUser = async (payload) => {
    const UpdatedUser = {
      name: payload.name,
      usernmae: payload.username,
      email: payload.email,
      phone: payload.phone,
      street: payload.street,
      country: payload.country,
    };
    const response = await sendUser(UpdatedUser, userId, "PUT");
    const parsed = await response.json();
    navigate(`/users/${parsed._id}`);
  };
  return (
    <>{user && <UserEditForm onSubmit={handleUpdateUser} user={user} />}</>
  );
};
export default UpdateUserPage;
