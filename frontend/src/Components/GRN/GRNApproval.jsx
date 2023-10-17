import React, { useEffect, useState } from "react";
import { createGRNApproval, getGRN } from "../../APIs/grn";
import { Button, Select, message } from "antd";
import { getclients } from "../../APIs/client";
import { getProjects } from "../../APIs/project";
import { getIndentbyClientProject } from "../../APIs/indent";
import { getPurchaseList, purchaseList } from "../../APIs/purchase";
import { GRNApprovalList } from "./GRNApprovalList";

export const GRNApproval = () => {
  const [grn, setGrn] = React.useState([]);
  const [grnids, setGrnids] = React.useState([]);
  const [purchaseId, setPurchaseId] = useState("");
  const [Purchase, setPurchase] = useState([]);

  const getGRNInit = async () => {
    const response = await getGRN();
    console.log(response.data.grns);
    setGrn(response.data.grns);
  };

  const HandleSubmit = async () => {
    const data = {
      grn_id: grnids,
      purchase_id: purchaseId,
    };

    console.log(data);

    const response = await createGRNApproval(data);

    console.log(response)

    if (response.type === "success") {
      message.success("GRN Approval Created");
    } else {
      message.error("Something went wrong");
    }
  };

  const getAllPurchase = async () => {
    const response = await purchaseList();
    console.log(response.data.data);
    const data = response.data.data.map((e) => {
      return { label: e._id, value: e._id };
    });
    setPurchase(data);
  };

  useEffect(() => {
    getGRNInit();
    getAllPurchase();
  }, []);

  return (
    <div className="w-full min-h-screen h-full bg-[#f3f7ff]">
      <p className="text-3xl text-blue-800 font-semibold p-4">GRN Approval</p>
      {/* <div className="m-4 flex flex-col items-center gap-2">
        <div className="bg-white flex flex-col w-full rounded-md">
          <p className="text-blue-800 font-semibold text-xl p-4">
            Enter GRN Details
          </p>
          <div className="w-full">
            <div className="w-full flex flex-col items-center justify-center p-4 gap-4">
              <div className="w-full flex flex-row">
                <div className="w-full flex flex-col p-2">
                  <p className="text-left w-1/2 m-2">Select Purchase</p>
                  <Select
                    placeholder="Select Purchase"
                    onChange={(e) => setPurchaseId(e)}
                    className="w-full"
                    options={Purchase.map((e, i) => {
                      return { label: "Purchase " + (i + 1), value: e.value };
                    })}
                  />
                </div>
                <div className="w-full flex flex-col p-2">
                  <p className="text-left w-1/2 m-2">Select GRNs</p>
                  <Select
                    className="w-full"
                    onChange={(e) => {
                      setGrnids(e);
                    }}
                    placeholder="Select GRN"
                    options={grn.map((e) => {
                      return { label: e.invoice_number, value: e._id };
                    })}
                  />
                </div>
              </div>
              <Button
                className="w-1/2 bg-blue-700 text-white"
                onClick={() => HandleSubmit()}
              >
                Get List
              </Button>{" "}
            </div>
          </div>
        </div>
      </div> */}
      <GRNApprovalList />
    </div>
  );
};
