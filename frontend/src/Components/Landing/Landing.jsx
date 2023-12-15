import React, { useEffect } from "react";
import { verify } from "../../APIs/login";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginActions } from "../../store/loginslice";

export const Landing = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const getTokenData = async () => {
    if (localStorage.getItem("token") === null) {
      navigate("/login");
      return;
    }
    const response = await verify();
    if (response.type === "success") {
      console.log(response.data.user);
      dispatch(
        loginActions.addNameAndAccess({
          name: response.data.user.data.userId.name,
          access: response.data.user.data.moduleName,
          email: response.data.user.data.userId.email,
        })
      );
      console.log(localStorage.getItem("lastpath"));
      navigate(localStorage.getItem("lastpath"));
    } else {
      message.error("Cannot login");
      navigate("/login");
    }
  };

  useEffect(() => {
    getTokenData();
  }, []);

  return <div></div>;
};
