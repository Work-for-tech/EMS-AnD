import { Button, Input, Select, message } from "antd";
import { Eye, EyeOff } from "lucide-react";
import React, { useEffect, useState } from "react";
import { login } from "../../APIs/login";
import { useNavigate } from "react-router-dom";

export const Login = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/");
    }
  }, []);

  const ChangeHandler = (e: any) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const HandleLogin = async () => {
    console.log(data);
    const response = await login(data);
    if (response.type === "success") {
      console.log(response.data.user);
      localStorage.setItem("token", response.data.user);
      message.success("Login Successful");
      navigate("/");
    } else {
      message.error("Unable to login");
    }
  };

  const HandleRegister = () => {
    navigate("/addemployee");
  };

  return (
    <div className="w-full min-h-screen bg-[#f3f7ff]">
      <p className="text-3xl text-blue-800 font-semibold p-4">Login</p>
      <div className="w-full h-3/4 flex items-center justify-center ">
        <div className="w-4/12 h-1/2 rounded-md bg-white flex flex-col items-center justify-center m-4">
          <p className="text-blue-800 font-semibold text-xl px-4 pt-4">Login</p>
          <div className="w-full flex justify-evenly">
            <div className="w-3/4 p-4">
              <section>
                <div className="font-semibold p-2 text-gray-500">Email</div>
                <Input
                  className="w-full"
                  placeholder="Enter Email"
                  name="email"
                  value={data.email}
                  onChange={ChangeHandler}
                />
              </section>
              <section>
                <div className="font-semibold p-2 text-gray-500 mt-2">
                  Password
                </div>
                <div className="relative">
                  <Input
                    type={showPassword ? "text" : "password"}
                    onChange={ChangeHandler}
                    name="password"
                    value={data.password}
                    maxLength={15}
                    className=""
                    placeholder="Enter Password"
                  />
                  <button
                    onClick={togglePasswordVisibility}
                    className="absolute top-1/2 right-2 transform -translate-y-1/2 text-gray-400 cursor-pointer"
                  >
                    {showPassword ? <EyeOff /> : <Eye />}
                  </button>
                </div>
              </section>
            </div>
          </div>
          <div className="bg-white pt-6 flex items-center justify-center pb-1">
            <Button onClick={HandleLogin} className="bg-blue-700 text-white">
              Login
            </Button>
          </div>
          <p
            onClick={HandleRegister}
            className="cursor-pointer text-blue-600 hover:text-black"
          >
            Create a new Employee Account
          </p>
        </div>
      </div>
    </div>
  );
};
