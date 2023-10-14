import { Button, Select, message } from "antd";
import React, { useEffect, useState } from "react";
import { getOneSubComponent, getSubComponents } from "../../APIs/subComponent";
import { AddNewSubComponents } from "./AddNewSubComponents";
import { addBulkIndent } from "../../APIs/indent";

export const BulkIndent = () => {
  const [subComponentsData, setSubComponentsData] = useState([]);
  const [subcomponent, setSubcomponent] = useState({
    label: "Select SubComponent",
    value: "",
  });
  const [subComponentOptions, setSubComponentOptions] = useState([]);
  const [newSubComponents, setNewSubComponents] = useState([]);

  useEffect(() => {
    const getSubComponent = async () => {
      const response = await getSubComponents();
      if (response.type === "error") {
        message.error(response.message);
        return;
      }
      setSubComponentOptions(
        response.data.data.map((e) => ({
          label: e.desc,
          value: e._id,
        }))
      );
    };
    getSubComponent();
  }, []);

  const AddSubComponents = () => {
    subComponentOptions.map(async (e) => {
      if (subcomponent.value === e.value) {
        const response = await getOneSubComponent(e.value);
        if (response.type === "error") {
          message.error(response.message);
          return;
        }
        const data = {
          ...response.data.data,
          quantityRequired: 0,
          quantity_ordered: 0,
        };

        console.log(data);

        setNewSubComponents((prev) => {
          return [...prev, data];
        });
      }
    });
  };

  const HandleOnClickSubmit = async () => {
    if (newSubComponents.length === 0) {
      message.error("No SubComponents Added");
      return;
    }

    if (subcomponent.value === "") {
      message.error("Select SubComponent");
      return;
    }

    console.log(subComponentsData.length, newSubComponents.length);

    if (subComponentsData.length !== newSubComponents.length) {
      message.error("Add All SubComponents");
      return;
    }

    console.log(subComponentsData, newSubComponents);

    const sendData = {
      items: [],
    };

    subComponentsData.map((e, i) => {
      sendData.items.push({
        subcomponent: e._id,
        quantityRequired: e.quantity,
        quantityOrdered: e.quantityOrdered,
      });
    });

    console.log(sendData);

    const response = await addBulkIndent(sendData);

    if (response.type === "error") {
      message.error(response.message);
      return;
    } else {
      message.success("Indent Added Successfully");
      setNewSubComponents([]);
      setSubComponentsData([]);
      setSubcomponent({ label: "Select SubComponent", value: "" });
    }
  };

  return (
    <div className="w-full min-h-screen h-full bg-[#f3f7ff]">
      <p className="text-3xl text-blue-800 font-semibold p-4">
        Bluk Indent Details
      </p>
      <div className="m-4 flex flex-col items-center justify-center">
        <div className="w-full bg-white flex flex-col rounded-md">
          <p className="text-blue-800 font-semibold text-xl p-4">
            Enter Bluk Indent Details
          </p>
          <div className="bg-white flex items-center justify-center flex-row w-full p-4 gap-4 rounded-md">
            <div className="w-full">
              <div className="w-full flex items-center justify-center flex-row gap-4 p-2 my-2">
                <section className="w-1/2">
                  <div className="font-semibold p-2 text-gray-500">
                    Select SubComponent
                  </div>
                  <Select
                    className="w-full"
                    value={subcomponent.label}
                    showSearch
                    filterOption={(input, option) =>
                      (option?.label ?? "")
                        .toLowerCase()
                        .includes(input.toLowerCase())
                    }
                    onChange={(value) => {
                      subComponentOptions.map((e) => {
                        if (value === e.value) {
                          setSubcomponent({ value: e.value, label: e.label });
                        }
                      });
                    }}
                    options={subComponentOptions}
                  />
                </section>
              </div>
              <div className="flex items-center justify-center p-2">
                <Button
                  onClick={AddSubComponents}
                  className="bg-blue-700 text-white"
                >
                  Add SubComponents
                </Button>
              </div>
            </div>
          </div>

          {/* Add Subcomponent */}
          <div className="flex flex-col items-center justify-center">
            {newSubComponents.map((e, i) => {
              return (
                <AddNewSubComponents
                  setSubComponentsData={setSubComponentsData}
                  data={e}
                  key={i}
                />
              );
            })}
          </div>
          {newSubComponents.length !== 0 && (
            <div className="flex items-center justify-center p-2">
              <Button
                onClick={HandleOnClickSubmit}
                className="bg-blue-700 text-white"
              >
                Submit
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
