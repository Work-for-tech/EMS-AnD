import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import { verify } from "../APIs/login";
import { loginActions } from "../store/loginslice";
import { message } from "antd";

export const AccessHandler = ({ children }) => {
  const loginData = useSelector((state) => state.login);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const getTokenData = async () => {
    const response = await verify();
    if (response.type === "success") {
      console.log(response.data.user.data);
      dispatch(
        loginActions.addNameAndAccess({
          name: response.data.user.data.userId.name,
          access: response.data.user.data.moduleName,
          email: response.data.user.data.userId.email,
        })
      );
    } else {
      message.error("Cannot login");
      navigate("/login");
    }
  };

  useEffect(() => {
    if (loginData.name.length === 0) {
      getTokenData();
    }
  }, []);

  if (loginData.name.length === 0) {
    return <Navigate to={"/login"} />;
  } else {
    return children;
  }
};
