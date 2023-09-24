import React, { useEffect } from "react";
import { Button, Input, Select, message } from "antd";
import { addProject } from "../../APIs/project";
import { getclients } from "../../APIs/client";
import { getProjects } from "../../APIs/project";

export const ProjectPage = () => {
  const [clientName, setClientName] = React.useState({
    label: "",
    value: "",
  });
  const [clientOptions, setClientOptions] = React.useState([]);
  const [final, setFinal] = React.useState();
  const [projectName, setProjectName] = React.useState("");

  const handleClientChange = (value) => {
    clientOptions.map((item) => {
      if (item.value === value) {
        setClientName(item);
        return;
      }
    });
  };

  const handleFinalChange = (value) => {
    setFinal(value);
  };

  const getAllClients = async () => {
    const response = await getclients();
    if (response.type === "success") {
      const options = [];
      response.data.data.map((item) => {
        options.push({ label: item.name, value: item._id });
      });
      setClientOptions(options);
    }
  };

  useEffect(() => {
    getAllClients();
  }, []);

  const Handle$OnClick$Send = async () => {
    const data = {
      client_id: clientName.value,
      project_name: projectName,
      is_finalized: final,
    };

    const response = await addProject(data);

    if (response.type === "success") {
      message.success(response.data.message);
    } else if (response.type === "error") {
      message.error(response.message);
    }
  };

  const ResetValues = () => {
    setClientName({ label: "", value: "" });
    setProjectName("");
    setFinal();
  };

  return (
    <div className="w-full h-screen bg-[#f3f7ff]">
      <p className="text-3xl text-blue-800 font-semibold p-4">Add Project</p>
      <div className="m-4 flex items-center justify-center">
        <div className="w-full bg-white flex flex-col rounded-md">
          <p className="text-blue-800 font-semibold text-xl p-4">
            Enter Project's Details
          </p>
          <div className="bg-white flex items-center justify-center flex-row w-full px-4 gap-4 rounded-md">
            <div className="w-1/2">
              <div className="font-semibold p-2 text-gray-500">
                Select Client
              </div>
              <Select
                showSearch
                filterOption={(input, option) =>
                  (option?.label ?? "")
                    .toLowerCase()
                    .includes(input.toLowerCase())
                }
                className="w-full"
                placeholder="Select Client"
                onChange={handleClientChange}
                options={clientOptions}
              />
            </div>
            <div className="w-1/2">
              <div className="font-semibold p-2 text-gray-500">
                Project Name
              </div>
              <Input
                className="w-full"
                placeholder="Enter Project Name"
                name="project"
                value={projectName}
                onChange={(event) => setProjectName(event.target.value)}
              />
            </div>
          </div>
          <div className="flex items-center justify-center gap-4 p-4 mt-2">
            <Button
              onClick={() => Handle$OnClick$Send()}
              className="bg-blue-700 text-white"
            >
              Submit
            </Button>
            <Button
              onClick={() => ResetValues()}
              className="bg-gray-500 text-white"
            >
              Reset
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
