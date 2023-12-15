import React, { useEffect, useState } from "react";
import { Input, Button, Collapse, Select, message } from "antd";
import { Trash2 } from "lucide-react";
import _ from "lodash";
import { useDispatch, useSelector } from "react-redux";
import { getComponents, getOneComponent } from "../../APIs/component";
import { updatepanelActions } from "../../store/updateslice";
import { UpdateOfferSubComponent } from "./UpdateOfferSubComponent";
import { UpdateConsumables } from "./UpdateConsumables";

export const UpdateOfferComponent = ({ index }) => {
  const dispatch = useDispatch();
  let panel = useSelector((state) => state.updatepanel);
  let components = useSelector((state) => state.updatepanel.components);
  const [componentName, setComponentName] = useState("Select Component");
  const [componentOptions, setComponentOptions] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [filteredItems, setFilteredItems] = useState([]);

  useEffect(() => {
    let filtered = components.map((e, i) => {
      return {
        key: i,
        label: e.name ?? "",
        children: (
          <>
            {
              <div className="w-full border-2 border-blue-400 my-2   p-2">
                <p className="font-semibold text-blue-600 text-lg">{e.name}</p>
                <div className="w-full flex relative justify-end">
                  <div
                    onClick={() => {
                      console.log(e);
                      dispatch(
                        updatepanelActions.deleteComponents({
                          index: index,
                          component_index: i,
                        })
                      );
                    }}
                    className="absolute -top-[27px] cursor-pointer bg-red-600 w-fit p-2 rounded-full text-white flex gap-1 justify-center items-center hover:bg-blue-500"
                  >
                    <Trash2 className=" w-5 h-5 cursor-pointer" />
                  </div>
                </div>
                {e.name === "Add Consumables" ? (
                  <div key={i}>
                    <UpdateConsumables
                      panel_index={index}
                      index={i}
                      subcomponents={e.subcomponents}
                    />
                  </div>
                ) : (
                  <div key={i}>
                    <UpdateOfferSubComponent
                      panel_index={index}
                      index={i}
                      subcomponents={e.subcomponents}
                    />
                  </div>
                )}
              </div>
            }
          </>
        ),
      };
    });

    if (searchInput.length > 0) {
      filtered = filtered.filter((item) => {
        console.log(item.label);
        return item.label
          .replace(/\s/g, "")
          .toLowerCase()
          .includes(searchInput.replace(/\s/g, "").toLowerCase());
      });
    }

    setFilteredItems(filtered);
  }, [searchInput, components]);

  const getAllComponents = async () => {
    const response = await getComponents();
    if (response.type === "success") {
      setComponentOptions(
        response.data.data.map((e) => ({ label: e.name, value: e._id }))
      );
    } else if (response.type === "error") {
      console.log(response.message);
    }
  };

  useEffect(() => {
    getAllComponents();
  }, []);

  const addCompanies = async () => {
    if (componentName === "Select Component") {
      return;
    }

    const response = await getOneComponent(componentName);
    console.log(response.data);
    if (response.type === "success") {
      let Name = response.data.data.name;
      let newData = {
        component_id: Name,
        name: Name,
        sub_components: [],
        price: 0,
      };
      response.data.data.sub_components.map((e) => {
        console.log(e);
        e.subcomponent_id.quantity = e.quantity;
        e.subcomponent_id.status = "editing";
        newData.sub_components.push(e.subcomponent_id);
      });

      setComponentName("Select Component");
      dispatch(updatepanelActions.setComponents({ data: newData }));
    } else if (response.type === "error") {
      message.error("Check Internet Connection");
    }
  };

  const addCompaniesWithoutComponent = async () => {
    let newData = {
      status: "submitted",
      component_id: "Add Consumables",
      name: "Add Consumables",
      sub_components: [],
      price: 0,
      consumables: {},
    };
    const alreadyConsumables = panel.completed_components_data.find(
      (e) => e.component_id === "Add Consumables"
    );
    if (alreadyConsumables) {
      return;
    }
    setComponentName("Select Component");
    dispatch(updatepanelActions.setComponents({ index: 0, data: newData }));
  };

  return (
    <div className="w-full flex flex-col items-center">
      <h3 className="p-4 font-semibold text-2xl text-blue-600">
        Add Component
      </h3>
      <div className="w-11/12">
        <div className="w-full flex flex-row justify-center gap-2">
          <Select
            showSearch
            filterOption={(input, option) =>
              (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
            }
            className="w-full"
            placeholder="Component Name"
            options={componentOptions}
            value={componentName}
            onChange={(e) => {
              setComponentName(e);
            }}
          />
          <Button
            className="w-1/3 bg-blue-700 text-white"
            onClick={addCompanies}
            type="primary"
          >
            Add
          </Button>
          <Button
            className="w-1/3 bg-blue-700 text-white"
            onClick={addCompaniesWithoutComponent}
            type="primary"
          >
            Add Consumables
          </Button>
        </div>
        <div className="w-full my-4 flex flex-col justify-center gap-2">
          <p className="font-semibold text-xl text-blue-600">
            Search Components
          </p>
          <Input
            className="w-full"
            placeholder="Search Components"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
        </div>
        <div className={`w-full bg-white p-5`}>
          {filteredItems?.map((e, i) => {
            return <div key={i}>{e.children}</div>;
          })}
        </div>
      </div>
    </div>
  );
};
