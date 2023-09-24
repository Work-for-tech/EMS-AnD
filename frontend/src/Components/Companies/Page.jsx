import { Button, Input, Tooltip, message } from "antd";
import React, { useEffect, useRef, useState } from "react";
import {
  getCompanies,
  deleteCompanies,
  postCompanies,
} from "../../APIs/company";
import { Trash } from "lucide-react";

export const Companies = () => {
  const [company, setCompany] = useState("");
  const [companies, setCompanies] = useState([]);
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

  const getComp = async () => {
    const response = await getCompanies();

    if (response.type === "success") {
      setCompanies(response.data.data);
    } else if (response.type === "error") {
      message.error(response.message);
    }
  };

  useEffect(() => {
    getComp();
  }, []);

  const Handle$OnClick$Delete = async (id) => {
    const response = await deleteCompanies(id);
    if (response.type === "success") {
      message.success(response.data.message);
      getComp();
    } else if (response.type === "error") {
      message.error(response.message);
    }
  };

  const Handle$OnClick$Submit = async () => {
    // validate company Name ref for min 3 and max 200
    if (
      String(company).trim().length < 2 ||
      String(company).trim().length > 200
    ) {
      message.error("Company Name must be between 2 to 200 characters");
      return;
    }

    const data = {
      name: String(company).trim(),
    };
    const response = await postCompanies(data);
    if (response.type === "success") {
      setCompany("");
      message.success(response.data.message);
      getComp();
    } else if (response.type === "error") {
      message.error(response.message);
    }
  };

  return (
    <div className="w-full h-screen bg-[#f3f7ff]">
      <p className="text-3xl text-blue-800 font-semibold p-4">
        Company Details
      </p>
      <div className="bg-white m-4 flex flex-row rounded-md">
        <div className="h-full w-1/2 p-4 rounded-md">
          <div className="text-blue-800 font-semibold text-xl p-2">
            Enter Company's Details
          </div>
          <div className="text-gray-500 font-semibold p-2">Company Name</div>
          <Input
            onChange={(e) => setCompany(e.target.value)}
            value={company}
            className="w-full"
            placeholder="Enter Company Name"
          />
          <section className="flex items-center justify-start p-4 gap-2">
            <Button
              onClick={Handle$OnClick$Submit}
              className="bg-blue-700 text-white"
            >
              Submit
            </Button>
            <Button
              onClick={() => setCompany("")}
              className="bg-gray-500 text-white"
            >
              Reset
            </Button>
          </section>
        </div>
        <div className="pt-10 w-1/2 h-[28rem] flex flex-col items-center rounded-md">
          <div className="w-3/4 rounded-md">
            <p className="bg-blue-700 text-white p-3 rounded-t-md">
              Company List
            </p>
          </div>
          <div className="w-3/4 h-4/6 overflow-y-auto">
            {companies.map((company, i) => {
              return (
                <div
                  className="flex justify-between p-3 border border-zinc-400"
                  key={i}
                >
                  {company.name}
                  <Tooltip
                    className="cursor-pointer"
                    placement="top"
                    title={"Delete"}
                    arrow={mergedArrow}
                  >
                    <Trash
                      onClick={() => Handle$OnClick$Delete(company._id)}
                      className="text-red-800"
                    />
                  </Tooltip>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
