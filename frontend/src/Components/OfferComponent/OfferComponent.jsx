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
  let components = useSelector((state) => state.panel.panel[index].components);
  const [componentName, setComponentName] = useState("Select Component");
  const [componentOptions, setComponentOptions] = useState([]);

  const items = components.map((e, i) => {
    console.log(e)
    return {
      key: i,
      label: e.component_id,
      children: (
        <>
          {(
            <div className="w-full">
              <div
                onClick={() => {
                  dispatch(
                    panelActions.deleteComponents({
                      index: index,
                      component_index: i,
                    })
                  );
                }}
                className="cursor-pointer bg-blue-700 w-fit px-2 m-2 rounded-xl text-white flex gap-1 justify-center items-center hover:bg-blue-500"
              >
                <Trash2 className="cursor-pointer" />
                <p className="p-2 font-semibold">Delete this Component</p>
              </div>
              {
                e.component_id === "Add Consumables" ? <Consumables
                  panel_index={index}
                  index={i}
                  subcomponents={e.subcomponents}
                /> : <OfferSubComponent
                  panel_index={index}
                  index={i}
                  subcomponents={e.subcomponents}
                />
              }

            </div>
          )}
        </>
      ),
    };
  });

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
        subcomponents: [],
        completed: 0,
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

  const addCompaniesWithoutComponent = async () => {
    // const response = await getOneComponent("64fd16d303706b48aba9514a");

    // if (response.type === "success") {
    //   let Name = response.data.data.name;
    //   let newData = {
    //     component_id: Name,
    //     subcomponents: [],
    //     completed: 0,
    //     completed_subcomponents: [],
    //     totalPrice: 0,
    //   };
    //   response.data.data.sub_components.map((e) => {
    //     newData.subcomponents.push(e.subcomponent_id);
    //   });

    //   setComponentName("Select Component");
    //   dispatch(panelActions.setComponents({ index: index, data: newData }));
    // } else if (response.type === "error") {
    //   console.log(response.message);
    // }

    let newData = {
      component_id: "Add Consumables",
      subcomponents: [],
      completed: 0,
      completed_subcomponents: [],
      totalPrice: 0,
      consumables: {},
    };
    setComponentName("Select Component");
    dispatch(panelActions.setComponents({ index: 0, data: newData }));

  };

  return (
    <div className="w-full flex flex-col items-center">
      <h3 className="p-4 font-semibold text-2xl">Add Component</h3>
      <div className="w-3/6 ">
        <div className="w-full flex flex-col justify-center gap-2">
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
            className="w-full bg-blue-700 text-white"
            onClick={addCompanies}
            type="primary"
          >
            Add
          </Button>
          <Button
            className="w-full bg-blue-700 text-white"
            onClick={addCompaniesWithoutComponent}
            type="primary"
          >
            Add Consumables
          </Button>
        </div>
        <div className={`w-full bg-white p-5`}>
          <Collapse
            items={items}
            bordered={components.length === 0 ? false : true}
            defaultActiveKey={[0]}
            className="w-full bg-gray-300 text-white"
          />
        </div>
      </div>
    </div>
  );
};
