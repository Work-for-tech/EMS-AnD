import React, { useEffect, useMemo, useState } from "react";
import { getIssues } from "../../APIs/issue";
import { Table, Tooltip, message } from "antd";
import { MoreHorizontal } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const IssueList = () => {
  const navigate = useNavigate();
  const [issueList, setIssueList] = useState([]);
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

  const columns = [
    {
      title: "Project Name",
      dataIndex: "project",
    },
    {
      title: "Issue Date",
      dataIndex: "issueDate",
    },
    {
      title: "Person Name",
      dataIndex: "person_name",
    },
    {
      title: "Contractor Name",
      dataIndex: "contractor_name",
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      render: (text, record) => (
        <div className="flex flex-row gap-2">
          <Tooltip
            placement="top"
            title={"See More Details"}
            arrow={mergedArrow}
          >
            <button
              className="text-blue-600 hover:text-blue-300"
              onClick={() => {
                localStorage.setItem(
                  "issuecomponents",
                  JSON.stringify(record.items)
                );
                navigate("/issueSubcomponent");
              }}
            >
              <MoreHorizontal />
            </button>
          </Tooltip>
        </div>
      ),
    },
  ];

  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  };

  const getIssueList = async () => {
    const response = await getIssues();
    if (response.type === "error") {
      message.error(response.message);
      return;
    }
    console.log(response.data.data);
    setIssueList(
      response.data.data.map((e) => ({
        ...e,
        key: e._id,
        project: e.projectId.project_name,
        issueDate: new Date(e.createdAt).toLocaleString(undefined, options),
      }))
    );
  };

  useEffect(() => {
    getIssueList();
  }, []);

  return (
    <div className="w-full min-h-screen bg-[#f3f7ff]">
      <p className="text-3xl text-blue-800 font-semibold p-4">
        Offer Panel List
      </p>
      <div className="rounded-md bg-white flex flex-col m-4">
        <>
          <p className="text-blue-800 font-semibold text-xl p-5">
            Offer Panel List
          </p>
          <div className="w-full">
            <Table columns={columns} dataSource={issueList} />
          </div>
        </>
      </div>
    </div>
  );
};
