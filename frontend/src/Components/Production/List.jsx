import { Button, Table } from "antd";
import React, { useEffect, useState } from "react";
import { getAllProjects } from "../../APIs/project";
import { getProductionByProjectId } from "../../APIs/Production";
import { useNavigate } from "react-router-dom";

export const ProductionList = () => {
  const navigate = useNavigate();
  const [projectData, setProjectData] = useState([]);
  const [gotData, setGotData] = useState(false);
  const columns = [
    {
      title: "Projects",
      dataIndex: "project_name",
      key: "project_name",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      render: (text, record) => (
        <div className="flex flex-row ">
          {record.status === "In Progress" ? (
            <Button
              onClick={() => {
                localStorage.setItem("production_id", record.key);
                navigate("/updateProduction");
              }}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold rounded"
            >
              Edit
            </Button>
          ) : (
            <Button
              onClick={() => {
                localStorage.setItem("finishProject", record.key);
                navigate("/finishProject");
              }}
              className="bg-red-500 hover:bg-red-700 text-white font-bold rounded"
            >
              Finish Project
            </Button>
          )}
        </div>
      ),
    },
  ];

  const getProjects = async () => {
    const response = await getAllProjects();
    if (response.type === "success") {
      let newData = [];
      response.data.data.map((e) => {
        newData.push({
          key: e._id,
          project_name: e.project_name,
          client_name: e.client_id.name,
          status: "In Progress",
          price: e.total_price.toFixed(2),
          is_finalized: e.is_finalized,
        });
      });
      console.log(newData);
      setProjectData(newData);
    } else {
      message.error("Error in Fetching Projects");
    }
  };

  useEffect(() => {
    getProjects();
  }, []);

  const getProjectsProductionData = async () => {
    for (let i = 0; i < projectData.length; i++) {
      const response = await getProductionByProjectId(projectData[i].key);
      if (response.type === "success") {
        projectData[i].status =
          response.data.data.length === 7 ? "Completed" : "In Progress";
        console.log(projectData[i]);
        setProjectData([...projectData]);
      } else {
        message.error("Error in Fetching Projects");
      }
    }
  };
  useEffect(() => {
    if (projectData.length > 0 && !gotData) {
      setGotData(true);
      getProjectsProductionData();
    }
  }, [projectData]);

  return (
    <div className="w-full min-h-screen bg-[#f3f7ff]">
      <p className="text-3xl text-blue-800 font-semibold p-4">
        Production List
      </p>
      <div className="rounded-md bg-white flex flex-col m-4">
        <>
          <p className="text-blue-800 font-semibold text-xl p-5">
            Production List
          </p>
          <div className="w-full">
            <Table columns={columns} dataSource={projectData} />
          </div>
        </>
      </div>
    </div>
  );
};
