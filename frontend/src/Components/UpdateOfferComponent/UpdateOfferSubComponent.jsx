import React, { useState, useEffect } from "react";
import { Input, Button, Table, Select, message } from "antd";
import lo from "lodash";
import { useSelector, useDispatch } from "react-redux";
import { getOneComponent } from "../../APIs/component";
import { offerComponent } from "../../APIs/offer";
import { updatepanelActions } from "../../store/updateslice";
import { UpdateOfferCompanies } from "./UpdateOfferCompanies";
export const UpdateOfferSubComponent = ({
  subcomponents,
  index,
  panel_index,
}) => {
  const dispatch = useDispatch();
  const subcomponent = useSelector(
    (state) => state.updatepanel.components[index]
  );
  const [subComponent, setSubComponent] = useState([]);
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    setSubComponent(subcomponent.sub_components);
  }, [subcomponent]);

  const SubmitComponent = async () => {
    console.log(subcomponent);

    const sendData = {
      name: subcomponent.name,
      sub_components: subcomponent.completed_subcomponents,
    };

    console.log("EXECUTED");

    console.log(sendData);

    const response = await offerComponent(sendData);

    console.log(response);

    if (response.type === "success") {
      message.success("Component Created Successfully");
      setCompleted(true);

      if (subcomponent._id) {
        dispatch(
          updatepanelActions.addCompletedComponentOld({
            data: response.data.data._id,
            component_index: index,
          })
        );
      } else {
        dispatch(
          updatepanelActions.addCompletedComponentNew({
            data: response.data.data._id,
          })
        );
      }
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
              console.log(e);
              return (
                <div key={i}>
                  <UpdateOfferCompanies
                    data={e}
                    panel_index={panel_index}
                    component_index={index}
                    sub_index={i}
                  />
                </div>
              );
            })}
            <Button
              className="bg-blue-700 text-white"
              onClick={SubmitComponent}
              type="primary"
            >
              Submit Component {subcomponent.name}
            </Button>
          </div>
        </>
      ) : (
        <h3 className="w-full text-center p-2 m-2 font-semibold text-2xl">
          Component {subcomponent.name} Created Successfully
        </h3>
      )}
    </div>
  );
};
