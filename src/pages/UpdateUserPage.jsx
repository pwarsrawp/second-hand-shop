import { useNavigate, useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";

import UserEditForm from "../components/UserEditForm";

const UpdateUserPage = () => {
  const navigate = useNavigate();
  const { userId } = useParams();
  const [currUser, setCurrUser] = useState(null);
  // const [user, setUser] = useState();
  const { setUserUpdate, user } = useContext();

  useEffect(() => {
    // fetchUser(userId, setUser);
    if (user) {
      console.log("this is our curr user: ", user);
      setCurrUser(user);
    }
  }, []);

  return <>{user && <UserEditForm />}</>;

    </>
  );

};
export default UpdateUserPage;
