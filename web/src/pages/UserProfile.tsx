import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import BigRoundedButton from "../components/Buttons/BigRoundedButton";
import { logoutUser } from "../slice/authSlice";
import { RootState, useAppDispatch, useAppSelector } from "../store/store";

import "../styles/UserProfile.css";

const UserProfile = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { user } = useAppSelector((state: RootState) => state.auth);
  useEffect(() => {
    console.log("User profile: user: ", user);
  }, [user]);

  const dispatchDeconnection = () => {
    dispatch(logoutUser());
    navigate("/")
  };

  const handleDeconnection = () => {
    dispatchDeconnection();
  };
  return (
    <div className="user-profile-main-container">
      <div className="user-profile-first-name">Prénom : {user?.firstName}</div>
      <div className="user-profile-first-name">Nom : {user?.lastName}</div>
      <div className="user-profile-first-name">E-mail : {user?.email}</div>
      <BigRoundedButton
        label="Log out"
        color="primary"
        onClick={() => handleDeconnection()}
      />
    </div>
  );
};

export default UserProfile;
