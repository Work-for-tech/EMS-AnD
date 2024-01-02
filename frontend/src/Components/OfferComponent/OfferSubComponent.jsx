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
  const panel = useSelector((state) => state.panel.panel[panel_index]);
  const component = useSelector(
    (state) => state.panel.panel[panel_index].components[index]
  );
  const [subComponent, setSubComponent] = useState([]);
  const [completed, setCompleted] = useState(false);

  const column = [
    {
      title: "Description",
      dataIndex: "desc",
      key: "desc",
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
      title: "Company",
      dataIndex: "company_name",
      key: "company_name",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Discount",
      dataIndex: "discount",
      key: "discount",
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
    },
    {
      title: "Edit",
      dataIndex: "edit",
      key: "edit",
      render: (r, i) => {
        return (
          <div>
            {!completed ? (
              <Button
                className="w-fit bg-blue-700 text-white"
                onClick={() => {
                  console.log(i, index, panel_index);
                  dispatch(
                    panelActions.removeCompletedSubComponent({
                      data: i._id,
                      index: panel_index,
                      component_index: index,
                      totalPrice: Number(
                        (i.price - (i.discount * i.price) / 100) * i.quantity
                      ),
                    })
                  );

                  dispatch(
                    panelActions.removeCompletedComponentSubComponent({
                      data: i._id,
                      index: panel_index,
                      component_index: index,
                    })
                  );
                }}
              >
                Edit
              </Button>
            ) : (
              <>Submitted</>
            )}
          </div>
        );
      },
    },
  ];

  useEffect(() => {
    const foundSubmitted = panel.completed_components_data.find(
      (e) => e?.name === component?.component_id
    );
    if (foundSubmitted) {
      setCompleted(true);
      return;
    }
    setCompleted(false);
  });

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
          completed_data: response.data.data,
        })
      );
    } else if (response.type === "error") {
      message.error("Error Occured");
    }
  };

  return (
    <div>
      {!completed && (
        <div className="w-full flex relative justify-end">
          <div className="absolute -right-[-40px] -top-[34px] cursor-pointer w-fit p-2 rounded-full text-white flex gap-1 justify-center items-center ">
            <Button
              className="bg-blue-700 text-white rounded-md"
              onClick={SubmitComponent}
              type="primary"
            >
              Submit Component {component?.component_id ?? ""}
            </Button>
          </div>
        </div>
      )}
      {completed === false ? (
        <>
          <div className="flex flex-col mt-2">
            {component?.completed_subcomponents_data?.length !== 0 && (
              <div className="m-1">
                <Table
                  columns={column}
                  dataSource={component?.completed_subcomponents_data}
                />
              </div>
            )}
            {subComponent.map((e, i) => {
              return (
                <div key={i}>
                  <OfferCompanies
                    data={e}
                    panel_index={panel_index}
                    index={index}
                    completed={completed}
                  />
                </div>
              );
            })}
          </div>
        </>
      ) : (
        <h3 className="w-full text-center p-1 font-semibold text-2xl">
          {component?.completed_subcomponents_data?.length !== 0 && (
            <div className="m-1">
              <Table
                columns={column}
                dataSource={component?.completed_subcomponents_data}
              />
            </div>
          )}
        </h3>
      )}
    </div>
  );
};
