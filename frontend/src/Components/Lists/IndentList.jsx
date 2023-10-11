import React, { useEffect, useMemo, useState } from "react";
import { getAllIndent } from "../../APIs/indent";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Table, Tooltip } from "antd";
import { ArrowBigLeftDash, MoreHorizontal } from "lucide-react";

export const IndentList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [subcomponentData, setSubcomponentData] = useState([]);
  const [indentData, setIndentData] = useState([]);
  const [isIndent, setIsIndent] = useState(false);
  const [arrow, setArrow] = useState("Show");
  const mergedArrow = useMemo(() => {
    if (arrow === "Hide") {
      return false;
    }
    if (arrow === "Show") {
      return true;
    }
    return {
      pointAtCenter: true,
    };
  }, [arrow]);

  const columns = [
    {
      title: "client",
      dataIndex: "client",
      key: "client",
    },
    {
      title: "Project",
      dataIndex: "project",
      key: "project",
    },
    {
      title: "No. of Items",
      dataIndex: "noofitems",
      key: "noofitems",
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      render: (text, record) => (
        <div className="flex flex-row gap-2">
          <Tooltip
            placement="top"
            title={"See More Details"}
            arrow={mergedArrow}
          >
            <button
              className="text-blue-600 hover:text-blue-300"
              onClick={() => {
                console.log(record);
                setIsIndent(true);
                setSubcomponentData(
                  record.items.map((e) => {
                    return {
                      key: e.subcomponent._id,
                      desc: e.subcomponent.desc,
                      catalog_number: e.subcomponent.catalog_number,
                      rating_value: e.subcomponent.rating_value,
                      company: e.subcomponent.company.company_name,
                      price: e.subcomponent.company.price,
                      discount: e.subcomponent.company.discount,
                      quantityRequired: e.quantityRequired,
                      quantityOrdered: e.quantityOrdered,
                    };
                  })
                );
                console.log(record.items);
              }}
            >
              <MoreHorizontal />
            </button>
          </Tooltip>
        </div>
      ),
    },
  ];

  const subcomponentColumns = [
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
    {
      title: "Quantity Required",
      dataIndex: "quantityRequired",
    },
    {
      title: "Quantity Ordered",
      dataIndex: "quantityOrdered",
    },
  ];

  const getAllIndents = async () => {
    const response = await getAllIndent();
    console.log(response.data);
    setIndentData(
      response.data.indentDataByPid.map((e) => ({
        key: e._id,
        client: e.clientId.name,
        project: e.projectId.project_name,
        items: e.items,
        noofitems: e.items.length,
      }))
    );
  };

  useEffect(() => {
    getAllIndents();
  }, []);

  return (
    <div className="w-full min-h-screen bg-[#f3f7ff]">
      <p className="text-3xl text-blue-800 font-semibold p-4">Indent List</p>
      {isIndent && (
        <div
          className="px-4 flex flex-row cursor-pointer"
          onClick={() => {
            setIsIndent(false);
            setSubcomponentData([]);
          }}
        >
          <ArrowBigLeftDash className="text-gray-500 hover:text-blue-800" />
          <span className="font-semibold text-gray-500 hover:text-blue-800">
            Indent List
          </span>
        </div>
      )}
      {!isIndent ? (
        <div className="rounded-md bg-white flex flex-col m-4">
          <>
            <p className="text-blue-800 font-semibold text-xl p-5">
              Indent List
            </p>
            <div className="w-full">
              <Table columns={columns} dataSource={indentData} />
            </div>
          </>
        </div>
      ) : (
        <div className="rounded-md bg-white flex flex-col m-4">
          <>
            <p className="text-blue-800 font-semibold text-xl p-5">
              Subcomponents List
            </p>
            <div className="w-full">
              <Table
                columns={subcomponentColumns}
                dataSource={subcomponentData}
              />
            </div>
          </>
        </div>
      )}
    </div>
  );
};