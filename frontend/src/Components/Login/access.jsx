import React, { useEffect, useMemo, useState } from "react";
import { addAccess, getAccess } from "../../APIs/access";
import { Button, Input, Select, Table, Tooltip, message } from "antd";
import { Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const Access = () => {
  const navigate = useNavigate();
  const [accessSelect, setAccessSelect] = useState({
    label: "Select Module",
    value: "",
  });
  const [access, setAccess] = useState([]);
  const [id, setId] = useState("");
  const [options, setOptions] = useState([
    {
      label: "Read Offer Only",
      value: "ROffer",
    },
    {
      label: "Read and Write Offer",
      value: "RWOffer",
    },
    {
      label: "Read Project Only",
      value: "RProject",
    },
    {
      label: "Read and Write Project",
      value: "RWProject",
    },
    {
      label: "Read Indent Only",
      value: "RIndent",
    },
    {
      label: "Read and Write Indent",
      value: "RWIndent",
    },
    {
      label: "Read Purchase Only",
      value: "RPurchase",
    },
    {
      label: "Read and Write Purchase",
      value: "RWPurchase",
    },
    {
      label: "Read GRN Only",
      value: "RGRN",
    },
    {
      label: "Read and Write GRN",
      value: "RWGRN",
    },
    {
      label: "Read Issue Only",
      value: "RIssue",
    },
    {
      label: "Read and Write Issue",
      value: "RWIssue",
    },
    {
      label: "Read Employee Only",
      value: "REmployee",
    },
    {
      label: "Read and Write Employee",
      value: "RWEmployee",
    },
  ]);
  const [arrow, setArrow] = React.useState("Show");
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
      title: "Sr. No.",
      key: "sr_no",
      render: (r) => {
        return <div>{access.indexOf(r) + 1}</div>;
      },
    },
    {
      title: "Access",
      key: "access",
      dataIndex: "access",
    },
    {
      title: "Action",
      render: (_, record) => (
        <Tooltip placement="top" title={"Delete"} arrow={mergedArrow}>
          <button
            className="text-red-800 cursor-pointer"
            onClick={() => {
              const newAccess = access.filter((e) => {
                return e.access !== record.access;
              });
              const newOptions = [
                ...options,
                { label: record.access, value: record.access },
              ];
              setOptions(newOptions);
              setAccess(newAccess);
            }}
          >
            <Trash2 />
          </button>
        </Tooltip>
      ),
    },
  ];

  useEffect((e) => {
    console.log(JSON.parse(localStorage.getItem("employeeId")));
    setId(JSON.parse(localStorage.getItem("employeeId")));
    getAccess(JSON.parse(localStorage.getItem("employeeId"))).then((res) => {
      const accessdata = [];
      const optionsdata = [];
      res.data.user.moduleName.map((e) => {
        accessdata.push({ key: e, access: e });
      });
      options.map((e) => {
        if (!res.data.user.moduleName.includes(e.value)) {
          optionsdata.push(e);
        }
      });
      setOptions(optionsdata);
      setAccess(accessdata);
    });
  }, []);

  const ChangeHandler = (e) => {
    setAccessSelect(e);
  };

  const HandleAdd = () => {
    if (accessSelect.label === "Select Module") {
      message.error("Please Select Options");
    }
    const newOptions = options.filter((e) => {
      return e.value !== accessSelect;
    });

    setAccess([...access, { key: accessSelect, access: accessSelect }]);
    setOptions(newOptions);
    setAccessSelect({ label: "Select Module", value: "" });
  };

  const HandleSubmit = async () => {
    const submitData = {
      userId: id,
      moduleName: access.map((e) => {
        return e.access;
      }),
    };
    console.log(access);
    console.log(submitData);
    const response = await addAccess(submitData);

    if (response.type === "success") {
      message.success("added Access Successfully");
      navigate("/employeelist");
    } else {
      message.error("Something went wrong");
    }
  };

  return (
    <div className="w-full min-h-screen bg-[#f3f7ff]">
      <p className="text-3xl text-blue-800 font-semibold p-4">
        Access Management
      </p>
      <div className="rounded-md bg-white flex flex-col m-4">
        <p className="text-blue-800 font-semibold text-xl px-4 pt-4">
          Add or Remove Access
        </p>
        <div className="w-full flex justify-evenly">
          <div className="w-3/4 p-4">
            <section>
              <div className="font-semibold p-2 text-gray-500">
                Select Module
              </div>
              <Select
                showSearch
                filterOption={(input, option) =>
                  (option?.label ?? "")
                    .toLowerCase()
                    .includes(input.toLowerCase())
                }
                className="w-full"
                placeholder="Select Module"
                name="module"
                value={accessSelect}
                onChange={ChangeHandler}
                options={options}
              />
            </section>
          </div>
        </div>
        <div className="bg-white pt-6 flex items-center justify-center pb-4 gap-4">
          <Button onClick={HandleAdd} className="bg-blue-700 text-white">
            Add
          </Button>
        </div>
      </div>
      <div className="m-4">
        <Table columns={columns} dataSource={access} />
      </div>
      <div className="pt-6 flex items-center justify-center pb-4 gap-4">
        <Button onClick={HandleSubmit} className="bg-blue-700 text-white">
          Submit
        </Button>
      </div>
    </div>
  );
};
