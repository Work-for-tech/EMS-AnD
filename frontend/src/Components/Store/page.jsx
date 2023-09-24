import { Button, Input, Select, message } from "antd";
import React, { useEffect, useState } from "react";
import { getSubComponents } from "../../APIs/subComponent";
import { createStoreData } from "../../APIs/store";

export const CreateStore = () => {
  const [descOptions, setDescOptions] = useState([]);
  const [catalogOptions, setCatalogOptions] = useState([]);
  const [ratingValueOptions, setRatingValueOptions] = useState([]);
  const [companyOptions, setCompanyOptions] = useState([]);
  const [descData, setDescData] = useState([]);
  const [currentData, setCurrentData] = useState([]);
  const [desc, setDesc] = useState({
    label: "Select Description",
    value: "",
  });
  const [catalogNum, setCatalogNum] = useState({
    label: "Select Catalog No.",
    value: "",
  });
  const [ratingValue, setRatingValue] = useState({
    label: "Select Rating",
    value: "",
  });
  const [company, setCompany] = useState({
    label: "Select Company",
    value: "",
  });
  const [quantity, setQuantity] = useState("");

  const handleChange = (value) => {
    setCompany(companyOptions.filter((e) => e.value === value)[0]);
  };

  const getDescData = async () => {
    const response = await getSubComponents();
    setDescOptions(
      response.data.data.map((e) => {
        return { label: e.desc, value: e.desc };
      })
    );
    setDescData(response.data.data);
  };

  useEffect(() => {
    getDescData();
  }, []);

  const descriptionChangeHandler = (value) => {
    setDesc(
      descOptions.filter((e) => {
        return e.value === value;
      })[0]
    );
    setCurrentData(
      descData.filter((e) => {
        console.log(e.desc === value);
        if (e.desc === value) {
          return e.catalog;
        }
      })[0].catalog
    );

    setCatalogOptions(
      descData
        .filter((e) => {
          return e.desc === value;
        })[0]
        .catalog.map((e) => {
          return { label: e.catalog_number, value: e.catalog_number };
        })
    );

    setCatalogNum({
      label: "Select Catalog No.",
      value: "",
    });
    setRatingValue({
      label: "Select Rating",
      value: "",
    });
    setCompany({
      label: "Select Company",
      value: "",
    });
    setRatingValueOptions([]);
    setCompanyOptions([]);
  };

  const catalogChangeHandler = (value) => {
    setCatalogNum(
      catalogOptions.filter((e) => {
        return e.value === value;
      })[0]
    );

    setRatingValueOptions(
      currentData
        .filter((e) => {
          return e.catalog_number === value;
        })[0]
        .rating.map((e) => {
          return { label: e.rating_value, value: e.rating_value };
        })
    );

    setRatingValue({
      label: "Select Rating",
      value: "",
    });

    setCompany({
      label: "Select Company",
      value: "",
    });
    setCompanyOptions([]);
  };

  const ratingValueChangeHandler = (value) => {
    setRatingValue(
      ratingValueOptions.filter((e) => {
        return e.value === value;
      })[0]
    );

    setCompanyOptions(
      currentData
        .filter((e) => {
          return e.catalog_number === catalogNum.value;
        })[0]
        .rating.filter((e) => {
          return e.rating_value === value;
        })[0]
        .companies.map((e) => {
          return { label: e.company_id.name, value: e.company_id._id };
        })
    );

    setCompany({
      label: "Select Company",
      value: "",
    });
  };

  const ResetHandler = () => {
    setDesc({
      label: "Select Description",
      value: "",
    });
    setCatalogNum({
      label: "Select Catalog No.",
      value: "",
    });
    setRatingValue({
      label: "Select Rating",
      value: "",
    });
    setCompany({
      label: "Select Company",
      value: "",
    });
    setQuantity("");
  };

  const Handle$OnClick$Submit = async () => {
    const sendData = {
      desc: desc.value,
      catalog_number: catalogNum.value,
      rating_value: ratingValue.value,
      companyId: company.value,
      quantity: Number(quantity),
    };
    console.log(sendData);

    const response = await createStoreData(sendData);
    console.log(response.status);

    if (response.type === "success") {
      message.success("Data Added Successfully");
      ResetHandler();
    } else {
      message.error("Data Not Added");
    }
  };

  return (
    <div className="w-full min-h-screen bg-[#f3f7ff]">
      <p className="text-3xl text-blue-800 font-semibold p-4">Add Vendor</p>
      <div className="rounded-md bg-white flex flex-col m-4">
        <p className="text-blue-800 font-semibold text-xl px-4 pt-4">
          Add Subcomponent
        </p>
        <div className="w-full flex justify-evenly">
          <div className="w-3/4 p-4">
            <section>
              <div className="font-semibold p-2 text-gray-500">
                Select Description
              </div>
              <Select
                showSearch
                filterOption={(input, option) =>
                  (option?.label ?? "")
                    .toLowerCase()
                    .includes(input.toLowerCase())
                }
                onChange={descriptionChangeHandler}
                value={desc.label}
                options={descOptions}
                className="w-full"
                placeholder="Enter Catalog Number"
              />
            </section>
            <section>
              <div className="font-semibold p-2 text-gray-500">
                Select Rating Value
              </div>
              <Select
                showSearch
                filterOption={(input, option) =>
                  (option?.label ?? "")
                    .toLowerCase()
                    .includes(input.toLowerCase())
                }
                onChange={ratingValueChangeHandler}
                value={ratingValue.label}
                options={ratingValueOptions}
                className="w-full"
                placeholder="Enter Rating Value"
                name="rating_value"
              />
            </section>

            <section>
              <div className="font-semibold p-2 text-gray-500">Quantity</div>
              <Input
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                type="number"
                className="w-full"
                placeholder="Enter Quantity"
              />
            </section>
          </div>
          <div className="bg-white w-3/4 p-4">
            <section>
              <div className="font-semibold p-2 text-gray-500">
                Select Catalog Number
              </div>
              <Select
                showSearch
                filterOption={(input, option) =>
                  (option?.label ?? "")
                    .toLowerCase()
                    .includes(input.toLowerCase())
                }
                onChange={catalogChangeHandler}
                value={catalogNum.label}
                options={catalogOptions}
                className="w-full"
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
                value={company.label}
                onChange={handleChange}
                options={companyOptions}
              />
            </section>
          </div>
        </div>
        <section className="flex items-center justify-center gap-5 p-4">
          <Button
            onClick={Handle$OnClick$Submit}
            className="bg-blue-700 text-white"
          >
            Submit
          </Button>
          <Button onClick={ResetHandler} className="bg-gray-500 text-white">
            Reset
          </Button>
        </section>
      </div>
    </div>
  );
};
