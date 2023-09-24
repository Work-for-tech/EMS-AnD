import React, { useEffect, useState } from "react";
import { Input, Select, Button, Table, message } from "antd";
import { addClient } from "../../APIs/client";
import { useNavigate } from "react-router-dom";

export const Client = () => {
  const navigate = useNavigate();
  const [clientName, setClientName] = useState("");
  const [phoneNumber2, setPhoneNumber2] = useState();
  const [email, setEmail] = useState("");
  const [GSTNo, setGSTNo] = useState();
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email2, setEmail2] = useState("");
  const [panNumber, setPanNumber] = useState("");
  const [address, setAddress] = useState("");

  const resetValue = () => {
    setClientName("");
    setPhoneNumber2("");
    setEmail("");
    setGSTNo("");
    setPhoneNumber("");
    setEmail2("");
    setPanNumber("");
    setAddress("");
  };

  const Handle$OnClick$Submit = async () => {
    const SendData = {
      name: clientName,
      GSTNo: GSTNo,
      phoneNumber: Number(phoneNumber),
      phoneNumber2: Number(phoneNumber2),
      email: email,
      email2: email2,
      panNumber: panNumber,
      address: address,
    };

    // validation
    if (clientName.length < 2 || clientName.length > 200) {
      message.error("Client Name must be between 2 to 200 characters");
      return;
    }
    if (phoneNumber.length !== 10) {
      message.error("Phone Number must be 10 digits");
      return;
    }
    if (phoneNumber2.length !== 0 && phoneNumber2.length !== 10) {
      message.error("Phone Number (Optional) must be 10 digits");
      return;
    }
    if (GSTNo.length !== 15) {
      message.error("GST Number must be 15 digits");
      return;
    }
    if (address.length < 2 || address.length > 200) {
      message.error("Address must be between 2 to 200 characters");
      return;
    }
    if (email.length < 2 || email.length > 200) {
      message.error("Email must be between 2 to 200 characters");
      return;
    }
    if (email2.length !== 0 && (email.length < 2 || email.length > 200)) {
      message.error("Email must be between 2 to 200 characters");
      return;
    }

    const response = await addClient(SendData);

    if (response.type === "success") {
      resetValue();
      message.success(response.data.message);
      navigate("/project");
    } else if (response.type === "error") {
      message.error(response.message);
    }
  };

  return (
    <div className="w-full min-h-screen bg-[#f3f7ff]">
      <p className="text-3xl text-blue-800 font-semibold p-4">Add Client</p>
      <div className="rounded-md bg-white flex flex-col m-4">
        <p className="text-blue-800 font-semibold text-xl px-4 pt-4">
          Enter Client's Details
        </p>
        <div className="w-full flex justify-evenly">
          <div className="w-3/4 p-4">
            <section>
              <div className="font-semibold p-2 text-gray-500">Name</div>
              <Input
                className="w-full"
                placeholder="Enter Name"
                value={clientName}
                onChange={(e) => {
                  setClientName(e.target.value);
                }}
              />
            </section>
            <section>
              <div className="font-semibold p-2 text-gray-500 mt-2">
                GST No.
              </div>
              <Input
                onChange={(e) => {
                  if (e.target.value.length > 15) {
                    message.error("GST Number must be 15 digits");
                    return;
                  }
                  setGSTNo(e.target.value);
                }}
                value={GSTNo}
                maxLength={15}
                className=""
                placeholder="Enter GST No."
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
                  setPhoneNumber(e.target.value);
                }}
                value={phoneNumber}
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
                  setPhoneNumber2(e.target.value);
                }}
                value={phoneNumber2}
              />
            </section>
          </div>
          <div className="bg-white w-3/4 p-4">
            <section>
              <div className="font-semibold p-2 text-gray-500">Email</div>
              <Input
                className="w-full"
                type="email"
                placeholder="Enter Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </section>
            <section>
              <div className="font-semibold p-2 text-gray-500 mt-2">
                Another Email (Optional)
              </div>
              <Input
                onChange={(e) => setEmail2(e.target.value)}
                value={email2}
                className=""
                placeholder="Enter Another Email (Optional)"
              />
            </section>
            <section>
              <div className="font-semibold p-2 text-gray-500 mt-2">
                Pan Number
              </div>
              <Input
                onChange={(e) => {
                  if (e.target.value.length > 10) {
                    message.error("Pan Number must be 10 digits");
                    return;
                  }
                  setPanNumber(e.target.value);
                }}
                value={panNumber}
                className=""
                placeholder="Enter Pan Number"
              />
            </section>
            <section>
              <div className="font-semibold p-2 text-gray-500 mt-2">
                Address
              </div>
              <textarea
                onChange={(e) => setAddress(e.target.value)}
                value={address}
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
