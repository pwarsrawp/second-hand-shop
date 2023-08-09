import { useNavigate, useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";

import UserEditForm from "../components/UserEditForm";

const UpdateUserPage = () => {
  const navigate = useNavigate();
  const { userId } = useParams();
  const [currUser, setCurrUser] = useState(null);
  const { setUserUpdate, user } = useContext();

  useEffect(() => {
    if (user) {
      setCurrUser(user);
    }
  }, []);

  return <>{user && <UserEditForm />}</>;
};
export default UpdateUserPage;
