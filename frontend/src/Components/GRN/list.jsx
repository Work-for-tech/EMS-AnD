import React, { useEffect } from "react";
import { getGRN } from "../../APIs/grn";
import { Table } from "antd";

export const ListGRN = () => {
  const [grn, setGrn] = React.useState([]);

  const getGRNInit = async () => {
    const response = await getGRN();
    setGrn(response.data.grns);
  };

  useEffect(() => {
    getGRNInit();
  }, []);

  const columns = [
    {
      title: "Invoice Number",
      dataIndex: "invoice_number",
      key: "invoice_number",
    },
    {
      title: "Received Date",
      dataIndex: "received_date",
      key: "received_date",
    },
    {
      title: "Vendor",
      dataIndex: "vendor",
      key: "vendor",
    },
    {
      title: "Truck Pic URL",
      dataIndex: "truck_pic",
      key: "truck_pic",
    },
    {
      title: "Bill Pic URL",
      dataIndex: "bill_pic",
      key: "bill_pic",
    },
  ];

  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  };

  const dataSource = grn.map((item) => {
    console.log(item);
    return {
      key: item._id,
      invoice_number: item.invoice_number,
      received_date: new Date(item.received_date).toLocaleString(
        undefined,
        options
      ),
      vendor: item.vender_id.vendorName,
      truck_pic: item.truck_pic_url,
      bill_pic: item.bill_pic_url,
    };
  });

  return (
    <div className="w-full min-h-screen bg-[#f3f7ff]">
      <p className="text-3xl text-blue-800 font-semibold p-4">GRN List</p>
      <div className="rounded-md bg-white flex flex-col m-4">
        <>
          <p className="text-blue-800 font-semibold text-xl p-5">GRN List</p>
          <div className="w-full p-4">
            <Table columns={columns} dataSource={dataSource} />
          </div>
        </>
      </div>
    </div>
  );
};
