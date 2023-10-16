import React, { useEffect, useState } from "react";
import { Button, Input, Table, message } from "antd";
import { getStoreDataById } from "../../APIs/store";

export const AddSubComp = ({
  subComponentsData,
  setSubComponentsData,
  data,
  setNewSubComponents,
}) => {
  const [quantityOrd, setquantityOrd] = useState(data.quantityRequired);
  const [showContent, setShowContent] = useState(true);

  console.log(data);

  const getStoreData = async () => {
    const response = await getStoreDataById({
      desc: data.desc,
      catalog_number: data.catalog_number,
      companyId: data.companyId,
      rating_value: data.rating_value,
    });
    console.log(response.data.data[0]);
    if (response.type === "error") {
      message.error(response.message);
      return;
    } else {
      data.storequantity = response?.data?.data[0]?.quantity ?? 0;
      setSubComponentsData(
        subComponentsData.map((e) => {
          if (e.key === data.key) {
            e.storequantity = data.storequantity;
          }
          return e;
        })
      );
    }
  };

  useEffect(() => {
    getStoreData();
  }, [data]);

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
      title: "Store Quantity",
      dataIndex: "storequantity",
    },
    {
      title: "Discount",
      dataIndex: "discount",
    },
  ];

  const Handle$OnClick$Add = () => {
    setNewSubComponents((prev) => {
      return [
        ...prev,
        {
          ...data,
          quantity_ordered: quantityOrd,
        },
      ];
    });

    message.success("Added " + data.desc + " Successfully");

    setShowContent(false);
  };

  return (
    <div className="p-4 bg-white border-2 border-blue-400 rounded-md my-4">
      {showContent ? (
        <>
          <Table columns={columns} dataSource={[data]} pagination={false} />
          <div className="w-full flex flex-row items-center justify-center gap-4">
            <div className="w-1/2 flex flex-col">
              <div className="text-gray-500 font-semibold p-2">
                Quantity Ordered
              </div>
              <Input
                className="w-full"
                value={quantityOrd}
                onChange={(e) => setquantityOrd(e.target.value)}
                placeholder="Quantity Ordered"
              />
            </div>
          </div>
          <div className="w-full flex items-center justify-center p-2 m-2">
            <Button className="w-1/4" onClick={() => Handle$OnClick$Add()}>
              Add
            </Button>
          </div>
        </>
      ) : (
        <div className="w-full text-center text-blue-700 font-semibold">
          Successfully Added {data.desc}
        </div>
      )}
    </div>
  );
};
