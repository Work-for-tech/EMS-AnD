import React, { useEffect, useState } from "react";
import { verify } from "../../APIs/login";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginActions } from "../../store/loginslice";
import { message } from "antd";

export const Landing = () => {
  const [first, setFirst] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const getTokenData = async () => {
    try {
      if (localStorage.getItem("token") === null) {
        navigate("/login");
        return;
      }
      const response = await verify();
      setFirst(true);
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
    } catch (e) {
      message.error("Cannot login");
      navigate("/login");
    }
  };

  useEffect(() => {
    if (first) return;
    getTokenData();
  }, []);

  return <div></div>;
};
