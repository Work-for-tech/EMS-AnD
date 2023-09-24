import { Button, Input, Select, Table, Tooltip, message } from "antd";
import React from "react";
import { getclients } from "../../APIs/client";
import { getProjects } from "../../APIs/project";
import { createDrawing, getDrawing, getDrawingFile } from "../../APIs/drawing";
import { ArrowBigLeftDash, Download } from "lucide-react";

export const Drawing = () => {
  const [clientName, setClientName] = React.useState({
    label: "Select Client",
    value: "",
  });
  const fileInputRef = React.useRef(null);
  const [file, setFile] = React.useState(null);
  const [clientOptions, setClientOptions] = React.useState([]);
  const [projectOptions, setProjectOptions] = React.useState([]);
  const [pastData, setPastData] = React.useState([]);
  const [currentData, setCurrentData] = React.useState([]);
  const [projectName, setProjectName] = React.useState({
    label: "Select Project",
    value: "",
  });

  const [drawingDetails, setDrawingDetails] = React.useState(false);
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

  const columns = [
    {
      title: "Date",
      dataIndex: "date",
    },
    {
      title: "Project Name",
      dataIndex: "project_name",
    },
    {
      title: "Client Name",
      dataIndex: "client_name",
    },
    {
      title: "Drawing Name",
      dataIndex: "drawing_name",
    },
    {
      title: "Action",
      render: (text, record) => (
        <div className="flex flex-row gap-2">
          <Tooltip
            placement="top"
            title={"Download Drawing"}
            arrow={mergedArrow}
          >
            <button
              className="text-blue-700"
              onClick={async () => {
                const response = await getDrawingFile(record.drawingpath);

                if (response.type === "success") {
                  const url = window.URL.createObjectURL(
                    new Blob([response.data])
                  );
                  const link = document.createElement("a");
                  link.href = url;
                  link.setAttribute("download", record.drawing_name); //or any other extension
                  document.body.appendChild(link);
                  link.click();
                } else {
                  message.error("Error in Downloading File");
                }
              }}
            >
              <Download />
            </button>
          </Tooltip>
        </div>
      ),
    },
  ];

  React.useEffect(() => {
    if (clientName.label === "Select Client") return;
    getProjects({ client_id: clientName.value }).then((response) => {
      if (response.type === "success") {
        console.log(
          response.data.data.map((e) => ({
            label: e.project_name,
            value: e._id,
          }))
        );
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
  }, [clientName]);

  const handleClientChange = (value) => {
    clientOptions.map((item) => {
      if (item.value === value) {
        setClientName(item);
        return;
      }
    });
    setProjectName({ label: "Select Project", value: "" });
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

  React.useEffect(() => {
    getAllClients();
  }, []);

  var dateOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  };

  const getDrawingDetails = async () => {
    const response = await getDrawing(clientName.value, projectName.value);

    console.log(response.data.current);
    console.log(response.data.past);

    setCurrentData(
      response.data.current.map((e) => {
        const parts = e.drawingPath.split("\\"); // Split the path by backslashes
        const fileName = parts[parts.length - 1];
        return {
          key: e._id,
          date: new Date(e.time).toLocaleString(undefined, dateOptions),
          project_name: e.projectId.project_name,
          client_name: e.clientId.name,
          drawing_name: fileName,
          drawingpath: e.drawingPath,
        };
      })
    );

    setPastData(
      response.data.past.map((e) => {
        const parts = e.drawingPath.split("\\"); // Split the path by backslashes
        const fileName = parts[parts.length - 1];
        return {
          key: e._id,
          date: new Date(e.time).toLocaleString(undefined, dateOptions),
          project_name: e.projectId.project_name,
          client_name: e.clientId.name,
          drawing_name: fileName,
          drawingpath: e.drawingPath,
        };
      })
    );
  };

  const Handle$OnClick$Send = async () => {
    await getDrawingDetails();
    setDrawingDetails(true);
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async () => {
    if (file === null) {
      message.error("Please Add a File");
      return;
    }
    const response = await createDrawing({
      file: file,
      clientId: clientName.value,
      projectId: projectName.value,
    });

    if (response.type === "success") {
      message.success("Drawing Uploaded Successfully");
      getDrawingDetails();
      setFile(null);
    } else if (response.type === "error") {
      message.error("Error in Uploading Drawing");
    }
  };

  const ResetValues = () => {
    setClientName({
      label: "Select Client",
      value: "",
    });
    setProjectName({
      label: "Select Project",
      value: "",
    });
    setProjectOptions([]);
  };

  const resetFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = ""; // Clear the selected file
    }
  };

  const BackHandler = () => {
    setDrawingDetails(false);
    setClientName({
      label: "Select Client",
      value: "",
    });
    setProjectName({
      label: "Select Project",
      value: "",
    });
    setProjectOptions([]);
    setPastData([]);
    setCurrentData([]);
    setFile(null);
    resetFileInput();
  };

  return (
    <div className="w-full h-screen bg-[#f3f7ff]">
      <p className="text-3xl text-blue-800 font-semibold p-4">Drawing</p>
      <div className="m-4 flex items-center justify-center">
        {drawingDetails === false ? (
          <div className="w-full bg-white flex flex-col rounded-md">
            <p className="text-blue-800 font-semibold text-xl p-4">
              Enter Drawing's Details
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
                  value={clientName.label}
                  onChange={handleClientChange}
                  options={clientOptions}
                />
              </div>
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
                  placeholder="Project Name"
                  name="project"
                  value={projectName.label}
                  options={projectOptions}
                  onChange={(value) => {
                    projectOptions.map((e) => {
                      if (value === e.value) {
                        setProjectName({ value: e.value, label: e.label });
                      }
                    });
                  }}
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
        ) : (
          <div className="w-full flex flex-col">
            <div
              className="p-2 flex flex-row cursor-pointer hover:text-blue-800"
              onClick={BackHandler}
            >
              <ArrowBigLeftDash className="text-gray-500 hover:text-blue-800" />
              <span className="font-semibold text-gray-500 hover:text-blue-800">
                Revision
              </span>
            </div>
            <div className="w-full bg-white flex flex-col rounded-md">
              <p className="text-blue-800 font-semibold text-xl p-4">
                Drawing's Details
              </p>
              <div className="bg-white flex items-center justify-center flex-row w-full px-4 gap-4 rounded-md">
                <div className="w-1/2">
                  <div className="font-semibold p-2 text-gray-500">
                    Add New Drawing
                  </div>
                  <Input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                  />
                </div>
              </div>
              <div className="flex items-center justify-center gap-4 p-4 mt-2">
                <Button
                  onClick={() => {
                    handleSubmit();
                    resetFileInput();
                  }}
                  className="bg-blue-700 text-white"
                >
                  Submit
                </Button>
                <Button
                  onClick={() => {
                    setFile(null);
                    resetFileInput();
                  }}
                  className="bg-gray-500 text-white"
                >
                  Reset
                </Button>
              </div>
            </div>
            <div className="w-full my-4">
              <p className="text-3xl text-blue-800 font-semibold p-4">
                Current Details
              </p>
              <div className="bg-white flex items-center justify-center flex-row w-full px-4 gap-4 rounded-md">
                <Table
                  className="w-full"
                  columns={columns}
                  dataSource={currentData}
                />
              </div>
            </div>
            <div className="w-full my-4">
              <p className="text-3xl text-blue-800 font-semibold p-4">
                Past Details
              </p>
              <div className="bg-white flex items-center justify-center flex-row w-full px-4 gap-4 rounded-md">
                <Table
                  className="w-full"
                  columns={columns}
                  dataSource={pastData}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
