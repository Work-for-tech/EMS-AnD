import { Button, Input, Select, Table, Tooltip, message } from "antd";
import { Trash2 } from "lucide-react";
import React, { useEffect, useMemo } from "react";
import { getSubComponents } from "../../APIs/subComponent";
import { useNavigate } from "react-router-dom";
import { updateComponent } from "../../APIs/component";

export const UpdateComponent = () => {
  const navigate = useNavigate();
  const [id, setId] = React.useState("");
  const [data, setData] = React.useState([]);
  const [Name, setName] = React.useState("");
  const [SubComponent, setSubComponent] = React.useState(
    "Select Sub Component"
  );
  const [quantity, setQuantity] = React.useState(1);
  const [options, setOptions] = React.useState([]);
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
        return <div>{data.indexOf(r) + 1}</div>;
      },
    },
    {
      title: "Sub Component",
      render: (text, record) => (
        <div>
          {options.map((e) => {
            if (e.value === record.sub_component) {
              return <div key={e.value}>{e.label}</div>;
            }
          })}
        </div>
      ),
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
    },
    {
      title: "Action",
      dataIndex: "id",
      key: "id",
      render: (_, record) => (
        <Tooltip placement="top" title={"Delete"} arrow={mergedArrow}>
          <button
            className="text-red-800 cursor-pointer"
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

  const getSubComponent = async () => {
    const response = await getSubComponents();
    if (response.type === "success") {
      setOptions(
        response.data.data.map((e) => ({ label: e.desc, value: e._id }))
      );
    } else if (response.type === "error") {
      console.log(response.message);
    }
  };

  useEffect(() => {
    getSubComponent();
  }, []);

  const handleChange = (value) => {
    setSubComponent(value);
  };

  const HandleReset = () => {
    setName("");
    setSubComponent("Select Sub Component");
    setQuantity(1);
  };

  const HandleAdd = () => {
    const newData = {
      key: data.length + 1,
      sub_component: SubComponent,
      quantity: quantity,
    };

    if (SubComponent === "Select Sub Component") {
      message.error("Please select a sub component");
      return;
    }

    if (quantity <= 0) {
      message.error("Please enter valid quantity");
      return;
    }

    console.log(newData);

    // check if sub component already exists
    for (let i = 0; i < data.length; i++) {
      if (data[i].sub_component === SubComponent) {
        message.error("Sub component already exists");
        return;
      }
    }

    setData([...data, newData]);
    setSubComponent("Select Sub Component");
  };

  const Handle$OnClick$Send = async () => {
    console.log(data);
    const sendData = {
      name: String(Name).trim(),
      sub_components: [],
    };

    data.map((e) => {
      console.log(e);
      sendData.sub_components.push({
        subcomponent_id: e.sub_component,
        quantity: Number(e.quantity),
      });
    });

    console.log(sendData);

    const response = await updateComponent(id, sendData);

    if (response.type === "success") {
      message.success(response.data.message);
      HandleReset();
      setData([]);
      localStorage.removeItem("ComponentData");
      navigate("/componentlist");
    } else if (response.type === "error") {
      message.error(response.message);
    }
  };
  useEffect(() => {
    console.log(JSON.parse(localStorage.getItem("ComponentData")));
    const data = JSON.parse(localStorage.getItem("ComponentData"));
    setId(data._id);
    setName(data.name);
    console.log(
      data.sub_components.map((e) => {
        return {
          key: e._id,
          sub_component: e.subcomponent_id._id,
          quantity: e.quantity,
        };
      })
    );
    setData(
      data.sub_components.map((e) => {
        return {
          key: e._id,
          sub_component: e.subcomponent_id._id,
          quantity: e.quantity,
        };
      })
    );
  }, []);

  return (
    <div className="w-full h-screen bg-[#f3f7ff]">
      <p className="text-3xl text-blue-800 font-semibold p-4">
        Update Component
      </p>
      <div className="m-4 flex items-center justify-center">
        <div className="bg-white flex flex-col w-full p-2 rounded-md">
          <p className="text-blue-800 font-semibold text-xl p-2">
            Enter Component's Details
          </p>
          <div className="flex items-center justify-center flex-row w-full p-4 gap-4 rounded-md">
            <div className="w-1/2">
              <div className="font-semibold p-2 text-gray-500">Name</div>
              <Input
                onChange={(e) => setName(e.target.value)}
                value={Name}
                className="w-full"
                placeholder="Name"
              />
            </div>

            <div className="w-1/2">
              <div className="font-semibold p-2 text-gray-500">
                Sub Components
              </div>
              <Select
                showSearch
                filterOption={(input, option) =>
                  (option?.label ?? "")
                    .toLowerCase()
                    .includes(input.toLowerCase())
                }
                className="w-full"
                placeholder="Sub Components"
                value={SubComponent}
                onChange={handleChange}
                options={options}
              />
            </div>
          </div>
          <div className="bg-white flex items-center justify-start flex-row w-full px-4 gap-4 rounded-md">
            <div className="w-1/2">
              <div className="font-semibold p-2 text-gray-500">
                Initial Quantity
              </div>
              <Input
                onChange={(e) => setQuantity(e.target.value)}
                value={quantity}
                className="w-full"
                placeholder="Initial Quantity"
              />
            </div>
          </div>

          <div className="bg-white pt-6 flex items-center justify-center pb-4 gap-4">
            <Button onClick={HandleAdd} className="bg-blue-700 text-white">
              Add
            </Button>
            <Button onClick={HandleReset} className="bg-gray-500 text-white">
              Reset
            </Button>
          </div>
        </div>
      </div>
      <div className="m-4">
        <Table columns={columns} dataSource={data} />
        <div className="flex items-center justify-center m-4">
          <Button
            onClick={Handle$OnClick$Send}
            className="bg-blue-700 text-white"
          >
            Submit
          </Button>
        </div>
      </div>
    </div>
  );
};
