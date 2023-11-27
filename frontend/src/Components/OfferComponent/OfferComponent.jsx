import React, { useEffect, useState } from "react";
import { Input, Button, Collapse, Select } from "antd";
import { Trash2 } from "lucide-react";
import _ from "lodash";
import { useDispatch, useSelector } from "react-redux";
import { getComponents, getOneComponent } from "../../APIs/component";
import { panelActions } from "../../store/panelslice";
import { OfferSubComponent } from "./OfferSubComponent";
import { Consumables } from "./Consumable";

export const OfferComponent = ({ part_name, index }) => {
  const dispatch = useDispatch();
  let panel = useSelector((state) => state.panel.panel[index]);
  let components = useSelector((state) => state.panel.panel[index].components);
  const [componentName, setComponentName] = useState("Select Component");
  const [componentOptions, setComponentOptions] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [filteredItems, setFilteredItems] = useState([]);

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
    // Update filtered items whenever the search input changes

    let filtered = components.map((e, i) => {
      return {
        key: i,
        label: e.component_id ?? "",
        children: (
          <>
            {
              <div className="w-full border-2 border-blue-400 my-2   p-2">
                <p className="font-semibold text-blue-600 text-lg">
                  {e.component_id}
                </p>
                <div className="w-full flex relative justify-end">
                  <div
                    onClick={() => {
                      dispatch(
                        panelActions.deleteComponents({
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
                {e.component_id === "Add Consumables" ? (
                  <Consumables
                    panel_index={index}
                    index={i}
                    subcomponents={e.subcomponents}
                  />
                ) : (
                  <OfferSubComponent
                    panel_index={index}
                    index={i}
                    subcomponents={e.subcomponents}
                  />
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
        subcomponents: [],
        completed: 0,
        completed_subcomponents_data: [],
        completed_subcomponents: [],
        totalPrice: 0,
      };
      response.data.data.sub_components.map((e) => {
        e.subcomponent_id.quantity = e.quantity;
        newData.subcomponents.push(e.subcomponent_id);
      });

      setComponentName("Select Component");
      dispatch(panelActions.setComponents({ index: index, data: newData }));
    } else if (response.type === "error") {
      console.log(response.message);
    }
  };

  const addComsumables = async () => {
    let newData = {
      component_id: "Add Consumables",
      subcomponents: [],
      completed: 0,
      completed_subcomponents_data: [],
      completed_subcomponents: [],
      totalPrice: 0,
      consumables: {},
    };
    const alreadyConsumables = panel.completed_components_data.find(
      (e) => e.component_id === "Add Consumables"
    );
    if (alreadyConsumables) {
      return;
    }
    setComponentName("Select Component");
    dispatch(panelActions.setComponents({ index: 0, data: newData }));
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
            onClick={addComsumables}
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
          {/* <Collapse
            items={filteredItems}
            bordered={components.length === 0 ? false : true}
            defaultActiveKey={[0]}
            className="w-full bg-gray-300 text-white"
          /> */}
        </div>
      </div>
    </div>
  );
};
