import { Table, Tooltip, message } from "antd";
import { Redo2, Trash2 } from "lucide-react";
import React, { useEffect, useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { deleteVendor, getVendors } from "../../APIs/vendor";
import { UpdateVendor } from "../Vendor/updateVendor";

export const VendorList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [vendorData, setVendorData] = useState([]);
  const [updateVendor, setUpdateVendor] = useState(false);
  const [updateData, setUpdateData] = useState();
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

  const getVendorsData = async () => {
    const response = await getVendors();

    if (response.type === "success") {
      const newVendorData = response.data.data.map((e) => {
        return {
          key: e._id,
          vendorName: e.vendorName,
          phoneNumber1: e.phoneNumber1,
          phoneNumber2: e.phoneNumber2,
          email1: e.email1,
          email2: e.email2,
          address: e.address,
          gst: e.gst,
          panNo: e.panNo,
          accountNo: e.accountNo,
          ifsc: e.ifsc,
          remarks: e.remarks,
        };
      });

      setVendorData(newVendorData);
    } else {
      message.error("Cannot fetch vendors");
    }
  };

  useEffect(() => {
    getVendorsData();
  }, []);

  const deleteVendors = async (id) => {
    const response = await deleteVendor(id);
    if (response.type === "success") {
      message.success("Successfully deleted vendor");
      getVendorsData();
    } else {
      message.error("Failed to delete vendor");
    }
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "vendorName",
      key: "vendorName",
    },
    {
      title: "Phone Number",
      dataIndex: "phoneNumber1",
      key: "phoneNumber1",
    },
    {
      title: "Email",
      dataIndex: "email1",
      key: "email1",
    },
    {
      title: "GST",
      dataIndex: "gst",
      key: "gst",
    },
    {
      title: "Pan Number",
      dataIndex: "panNo",
      key: "panNo",
    },
    {
      title: "Account No.",
      dataIndex: "accountNo",
      key: "accountNo",
    },
    {
      title: "IFSC",
      dataIndex: "ifsc",
      key: "ifsc",
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      render: (text, record) => (
        <div className="flex flex-row gap-2">
          <Tooltip placement="top" title={"Delete Vendor"} arrow={mergedArrow}>
            <button
              className="text-red-600 hover:text-red-300"
              onClick={() => {
                deleteVendors(record.key);
              }}
            >
              <Trash2 />
            </button>
          </Tooltip>
          <Tooltip placement="top" title={"Update Vendor"} arrow={mergedArrow}>
            <button
              className="text-blue-600 hover:text-blue-300"
              onClick={() => {
                setUpdateVendor(true);
                setUpdateData(record);
              }}
            >
              <Redo2 />
            </button>
          </Tooltip>
        </div>
      ),
    },
  ];

  return (
    <div className="w-full min-h-screen bg-[#f3f7ff]">
      {!updateVendor ? (
        <>
          <p className="text-3xl text-blue-800 font-semibold p-4">
            Vendor List
          </p>
          <div className="rounded-md bg-white flex flex-col m-4">
            <>
              <p className="text-blue-800 font-semibold text-xl p-5">
                Vendor List
              </p>
              <div className="w-full">
                <Table columns={columns} dataSource={vendorData} />
              </div>
            </>
          </div>
        </>
      ) : (
        <div>
          <UpdateVendor
            updateData={updateData}
            setUpdateVendor={setUpdateVendor}
            getVendorsData={getVendorsData}
          />
        </div>
      )}
    </div>
  );
};
