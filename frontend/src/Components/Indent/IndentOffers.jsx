import { Button, Select, Table, message } from "antd";
import React, { useEffect, useState } from "react";
import { getAllProjects, getProjects } from "../../APIs/project";
import { finalProjects } from "../../APIs/offer";
import { getclients } from "../../APIs/client";
import { AddSubComp } from "./AddSubComp";
import { addIndent } from "../../APIs/indent";

export const IndentOffers = () => {
  const [subComponentsData, setSubComponentsData] = useState([]);
  const [project, setProject] = useState({
    label: "Select Project",
    value: "",
  });
  const [clientName, setClientName] = useState({
    label: "Select Client",
    value: "",
  });
  const [projectData, setProjectData] = useState([]);
  const [clientOptions, setClientOptions] = useState([]);
  const [addSubcomponents, setAddSubcomponents] = useState(false);
  const [newSubComponents, setNewSubComponents] = useState([]);


  const HandleOnClickSubmit = async() => {
    const sendData = {
      clientId: clientName.value,
      projectId: project.value,
      items: newSubComponents.map((e) => ({
        subcomponent: e.key,
        quantityRequired: e.quantityRequired,
        quantityOrdered: e.quantity_ordered,
      })),
    }
    console.log(sendData);
    const response = await addIndent(sendData);

    if (response.type === "error") {
      message.error(response.message);
      return;
    }
    else {
      message.success("Indent Added Successfully");
      setAddSubcomponents(false);
      setNewSubComponents([]);
      setSubComponentsData([]);
      setProject({ label: "Select Project", value: "" });
      setClientName({ label: "Select Client", value: "" });
    }

  };


  const columns = [
    {
      title: "Description",
      dataIndex: "desc",
    },
    {
      title: "Catalog Number",
      dataIndex: "catalog_number",
    },
    {
      title: "Rating",
      dataIndex: "rating_value",
    },
    {
      title: "Company",
      dataIndex: "company",
    },
    {
      title: "Price",
      dataIndex: "price",
    },
    {
      title: "Discount",
      dataIndex: "discount",
    },
    {
      title: "Quantity Required",
      dataIndex: "quantityRequired",
    },
    {
      title: "Quantity Ordered",
      dataIndex: "quantity_ordered",
    },
  ];

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
  }, []);

  const fetchOffer = async () => {
    const response = await finalProjects({ project_id: project.value });
    if (response.type === "success") {
      const newSubcomponentsData = new Set();
      response.data.data.map((e) => {
        e.panels_to_be_created.map((e) => {
          e.parts.map((e) => {
            e.components.map((e) => {
              e.sub_components.map((e) => {
                const objectToAdd = {
                  company: e.company.company_name?.name || "",
                  price: e.company.price,
                  discount: e.company.discount,
                  desc: e.desc,
                  quantityRequired: e.quantity,
                  rating_value: e.rating_value,
                  catalog_number: e.catalog_number,
                  key : e._id,
                };

                newSubcomponentsData.add(objectToAdd);
              });
            });
          });
        });
      });

      setSubComponentsData(Array.from(newSubcomponentsData));
      console.log(Array.from(newSubcomponentsData));
      setAddSubcomponents(true);
    } else {
      message.error("Cannot fetch data");
    }
  };

  return (
    <div className="w-full min-h-screen h-full bg-[#f3f7ff]">
      <p className="text-3xl text-blue-800 font-semibold p-4">Indent</p>
      <div className="m-4 flex flex-col items-center justify-center">
        <div className="w-full bg-white flex flex-col rounded-md">
          <p className="text-blue-800 font-semibold text-xl p-4">
            Enter Indent Details
          </p>
          {!addSubcomponents ? (
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
                    onClick={fetchOffer}
                    className="bg-blue-700 text-white"
                  >
                    Fetch Data
                  </Button>
                </div>
              </div>
            </div>
          ) : (
            <div className="w-full p-4 gap-4 rounded-md">
              {subComponentsData.map((e, i) => {
                return <AddSubComp key={i} data={e} setNewSubComponents={setNewSubComponents} />;
              })}
              {newSubComponents.length !== 0 && <Table columns={columns} dataSource={newSubComponents} />}
              </div>
          )}
          {
            (subComponentsData.length === newSubComponents.length && subComponentsData.length !== 0) && <div className="flex items-center justify-center p-2">
              <Button onClick={HandleOnClickSubmit} className="bg-blue-700 text-white">Submit</Button>
            </div>
          }
        </div>
      </div>
    </div>
  );
};
