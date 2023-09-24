import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { updateVendor } from "../../APIs/vendor";
import { Button, Input, message } from "antd";
import { ArrowBigLeftDash } from "lucide-react";

export const UpdateVendor = ({
  updateData,
  setUpdateVendor,
  getVendorsData,
}) => {
  const navigate = useNavigate();
  const [vendorName, setVendorName] = useState(updateData.vendorName);
  const [phoneNumber, setPhoneNumber] = useState(updateData.phoneNumber1);
  const [phoneNumber2, setPhoneNumber2] = useState(
    updateData.phoneNumber2 || ""
  );
  const [email, setEmail] = useState(updateData.email1);
  const [email2, setEmail2] = useState(updateData.email2);
  const [GSTNo, setGSTNo] = useState(updateData.gst);
  const [address, setAddress] = useState(updateData.address);
  const [panNumber, setPanNumber] = useState(updateData.panNo);
  const [accountNo, setAccountNo] = useState(updateData.accountNo);
  const [ifsc, setIfsc] = useState(updateData.ifsc);
  const [remarks, setRemarks] = useState(updateData.remarks);

  const Handle$OnClick$Submit = async () => {
    const SendData = {
      vendorName: vendorName,
      gst: GSTNo,
      phoneNumber1: Number(phoneNumber),
      phoneNumber2: Number(phoneNumber2),
      email1: email,
      email2: email2,
      panNo: panNumber,
      address: address,
      accountNo: Number(accountNo),
      ifsc: ifsc,
      remarks: remarks,
    };

    console.log(SendData);

    // validation
    if (vendorName.length < 2 || vendorName.length > 200) {
      message.error("Client Name must be between 2 to 200 characters");
      return;
    }
    if (String(phoneNumber).length !== 10) {
      message.error("Phone Number must be 10 digits");
      return;
    }
    if (String(phoneNumber2).length !== 0 && phoneNumber2.length !== 10) {
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
    if (!SendData.accountNo) {
      message.error("Account Number should not be Empty");
      return;
    }
    if (ifsc.length === 0) {
      console.log(ifsc.length);
      message.error("IFSC should not be Empty");
      return;
    }
    if (remarks.length === 0 || remarks.length > 5000) {
      message.error("Remarks should not be Empty or more than 5000 characters");
      return;
    }

    const response = await updateVendor(updateData.key, SendData);
    if (response.type === "success") {
      message.success("Vendor Updated Successfully");
      resetValue();
      setUpdateVendor(false);
      getVendorsData();
    } else {
      message.error("Something went wrong");
    }
  };

  const resetValue = () => {
    setVendorName("");
    setPhoneNumber("");
    setPhoneNumber2("");
    setEmail("");
    setEmail2("");
    setGSTNo("");
    setAddress("");
    setPanNumber("");
    setAccountNo("");
    setIfsc("");
    setRemarks("");
  };

  const BackHandler = () => {
    setUpdateVendor(false);
  };

  return (
    <div className="w-full min-h-screen bg-[#f3f7ff]">
      <p className="text-3xl text-blue-800 font-semibold p-4">Update Vendor</p>
      <div className="px-4 flex flex-row cursor-pointer" onClick={BackHandler}>
        <ArrowBigLeftDash className="text-gray-500 hover:text-blue-800" />
        <span className="font-semibold text-gray-500 hover:text-blue-800">
          Vendor List
        </span>
      </div>
      <div className="rounded-md bg-white flex flex-col m-4">
        <p className="text-blue-800 font-semibold text-xl px-4 pt-4">
          Enter Vendor's Details
        </p>
        <div className="w-full flex justify-evenly">
          <div className="w-3/4 p-4">
            <section>
              <div className="font-semibold p-2 text-gray-500">Name</div>
              <Input
                className="w-full"
                placeholder="Enter Name"
                value={vendorName}
                onChange={(e) => {
                  setVendorName(e.target.value);
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
            <section>
              <div className="font-semibold p-2 text-gray-500 mt-2">
                Account Number
              </div>
              <Input
                className="w-full"
                placeholder="Enter Account Number"
                onChange={(e) => {
                  const inputText = e.target.value;
                  const regexPattern = /^[0-9]*$/;
                  if (!regexPattern.test(inputText)) {
                    return;
                  }
                  setAccountNo(e.target.value);
                }}
                value={accountNo}
              />
            </section>
            <section>
              <div className="font-semibold p-2 text-gray-500 mt-2">
                Remarks
              </div>
              <textarea
                placeholder="Enter Remarks"
                type="text"
                className="w-full border-2 border-gray-200 rounded-md p-1 hover:border-blue-300 focus:border-blue-300"
                onChange={(e) => {
                  if (e.length > 5000) {
                    message.error("Remarks must be 5000 characters or fewer.");
                    return;
                  }
                  setRemarks(e.target.value);
                }}
                value={remarks}
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
                type="email"
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
              <div className="font-semibold p-2 text-gray-500 mt-2">IFSC</div>
              <Input
                onChange={(e) => {
                  setIfsc(e.target.value);
                }}
                value={ifsc}
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
            Update
          </Button>
          <Button onClick={resetValue} className="bg-gray-500 text-white">
            Reset
          </Button>
        </section>
      </div>
    </div>
  );
};
