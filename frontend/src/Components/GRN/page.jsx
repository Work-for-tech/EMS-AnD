import React, { useEffect, useState } from "react";
import { Button, DatePicker, Input, Select, message, Upload } from "antd";
import { getVendors } from "../../APIs/vendor";
import { createGRN } from "../../APIs/grn";

export const CreateGRN = () => {
  const [vendor, setVendor] = React.useState([]);
  const [pics, setpics] = useState([]);
  const [pics2, setpics2] = useState([]);

  const getVendor = async () => {
    const response = await getVendors();
    console.log(response);
    setVendor(response.data.data);
  };

  useEffect(() => {
    getVendor();
  }, []);

  const [dataToSend, setDataToSend] = useState({
    invoiceNumber: "",
    receivedDate: "",
    vendor: "",
  });

  const HandleSubmit = async () => {
    console.log(dataToSend, pics, pics2);

    const formData = new FormData();

    formData.append("invoice_number", dataToSend.invoiceNumber);
    formData.append("received_date", dataToSend.receivedDate);
    formData.append("vender_id", dataToSend.vendor);
    formData.append("pics", pics);
    formData.append("pics", pics2);

    const response = await createGRN(formData);

    if (response.type === "success") {
      message.success("GRN Created Successfully");
    } else {
      message.error("Something went wrong");
    }
  };

  return (
    <div className="w-full min-h-screen bg-[#f3f7ff]">
      <p className="text-3xl text-blue-800 font-semibold p-4">GRN Create</p>
      <div className="w-full m-4 flex flex-col items-center justify-center">
        <div className="w-full bg-white flex flex-col rounded-md m-4    ">
          <p className="text-blue-800 font-semibold text-xl p-4">
            Enter Project's Details
          </p>
          <div className="w-full p-2 flex flex-col items-center justify-center gap-2">
            <p className="w-1/2 text-left">Invoice Number</p>
            <Input
              className="w-1/2"
              onChange={(e) =>
                setDataToSend({ ...dataToSend, invoiceNumber: e.target.value })
              }
              placeholder="Invoice Number"
            />
          </div>
          <div className="w-full p-2 flex flex-col items-center justify-center gap-2">
            <p className="w-1/2 text-left">Received Date</p>
            <DatePicker
              className="w-1/2"
              onChange={(a, e) =>
                setDataToSend({ ...dataToSend, receivedDate: e })
              }
              placeholder="Received Date"
            />
          </div>
          <div className="w-full p-2 flex flex-col items-center justify-center gap-2">
            <p className="w-1/2 text-left">Vendor</p>
            <Select
              className="w-1/2"
              placeholder="Select Vendor"
              onChange={(e) => setDataToSend({ ...dataToSend, vendor: e })}
              options={vendor.map((item) => {
                return { label: item.vendorName, value: item._id };
              })}
            />
          </div>
          <div className="w-full p-2 flex flex-col items-center justify-center gap-2">
            <p className="w-1/2 text-left">Truck Pic</p>
            <Upload
              className="w-1/2"
              onChange={(info) => {
                setpics(info.file.originFileObj);
              }}
            >
              <Button>Click to Upload</Button>
            </Upload>
          </div>
          <div className="w-full p-2 flex flex-col items-center justify-center gap-2">
            <p className="w-1/2 text-left">Bill Pic</p>
            <Upload
              className="w-1/2"
              onChange={(info) => {
                setpics2(info.file.originFileObj);
              }}
            >
              <Button>Click to Upload</Button>
            </Upload>
          </div>
          <div className="flex items-center justify-center">
            <Button
              className="w-1/4 m-4 bg-blue-700 text-white"
              onClick={() => HandleSubmit()}
            >
              Submit
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
