import React, { useEffect, useState, useMemo } from "react";
import { Input, Select, Button, Table, message, Tooltip } from "antd";
import { getclients } from "../../APIs/client";
import { getProjects } from "../../APIs/project";
import { useDispatch, useSelector } from "react-redux";
import { offerActions } from "../../store/offerslice";
import { useNavigate } from "react-router-dom";
import { panelActions } from "../../store/panelslice";
import { getRevisionOfferComponent, updateRevision } from "../../APIs/revision";
import { ArrowBigLeftDash, Redo2, Trash2 } from "lucide-react";
import { updatepanelActions } from "../../store/updateslice";

export const OfferRevision = ({
  setRecentData,
  setOfferId,
  OfferId,
  recentData,
  getAllOffers,
  setAddRevision,
}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const offer = useSelector((state) => state.offer);
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
  const [addedInitialData, setAddedInitialData] = useState(false);

  const [tableData, setTableData] = useState([]);
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

  const Handle$OnClick$Proceed = async () => {
    console.log(offer);
    const SendData = {
      project_id: projectName.value,
      description_of_panel: DescriptionOfPanel,
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
      console.log(e);
      // Find the index of the matching element in SendData.panels_to_be_created
      const foundIndex = SendData.panels_to_be_created.findIndex(
        (n) => n.name.trim() === e.name.trim()
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
        SendData.price += e.total_price;
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
              total_price: e.total_price,
              components: e.panel,
            },
          ],
        });
        SendData.price += e.total_price;
      }
    });

    console.log(SendData);

    const response = await updateRevision(SendData, OfferId);

    if (response.type === "success") {
      message.success(response.data.message);
      setAddedInitialData(false);
      setTableData([]);
      setClientName({ label: "Select Client", value: "" });
      setProjectName({ label: "Select Project", value: "" });
      setDescriptionOfPanel("");
      setQtyOfPanel(1);
      setAddRevision("");
      setRecentData({});
      setOfferId("");
      dispatch(offerActions.setInitials());
      getAllOffers();
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
        <div className="flex flex-row gap-2">
          <Tooltip placement="top" title={"Delete Offer"} arrow={mergedArrow}>
            <button
              className="text-red-600 hover:text-red-300"
              onClick={() => {
                setTableData(
                  tableData.filter((e) => {
                    if (e.key !== record.key) {
                      return e;
                    }
                  })
                );
              }}
            >
              <Trash2 />
            </button>
          </Tooltip>
          {record.id && (
            <Tooltip placement="top" title={"Update Offer"} arrow={mergedArrow}>
              <button
                className="text-blue-600 hover:text-blue-300"
                onClick={async () => {
                  try {
                    const dataPromises = record.panel.map(async (e) => {
                      const response = await getRevisionOfferComponent(e);
                      return response.data?.data;
                    });

                    const data = await Promise.all(dataPromises);
                    console.log(data);
                    const completed_components = [];
                    data.map((e) => {
                      e.completed_subcomponents = e.sub_components.map(
                        (sub) => sub._id
                      );
                      e.price = 0;
                      e.sub_components.map((sub) => {
                        sub.status = "submitted";
                        e.price +=
                          (sub.company.price -
                            (sub.company.price * sub.company.discount) / 100) *
                          sub.quantity;
                      });
                    });
                    dispatch(
                      updatepanelActions.addInitialDetails({
                        name: record.name,
                        part_name: record.part_name,
                        price: record.price,
                        profit_percentage: record.profit_percentage,
                        components: data,
                        id: record.id,
                        type: "revision",
                      })
                    );

                    navigate("/updateoffer");
                  } catch (error) {
                    console.error("Error:", error);
                  }
                }}
              >
                <Redo2 />
              </button>
            </Tooltip>
          )}
        </div>
      ),
    },
  ];

  useEffect(() => {
    console.log(recentData);
    if (recentData.client_name) {
      setClientName({
        label: recentData.client_name,
        value: recentData.client_name,
      });
      setProjectName({
        label: recentData.project_name,
        value: recentData.project_name,
      });
      setDescriptionOfPanel(recentData.description_of_panel);
      setQtyOfPanel(recentData.Qty_of_panel);
      setAddedInitialData(true);
      const dataOfTable = [];
      recentData?.panels_to_be_created?.map((e) => {
        dataOfTable.push(
          e.parts.map((part) => {
            console.log(part);
            return {
              key: Math.floor(Math.random() * (999999 - 100000 + 1)) + 100000,
              name: e.name,
              part_name: part.part_name,
              price: part.price,
              profit_percentage: part.profit_percentage,
              profit: part.profit,
              total_price: part.total_price,
              id: part._id,
              panel: part.components,
            };
          })
        );
      });

      const reduxData = {
        id: OfferId,
        projectName: {
          label: recentData.project_name,
          value: recentData.project_name,
        },
        clientName: {
          label: recentData.client_name,
          value: recentData.client_name,
        },
        QtyOfPanel: recentData.Qty_of_panel,
        DescriptionOfPanel: recentData.description_of_panel,
        panels_to_be_created: recentData.panels_to_be_created,
      };
      setTableData(...dataOfTable);
      dispatch(offerActions.setUpdationData(reduxData));
      dispatch(panelActions.initial());
    } else {
      message.error("No data found");
      setAddRevision("");
      setOfferId("");
    }
  }, [recentData]);

  useEffect(() => {
    console.log(offer);
    if (!offer.DescriptionOfPanel) {
      return;
    } else {
      setDescriptionOfPanel(offer.DescriptionOfPanel);
      setQtyOfPanel(offer.QtyOfPanel);
      setClientName(offer.clientName);
      setAddedInitialData(true);
      setProjectName(offer.projectName);
      const dataOfTable = [];
      recentData?.panels_to_be_created.map((e) => {
        e.parts.map((part) => {
          console.log(part);
          dataOfTable.push({
            key: Math.floor(Math.random() * (999999 - 100000 + 1)) + 100000,
            name: e.name,
            part_name: part.part_name,
            price: part.price,
            profit_percentage: part.profit_percentage,
            profit: part.profit,
            total_price: part.total_price,
            id: part._id,
            panel: part.components,
          });
        });
      });
      if (offer.panelsData) {
        offer.panelsData.map((e) => {
          dataOfTable.push({
            ...e, // Spread the existing properties of 'e'
            key: Math.floor(Math.random() * (999999 - 100000 + 1)) + 100000,
          });
        });

        console.log(dataOfTable);
        setTableData(dataOfTable);
        dispatch(panelActions.initial());
      }
      console.log(tableData);
    }
  }, [offer]);

  const BackHandler = () => {
    setAddRevision("");
    setRecentData({});
    dispatch(offerActions.setInitials());
  };

  return (
    <div className="w-full min-h-screen bg-[#f3f7ff]">
      <p className="text-3xl text-blue-800 font-semibold p-4">Update Offer</p>
      <div className="px-4 flex flex-row cursor-pointer" onClick={BackHandler}>
        <ArrowBigLeftDash className="text-gray-500 hover:text-blue-800" />
        <span className="font-semibold text-gray-500 hover:text-blue-800">
          Offer List
        </span>
      </div>
      {addedInitialData === false ? (
        <div className="rounded-md bg-white flex flex-col m-4"></div>
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
            </div>
          </div>

          <div className="w-full">
            <p className="text-3xl text-blue-800 font-semibold p-4">
              Panel's Details
            </p>
            <div className="flex items-center justify-center">
              <Button
                onClick={() => {
                  dispatch(
                    offerActions.setInitialDetails({
                      projectName: projectName,
                      clientName: clientName,
                      QtyOfPanel: QtyOfPanel,
                      DescriptionOfPanel: DescriptionOfPanel,
                      id: OfferId,
                    })
                  );
                  const dispatchData = {
                    panels_to_be_created: recentData.panels_to_be_created,
                    id: OfferId,
                  };
                  dispatch(offerActions.setPanelsToBeCreated(dispatchData));
                  dispatch(updatepanelActions.addType("revision"));
                  dispatch(panelActions.initial());
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
      {tableData && (
        <div className="rounded-md  flex flex-col m-4">
          <section className="flex items-center justify-center gap-4 p-4">
            <Button
              onClick={() => Handle$OnClick$Proceed()}
              className="bg-blue-700 text-white m-4"
            >
              Update Data
            </Button>
          </section>
        </div>
      )}
    </div>
  );
};
