import React, { useEffect, useState } from "react";
import { getAllProjects } from "../../APIs/project";
import { Button, Input, Select, Table, message } from "antd";
import { finalProjects } from "../../APIs/offer";
import { getIndentbyProjectId } from "../../APIs/indent";
import { addIssues } from "../../APIs/issue";

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

export const AddIssue = () => {
  const [Project, setProject] = useState({
    label: "Select Project",
    value: "",
  });
  const [Projects, setProjects] = useState([]);
  const [person, setPerson] = useState("");
  const [remark, setRemark] = useState("");
  const [contractor, setContractor] = useState("");
  const [addedDetails, setAddedDetails] = useState(false);
  const [details, setDetails] = useState({
    projectId: "",
    person_name: "",
    contractor_name: "",
    remarks: "",
    items: [],
  });
  const [selectSubcomponents, setSelectSubcomponents] = useState({
    label: "Select Subcomponent",
    value: "",
  });
  const [subcomponentsOptions, setSubcomponentsOptions] = useState([]);
  const [subComponentData, setSubComponentData] = useState([]);
  const [AddedSubcomponents, setAddedSubcomponents] = useState([]);

  const getProjects = async () => {
    const allProjects = [];
    const res = await getAllProjects();
    console.log(res);
    res.data?.data.map((project) => {
      allProjects.push({
        label: project.project_name,
        value: project._id,
      });
    });

    console.log(allProjects);
    setProjects(allProjects);
  };

  useEffect((e) => {
    getProjects();
  }, []);

  const fetchOfferData = async () => {
    // const response1 = await getIndentbyProjectId(Project.value);
    // console.log(response1);
    const response = await finalProjects({ project_id: Project.value });
    if (response.type === "success") {
      const newSubcomponentsData = new Set();
      response.data.data.map((e) => {
        e.panels_to_be_created.map((e) => {
          e.parts.map((e) => {
            e.components.map((e) => {
              e.sub_components.map(async (e) => {
                const objectToAdd = {
                  company: e.company.company_name?.name || "",
                  companyId: e.company.company_name?._id || "",
                  price: e.company.price,
                  discount: e.company.discount,
                  desc: e.desc,
                  quantityRequired: e.quantity,
                  rating_value: e.rating_value,
                  catalog_number: e.catalog_number,
                  key: e._id,
                };

                newSubcomponentsData.add(objectToAdd);
              });
            });
          });
        });
      });

      const data = Array.from(newSubcomponentsData).map((e) => {
        return {
          label: e.desc,
          value: e.key,
        };
      });

      setSubcomponentsOptions(data);
      setSubComponentData(Array.from(newSubcomponentsData));
      console.log(Array.from(newSubcomponentsData));
    } else {
      message.error("Cannot fetch data");
    }
  };

  const AddProjectsHandler = () => {
    if (Project.value === "") {
      message.error("Select Project");
      return;
    } else if (person === "") {
      message.error("Enter Person Name");
      return;
    } else if (contractor === "") {
      message.error("Enter Contractor Name");
      return;
    }

    fetchOfferData();
    setDetails({
      projectId: Project.value,
      person_name: person,
      contractor_name: contractor,
      remarks: remark,
      items: [],
    });
    console.log({
      projectId: Project.value,
      person_name: person,
      contractor_name: contractor,
      remarks: remark,
      items: [],
    });
    setAddedDetails(true);
  };

  const EditHandler = () => {
    setDetails({
      projectId: Project.value,
      person_name: person,
      contractor_name: contractor,
      remarks: remark,
      items: [],
    });
    setAddedDetails(false);
  };

  const AddSubcomponentHandler = () => {
    subComponentData.map((e) => {
      if (selectSubcomponents.value === e.key) {
        setAddedSubcomponents((prev) => {
          return [...prev, e];
        });
      }
    });
    // remove option from options
    setSubcomponentsOptions((prev) => {
      return prev.filter((e) => e.value !== selectSubcomponents.value);
    });
  };

  const SubmitHandler = async () => {
    const items = AddedSubcomponents.map((e) => {
      return {
        ...e,
        subComponent: e.key,
        quantity: e.quantityRequired,
        qty_issued: e.quantityRequired,
      };
    });

    const data = {
      ...details,
      items: items,
    };

    console.log(data);
    const response = await addIssues(data);

    if (response.type === "error") {
      message.error(response.message);
      return;
    } else {
      message.success(response.message);
      setAddedSubcomponents([]);
      setAddedDetails(false);
      setProject({
        label: "Select Project",
        value: "",
      });
      setPerson("");
      setContractor("");
      setRemark("");
      setSelectSubcomponents({
        label: "Select Subcomponent",
        value: "",
      });
      setSubcomponentsOptions([]);
      setSubComponentData([]);
      setAddedSubcomponents([]);
      setDetails({
        projectId: "",
        person_name: "",
        contractor_name: "",
        remarks: "",
      });
    }
  };

  return (
    <div className="w-full min-h-screen h-full bg-[#f3f7ff]">
      <p className="text-3xl text-blue-800 font-semibold p-4">Add Issue</p>
      <div className="m-4 flex flex-col items-center justify-center">
        <div className="w-full bg-white flex flex-col rounded-md">
          <p className="text-blue-800 font-semibold text-xl p-4">
            Enter Issue Details
          </p>
          <div className="bg-white flex items-center justify-center flex-row w-full p-4 gap-4 rounded-md">
            <div className="w-full">
              {!addedDetails ? (
                <>
                  <div className="w-full flex items-center justify-center flex-row gap-4 p-2 ">
                    <section className="w-1/2">
                      <div className="font-semibold p-2 text-gray-500">
                        Select Project
                      </div>
                      <Select
                        className="w-full"
                        value={Project.label}
                        showSearch
                        filterOption={(input, option) =>
                          (option?.label ?? "")
                            .toLowerCase()
                            .includes(input.toLowerCase())
                        }
                        onChange={(value) => {
                          Projects.map((e) => {
                            if (value === e.value) {
                              setProject({ value: e.value, label: e.label });
                            }
                          });
                        }}
                        options={Projects}
                      />
                    </section>
                    <section className="w-1/2">
                      <div className="font-semibold p-2 text-gray-500">
                        Person Name
                      </div>
                      <Input
                        type="text"
                        className="w-full border-2 rounded-md"
                        placeholder="Enter Person Name"
                        value={person}
                        onChange={(e) => setPerson(e.target.value)}
                      />
                    </section>
                  </div>
                  <div className="w-full flex items-center justify-center flex-row gap-4 p-2 my-2">
                    <section className="w-1/2">
                      <div className="font-semibold p-2 text-gray-500">
                        Contractor Name
                      </div>
                      <Input
                        type="text"
                        className="w-full border-2 rounded-md"
                        placeholder="Enter Person Name"
                        value={contractor}
                        onChange={(e) => setContractor(e.target.value)}
                      />
                    </section>
                    <section className="w-1/2">
                      <div className="font-semibold p-2 text-gray-500">
                        Remark
                      </div>
                      <textarea
                        type="text"
                        className="w-full border-2 border-gray-200 rounded-md p-1 hover:border-blue-300 focus:border-blue-300"
                        placeholder="Enter Remarks"
                        value={remark}
                        onChange={(e) => setRemark(e.target.value)}
                      />
                    </section>
                  </div>
                </>
              ) : (
                <div className="flex flex-col justify-center gap-3 items-center">
                  <div className="p-1">
                    <div className="flex flex-row gap-3 p-1">
                      <p className="font-bold text-gray-500">Project Name:</p>
                      <div className="w-fit">{Project.label}</div>
                    </div>
                    <div className="flex flex-row gap-3 p-1">
                      <p className="font-bold text-gray-500">Person Name:</p>
                      <div className="w-fit">{person}</div>
                    </div>
                    <div className="flex flex-row gap-3 p-1">
                      <p className="font-bold text-gray-500">
                        Contractor Name:
                      </p>
                      <div className="w-fit">{contractor}</div>
                    </div>
                  </div>
                </div>
              )}
              <div className="flex items-center justify-center p-2">
                {!addedDetails && (
                  <Button
                    onClick={AddProjectsHandler}
                    className="bg-blue-700 text-white"
                  >
                    Add Details
                  </Button>
                )}
                {addedDetails && (
                  <Button
                    onClick={EditHandler}
                    className="bg-blue-700 text-white"
                  >
                    Edit
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="m-4 flex flex-col items-center justify-center">
        <div className="w-full bg-white flex flex-col rounded-md">
          {addedDetails && (
            <div className="bg-white flex flex-col items-center justify-center flex-row w-full p-4 gap-4 rounded-md">
              <div className="bg-[#f3f7ff] w-1/2 flex flex-col gap-10">
                <div className="w-full bg-white flex items-center justify-center flex-row w-full p-4 gap-4 rounded-md">
                  <div className="w-full">
                    <div className="w-full flex flex-row gap-4 p-2 my-2">
                      <section className="w-full">
                        <div className="font-semibold p-2 text-gray-500">
                          Add Subcomponent
                        </div>
                        <Select
                          className="w-full"
                          placeholder="Select Subcomponents"
                          value={selectSubcomponents.label}
                          showSearch
                          filterOption={(input, option) =>
                            (option?.label ?? "")
                              .toLowerCase()
                              .includes(input.toLowerCase())
                          }
                          onChange={(value) => {
                            subcomponentsOptions.map((e) => {
                              if (value === e.value) {
                                setSelectSubcomponents({
                                  value: e.value,
                                  label: e.label,
                                });
                              }
                            });
                          }}
                          options={subcomponentsOptions}
                        />
                      </section>
                    </div>
                    <div className="flex items-center justify-center p-2">
                      <Button
                        onClick={AddSubcomponentHandler}
                        className="bg-blue-700 text-white"
                      >
                        Add Subcomponent
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
              {AddedSubcomponents.length !== 0 && (
                <>
                  <Table columns={columns} dataSource={AddedSubcomponents} />
                </>
              )}
            </div>
          )}
        </div>
      </div>
      {AddedSubcomponents.length !== 0 && (
        <div className="flex items-center justify-center m-4">
          <Button className="bg-blue-700 text-white" onClick={SubmitHandler}>
            Submit
          </Button>
        </div>
      )}
    </div>
  );
};
