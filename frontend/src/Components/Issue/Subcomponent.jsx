import { Table } from "antd";
import React, { useEffect, useState } from "react";
import { getOneCompany } from "../../APIs/company";
import { getRevisionOfferComponent } from "../../APIs/revision";

export const IssueSubcomponent = () => {
  const [data, setData] = useState([]);
  const components = JSON.parse(localStorage.getItem("issuecomponents"));

  const normalColumns = [
    {
      title: "Description",
      dataIndex: "desc",
      key: "desc",
    },
    {
      title: "Catalog Number",
      dataIndex: "catalog_number",
      key: "catalog_number",
    },
    {
      title: "Rating Value",
      dataIndex: "rating_value",
      key: "rating_value",
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
    },
    {
      title: "Quantity Issued",
      dataIndex: "qty_issued",
      key: "qty_issued",
    },
    {
      title: "Company",
      dataIndex: "company_name",
      key: "company_name",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Discount",
      dataIndex: "discount",
      key: "discount",
    },
  ];

  useEffect(() => {
    console.log(components);
    setData(
      components.map((e) => {
        return {
          key: e?._id || "",
          desc: e?.subComponent?.desc || "",
          catalog_number: e?.subComponent?.catalog_number || "",
          rating_value: e?.subComponent?.rating_value || "",
          quantity: e?.subComponent?.quantity || "",
          qty_issued: e?.qty_issued || "",
          company_name: e?.subComponent?.company?.company_name?.name || "",
          price: e?.subComponent?.company?.price || "",
          discount: e?.subComponent?.company?.discount || "",
        };
      })
    );
  }, []);

  return (
    <div className="w-full min-h-screen bg-[#f3f7ff]">
      <p className="text-3xl text-blue-800 font-semibold p-4">
        SubComponents List
      </p>
      <div className="rounded-md bg-white flex flex-col m-4">
        <>
          <p className="text-blue-800 font-semibold text-xl p-5">
            SubComponents List
          </p>
          <div className="w-full">
            <Table columns={normalColumns} dataSource={data} />
          </div>
        </>
      </div>
    </div>
  );
};
