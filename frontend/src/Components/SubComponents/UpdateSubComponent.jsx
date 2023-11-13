import { Button, Input, Select, Space, Table, Tooltip, message } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import React, { useEffect, useRef, useState } from "react";
import { Trash2 } from "lucide-react";
import { getCompanies } from "../../APIs/company";
import { postSubComponents, updateSubComponent } from "../../APIs/subComponent";
import { useNavigate } from "react-router-dom";

export const UpdateSubComponent = () => {
  const navigate = useNavigate();
  const [id, setId] = useState("");
  const [data, setData] = useState([]);
  const [description, setDescription] = useState("");
  const descriptionRef = useRef(null);
  const [searchedColumn, setSearchedColumn] = useState("");
  const [searchText, setSearchText] = useState("");
  const searchInput = useRef(null);

  const [options, setOptions] = useState([]);
  const [catalogNum, setCatalogNum] = useState("");
  const [ratingValue, setRatingValue] = useState("");
  const [company, setCompany] = useState("Select Company");
  const [price, setPrice] = useState("");
  const [discount, setDiscount] = useState("");
  const [arrow, setArrow] = React.useState("Show");
  const mergedArrow = React.useMemo(() => {
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
      title: "Sr. No.",
      key: "sr_no",
      render: (r) => {
        return <div>{data.indexOf(r) + 1}</div>;
      },
    },
    {
      title: "Catlog Number",
      dataIndex: "catalog_number",
      key: "catalog_number",
    },
    {
      title: "Rating Value",
      dataIndex: "rating_value",
      key: "rating_value",
    },
    {
      title: "Company",
      dataIndex: "company",
      render: (r) => {
        return <div>{r.label}</div>;
      },
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
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
    },
    {
      title: "Action",
      dataIndex: "key",
      key: "key",
      render: (_, record) => (
        <Tooltip placement="top" title={"Delete"} arrow={mergedArrow}>
          <button
            className="text-red-800"
            onClick={() => {
              setData((data) => data.filter((e) => e.key !== record.key));
            }}
          >
            <Trash2 />
          </button>
        </Tooltip>
      ),
    },
  ];

  const getCompaniesData = async () => {
    try {
      const response = await getCompanies();

      const setdata = [];
      response.data.data.map((e) => {
        setdata.push({
          label: e.name,
          value: e._id,
        });
      });
      setOptions(setdata);
    } catch (e) {
      message.error("Cannot get Companies");
    }
  };

  React.useEffect(() => {
    getCompaniesData();
  }, []);

  const handleChange = (value) => {
    setCompany(options.filter((e) => e.value === value)[0]);
  };

  const ResetHandler = () => {
    setCatalogNum("");
    setRatingValue("");
    setCompany("Select Company");
    setPrice("");
    setDiscount("");
  };

  useEffect(() => {
    console.log(JSON.parse(localStorage.getItem("SubComponentData")));
    const SubComponentData = JSON.parse(
      localStorage.getItem("SubComponentData")
    );
    setDescription(SubComponentData.desc);
    setId(SubComponentData._id);
    const oldData = [];
    SubComponentData.catalog.map((e) => {
      e.rating.map((rating) => {
        rating.companies.map((company) => {
          console.log({
            key: Math.floor(Math.random() * (999999 - 100000 + 1)) + 100000,
            catalog_number: e.catalog_number,
            rating_value: rating.rating_value,
            company: {
              label: company.company_id.name,
              value: company.company_id._id,
            },
            price: company.price,
            discount: company.discount,
            amount:
              Number(company.price) -
              Number((company.discount * company.price) / 100),
          });
          oldData.push({
            key: Math.floor(Math.random() * (999999 - 100000 + 1)) + 100000,
            catalog_number: e.catalog_number,
            rating_value: rating.rating_value,
            company: {
              label: company.company_id.name,
              value: company.company_id._id,
            },
            price: company.price,
            discount: company.discount,
            amount:
              Number(company.price) -
              Number((company.discount * company.price) / 100),
          });
        });
      });
    });
    console.log(oldData);
    setData(oldData);
  }, []);

  const Handle$OnClick$Submit = () => {
    const newData = {
      key: Math.floor(Math.random() * (999999 - 100000 + 1)) + 100000,
      catalog_number: String(catalogNum).trim(), // Ensure catalogNum is treated as a string
      rating_value: String(ratingValue).trim(), // Ensure ratingValue is treated as a string
      company: company, // Ensure company is treated as a string
      price: Number(price),
      discount: discount,
      amount: Number(price) - Number((discount * price) / 100),
    };

    console.log(newData);

    // validation
    if (newData.catalog_number === "") {
      message.error("Catalog Number is required");
      return;
    }
    if (newData.rating_value === "") {
      message.error("Rating Value is required");
      return;
    }
    if (newData.company === "Select Company") {
      message.error("Company is required");
      return;
    }
    if (newData.price === "") {
      message.error("Price is required");
      return;
    }
    if (newData.discount === "") {
      message.error("Discount is required");
      return;
    }

    setData([...data, newData]);
    setCompany("Select Company");
    setPrice("");
    setDiscount("");
  };

  const Handle$OnClick$Purchase = async () => {
    if (String(description).trim() === "") {
      message.error("Description is required");
      return;
    }

    let sendData = {
      desc: "",
      catalog: [],
    };

    console.log(data);
    data.map((e) => {
      if (sendData.catalog.length !== 0) {
        const foundCatalog = sendData.catalog
          .map((data, i) => {
            if (data.catalog_number === e.catalog_number) {
              return i;
            }
          })
          .filter((index) => index !== undefined);

        if (foundCatalog.length !== 0) {
          const foundRating = sendData.catalog[foundCatalog].rating
            .map((data, i) => {
              console.log("was I here");
              if (data.rating_value === e.rating_value) return i;
            })
            .filter((index) => index !== undefined);

          if (foundRating.length !== 0) {
            console.log(
              foundRating,
              sendData.catalog[foundCatalog].rating[foundRating]
            );
            sendData.catalog[foundCatalog].rating[foundRating].companies.push({
              company_id: e.company.value,
              price: e.price,
              discount: e.discount,
            });
          } else {
            const newRating = {
              rating_value: e.rating_value,
              companies: [
                {
                  company_id: e.company.value,
                  price: e.price,
                  discount: e.discount,
                },
              ],
            };
            sendData.catalog[0].rating.push(newRating);
          }
        } else {
          const newCatalog = {
            catalog_number: e.catalog_number,
            rating: [
              {
                rating_value: e.rating_value,
                companies: [
                  {
                    company_id: e.company.value,
                    price: e.price,
                    discount: e.discount,
                  },
                ],
              },
            ],
          };
          sendData.catalog.push(newCatalog);
        }
      } else {
        sendData = {
          desc: String(description).trim(),
          catalog: [
            {
              catalog_number: e.catalog_number,
              rating: [
                {
                  rating_value: e.rating_value,
                  companies: [
                    {
                      company_id: e.company.value,
                      price: e.price,
                      discount: e.discount,
                    },
                  ],
                },
              ],
            },
          ],
        };
      }
    });

    try {
      const response = await updateSubComponent(sendData, id);
      if (response.type === "success") {
        message.success("Subcomponent Added Successfully");
        ResetHandler();
        setDescription("");
        setData([]);
        localStorage.setItem("SubComponentData", JSON.stringify({}));
        navigate("/offersubcomponentlist");
      } else if (response.type === "error") {
        message.error(response.message);
      }
    } catch (e) {
      message.error("Cannot set Subcomponent");
    }
  };

  return (
    <div className="bg-[#f3f7ff] w-full min-h-screen flex flex-col">
      <p className="text-3xl text-blue-800 font-semibold p-4 ">
        Update Subcomponent
      </p>
      <div className="w-[99%]">
        {description !== "" ? (
          <div className="m-5 p-5 bg-white">
            <p className="text-blue-800 font-semibold text-xl p-2">
              Update SubComponent
            </p>
            <div className="flex flex-col justify-center gap-3 items-center">
              <div className="flex flex-row gap-3">
                <p className="font-bold text-gray-500">Description:</p>
                <div className="w-fit">{description}</div>
              </div>
              <Button
                onClick={() => setDescription("")}
                className="bg-blue-700 text-white"
              >
                Edit
              </Button>
            </div>
          </div>
        ) : (
          <div className="p-5 m-5 bg-white">
            <p className="text-blue-800 font-semibold text-xl p-2">
              Update SubComponent
            </p>
            <p className="py-2 px-4 text-lg font-semibold text-gray-500 ">
              Description
            </p>
            <div className="flex flex-col gap-3 mx-4">
              <Input
                className="w-1/2"
                ref={descriptionRef}
                placeholder="Enter Description"
              />
              <Button
                onClick={() =>
                  setDescription(descriptionRef.current?.input.value)
                }
                className="w-fit bg-blue-700 text-white"
              >
                Submit
              </Button>
            </div>
          </div>
        )}
      </div>
      {description !== "" && (
        <div className="w-[99%]">
          <div className="w-full p-5 flex justify-evenly">
            <div className="w-1/2 p-5 bg-white">
              <section>
                <div className="font-semibold p-2 text-gray-500">
                  Catalog Number
                </div>
                <Input
                  onChange={(e) => setCatalogNum(e.target.value)}
                  value={catalogNum}
                  className=""
                  placeholder="Enter Catalog Number"
                />
              </section>
              <section>
                <div className="font-semibold p-2 text-gray-500">
                  Select Company
                </div>
                <Select
                  showSearch
                  filterOption={(input, option) =>
                    (option?.label ?? "")
                      .toLowerCase()
                      .includes(input.toLowerCase())
                  }
                  className="w-full"
                  placeholder="Select Company"
                  value={company}
                  onChange={handleChange}
                  options={options}
                />
              </section>
              <section>
                <div className="font-semibold p-2 text-gray-500">Discount</div>
                <Input
                  value={discount}
                  onChange={(e) => setDiscount(e.target.value)}
                  type="number"
                  className=""
                  placeholder="Enter Discount"
                />
              </section>
            </div>
            <div className="bg-white w-1/2 p-5">
              <section>
                <div className="font-semibold p-2 text-gray-500">
                  Rating Value
                </div>
                <Input
                  onChange={(e) => setRatingValue(e.target.value)}
                  value={ratingValue}
                  className=""
                  placeholder="Enter Rating Value"
                  name="rating_value"
                />
              </section>
              <section>
                <div className="font-semibold p-2 text-gray-500">Price</div>
                <Input
                  onChange={(e) => setPrice(e.target.value)}
                  value={price}
                  type="number"
                  name="price"
                  className=""
                  placeholder="Enter Price"
                />
                <section className="w-full flex items-center justify-center mt-8 gap-5">
                  <Button
                    onClick={Handle$OnClick$Submit}
                    className="bg-blue-700 text-white"
                  >
                    Add
                  </Button>
                  <Button
                    onClick={ResetHandler}
                    className="bg-gray-500 text-white"
                  >
                    Reset
                  </Button>
                </section>
              </section>
            </div>
          </div>
          <section className="w-full flex flex-row items-center justify-center mt-8 gap-5">
            <Button
              onClick={Handle$OnClick$Purchase}
              className="bg-blue-700 text-white"
            >
              Update the Subcomponent
            </Button>
          </section>
          <section className=" bg-white m-7 ">
            <Table columns={columns} dataSource={data} key={data.key} />
          </section>
        </div>
      )}
    </div>
  );
};
