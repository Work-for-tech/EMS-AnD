import { useState, useEffect, useMemo } from "react";
import { getAllProjects } from "../../APIs/project";
import { finalProjects } from "../../APIs/offer";
import { Button, Input, Select, Table, Tooltip } from "antd";
import { ArrowUpRightFromCircle } from "lucide-react";
import { OfferTable } from "./OfferTable";

export const OfferExcel = () => {
  const [project, setProject] = useState({
    label: "Select Project",
    value: "",
  });
  const [projectData, setProjectData] = useState([]);
  const [data, setData] = useState();
  const [offerData, setOfferData] = useState([]);
  const [offer, setOffer] = useState();
  const [panelData, setPanelData] = useState([]);
  const [panel, setPanel] = useState({ label: "Select Panel", value: "" });
  const [part, setPart] = useState({ label: "Select Part", value: "" });
  const [partData, setPartData] = useState([]);

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

  const OfferColumns = [
    {
      title: "Project Name",
      dataIndex: "project_name",
      key: "name",
    },
    {
      title: "Client Name",
      dataIndex: "client_name",
      key: "client_name",
    },
    {
      title: "Quantity Of Panel",
      dataIndex: "Qty_of_panel",
      key: "Qty_of_panel",
    },
    {
      title: "Description Of Panel",
      dataIndex: "description_of_panel",
      key: "description_of_panel",
    },
    {
      title: "No. of Panel",
      dataIndex: "panels",
      key: "panels",
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      render: (text, record) => (
        <div className="flex flex-row gap-2">
          <Tooltip
            placement="top"
            title={"Select this Offer"}
            arrow={mergedArrow}
          >
            <button
              className="text-blue-800 hover:text-gray-600"
              onClick={() => {
                setOffer(record);
                console.log(record);
                const panelsData = record.panels_to_be_created.map((e) => {
                  return {
                    label: e.name,
                    value: e._id,
                  };
                });
                console.log(panelsData);
                setPanelData(panelsData);
              }}
            >
              <ArrowUpRightFromCircle />
            </button>
          </Tooltip>
        </div>
      ),
    },
  ];

  const fetchProjects = async () => {
    const response = await getAllProjects();
    const projects = response.data.data.map((project) => ({
      label: project.project_name,
      value: project._id,
    }));
    setProjectData(projects);
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchOffer = async () => {
    const response = await finalProjects({ project_id: project.value });
    const offerData = response.data.data.map((e) => {
      return {
        key: e._id,
        project_name: e.project_id.project_name,
        client_name: e.client_id.name,
        Qty_of_panel: e.Qty_of_panel,
        description_of_panel: e.description_of_panel,
        panels: e.panels_to_be_created.length,
        amount: e.price,
        panels_to_be_created: e.panels_to_be_created,
      };
    });

    setOfferData(offerData);
  };

  useEffect(() => {
    if (!project.value) return;
    fetchOffer();
  }, [project.value]);

  useEffect(() => {
    if (!panel.value) return;
    let partData = [];
    offer.panels_to_be_created.map((e) => {
      if (e._id.toString() === panel.value.toString()) {
        e.parts.map((e) => {
          partData.push({
            label: e.part_name,
            value: e._id,
          });
        });
      }
    });
    console.log(partData);
    setPartData(partData);
  }, [panel.value]);

  return (
    <div className="w-full h-screen bg-[#f3f7ff]">
      <p className="text-3xl text-blue-800 font-semibold p-4">
        Export Offer's Part
      </p>
      {panelData.length === 0 ? (
        <div className="m-4 flex flex-col items-center justify-center">
          <div className="w-full bg-white flex flex-col rounded-md">
            <p className="text-blue-800 font-semibold text-xl p-4">
              Enter Details
            </p>
            <div className="bg-white flex items-center justify-center flex-row w-full px-4 pb-10 gap-4 rounded-md">
              <div className="w-1/2">
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
                  placeholder="Select Project Name"
                  name="project"
                  options={projectData}
                  onChange={(value) =>
                    projectData.map((item) => {
                      if (item.value === value) {
                        setProject(item);
                        return;
                      }
                    })
                  }
                />
              </div>
            </div>
          </div>
          {project.value !== "" && (
            <div className="w-full rounded-md bg-white flex flex-col m-4">
              <p className="text-blue-800 font-semibold text-xl p-5">
                Offer List
              </p>
              <div className="w-full flex flex-col items-center justify-center px-6 pb-6">
                <Table
                  columns={OfferColumns}
                  dataSource={offerData}
                  className="w-full"
                />
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="m-4 flex flex-col items-center justify-center">
          {panel.value === "" && (
            <div className="w-full bg-white flex flex-col rounded-md">
              <p className="text-blue-800 font-semibold text-xl p-4">
                Enter Panel Details
              </p>
              <div className="bg-white flex items-center justify-center flex-row w-full px-4 pb-10 gap-4 rounded-md">
                <div className="w-1/2">
                  <div className="font-semibold p-2 text-gray-500">
                    Select Panel
                  </div>
                  <Select
                    showSearch
                    filterOption={(input, option) =>
                      (option?.label ?? "")
                        .toLowerCase()
                        .includes(input.toLowerCase())
                    }
                    className="w-full"
                    placeholder="Select panel Name"
                    name="project"
                    options={panelData}
                    value={panel.label}
                    onChange={(value) => {
                      console.log(panelData);
                      panelData.map((item) => {
                        console.log(item.value, value);
                        if (item.value === value) {
                          setPanel(item);
                          return;
                        }
                      });

                      console.log(panelData);
                      console.log(panel);
                      console.log(offer);

                      const printData = offer.panels_to_be_created.filter(
                        (e, i) => {
                          console.log(e._id, value);
                          if (e._id.toString() === value.toString()) {
                            return e;
                          }
                        }
                      );

                      console.log(printData);
                      setData(printData);
                    }}
                  />
                </div>
              </div>
            </div>
          )}
          {part.label === "Select Part" ? (
            <div className="w-full bg-white flex flex-col rounded-md">
              <p className="text-blue-800 font-semibold text-xl p-4">
                Enter Part Details
              </p>
              <div className="bg-white flex items-center justify-center flex-row w-full px-4 pb-10 gap-4 rounded-md">
                <div className="w-1/2">
                  <div className="font-semibold p-2 text-gray-500">
                    Select Part
                  </div>
                  <Select
                    showSearch
                    filterOption={(input, option) =>
                      (option?.label ?? "")
                        .toLowerCase()
                        .includes(input.toLowerCase())
                    }
                    className="w-full"
                    placeholder="Select panel Name"
                    name="project"
                    options={partData}
                    value={part.label}
                    onChange={(value) => {
                      let nowData;
                      partData.map((item) => {
                        if (item.value === value) {
                          offer.panels_to_be_created.map((e) => {
                            if (e._id.toString() === panel.value.toString()) {
                              console.log(e);
                              e.parts.map((er) => {
                                if (er._id.toString() === value.toString()) {
                                  setPart(er);
                                  return;
                                }
                              });
                            }
                          });
                          return;
                        }
                      });
                    }}
                  />
                </div>
              </div>
            </div>
          ) : (
            <>
              <div>
                <OfferTable offer={offer} part={part} />
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};
