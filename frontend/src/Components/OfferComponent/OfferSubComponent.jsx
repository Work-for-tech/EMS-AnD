import React, { useState, useEffect } from "react";
import { Input, Button, Table, Select, message } from "antd";
import lo from "lodash";
import { useSelector, useDispatch } from "react-redux";
import { getOneComponent } from "../../APIs/component";
import { panelActions } from "../../store/panelslice";
import OfferCompanies from "./OfferCompanies";
import { offerComponent } from "../../APIs/offer";
export const OfferSubComponent = ({ subcomponents, index, panel_index }) => {
  const dispatch = useDispatch();
  const component = useSelector(
    (state) => state.panel.panel[panel_index].components[index]
  );
  const [subComponent, setSubComponent] = useState([]);
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    setSubComponent(component.subcomponents);
  }, []);

  const SubmitComponent = async () => {
    console.log(component);
    if (
      component.completed_subcomponents.length !==
      component.subcomponents.length
    ) {
      message.error("Please Create all subcomponents");
      return;
    }

    const sendData = {
      name: component.component_id,
      sub_components: component.completed_subcomponents,
    };

    console.log("component", sendData);
    console.log(component);
    const response = await offerComponent(sendData);

    if (response.type === "success") {
      message.success("Component Created Successfully");
      setCompleted(true);
      dispatch(
        panelActions.addCompletedComponent({
          index: panel_index,
          totalPrice: component.totalPrice,
        })
      );
      dispatch(
        panelActions.addCompletedComponentComponent({
          index: panel_index,
          data: response.data.data._id,
        })
      );
    } else if (response.type === "error") {
      message.error("Error Occured");
    }
  };

  return (
    <div>
      {completed === false ? (
        <>
          <h3 className="w-full text-center p-2 m-2 font-semibold text-2xl">
            Select Sub-Components
          </h3>
          <div className="flex flex-col gap-4">
            {subComponent.map((e, i) => {
              return (
                <div key={i}>
                  <OfferCompanies
                    data={e}
                    panel_index={panel_index}
                    index={index}
                  />
                </div>
              );
            })}
            <Button
              className="bg-blue-700 text-white"
              onClick={SubmitComponent}
              type="primary"
            >
              Submit Component {component.component_id}
            </Button>
          </div>
        </>
      ) : (
        <h3 className="w-full text-center p-2 m-2 font-semibold text-2xl">
          Component {component.component_id} Created Successfully
        </h3>
      )}
    </div>
  );
};
