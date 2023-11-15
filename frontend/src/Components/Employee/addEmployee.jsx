import { Button, Input, message } from "antd";
import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { addEmployee } from "../../APIs/employee";
import { useNavigate } from "react-router-dom";

export const AddEmployee = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [data, setData] = useState({
    name: "",
    phoneNumber: "",
    phoneNumber2: "",
    email: "",
    email2: "",
    address: "",
    designation: "",
    department: "",
    address: "",
  });

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const ChangeHandler = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const Handle$OnClick$Submit = async (e) => {
    e.preventDefault();
    console.log(data);
    const response = await addEmployee({
      name: data.name,
      phoneNumber: Number(data.phoneNumber),
      phoneNumber2: Number(data.phoneNumber2),
      email: data.email,
      email2: data.email2,
      address: data.address,
      designation: data.designation,
      department: data.department,
      address: data.address,
      password: data.password,
    });

    if (response.type === "success") {
      message.success("Employee Added Successfully");
      resetValue();
      console.log(response.data.data._id);
      localStorage.setItem(
        "employeeId",
        JSON.stringify(response.data.data._id)
      );
      navigate("/addAccess");
    } else {
      message.error("Something went wrong");
    }
  };

  const resetValue = () => {
    setData({
      name: "",
      phoneNumber: "",
      phoneNumber2: "",
      email: "",
      email2: "",
      address: "",
      department: "",
    });
  };

  return (
    <div className="w-full min-h-screen bg-[#f3f7ff]">
      <p className="text-3xl text-blue-800 font-semibold p-4">
        Add New Employee
      </p>
      <div className="rounded-md bg-white flex flex-col m-4">
        <p className="text-blue-800 font-semibold text-xl px-4 pt-4">
          Enter Employee's Details
        </p>
        <div className="w-full flex justify-evenly">
          <div className="w-3/4 p-4">
            <section>
              <div className="font-semibold p-2 text-gray-500">Name</div>
              <Input
                className="w-full"
                placeholder="Enter Name"
                name="name"
                value={data.name}
                onChange={ChangeHandler}
              />
            </section>

            <section>
              <div className="font-semibold p-2 text-gray-500 mt-2">
                Phone Number
              </div>
              <Input
                onChange={(e) => {
                  const inputText = e.target.value;
                  const regexPattern = /^[0-9]*$/; // Only allows digits 0-9
                  if (!regexPattern.test(inputText)) {
                    return;
                  }

                  if (inputText.length > 10) {
                    message.error("Phone Number must be 10 digits or fewer.");
                    return;
                  }

                  if (e.target.value.length > 10) {
                    message.error("Phone Number must be 10 digits");
                    return;
                  }
                  setData({ ...data, phoneNumber: e.target.value });
                }}
                value={data.phoneNumber}
                className=""
                placeholder="Enter Phone Number"
              />
            </section>
            <section>
              <div className="font-semibold p-2 text-gray-500 mt-2">
                Another Phone Number (Optional)
              </div>
              <Input
                className="w-full"
                placeholder="Enter Another Phone Number (Optional)"
                onChange={(e) => {
                  const inputText = e.target.value;
                  const regexPattern = /^[0-9]*$/; // Only allows digits 0-9
                  if (!regexPattern.test(inputText)) {
                    return;
                  }

                  if (inputText.length > 10) {
                    message.error("Phone Number must be 10 digits or fewer.");
                    return;
                  }
                  setData({ ...data, phoneNumber2: e.target.value });
                }}
                value={data.phoneNumber2}
              />
            </section>
            <section>
              <div className="font-semibold p-2 text-gray-500 mt-2">
                Designation
              </div>
              <Input
                type="text"
                name="designation"
                onChange={ChangeHandler}
                value={data.designation}
                className=""
                placeholder="Enter Designation"
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
          <div className="bg-white w-3/4 p-4">
            <section>
              <div className="font-semibold p-2 text-gray-500">Email</div>
              <Input
                className="w-full"
                name="email"
                type="email"
                placeholder="Enter Email"
                value={data.email}
                onChange={ChangeHandler}
              />
            </section>
            <section>
              <div className="font-semibold p-2 text-gray-500 mt-2">
                Another Email (Optional)
              </div>
              <Input
                type="email"
                name="email2"
                onChange={ChangeHandler}
                value={data.email2}
                className=""
                placeholder="Enter Another Email (Optional)"
              />
            </section>
            <section>
              <div className="font-semibold p-2 text-gray-500 mt-2">
                Department
              </div>
              <Input
                name="department"
                onChange={ChangeHandler}
                value={data.department}
                className=""
                placeholder="Enter Department"
              />
            </section>
            <section>
              <div className="font-semibold p-2 text-gray-500 mt-2">
                Address
              </div>
              <textarea
                onChange={ChangeHandler}
                value={data.address}
                name="address"
                type="text"
                className="w-full border-2 border-gray-200 rounded-md p-1 hover:border-blue-300 focus:border-blue-300"
                placeholder="Enter Address"
              />
            </section>
          </div>
        </div>
        <section className="flex items-center justify-center gap-5 p-4">
          <Button
            onClick={Handle$OnClick$Submit}
            className="bg-blue-700 text-white"
          >
            Submit
          </Button>
          <Button onClick={resetValue} className="bg-gray-500 text-white">
            Reset
          </Button>
        </section>
      </div>
    </div>
  );
};
