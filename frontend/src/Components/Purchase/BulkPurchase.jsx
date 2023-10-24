import React, { useEffect, useState } from "react";
import { getProjects } from "../../APIs/project";
import { Button, Select, message } from "antd";
import {
  getAllBulkIndent,
  getBulkIndentById,
  getIndentbyClientProject,
} from "../../APIs/indent";
import { getVendors } from "../../APIs/vendor";
import { get } from "lodash";
import { VendorData } from "./VendorData";
import { getPurchaseList } from "../../APIs/purchase";

export const BulkPurchase = () => {
  const [project, setProject] = useState({
    label: "Select Indent",
    value: "",
  });
  const [vendorName, setVendorName] = useState({
    label: "Select Vendor",
    value: "",
  });
  const [indentId, setIndentId] = useState("");
  const [projectData, setProjectData] = useState([]);
  const [selectedData, setSelectedData] = useState(false);
  const [itemsData, setItemsData] = useState([]);
  const [purchaseData, setPurchaseData] = useState([]);
  const [allVendorsOptions, setAllVendorsOptions] = useState([]);

  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  };

  const getAllIndents = async () => {
    const response = await getAllBulkIndent();
    console.log(response.data.data);
    if (response.type === "success") {
      const data = response.data.data.map((e, i) => {
        return {
          label:
            e?.createdAt !== undefined
              ? new Date(e?.createdAt).toLocaleString(undefined, options)
              : "Indent " + Number(i + 1),
          value: e._id,
        };
      });
      setProjectData(data);
    } else if (response.type === "error") {
      message.error(response.message);
    }
  };

  useEffect(() => {
    getAllIndents();
  }, []);

  const getAllVendors = async () => {
    const response = await getVendors();
    if (response.type === "success") {
      console.log(
        response.data.data.map((e) => ({ label: e.vendorName, value: e._id }))
      );
      const data = response.data.data.map((e) => ({
        label: e.vendorName,
        value: e._id,
      }));
      return data;
    } else if (response.type === "error") {
      message.error(response.message);
    }
  };

  const handlePreviousData = async (id, vendorslist, items) => {
    const response = await getPurchaseList(id);
    if (response.type === "success") {
      const notEmailSendData = [];
      let vendorOptions = vendorslist;
      let itemsData = items;
      console.log(vendorslist);
      response.data.data.map((e) => {
        console.log(e);
        notEmailSendData.push(e);

        vendorOptions = vendorOptions.filter((d) => d.value !== e.vendorId._id);

        // Create a Set of 'desc' values from the second array
        const secondArrayDescs = new Set(
          e.items.map((item) => item.subcomponent.desc)
        );

        // Filter the first array to exclude items with 'desc' values present in the second array
        itemsData = itemsData.filter(
          (item) => !secondArrayDescs.has(item.subcomponent.desc)
        );
      });

      console.log(notEmailSendData);
      console.log(vendorOptions);
      setPurchaseData(notEmailSendData);
      setAllVendorsOptions(vendorOptions);
      setItemsData(itemsData);
    } else if (response.type === "error") {
      message.error(response.message);
    }
  };

  const FetchIndentData = async () => {
    setIndentId(project.value);
    const response = await getBulkIndentById(project.value);
    console.log(response.data.data);

    setSelectedData(true);
    const vendorslist = await getAllVendors();
    handlePreviousData(
      response.data.data._id,
      vendorslist,
      response.data.data.items
    );
  };

  const AddVendorData = async () => {
    if (!vendorName.value) {
      message.error("Please Select Vendor");
      return;
    } else if (
      purchaseData.findIndex((e) => e.vendorId === vendorName.value) > -1
    ) {
      message.error("Vendor Already Added");
      return;
    } else if (itemsData.length === 0) {
      message.error("No Items to Purchase");
      return;
    } else {
      const newPurchaseData = {
        indentId: indentId,
        vendorId: vendorName.value,
        vendorName: vendorName.label,
        items: [],
      };

      setPurchaseData([...purchaseData, newPurchaseData]);
    }
  };

  return (
    <div className="w-full min-h-screen h-full bg-[#f3f7ff]">
      <p className="text-3xl text-blue-800 font-semibold p-4">Bulk Purchase</p>
      <div className="m-4 flex flex-col items-center justify-center">
        <div className="w-full bg-white flex flex-col rounded-md">
          <p className="text-blue-800 font-semibold text-xl p-4">
            Enter Bulk Purchase Details
          </p>
          {selectedData ? (
            <div className="bg-[#f3f7ff] flex flex-col gap-10">
              <div className="bg-white flex items-center justify-center flex-row w-full p-4 gap-4 rounded-md">
                <div className="w-1/2">
                  <div className="w-full flex flex-row gap-4 p-2 my-2">
                    <section className="w-full">
                      <div className="font-semibold p-2 text-gray-500">
                        Select Vendor
                      </div>
                      <Select
                        className="w-full"
                        placeholder="Select Client"
                        value={vendorName.label}
                        showSearch
                        filterOption={(input, option) =>
                          (option?.label ?? "")
                            .toLowerCase()
                            .includes(input.toLowerCase())
                        }
                        onChange={(value) => {
                          allVendorsOptions.map((e) => {
                            if (value === e.value) {
                              setVendorName({ value: e.value, label: e.label });
                            }
                          });
                        }}
                        options={allVendorsOptions}
                      />
                    </section>
                  </div>
                  <div className="flex items-center justify-center p-2">
                    <Button
                      onClick={AddVendorData}
                      className="bg-blue-700 text-white"
                    >
                      Add Vendor
                    </Button>
                  </div>
                </div>
              </div>
              {purchaseData.map((e, i) => {
                return (
                  <div key={i} className="bg-white w-full gap-4 rounded-md">
                    <VendorData
                      index={i}
                      setItemsData={setItemsData}
                      itemsData={itemsData}
                      data={e}
                      setPurchaseData={setPurchaseData}
                      purchaseData={purchaseData}
                    />
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="bg-white flex items-center justify-center flex-row w-full p-4 gap-4 rounded-md">
              <div className="w-full">
                <div className="w-full flex flex-row items-center justify-center gap-4 p-2 my-2">
                  <section className="w-1/2">
                    <div className="font-semibold p-2 text-gray-500">
                      Select Indent
                    </div>
                    <Select
                      showSearch
                      filterOption={(input, option) =>
                        (option?.label ?? "")
                          .toLowerCase()
                          .includes(input.toLowerCase())
                      }
                      className="w-full"
                      placeholder="Select Project Name"
                      name="project"
                      value={project.label}
                      options={projectData}
                      onChange={(value) =>
                        projectData.map((item) => {
                          if (item.value === value) {
                            setProject(item);
                            return;
                          }
                        })
                      }
                    />
                  </section>
                </div>
                <div className="flex items-center justify-center p-2">
                  <Button
                    onClick={FetchIndentData}
                    className="bg-blue-700 text-white"
                  >
                    Indent Data
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
