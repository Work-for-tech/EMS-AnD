import React, { useEffect, useState } from "react";
import { Input, Select, Button, Table, message, Tooltip } from "antd";
import { getclients } from "../../APIs/client";
import { getProjects } from "../../APIs/project";
import { getComponents } from "../../APIs/component";
import { addOffers } from "../../APIs/offer";
import { useDispatch, useSelector } from "react-redux";
import { offerActions } from "../../store/offerslice";
import { useNavigate } from "react-router-dom";
import { panelActions } from "../../store/panelslice";
import { Trash2 } from "lucide-react";

export const Offer = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const offer = useSelector((state) => state.offer);
  const [clientOptions, setClientOptions] = useState([]);
  const [projectOptions, setProjectOptions] = useState([]);
  const [projectName, setProjectName] = useState({
    label: "Select Project",
    value: "",
  });
  const [clientName, setClientName] = useState({
    label: "Select Client",
    value: "",
  });
  const [DescriptionOfPanel, setDescriptionOfPanel] = useState("");
  const [QtyOfPanel, setQtyOfPanel] = useState(1);
  const [Price, setPrice] = useState(0);
  const [addedInitialData, setAddedInitialData] = useState(false);

  const [tableData, setTableData] = useState([]);
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

  const Handle$OnClick$Proceed = async () => {
    const SendData = {
      project_id: projectName.value,
      description_of_panel: String(DescriptionOfPanel).trim(),
      client_id: clientName.value,
      qty_of_panel: Number(QtyOfPanel),
      panels_to_be_created: [],
      price: 0,
    };

    // validation
    if (SendData.project_id === "Select Project") {
      message.error("Project is required");
      return;
    }
    if (SendData.client_id === "Select Client") {
      message.error("Client is required");
      return;
    }
    if (SendData.qty_of_panel === "") {
      message.error("Qty of Panel is required");
      return;
    }
    if (SendData.description_of_panel === "") {
      message.error("description_of_panel is required");
      return;
    }

    tableData.forEach((e) => {
      // Find the index of the matching element in SendData.panels_to_be_created
      const foundIndex = SendData.panels_to_be_created.findIndex(
        (n) => String(n.name).trim() === String(e.name).trim()
      );

      if (foundIndex !== -1) {
        // If the element with a matching name is found, update it
        SendData.panels_to_be_created[foundIndex].parts.push({
          part_name: e.part_name,
          price: e.price,
          profit_percentage: e.profit_percentage,
          profit: e.profit,
          total_price: e.total_price,
          components: e.panel,
        });
        SendData.price += Number(e.total_price);
      } else {
        // If no matching element is found, create a new one
        SendData.panels_to_be_created.push({
          name: e.name,
          parts: [
            {
              part_name: e.part_name,
              price: e.price,
              profit_percentage: e.profit_percentage,
              profit: e.profit,
              total_price: Number(e.total_price),
              components: e.panel,
            },
          ],
        });
        SendData.price += Number(e.total_price);
      }
    });

    console.log(SendData);
    const response = await addOffers(SendData);

    if (response.type === "success") {
      message.success(response.data.message);
      dispatch(offerActions.setInitials({}));
      navigate("/offerlist");
    } else if (response.type === "error") {
      message.error(response.message);
    }
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Part Name",
      dataIndex: "part_name",
      key: "part_name",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Profit Percentage",
      dataIndex: "profit_percentage",
      key: "profit_percentage",
    },
    {
      title: "Profit",
      dataIndex: "profit",
      key: "profit",
    },
    {
      title: "Total Price",
      dataIndex: "total_price",
      key: "total_price",
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      render: (text, record) => (
        <Tooltip
          className="cursor-pointer"
          placement="top"
          title={"Delete"}
          arrow={mergedArrow}
        >
          <button
            onClick={() => {
              console.log(record);
              setTableData(
                tableData.filter((e) => {
                  if (e.key !== record.key) {
                    return e;
                  }
                })
              );
            }}
          >
            <Trash2 className="text-red-600" />
          </button>
        </Tooltip>
      ),
    },
  ];

  const getAllClients = async () => {
    const response = await getclients();
    if (response.type === "success") {
      setClientOptions(
        response.data.data.map((e) => ({ label: e.name, value: e._id }))
      );
    } else if (response.type === "error") {
      console.log(response.message);
    }
  };

  useEffect(() => {
    getAllClients();
    if (!offer.id && offer.panelsData.length === 0) {
      dispatch(offerActions.setInitials());
    }
  }, []);

  useEffect(() => {
    if (clientName.label === "Select Client") return;
    getProjects({ client_id: clientName.value }).then((response) => {
      if (response.type === "success") {
        setProjectOptions(
          response.data.data.map((e) => ({
            label: e.project_name,
            value: e._id,
          }))
        );
      } else if (response.type === "error") {
        console.log(response.message);
      }
    });
  }, [clientName.label]);

  useEffect(() => {
    console.log(offer);
    if (!offer.id && offer.panelsData.length === 0) {
      // dispatch(offerActions.setInitials());
      return;
    }
    if (!offer.DescriptionOfPanel) {
      return;
    } else {
      setDescriptionOfPanel(offer.DescriptionOfPanel);
      setQtyOfPanel(offer.QtyOfPanel);
      setClientName(offer.clientName);
      setAddedInitialData(true);
      if (offer.panelsData) {
        console.log(offer.panelsData);
        const newData = offer.panelsData.map((e) => {
          return {
            ...e, // Spread the existing properties of 'e'
            key: Math.floor(Math.random() * (999999 - 100000 + 1)) + 100000,
            price: e.price.toFixed(2),
            profit: e.profit.toFixed(2),
            total_price: e.total_price.toFixed(2),
          };
        });
        setTableData(newData); // Use the new array with 'key' property
        dispatch(panelActions.initial());
      }
      setProjectName(offer.projectName);

      console.log(tableData);
    }
  }, [offer]);

  const resetValue = () => {
    setClientName({ label: "Select Client", value: "" });
    setProjectName({ label: "Select Project", value: "" });
    setDescriptionOfPanel("");
    setQtyOfPanel(1);
    dispatch(
      offerActions.setInitialDetails({
        projectName: {
          label: "Select Project",
          value: "",
        },
        clientName: {
          label: "Select Client",
          value: "",
        },
        QtyOfPanel: 0,
        DescriptionOfPanel: "",
      })
    );
  };

  const resetProfitValue = () => {
    setProfitPercentage(0);
    setProfit(0);
  };

  const HandleAddInitials = () => {
    // validation
    if (clientName.label === "Select Client") {
      message.error("Please select client");
      return;
    }
    if (projectName.label === "Select Project") {
      message.error("Please select project");
      return;
    }
    if (QtyOfPanel <= 0) {
      message.error("Please enter quantity of panel");
      return;
    }
    if (DescriptionOfPanel === "") {
      message.error("Please enter Description of panel");
      return;
    }
    setAddedInitialData(true);
    dispatch(
      offerActions.setInitialDetails({
        projectName: projectName,
        clientName: clientName,
        QtyOfPanel: QtyOfPanel,
        DescriptionOfPanel: DescriptionOfPanel,
      })
    );
  };

  return (
    <div className="w-full min-h-screen bg-[#f3f7ff]">
      <p className="text-3xl text-blue-800 font-semibold p-4">Add Offers</p>
      {addedInitialData === false ? (
        <div className="rounded-md bg-white flex flex-col m-4">
          <p className="text-blue-800 font-semibold text-xl px-4 pt-4">
            Enter Offer's Details
          </p>
          <div className="w-full flex justify-evenly">
            <div className="w-3/4 p-4">
              <section>
                <div className="font-semibold p-2 text-gray-500">
                  Select Client
                </div>
                <Select
                  className="w-full"
                  placeholder="Select Client"
                  value={clientName.label}
                  showSearch
                  filterOption={(input, option) =>
                    (option?.label ?? "")
                      .toLowerCase()
                      .includes(input.toLowerCase())
                  }
                  onChange={(value) => {
                    clientOptions.map((e) => {
                      if (value === e.value) {
                        setClientName({ value: e.value, label: e.label });
                        setProjectName("Select Project");
                      }
                    });
                    setProjectName({ label: "Select Project", value: "" });
                  }}
                  options={clientOptions}
                />
              </section>
              <section>
                <div className="font-semibold p-2 text-gray-500 mt-2">
                  Description Of Panel
                </div>
                <textarea
                  onChange={(e) => setDescriptionOfPanel(e.target.value)}
                  value={DescriptionOfPanel}
                  type="text"
                  className="w-full border-2 border-gray-200 rounded-md p-1 hover:border-blue-300 focus:border-blue-300"
                  placeholder="Enter Discription"
                />
              </section>
            </div>
            <div className="bg-white w-3/4 p-4">
              <section>
                <div className="font-semibold p-2 text-gray-500">
                  Select Project
                </div>
                <Select
                  showSearch
                  filterOption={(input, option) =>
                    (option?.label ?? "")
                      .toLowerCase()
                      .includes(input.toLowerCase())
                  }
                  className="w-full"
                  placeholder="Select Project"
                  value={projectName.label}
                  onChange={(value) => {
                    projectOptions.map((e) => {
                      if (value === e.value) {
                        setProjectName({ value: e.value, label: e.label });
                      }
                    });
                  }}
                  options={projectOptions}
                />
              </section>
              <section>
                <div className="font-semibold p-2 text-gray-500 mt-2">
                  Qty. Of Panel
                </div>
                <Input
                  onChange={(e) => setQtyOfPanel(e.target.value)}
                  value={QtyOfPanel}
                  type="number"
                  className=""
                  placeholder="Enter Value"
                />
              </section>
            </div>
          </div>
          <section className="flex items-center justify-center gap-5 p-4">
            <Button
              onClick={HandleAddInitials}
              className="bg-blue-700 text-white"
            >
              Confirm Initials
            </Button>
            <Button onClick={resetValue} className="bg-gray-500 text-white">
              Reset
            </Button>
          </section>
        </div>
      ) : (
        <div className="w-full">
          <div className="m-5 p-5 bg-white">
            <p className="text-blue-800 font-semibold text-xl p-2">
              Add Panel's Details
            </p>

            <div className="flex flex-col justify-center gap-3 items-center">
              <div className="p-1">
                <div className="flex flex-row gap-3 p-1">
                  <p className="font-bold text-gray-500">Client Name:</p>
                  <div className="w-fit">{clientName.label}</div>
                </div>
                <div className="flex flex-row gap-3 p-1">
                  <p className="font-bold text-gray-500">Project Name:</p>
                  <div className="w-fit">{projectName.label}</div>
                </div>
                <div className="flex flex-row gap-3 p-1">
                  <p className="font-bold text-gray-500">Quantity of Panel:</p>
                  <div className="w-fit">{QtyOfPanel}</div>
                </div>
              </div>
              <Button
                onClick={() => setAddedInitialData(false)}
                className="bg-blue-700 text-white"
              >
                Edit
              </Button>
            </div>
          </div>

          <div className="w-full">
            <p className="text-3xl text-blue-800 font-semibold p-4">
              Panel's Details
            </p>
            <div className="flex items-center justify-center">
              <Button
                onClick={() => {
                  navigate("/offerpanels");
                }}
                className="bg-blue-700 text-white"
              >
                Add Panels
              </Button>
            </div>
            <div className="p-4">
              <Table columns={columns} dataSource={tableData} />
            </div>
          </div>
        </div>
      )}
      {tableData.length > 0 && (
        <div className="rounded-md  flex flex-col m-4">
          <section className="flex items-center justify-center gap-4 p-4">
            <Button
              onClick={() => Handle$OnClick$Proceed()}
              className="bg-blue-700 text-white m-4"
            >
              Process
            </Button>
          </section>
        </div>
      )}
    </div>
  );
};
