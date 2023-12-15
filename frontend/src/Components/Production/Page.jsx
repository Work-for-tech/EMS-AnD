import React, { useRef } from "react";
import { getAllProjects } from "../../APIs/project";
import { Button, message, Checkbox, Divider } from "antd";
import { useEffect, useState } from "react";
import { Select, Input } from "antd";
import {
  PostProduction,
  getProductionByProjectId,
} from "../../APIs/Production";
import { useNavigate } from "react-router-dom";

export const Production = () => {
  const navigate = useNavigate();
  const [projectData, setProjectData] = useState([]);
  const [projectId, setProjectId] = useState("");

  const [data, setData] = useState({
    assembly: {
      done_by: "",
      is_done: false,
      is_approved_already: false,
      updated: false,
    },
    wiring: {
      done_by: "",
      is_done: false,
      is_approved_already: false,
      updated: false,
    },
    finish: {
      done_by: "",
      is_done: false,
      is_approved_already: false,
      updated: false,
    },
    cutting: {
      done_by: "",
      is_done: false,
      is_approved_already: false,
      updated: false,
    },
    sleving: {
      done_by: "",
      is_done: false,
      is_approved_already: false,
      updated: false,
    },
    fitting: {
      done_by: "",
      is_done: false,
      is_approved_already: false,
      updated: false,
    },
    tighting: {
      done_by: "",
      is_done: false,
      is_approved_already: false,
      updated: false,
    },
  });

  const HandlePostRequest = async () => {
    const responseData = {
      projectId: projectId,
      mainSection: [],
      subSection: [],
      approvedBy: [],
    };

    const updateData = {
      projectId: projectId,
      mainSection: [],
      subSection: [],
      approvedBy: [],
    };

    const Wiring = ["assembly", "wiring", "finish"];

    for (const [key, value] of Object.entries(data)) {
      if (value.done_by && !value.is_approved_already) {
        responseData.mainSection.push(
          Wiring.includes(key) ? "Wiring" : "Busbar"
        );
        responseData.subSection.push(key);
        responseData.approvedBy.push(value.done_by);
      } else if (!value.done_by && value.is_done) {
        message.error("Please Enter Done By for all Checked Items");
        return;
      } else if (value.updated) {
        updateData.mainSection.push(Wiring.includes(key) ? "Wiring" : "Busbar");
        updateData.subSection.push(key);
        updateData.approvedBy.push(value.done_by);
      }
    }

    for (let i = 0; i < responseData.mainSection.length; i++) {
      const response = await PostProduction({
        projectId: projectId,
        mainSection: responseData.mainSection[i],
        subSection: responseData.subSection[i],
        approvedBy: responseData.approvedBy[i],
      });

      if (response.type === "success") {
        message.success("Production Added Successfully");
        if (window.location.pathname === "/updateProduction") {
          navigate("/productionlist");
        }
      } else {
        message.error("Error in Adding Production");
        return;
      }
    }

    for (let i = 0; i < updateData.mainSection.length; i++) {
      const response = await PostProduction({
        projectId: projectId,
        mainSection: updateData.mainSection[i],
        subSection: updateData.subSection[i],
        approvedBy: updateData.approvedBy[i],
      });

      if (response.type === "success") {
        message.success("Production Updated Successfully");
        if (window.location.pathname === "/updateProduction") {
          navigate("/productionlist");
        }
      } else {
        message.error("Error in Updating Production");
        return;
      }
    }

    setProjectId("");
    setData({
      assembly: {
        done_by: "",
        is_done: false,
        is_approved_already: false,
        updated: false,
      },
      wiring: {
        done_by: "",
        is_done: false,
        is_approved_already: false,
        updated: false,
      },
      finish: {
        done_by: "",
        is_done: false,
        is_approved_already: false,
        updated: false,
      },
      cutting: {
        done_by: "",
        is_done: false,
        is_approved_already: false,
        updated: false,
      },
      sleving: {
        done_by: "",
        is_done: false,
        is_approved_already: false,
        updated: false,
      },
      fitting: {
        done_by: "",
        is_done: false,
        is_approved_already: false,
        updated: false,
      },
      tighting: {
        done_by: "",
        is_done: false,
        is_approved_already: false,
        updated: false,
      },
    });
  };

  const getProjects = async () => {
    const response = await getAllProjects();
    if (response.type === "success") {
      let newData = [];
      response.data.data.map((e) => {
        newData.push({
          key: e._id,
          project_name: e.project_name,
          client_name: e.client_id.name,
          price: e.total_price.toFixed(2),
          is_finalized: e.is_finalized,
        });
      });
      setProjectData(newData);
    } else {
      message.error("Error in Fetching Projects");
    }
  };

  useEffect(() => {
    getProjects();
    if (window.location.pathname === "/updateProduction") {
      setProjectId(localStorage.getItem("production_id"));
    }
  }, []);

  useEffect(() => {
    if (projectId === "") return;
    getProductionByProjectId(projectId).then((response) => {
      const newData = {
        assembly: {
          done_by: "",
          is_done: false,
          is_approved_already: false,
          updated: false,
        },
        wiring: {
          done_by: "",
          is_done: false,
          is_approved_already: false,
          updated: false,
        },
        finish: {
          done_by: "",
          is_done: false,
          is_approved_already: false,
          updated: false,
        },
        cutting: {
          done_by: "",
          is_done: false,
          is_approved_already: false,
          updated: false,
        },
        sleving: {
          done_by: "",
          is_done: false,
          is_approved_already: false,
          updated: false,
        },
        fitting: {
          done_by: "",
          is_done: false,
          is_approved_already: false,
          updated: false,
        },
        tighting: {
          done_by: "",
          is_done: false,
          is_approved_already: false,
          updated: false,
        },
      };

      response.data.data.map((e) => {
        newData[e.subSection] = {
          done_by: e.approvedBy,
          is_done: true,
          is_approved_already: true,
          updated: false,
        };
      });

      setData(newData);
    });
  }, [projectId]);

  const onChangeCheckbox = (e) => {
    if (data[e.target.name].is_approved_already === true) {
      setData({
        ...data,
        [e.target.name]: {
          ...data[e.target.name],
          is_done: e.target.checked,
          updated: true,
        },
      });
      return;
    }
    setData({
      ...data,
      [e.target.name]: { ...data[e.target.name], is_done: e.target.checked },
    });
  };

  const onChangeInput = (e) => {
    if (data[e.target.name].is_approved_already === true) {
      setData({
        ...data,
        [e.target.name]: {
          ...data[e.target.name],
          done_by: e.target.value,
          updated: true,
        },
      });
      return;
    }
    setData({
      ...data,
      [e.target.name]: { ...data[e.target.name], done_by: e.target.value },
    });
  };

  return (
    <div className="">
      <div className="w-full h-screen bg-[#f3f7ff]">
        <p className="text-3xl text-blue-800 font-semibold p-4">Production</p>
        <div className="bg-white m-4 flex flex-row rounded-md">
          <div className="h-full w-full p-4 rounded-md">
            <div className="text-blue-800 font-semibold text-xl p-2">
              Enter Production's Details
            </div>
            {window.location.pathname !== "/updateProduction" && (
              <>
                <div className="text-gray-500 font-semibold p-2">
                  Select Project
                </div>
                <Select
                  showSearch
                  className="w-full"
                  placeholder="Select a project"
                  onChange={(value) => {
                    setProjectId(value);
                  }}
                  options={projectData.map((e) => {
                    return {
                      label: e.project_name,
                      value: e.key,
                    };
                  })}
                  value={projectId}
                />
              </>
            )}
            <Divider />
            {projectId && (
              <>
                <h2 className="w-full mt-4">Wiring Group</h2>
                <div className="w-full flex flex-row p-2 m-2">
                  <div className="w-full flex flex-col m-2 gap-2">
                    <Checkbox
                      name="assembly"
                      checked={data.assembly.is_done}
                      onChange={onChangeCheckbox}
                      disabled={data.assembly.is_approved_already}
                    >
                      Assembly
                    </Checkbox>
                    {data.assembly.is_done && (
                      <Input
                        className="w-full"
                        placeholder="Enter Done By"
                        name="assembly"
                        value={data.assembly.done_by}
                        disabled={data.assembly.is_approved_already}
                        onChange={onChangeInput}
                      />
                    )}
                  </div>

                  <div className="w-full flex flex-col m-2 gap-2">
                    <Checkbox
                      name="wiring"
                      checked={data.wiring.is_done}
                      disabled={data.wiring.is_approved_already}
                      onChange={onChangeCheckbox}
                    >
                      Wiring
                    </Checkbox>
                    {data.wiring.is_done && (
                      <Input
                        className="w-full"
                        placeholder="Enter Done By"
                        name="wiring"
                        value={data.wiring.done_by}
                        disabled={data.wiring.is_approved_already}
                        onChange={onChangeInput}
                      />
                    )}
                  </div>

                  <div className="w-full flex flex-col m-2 gap-2">
                    <Checkbox
                      name="finish"
                      checked={data.finish.is_done}
                      onChange={onChangeCheckbox}
                      disabled={data.finish.is_approved_already}
                    >
                      Finish
                    </Checkbox>
                    {data.finish.is_done && (
                      <Input
                        className="w-full"
                        placeholder="Enter Done By"
                        name="finish"
                        value={data.finish.done_by}
                        onChange={onChangeInput}
                        disabled={data.finish.is_approved_already}
                      />
                    )}
                  </div>
                </div>

                <h2 className="w-full mt-4">Busbar Group</h2>
                <div className="w-full flex flex-row p-2 m-2">
                  <div className="w-full flex flex-col m-2 gap-2">
                    <Checkbox
                      name="cutting"
                      checked={data.cutting.is_done}
                      onChange={onChangeCheckbox}
                      disabled={data.cutting.is_approved_already}
                    >
                      Cutting / Drilling
                    </Checkbox>
                    {data.cutting.is_done && (
                      <Input
                        className="w-full"
                        placeholder="Enter Done By"
                        name="cutting"
                        value={data.cutting.done_by}
                        onChange={onChangeInput}
                        disabled={data.cutting.is_approved_already}
                      />
                    )}
                  </div>

                  <div className="w-full flex flex-col m-2 gap-2">
                    <Checkbox
                      name="sleving"
                      checked={data.sleving.is_done}
                      onChange={onChangeCheckbox}
                      disabled={data.sleving.is_approved_already}
                    >
                      Sleving
                    </Checkbox>
                    {data.sleving.is_done && (
                      <Input
                        className="w-full"
                        placeholder="Enter Done By"
                        name="sleving"
                        value={data.sleving.done_by}
                        onChange={onChangeInput}
                        disabled={data.sleving.is_approved_already}
                      />
                    )}
                  </div>

                  <div className="w-full flex flex-col m-2 gap-2">
                    <Checkbox
                      name="fitting"
                      checked={data.fitting.is_done}
                      onChange={onChangeCheckbox}
                      disabled={data.fitting.is_approved_already}
                    >
                      Fitting
                    </Checkbox>
                    {data.fitting.is_done && (
                      <Input
                        className="w-full"
                        placeholder="Enter Done By"
                        name="fitting"
                        value={data.fitting.done_by}
                        onChange={onChangeInput}
                        disabled={data.fitting.is_approved_already}
                      />
                    )}
                  </div>

                  <div className="w-full flex flex-col m-2 gap-2">
                    <Checkbox
                      name="tighting"
                      checked={data.tighting.is_done}
                      onChange={onChangeCheckbox}
                      disabled={data.tighting.is_approved_already}
                    >
                      Tighting
                    </Checkbox>
                    {data.tighting.is_done && (
                      <Input
                        className="w-full"
                        placeholder="Enter Done By"
                        name="tighting"
                        value={data.tighting.done_by}
                        onChange={onChangeInput}
                        disabled={data.tighting.is_approved_already}
                      />
                    )}
                  </div>
                </div>
                <section className="w-full flex items-center justify-center p-4 gap-2">
                  <Button
                    onClick={HandlePostRequest}
                    className="bg-blue-700 text-white"
                  >
                    Submit
                  </Button>
                </section>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
