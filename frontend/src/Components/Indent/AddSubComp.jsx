import React, { useEffect, useState } from "react";
import { Button, Input, Table, message } from "antd";

export const AddSubComp = ({ data, setNewSubComponents }) => {

  const [quantityRequired, setQuantityReq] = useState(data.quantityRequired);
  const [quantityOrd, setquantityOrd] = useState(0);
  const [showContent, setShowContent] = useState(true)

  console.log(data)

  const columns = [
    {
      title: "Description",
      dataIndex: "desc",
    },
    {
      title: "Catalog Number",
      dataIndex: "catalog_number",
    },
    {
      title: "Rating",
      dataIndex: "rating_value",
    },
    {
      title: "Company",
      dataIndex: "company",
    },
    {
      title: "Price",
      dataIndex: "price",
    },
    {
      title: "Discount",
      dataIndex: "discount",
    },
  ];

  const Handle$OnClick$Add = () => {


    setNewSubComponents((prev) => {
      return [...prev, {
        ...data,
        quantityRequired,
        quantity_ordered: quantityOrd
      }]
    })

    message.success("Added " + data.desc + " Successfully")


    setShowContent(false)
  }

  return (
    <div className="p-4 bg-white border-2 border-blue-400 rounded-md my-4">
      {
        showContent ? <>
          <Table columns={columns} dataSource={[data]} pagination={ false} />
          <div className="w-full flex flex-row gap-4">
          <div className="w-full flex flex-col">
            <div className="text-gray-500 font-semibold p-2">Quantity Required</div>
            <Input className="w-full" value={quantityRequired} onChange={(e) => setQuantityReq(e.target.value)} placeholder="Quantity Required" />
          </div>
          <div className="w-full flex flex-col">
            <div className="text-gray-500 font-semibold p-2">Quantity Ordered</div>
            <Input className="w-full" value={quantityOrd} onChange={(e) => setquantityOrd(e.target.value)} placeholder="Quantity Ordered" />
          </div>
          </div>
          <div className="w-full flex items-center justify-center p-2 m-2">
            <Button className="w-1/4" onClick={() => Handle$OnClick$Add()}>Add</Button>
          </div>
        </> : <div className="w-full text-center text-blue-700 font-semibold">Successfully Added {data.desc}</div>
      }
    </div>


  );
};
