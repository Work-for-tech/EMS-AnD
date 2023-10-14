import React, { useEffect, useState } from "react";
import { createGRNApproval, getGRN } from "../../APIs/grn";
import { Button, Select, message } from "antd";
import { getclients } from "../../APIs/client";
import { getProjects } from "../../APIs/project";
import { getIndentbyClientProject } from "../../APIs/indent";
import { getPurchaseList } from "../../APIs/purchase";
import { GRNApprovalList } from "./GRNApprovalList";

export const GRNApproval = () => {
  const [grn, setGrn] = React.useState([]);
  const [grnids, setGrnids] = React.useState([]);
  const [purchaseId, setPurchaseId] = useState("");
  const [clientOptions, setClientOptions] = useState([]);
  const [projectData, setProjectData] = useState([]);
  const [Purchase, setPurchase] = useState([]);
  const [clientName, setClientName] = useState({
    label: "Select Client",
    value: "",
  });
  const [project, setProject] = useState({
    label: "Select Project",
    value: "",
  });

  const getGRNInit = async () => {
    const response = await getGRN();
    console.log(response.data.grns);
    setGrn(response.data.grns);
  };

  const HandleSubmit = async () => {
    const data = {
      grn_id: grnids,
      purchase_id: purchaseId,
    };

    console.log(data);

    const response = await createGRNApproval(data);

    if (response.type === "success") {
      message.success("GRN Approval Created");
    } else {
      message.error("Something went wrong");
    }
  };

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
    getGRNInit();
    getAllClients();
  }, []);

  useEffect(() => {
    if (!clientName.value) return;
    getProjects({ client_id: clientName.value }).then((response) => {
      if (response.type === "success") {
        setProjectData(
          response.data.data.map((e) => ({
            label: e.project_name,
            value: e._id,
          }))
        );
      } else if (response.type === "error") {
        console.log(response.message);
      }
    });
  }, [clientName]);

  const FetchIndentData = async () => {
    if (!clientName.value || !project.value) {
      message.error("Please Select Client and Project");
      return;
    }
    const response = await getIndentbyClientProject(
      clientName.value,
      project.value
    );

    console.log(response.data);

    if (response.data.data.length === 0) {
      message.error("No Items to Purchase");
      return;
    }

    const response2 = await getPurchaseList(response.data.data[0]._id);
    console.log(response2.data.data);
    setPurchase(response2.data.data);
  };

  return (
    <div className="w-full flex flex-col">
      <p className="text-center text-xl p-5">Approve GRNs</p>
      <div className="flex flex-col items-center gap-2">
        {Purchase.length === 0 ? (
          <div className="bg-white flex items-center justify-center flex-row w-full p-4 gap-4 rounded-md">
            <div className="w-full">
              <div className="w-full flex flex-row gap-4 p-2 my-2">
                <section className="w-full">
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
                          setProject("Select Project");
                        }
                      });
                      setProject({ label: "Select Project", value: "" });
                    }}
                    options={clientOptions}
                  />
                </section>
                <section className="w-full">
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
                    value={project.label}
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
                </section>
              </div>
              <div className="flex items-center justify-center p-2">
                <Button
                  onClick={FetchIndentData}
                  className="bg-blue-700 text-white"
                >
                  Indent Data
                </Button>
              </div>
            </div>
          </div>
        ) : (
          <>
            <div className="w-full flex justify-center">
              <Select
                placeholder="Select Purchase"
                onChange={(e) => setPurchaseId(e)}
                className="w-1/2"
                options={Purchase.map((e, i) => {
                  return { label: "Purchase " + (i + 1), value: e._id };
                })}
              />
            </div>

            <p className="text-left w-1/2">Select GRNs</p>
            <Select
              className="w-1/2"
              onChange={(e) => {
                setGrnids(e);
              }}
              placeholder="Select GRN"
              options={grn.map((e) => {
                return { label: e.invoice_number, value: e._id };
              })}
            />
            <Button
              className="w-1/2 bg-blue-700 text-white"
              onClick={() => HandleSubmit()}
            >
              Approve
            </Button>
          </>
        )}
      </div>
      <GRNApprovalList />
    </div>
  );
};
