import { Table } from "antd";
import React, { useEffect, useState } from "react";
import { getOneCompany } from "../../APIs/company";
import { getRevisionOfferComponent } from "../../APIs/revision";
import { useNavigate } from "react-router-dom";
import { ArrowBigLeftDash } from "lucide-react";

export const OfferComponents = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [consumables, setConsumables] = useState(false);
  const components = JSON.parse(localStorage.getItem("components"));
  const offercomponents = JSON.parse(localStorage.getItem("offercomponents"));

  const normalColumns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
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

  const consumablesColumn = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Description",
      dataIndex: "desc",
      key: "desc",
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
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

  const getComponentsData = async () => {
    try {
      let isConsumable = false;
      const newData = [];
      await Promise.all(
        offercomponents.map(async (e) => {
          const response = await getRevisionOfferComponent(e);
          if (response.data.data.name === "Add Consumables") {
            isConsumable = true;
            response.data.data.sub_components.map((component) => {
              newData.push({
                key: component._id,
                name: response.data.data.name,
                desc: component.desc,
                title: component.title,
                quantity: component.quantity,
                price: component.company.price,
                discount: component.company.discount,
              });
            });
          } else {
            response.data.data.sub_components.forEach((component) => {
              newData.push({
                key: component._id,
                name: response.data.data.name,
                desc: component.desc,
                catalog_number: component.catalog_number,
                rating_value: component.rating_value,
                quantity: component.quantity,
                price: component.company.price,
                discount: component.company.discount,
                company_name: component.company.company_name.name,
              });
            });
          }
        })
      );
      setConsumables(isConsumable);
      setData(newData);
    } catch (error) {
      console.error("Error in getComponentsData:", error);
    }
  };

  useEffect(() => {
    if (components) {
      let isConsumable = false;
      const newData = [];
      components.map((e) => {
        console.log(e.name);
        if (e.name === "Add Consumables") {
          isConsumable = true;
          e.sub_components.map((component) => {
            newData.push({
              key: component._id,
              name: e.name,
              desc: component.desc,
              title: component.title,
              quantity: component.quantity,
              price: component.company.price,
              discount: component.company.discount,
            });
          });
        } else {
          e.sub_components.map((component) => {
            newData.push({
              key: component._id,
              name: e.name,
              desc: component.desc,
              catalog_number: component.catalog_number,
              rating_value: component.rating_value,
              quantity: component.quantity,
              price: component.company.price,
              discount: component.company.discount,
              company_name: component.company.company_name.name,
            });
          });
        }
      });
      setConsumables(isConsumable);
      setData(newData);
    } else {
      getComponentsData();
    }
  }, []);

  return (
    <div className="w-full min-h-screen bg-[#f3f7ff]">
      <p className="text-3xl text-blue-800 font-semibold p-4">
        Offer Components List
      </p>
      <div
        className="px-4 flex flex-row cursor-pointer"
        onClick={() => {
          navigate(-1);
        }}
      >
        <ArrowBigLeftDash className="text-gray-500 hover:text-blue-800" />
        <span className="font-semibold text-gray-500 hover:text-blue-800">
          Back
        </span>
      </div>
      <div className="rounded-md bg-white flex flex-col m-4">
        <>
          <p className="text-blue-800 font-semibold text-xl p-5">
            Offer Components List
          </p>
          <div className="w-full">
            <Table
              columns={consumables ? consumablesColumn : normalColumns}
              dataSource={data}
            />
          </div>
        </>
      </div>
    </div>
  );
};
