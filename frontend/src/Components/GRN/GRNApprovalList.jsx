import React, { useEffect, useState } from "react";
import axios from "axios";
import { getGRNApproval } from "../../APIs/grn";
import { Select, Button, Table, Input } from "antd";
import { purchaseList } from "../../APIs/purchase";
import { getPurchaseSubComponent } from "../../APIs/purchase";
import { GRNApprovalUpdate } from "./GRNApprovalUpdate";

export const GRNApprovalList = () => {

  const [purchaseId, setPurchaseId] = useState("");
  const [Purchase, setPurchase] = useState([]);
  const [grnApprovalList, setGrnApprovalList] = useState([]);
  const [grnApprovalUpdate, setGrnApprovalUpdate] = useState({});

  const getAllPurchase = async () => {
    const response = await purchaseList();
    console.log(response.data.data);
    const data = response.data.data.map((e) => {
      return { label: e._id, value: e._id };
    });
    setPurchase(data);
  };

  useEffect(() => {
    getAllPurchase();
  }, []);



  const getGRNApprovalListInit = async () => {
    const res = await getGRNApproval({
      purchase_id: purchaseId,
    });
    if (res.type === "success") {
      console.log(res.data.data);
      setGrnApprovalList(res.data.data[0]);
    }
  }


  const columns = [
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Rating",
      dataIndex: "rating",
      key: "rating",
    },
    {
      title: "Catalog Number",
      dataIndex: "catalog_number",
      key: "catalog_number",
    },
    {
      title: "Quantity Received",
      dataIndex: "quantity_received",
      key: "quantity_received",
    },
    {
      title: "Quantity Expected",
      dataIndex: "quantity_expected",
      key: "quantity_expected",
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      render: (_, record) => (
        <Button onClick={() => setGrnApprovalUpdate(record)} className="cursor-pointer">Update
        </Button>
      ),
    }
  ]


  return <div className="w-full">
    <div className="py-5 flex justify-center gap-5">
      <Select
        placeholder="Select Purchase"
        onChange={(e) => setPurchaseId(e)}
        className="w-1/5"
        options={Purchase.map((e, i) => {
          return { label: "Purchase " + (i + 1), value: e.value };
        })}
      />
      <Button onClick={() => {
        getGRNApprovalListInit();
        setGrnApprovalUpdate({})
      }}>GET LIST</Button>
    </div>
    {grnApprovalList.items && <Table className="p-5" columns={columns} dataSource={grnApprovalList.items.map((e) => {
      return {
        key: e._id,
        description: e.sub_component_id.desc ?? "None",
        rating: e.sub_component_id.rating_value ?? "None",
        catalog_number: e.sub_component_id.catalog_number ?? "None",
        quantity_expected: e.quantity_expected ?? "-",
        quantity_received: e.quantity_received ?? "-"
      }
    })} />}

    {
      grnApprovalUpdate.key && <GRNApprovalUpdate setGrnApprovalList={setGrnApprovalList} setGrnApprovalUpdate={setGrnApprovalUpdate} data={grnApprovalUpdate} />
    }


  </div>;
};
