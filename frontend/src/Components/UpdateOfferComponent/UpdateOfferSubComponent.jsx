import React, { useState, useEffect } from "react";
import { Input, Button, Table, Select, message } from "antd";
import lo, { set } from "lodash";
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

  console.log(subcomponent);

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
                  console.log(i.key, i, index, panel_index);
                  dispatch(
                    updatepanelActions.editSubComponent({
                      status: "editing",
                      index: index,
                      id: i.key,
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
    const completed_show_data = [];
    subcomponent?.sub_components.map((e) => {
      if (e?._id && e?.status === "submitted") {
        const newData = {
          key: e._id,
          desc: e.desc,
          catalog_number: e.catalog_number,
          rating_value: e.rating_value,
          company_name: e.company.company_name.name,
          price: e.company.price,
          discount: e.company.discount,
          quantity: e.quantity,
        };
        completed_show_data.push(newData);
      }
    });
    setSubComponent(completed_show_data);
  }, [subcomponent]);

  const SubmitComponent = async () => {
    console.log(subcomponent);

    const sendData = {
      name: subcomponent.name,
      sub_components: subcomponent.completed_subcomponents,
    };

    if (
      subcomponent.completed_subcomponents.length !==
      subcomponent.sub_components.length
    ) {
      message.error("Please Create all subcomponents");
      return;
    }

    const response = await offerComponent(sendData);

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

  console.log(subComponent);

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
              Submit Component {subcomponent?.name ?? ""}
            </Button>
          </div>
        </div>
      )}
      {completed === false ? (
        <>
          <div className="flex flex-col mt-2">
            {subComponent.length !== 0 && (
              <div className="m-1">
                <Table columns={column} dataSource={subComponent} />
              </div>
            )}
            {subcomponent?.sub_components?.map((e, i) => {
              return (
                <>
                  {e.status !== "submitted" && (
                    <div key={i}>
                      <UpdateOfferCompanies
                        data={e}
                        panel_index={panel_index}
                        sub_index={index}
                        index={i}
                        completed={completed}
                      />
                    </div>
                  )}
                </>
              );
            })}
          </div>
        </>
      ) : (
        <h3 className="w-full text-center p-1 font-semibold text-2xl">
          {subComponent.length !== 0 && (
            <div className="m-1">
              <Table columns={column} dataSource={subComponent} />
            </div>
          )}
        </h3>
      )}
    </div>
  );
};
