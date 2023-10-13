import React, { useEffect, useState } from "react";
import { getProjects } from "../../APIs/project";
import { getclients } from "../../APIs/client";
import { Button, Select, message } from "antd";
import { getIndentbyClientProject } from "../../APIs/indent";
import { getVendors } from "../../APIs/vendor";
import { get } from "lodash";
import { VendorData } from "./VendorData";
import { getPurchaseList } from "../../APIs/purchase";

export const Purchase = () => {
  const [project, setProject] = useState({
    label: "Select Project",
    value: "",
  });
  const [clientName, setClientName] = useState({
    label: "Select Client",
    value: "",
  });
  const [vendorName, setVendorName] = useState({
    label: "Select Vendor",
    value: "",
  });
  const [indentId, setIndentId] = useState("");
  const [projectData, setProjectData] = useState([]);
  const [clientOptions, setClientOptions] = useState([]);
  const [selectedData, setSelectedData] = useState(false);
  const [itemsData, setItemsData] = useState([]);
  const [purchaseData, setPurchaseData] = useState([]);
  const [allVendorsOptions, setAllVendorsOptions] = useState([]);

  useEffect(() => {
    if (!clientName.value) return;
    getProjects({ client_id: clientName.value }).then((response) => {
      if (response.type === "success") {
        setProjectData(
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

  const getAllClients = async () => {
    const response = await getclients();
    if (response.type === "success") {
      setClientOptions(
        response.data.data.map((e) => ({ label: e.name, value: e._id }))
      );
    } else if (response.type === "error") {
      console.log(response.message);
    }
  };

  useEffect(() => {
    getAllClients();
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
    if (!clientName.value || !project.value) {
      message.error("Please Select Client and Project");
      return;
    }
    const response = await getIndentbyClientProject(
      clientName.value,
      project.value
    );

    console.log(response.data);

    if (response.data.data.length === 0) {
      message.error("No Items to Purchase");
      return;
    }

    setIndentId(response.data.data[0]._id);
    setSelectedData(true);
    const vendorslist = await getAllVendors();
    handlePreviousData(
      response.data.data[0]._id,
      vendorslist,
      response.data.data[0].items
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
      <p className="text-3xl text-blue-800 font-semibold p-4">Purchase</p>
      <div className="m-4 flex flex-col items-center justify-center">
        <div className="w-full bg-white flex flex-col rounded-md">
          <p className="text-blue-800 font-semibold text-xl p-4">
            Enter Purchase Details
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
                <div className="w-full flex flex-row gap-4 p-2 my-2">
                  <section className="w-full">
                    <div className="font-semibold p-2 text-gray-500">
                      Select Client
                    </div>
                    <Select
                      className="w-full"
                      placeholder="Select Client"
                      value={clientName.label}
                      showSearch
                      filterOption={(input, option) =>
                        (option?.label ?? "")
                          .toLowerCase()
                          .includes(input.toLowerCase())
                      }
                      onChange={(value) => {
                        clientOptions.map((e) => {
                          if (value === e.value) {
                            setClientName({ value: e.value, label: e.label });
                            setProject("Select Project");
                          }
                        });
                        setProject({ label: "Select Project", value: "" });
                      }}
                      options={clientOptions}
                    />
                  </section>
                  <section className="w-full">
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
