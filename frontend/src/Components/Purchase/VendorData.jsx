import { Button, Input, Select, Table, message } from "antd";
import { Trash2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import { createPurchase } from "../../APIs/purchase";
import { PurchaseMail } from "./PurchaseMail";
import { set } from "lodash";

export const VendorData = ({
  index,
  setItemsData,
  itemsData,
  data,
  setPurchaseData,
  purchaseData,
}) => {
  const quantityRef = React.useRef();
  const [selectSubcomponents, setSelectSubcomponents] = useState({
    label: "Select Subcomponent",
    value: "",
  });
  const [subcomponentsOptions, setSubcomponentsOptions] = useState([]);
  const [subcomponentsData, setSubcomponentsData] = useState([]);
  const [items, setItems] = useState([]);
  const [emailpurchaseId, setEmailPurchaseId] = useState("");
  const [sentEmail, setSentEmail] = useState(false);

  console.log(data, itemsData, items, subcomponentsData);

  const columns = [
    {
      title: "Description",
      dataIndex: "desc",
      key: "desc",
    },
    {
      title: "Quantity Required",
      dataIndex: "quantityRequired",
      key: "quantityRequired",
    },
    {
      title: "Quantity Ordered",
      dataIndex: "quantityOrdered",
      key: "quantityOrdered",
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      render: (text, record) => (
        <div className="flex flex-row gap-2">
          <button
            className="text-red-600 hover:text-red-300"
            onClick={() => {
              console.log(record);
              // remove from items and add into subcomponentOptions and subcomponentData
              setItems(items.filter((e) => e.key !== record.key));
              console.log(subcomponentsData);
              setItemsData([...itemsData, record.recoverData]);
              setSubcomponentsData(
                subcomponentsData.filter((e) => e._id !== record.subcomponent)
              );
            }}
          >
            <Trash2 />
          </button>
        </div>
      ),
    },
  ];

  useEffect(() => {
    console.log(data);
    if (!data._id) return;
    if (!data.emailSent) {
      setEmailPurchaseId(data._id);
    } else {
      setEmailPurchaseId(data._id);
      setSentEmail(true);
    }
  }, []);

  useEffect(() => {
    if (!itemsData) return;
    setSubcomponentsOptions(
      itemsData.map((e) => ({
        label: e.subcomponent.desc,
        value: e.subcomponent._id,
      }))
    );
  }, [itemsData]);

  const AddSubcomponentHandler = () => {
    if (selectSubcomponents.value === "") {
      message.error("Please Select Subcomponent");
      return;
    }

    console.log([
      ...subcomponentsData,
      itemsData.filter(
        (e) => e.subcomponent._id === selectSubcomponents.value
      )[0],
    ]);

    setSubcomponentsData([
      ...subcomponentsData,
      itemsData.filter(
        (e) => e.subcomponent._id === selectSubcomponents.value
      )[0],
    ]);

    setItemsData(
      itemsData.filter((e) => {
        if (e.subcomponent._id !== selectSubcomponents.value) {
          return e;
        }
      })
    );

    setSelectSubcomponents({ label: "Select Subcomponent", value: "" });
  };

  const SubmitSubcomponentHandler = (e) => {
    console.log("Hit");

    // if (quantityRef.current.input.value === "") {
    //   message.error("Please Enter Quantity");
    //   return;
    // }

    console.log(e);

    setItems([
      ...items,
      {
        key: e?._id,
        recoverData: e,
        subcomponent: e?.subcomponent?._id,
        desc: e?.subcomponent?.desc,
        quantityRequired: e?.quantityRequired || e?.subcomponent?.quantity,
        quantityOrdered: e?.quantityOrdered || e?.subcomponent?.quantity,
        quantity: e?.quantityOrdered || e?.subcomponent?.quantity,
      },
    ]);

    console.log(e);
  };

  console.log(items);

  const FinalSubmissionHandler = async () => {
    console.log(subcomponentsData);
    if (subcomponentsData.length !== items.length) {
      message.error("Please Add All Subcomponents");
      return;
    }

    const newPurchaseData = purchaseData.map((e, i) => {
      if (i === index) {
        e.items = items;
        return e;
      } else {
        return e;
      }
    });

    console.log(newPurchaseData[index]);

    const response = await createPurchase(newPurchaseData[index]);
    console.log(response.data.data);
    if (response.type === "success") {
      message.success("Successfully Created Purchase");
      setPurchaseData(newPurchaseData);
      setEmailPurchaseId(response.data.data._id);
    } else {
      message.error("Failed to Create Purchase");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center">
      {!emailpurchaseId && !sentEmail && (
        <div className="w-full bg-white flex flex-col rounded-md">
          <p className="text-blue-800 font-semibold text-xl p-4">
            Vendor: {data.vendorName}
          </p>
          <div className="bg-[#f3f7ff] flex flex-col gap-10">
            <div className="bg-white flex items-center justify-center flex-row w-full p-4 gap-4 rounded-md">
              <div className="w-1/2">
                <div className="w-full flex flex-row gap-4 p-2 my-2">
                  <section className="w-full">
                    <div className="font-semibold p-2 text-gray-500">
                      Add Subcomponent
                    </div>
                    <Select
                      className="w-full"
                      placeholder="Select Subcomponents"
                      value={selectSubcomponents.label}
                      showSearch
                      filterOption={(input, option) =>
                        (option?.label ?? "")
                          .toLowerCase()
                          .includes(input.toLowerCase())
                      }
                      onChange={(value) => {
                        subcomponentsOptions.map((e) => {
                          if (value === e.value) {
                            setSelectSubcomponents({
                              value: e.value,
                              label: e.label,
                            });
                          }
                        });
                      }}
                      options={subcomponentsOptions}
                    />
                  </section>
                </div>
                <div className="flex items-center justify-center p-2">
                  <Button
                    onClick={AddSubcomponentHandler}
                    className="bg-blue-700 text-white"
                  >
                    Add Subcomponent
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {subcomponentsData.map((e, i) => {
        if (items.map((t) => t.subcomponent).includes(e.subcomponent._id))
          return (
            <div
              key={i}
              className="w-full bg-white flex items-center rounded-md"
            >
              {/* <p className="text-blue-800 font-semibold text-xl p-4 mx-32">
                {e.subcomponent.desc}
              </p>
              <p>Added</p> */}
            </div>
          );
        else
          return (
            <div
              key={i}
              className="w-full bg-white flex items-center rounded-md"
            >
              <p className="text-blue-800 font-semibold text-xl p-4 mx-32">
                {e.subcomponent.desc}
              </p>
              <div className="bg-[#f3f7ff] flex flex-col gap-10">
                <div className="bg-white flex items-center justify-center flex-row w-full p-4 gap-4 rounded-md">
                  <div className="w-1/2">
                    {/* <div className="w-full flex flex-row gap-4 p-2 my-2">
                      <section className="w-full">
                        <div className="font-semibold p-2 text-gray-500">
                          Add Quantity
                        </div>
                        <Input
                          className="w-full"
                          placeholder="Add Quantity"
                          ref={quantityRef}
                          type="number"
                        />
                      </section>
                    </div> */}
                    <div className="flex items-center justify-center p-2">
                      <Button
                        onClick={() => SubmitSubcomponentHandler(e)}
                        className="bg-blue-700 text-white"
                      >
                        Add This Component
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
      })}
      {!emailpurchaseId && items.length !== 0 && (
        <Table
          columns={columns}
          dataSource={items}
          className="table-auto w-full"
        />
      )}
      {!emailpurchaseId && items.length !== 0 && (
        <div className="m-4">
          <Button
            onClick={() => FinalSubmissionHandler()}
            className="bg-blue-700 text-white"
          >
            Final Submission
          </Button>
        </div>
      )}
      {(emailpurchaseId || sentEmail) && (
        <div className="p-4">
          <PurchaseMail
            sentEmail={sentEmail}
            setSentEmail={setSentEmail}
            emailpurchaseId={emailpurchaseId}
          />
        </div>
      )}
      {sentEmail && (
        <div className="p-4 text-center">
          <p className="font-bold text-green-500 p-4">
            Email Sent to {data.vendorId.vendorName} of Subcomponents
          </p>
          <Table
            className="table-auto w-full"
            columns={[
              {
                title: "Description",
                dataIndex: "desc",
                key: "desc",
              },
              {
                title: "Price",
                dataIndex: "price",
                key: "price",
              },
              {
                title: "Title",
                dataIndex: "title",
                key: "title",
              },
              {
                title: "Catalog Number",
                dataIndex: "catalog_number",
                key: "catalog_number",
              },
              {
                title: "Rating Value",
                dataIndex: "rating_value",
                key: "rating_value",
              },
              {
                title: "Quantity",
                dataIndex: "quantity",
                key: "quantity",
              },
            ]}
            dataSource={data.items.map((e) => {
              console.log(e);
              return {
                key: e?._id || e?.recoverData?._id,
                desc:
                  (e?.subcomponent?.desc ||
                    e?.recoverData?.subcomponent?.desc) ??
                  "-",
                price:
                  (e?.subcomponent?.company?.price ||
                    e.recoverData?.subcomponent?.company?.price) ??
                  "-",
                title:
                  (e?.subcomponent?.title ||
                    e?.recoverData?.subcomponent?.title) ??
                  "-",
                catalog_number:
                  (e?.subcomponent?.catalog_number ||
                    e?.recoverData?.subcomponent?.catalog_number) ??
                  "-",
                rating_value:
                  (e?.subcomponent?.rating_value ||
                    e?.recoverData?.subcomponent?.rating_value) ??
                  "-",
                quantity:
                  (e?.quantity ||
                    e?.recoverData?.quantity ||
                    e?.recoverData?.quantityOrdered) ??
                  "-",
              };
            })}
          />

          {data.items.map((e) => {
            console.log(e);
            return;
          })}
        </div>
      )}
    </div>
  );
};
