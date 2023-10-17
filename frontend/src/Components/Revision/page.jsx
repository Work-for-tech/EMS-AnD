import React, { useEffect, useState, useMemo } from "react";
import { Input, Select, Button, Table, message, Tooltip } from "antd";
import { getclients } from "../../APIs/client";
import { set } from "lodash";
import { getProjects } from "../../APIs/project";
import { getComponents } from "../../APIs/component";
import { addOffers, getOffers, offerStatusUpdate } from "../../APIs/offer";
import { getRevision, updateRevision } from "../../APIs/revision";
import {
  ArrowBigLeftDash,
  MoreHorizontal,
  PlusCircle,
  RefreshCcw,
  Upload,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { OfferRevision } from "./Revision";
import { offerActions } from "../../store/offerslice";
import { useNavigate } from "react-router-dom";

export const Revision = () => {
  const offer = useSelector((state) => state.offer);
  const updatePanel = useSelector((state) => state.updatepanel);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [offerData, setOfferData] = useState([]);
  const [OfferId, setOfferId] = useState("");
  const [revisionData, setRevisionData] = useState([]);
  const [AddRevision, setAddRevision] = useState("");
  const [recentData, setRecentData] = useState({});
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

  const RevisionHandler = () => {
    setAddRevision(OfferId);
  };

  const StatusChangeHandler = async (value, changedValue) => {
    const response = await offerStatusUpdate(
      { status: changedValue },
      value.key
    );

    if (response.type === "success") {
      message.success("Successfully Changed Status");
      getAllOffers();
    } else if (response.type === "error") {
      message.error(response.message);
    }
  };

  const options = [
    {
      value: "not Final",
      label: "Not Final",
    },
    {
      value: "ongoing",
      label: "On Going",
    },
    {
      value: "Final",
      label: "Final",
    },
  ];

  const OfferColumns = [
    {
      title: "Status",
      render: (text, record) => (
        <Select
          options={options}
          value={record.status}
          onChange={(e) => StatusChangeHandler(record, e)}
        />
      ),
    },
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
          <Tooltip placement="top" title={"Revise Offer"} arrow={mergedArrow}>
            <button
              className="text-blue-800 hover:text-gray-600"
              onClick={() => {
                setRecentData(record);
                setOfferId(record.key);
                const dispatchData = {
                  panels_to_be_created: record.panels_to_be_created,
                  id: record.key,
                };
                dispatch(offerActions.setPanelsToBeCreated(dispatchData));
              }}
            >
              <PlusCircle />
            </button>
          </Tooltip>
          <Tooltip
            placement="top"
            title={"See More Details"}
            arrow={mergedArrow}
          >
            <button
              className="text-blue-800 hover:text-gray-600"
              onClick={() => {
                localStorage.setItem("offerId", JSON.stringify(record.key));
                navigate("/offerdetails");
              }}
            >
              <MoreHorizontal />
            </button>
          </Tooltip>
        </div>
      ),
    },
  ];

  const revisionColumns = [
    {
      title: "Date Of Revision",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "Project Name",
      dataIndex: "project_name",
      key: "name",
    },
    {
      title: "Quantity Of Panel",
      dataIndex: "Qty_of_panel",
      key: "Qty_of_panel",
    },
    {
      title: "No. of Panel",
      dataIndex: "panels",
      key: "panels",
    },
    {
      title: "Description Of Panel",
      dataIndex: "description_of_panel",
      key: "description_of_panel",
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
            title={"See More Details"}
            arrow={mergedArrow}
          >
            <button
              className="text-blue-800 hover:text-gray-600"
              onClick={() => {
                console.log(record);
                localStorage.removeItem("offerId");
                localStorage.setItem(
                  "offerRevision",
                  JSON.stringify(record.panels_to_be_created)
                );
                navigate("/offerdetails");
              }}
            >
              <MoreHorizontal />
            </button>
          </Tooltip>
        </div>
      ),
    },
  ];

  const getAllOffers = async () => {
    const response = await getOffers();
    if (response.type === "success") {
      console.log(response.data.data);
      const newData = response.data.data.map((e) => ({
        key: e._id,
        status: e.status,
        project_name: e.project_id.project_name,
        client_name: e.client_id.name,
        Qty_of_panel: e.Qty_of_panel,
        panels: e.panels_to_be_created.length,
        description_of_panel: e.description_of_panel,
        amount: e.price.toFixed(2),
        panels_to_be_created: e.panels_to_be_created,
      }));
      console.log(response.data.data);
      setOfferData(newData);
    } else if (response.type === "error") {
      console.log(response.message);
    }
  };

  useEffect(() => {
    getAllOffers();
    console.log(offer.id);
    if (offer.id && updatePanel.type === "revision") {
      setOfferId(offer.id);
      setRecentData(offer);
      setAddRevision(offer.id);
    }
  }, [OfferId]);

  var dateOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  };

  useEffect(() => {
    if (OfferId === "") return;
    getRevision({ offer_id: OfferId }).then((response) => {
      if (response.type === "success") {
        console.log(response.data.data);
        if (!response.data.data) return message.info("No Revision Found");
        const projectName = response.data.data.project_id.project_name;
        const newData = response.data.data.revisions.map((e) => {
          console.log(e);
          return {
            key: e._id,
            project_name: projectName,
            date: new Date(e.Date).toLocaleString(undefined, dateOptions),
            Qty_of_panel: e.data_before_revision.Qty_of_panel,
            description_of_panel: e.data_before_revision.description_of_panel,
            amount: e.data_before_revision.price.toFixed(2),
            panels: e.data_before_revision.panels_to_be_created.length,
            panels_to_be_created: e.data_before_revision.panels_to_be_created,
          };
        });
        setRevisionData(newData.reverse());
      } else if (response.type === "error") {
        console.log(response.message);
      }
    });
  }, [OfferId]);

  const BackHandler = () => {
    setOfferId("");
  };

  return (
    <>
      {AddRevision === "" && (
        <div className="w-full min-h-screen bg-[#f3f7ff]">
          <p className="text-3xl text-blue-800 font-semibold p-4">Offer List</p>
          <div className="my-4">
            {OfferId !== "" && (
              <div
                className="px-4 flex flex-row cursor-pointer hover:text-blue-800"
                onClick={BackHandler}
              >
                <ArrowBigLeftDash className="text-gray-500 hover:text-blue-800" />
                <span className="font-semibold text-gray-500 hover:text-blue-800">
                  Offer List
                </span>
              </div>
            )}
            <div className="rounded-md bg-white flex flex-col m-4">
              {OfferId === "" && (
                <>
                  <p className="text-blue-800 font-semibold text-xl p-5">
                    Offers List
                  </p>
                  <Table columns={OfferColumns} dataSource={offerData} />
                </>
              )}
              {OfferId !== "" && (
                <>
                  <p className="text-blue-800 font-semibold text-xl p-5">
                    Revision List
                  </p>
                  <div className="w-full flex flex-col items-center justify-center px-6 pb-6">
                    <Table
                      columns={revisionColumns}
                      dataSource={revisionData}
                      className="w-full"
                    />
                    <Button
                      className="bg-blue-700 text-white"
                      onClick={RevisionHandler}
                    >
                      Add Revision
                    </Button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}
      {AddRevision !== "" && (
        <OfferRevision
          OfferId={AddRevision}
          recentData={recentData}
          setAddRevision={setAddRevision}
          setOfferId={setOfferId}
          setRecentData={setRecentData}
          getAllOffers={getAllOffers}
        />
      )}
    </>
  );
};
