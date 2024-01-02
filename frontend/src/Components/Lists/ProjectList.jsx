import React, { useEffect, useState, useMemo } from "react";
import { changeProjectStatus, getAllProjects } from "../../APIs/project";
import { Select, Table, Tooltip, message } from "antd";
import { ArrowBigLeftDash, MoreHorizontal } from "lucide-react";
import { finalProjects } from "../../APIs/offer";
import { useNavigate } from "react-router-dom";
import { ProjectOfferList } from "../Project/projectOfferList";
import { useDispatch, useSelector } from "react-redux";
import { offerActions } from "../../store/offerslice";

export const ProjectList = () => {
  const offer = useSelector((state) => state.offer);
  const update = useSelector((state) => state.updatepanel);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [projectData, setProjectData] = useState([]);
  const [projectId, setProjectId] = useState(offer.projectId || update.type);
  const [offersData, setOffersData] = useState([]);
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

  const getOneProjectData = async (value) => {
    const response = await finalProjects({ project_id: projectId });

    if (response.type === "success") {
      message.success("Successfully Fetched Offers");
      const newData = response.data.data.map((e) => ({
        key: e._id,
        project_name: e.project_id.project_name,
        client_name: e.client_id.name,
        Qty_of_panel: e.Qty_of_panel,
        description_of_panel: e.description_of_panel,
        amount: e.price.toFixed(2),
        panels: e.panels_to_be_created.length,
      }));
      setOffersData(newData);
    } else if (response.type === "error") {
      message.error(response.message);
    }
  };

  useEffect(() => {
    if (projectId !== "") {
      getOneProjectData();
    }
  }, [projectId]);

  const getProjects = async () => {
    const response = await getAllProjects();

    console.log(response.data.data);

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
    if (offer.projectId !== "") {
      setProjectId(offer.projectId);
    }
    getProjects();
  }, []);

  const columns = [
    {
      title: "Project Name",
      dataIndex: "project_name",
    },
    {
      title: "Client Name",
      dataIndex: "client_name",
    },
    {
      title: "Total Price",
      dataIndex: "price",
    },
    {
      title: "Action",
      render: (text, record) => (
        <div className="flex flex-row">
          <Tooltip
            placement="top"
            title={"See More Details"}
            arrow={mergedArrow}
          >
            <button
              className="text-blue-800 hover:text-gray-600"
              onClick={() => {
                setProjectId(record.key);
                dispatch(offerActions.setProjectId(record.key));
              }}
            >
              <MoreHorizontal />
            </button>
          </Tooltip>
        </div>
      ),
    },
  ];

  const BackHandler = () => {
    setProjectId("");
  };

  console.log(projectId);

  return (
    <div className="w-full min-h-screen bg-[#f3f7ff]">
      {!projectId && (
        <p className="text-3xl text-blue-800 font-semibold p-4">
          Projects List
        </p>
      )}

      {projectId !== "" ? (
        <>
          <div className="w-full">
            <ProjectOfferList
              projectId={projectId}
              setProjectId={setProjectId}
            />
          </div>
        </>
      ) : (
        <div className="rounded-md bg-white flex flex-col m-4">
          <>
            <p className="text-blue-800 font-semibold text-xl p-5">
              Projects List
            </p>
            <div className="w-full">
              <Table columns={columns} dataSource={projectData} />
            </div>
          </>
        </div>
      )}
    </div>
  );
};
