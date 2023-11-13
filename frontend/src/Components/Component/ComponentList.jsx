import React, { useEffect, useMemo, useState } from "react";
import { getComponents } from "../../APIs/component";
import { Table, Tooltip } from "antd";
import { ArrowBigLeftDash, MoreHorizontal, Redo2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const ComponentList = () => {
  const navigate = useNavigate();
  const [dataType, setDataType] = useState("component");
  const [componentList, setComponentList] = useState([]);
  const [subComponentList, setSubComponentList] = useState([]);
  const [catalogList, setCatalogList] = useState([]);
  const [ratingList, setRatingList] = useState([]);
  const [companyList, setCompanyList] = useState([]);
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

  const companyColumns = [
    {
      title: "Company Name",
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

  const ratingColumns = [
    {
      title: "Rating Value",
      dataIndex: "rating_value",
      key: "rating_value",
    },
    {
      title: "No. of Companies",
      dataIndex: "no_of_companies",
      key: "no_of_companies",
    },
    {
      title: "Action",
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
                setDataType("companies");
                setCompanyList(
                  record.companies.map((item) => {
                    return {
                      ...item,
                      key: item._id,
                      company_name: item.company_id.name,
                    };
                  })
                );
              }}
            >
              <MoreHorizontal />
            </button>
          </Tooltip>
        </div>
      ),
    },
  ];

  const catalogColumns = [
    {
      title: "Catalog Number",
      dataIndex: "catalog_number",
      key: "catalog_number",
    },
    {
      title: "No. of Ratings",
      dataIndex: "no_of_ratings",
      key: "no_of_ratings",
    },
    {
      title: "Action",
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
                setDataType("rating");
                setRatingList(
                  record.rating.map((item) => {
                    return {
                      ...item,
                      key: item._id,
                      no_of_companies: item.companies.length,
                    };
                  })
                );
              }}
            >
              <MoreHorizontal />
            </button>
          </Tooltip>
        </div>
      ),
    },
  ];

  const Subcomponentcolumns = [
    {
      title: "Description",
      dataIndex: "desc",
      key: "desc",
    },
    {
      title: "No. of Catalogs",
      dataIndex: "no_of_catalogs",
      key: "no_of_catalogs",
    },
    {
      title: "quantity",
      dataIndex: "quantity",
      key: "quantity",
    },
    {
      title: "Action",
      render: (text, record) => (
        <div className="flex flex-row gap-2">
          <Tooltip
            placement="top"
            title={"Update Subcomponent"}
            arrow={mergedArrow}
          >
            <button
              className="text-blue-600 hover:text-blue-300"
              onClick={() => {
                console.log(record);
                localStorage.setItem(
                  "SubComponentData",
                  JSON.stringify(record)
                );
                navigate("/offersubcomponentupdate");
              }}
            >
              <Redo2 />
            </button>
          </Tooltip>
          <Tooltip
            placement="top"
            title={"See More Details"}
            arrow={mergedArrow}
          >
            <button
              className="text-blue-600 hover:text-blue-300"
              onClick={() => {
                console.log(record);
                setDataType("catalog");
                setCatalogList(
                  record.catalog.map((item) => {
                    return {
                      ...item,
                      key: item._id,
                      no_of_ratings: item.rating.length,
                    };
                  })
                );
              }}
            >
              <MoreHorizontal />
            </button>
          </Tooltip>
        </div>
      ),
    },
  ];

  const columns = [
    {
      title: "Component Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "No. of Subcomponents",
      dataIndex: "no_of_subcomponents",
      key: "no_of_subcomponents",
    },
    {
      title: "Action",
      render: (text, record) => (
        <div className="flex flex-row gap-2">
          <Tooltip
            placement="top"
            title={"Update Component"}
            arrow={mergedArrow}
          >
            <button
              className="text-blue-600 hover:text-blue-300"
              onClick={() => {
                console.log(record);
                localStorage.setItem("ComponentData", JSON.stringify(record));
                navigate("/componentupdate");
              }}
            >
              <Redo2 />
            </button>
          </Tooltip>
          <Tooltip
            placement="top"
            title={"See More Details"}
            arrow={mergedArrow}
          >
            <button
              className="text-blue-600 hover:text-blue-300"
              onClick={() => {
                console.log(record);
                setDataType("Subcomponent");

                console.log(
                  record.sub_components.map((item) => {
                    return {
                      ...item,
                      _id: item.subcomponent_id._id,
                      key: item.subcomponent_id._id,
                      no_of_catalogs: item.subcomponent_id.catalog.length,
                      desc: item.subcomponent_id.desc,
                      catalog: item.subcomponent_id.catalog,
                    };
                  })
                );

                setSubComponentList(
                  record.sub_components.map((item) => {
                    return {
                      ...item,
                      _id: item.subcomponent_id._id,
                      key: item.subcomponent_id._id,
                      no_of_catalogs: item.subcomponent_id.catalog.length,
                      desc: item.subcomponent_id.desc,
                      catalog: item.subcomponent_id.catalog,
                    };
                  })
                );
              }}
            >
              <MoreHorizontal />
            </button>
          </Tooltip>
        </div>
      ),
    },
  ];

  const getComponentsData = async () => {
    const response = await getComponents();
    console.log(
      response.data.data.map((item) => {
        return {
          ...item,
          key: item._id,
          no_of_subcomponents: item.sub_components.length,
        };
      })
    );
    setComponentList(
      response.data.data.map((item) => {
        return {
          ...item,
          key: item._id,
          no_of_subcomponents: item.sub_components.length,
        };
      })
    );
  };

  useEffect(() => {
    getComponentsData();
  }, []);
  return (
    <div className="w-full min-h-screen bg-[#f3f7ff]">
      <p className="text-3xl text-blue-800 font-semibold p-4">Component List</p>
      {dataType !== "component" && (
        <div
          className="px-4 flex flex-row cursor-pointer"
          onClick={() => {
            dataType === "Subcomponent"
              ? setDataType("component")
              : dataType === "catalog"
              ? setDataType("Subcomponent")
              : dataType === "rating"
              ? setDataType("catalog")
              : dataType === "companies"
              ? setDataType("rating")
              : "";
          }}
        >
          <ArrowBigLeftDash className="text-gray-500 hover:text-blue-800" />
          <span className="font-semibold text-gray-500 hover:text-blue-800">
            {dataType === "Subcomponent"
              ? "Component"
              : dataType === "catalog"
              ? "Subcomponent"
              : dataType === "rating"
              ? "Catalog"
              : dataType === "companies"
              ? "Rating"
              : ""}{" "}
            List
          </span>
        </div>
      )}
      <div className="rounded-md bg-white flex flex-col m-4">
        <>
          <p className="text-blue-800 font-semibold text-xl p-5">
            {dataType} List
          </p>
          <div className="w-full">
            {dataType === "component" && (
              <Table columns={columns} dataSource={componentList} />
            )}
            {dataType === "Subcomponent" && (
              <Table
                columns={Subcomponentcolumns}
                dataSource={subComponentList}
              />
            )}
            {dataType === "catalog" && (
              <Table columns={catalogColumns} dataSource={catalogList} />
            )}
            {dataType === "rating" && (
              <Table columns={ratingColumns} dataSource={ratingList} />
            )}
            {dataType === "companies" && (
              <Table columns={companyColumns} dataSource={companyList} />
            )}
          </div>
        </>
      </div>
    </div>
  );
};
