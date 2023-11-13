import React, { useEffect, useMemo, useState } from "react";
import { getSubComponents } from "../../APIs/subComponent";
import { Table, Tooltip } from "antd";
import { ArrowBigLeftDash, MoreHorizontal, Redo2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const OfferSubComponentList = () => {
  const navigate = useNavigate();
  const [dataType, setDataType] = useState("Subcomponent");
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

  const columns = [
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

  const fetchOfferSubComponentList = async () => {
    try {
      const response = await getSubComponents();
      setSubComponentList(
        response.data.data.map((item) => {
          return {
            ...item,
            key: item._id,
            no_of_catalogs: item.catalog.length,
          };
        })
      );
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    fetchOfferSubComponentList();
  }, []);

  return (
    <div className="w-full min-h-screen bg-[#f3f7ff]">
      <p className="text-3xl text-blue-800 font-semibold p-4">
        Subcomponent List
      </p>
      {dataType !== "Subcomponent" && (
        <div
          className="px-4 flex flex-row cursor-pointer"
          onClick={() => {
            dataType === "catalog"
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
            {dataType === "catalog"
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
            {dataType === "Subcomponent" && (
              <Table columns={columns} dataSource={subComponentList} />
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
