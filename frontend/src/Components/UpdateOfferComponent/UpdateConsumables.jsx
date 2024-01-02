import React, { useState, useEffect, useRef } from "react";
import { Input, Button, Table, Select, message, Collapse } from "antd";
import lo from "lodash";
import { useSelector, useDispatch } from "react-redux";
import { offerComponent } from "../../APIs/offer";
import { offerSubComponent } from "../../APIs/offer";
import { updatepanelActions } from "../../store/updateslice";
export const UpdateConsumables = ({ subcomponents, index, panel_index }) => {
  const TitleRef = useRef(null);
  const QtyRef = useRef(null);
  const RateRef = useRef(null);
  const DisRef = useRef(null);

  const dispatch = useDispatch();
  const component = useSelector(
    (state) => state.updatepanel.components[index]?.sub_components
  );

  const completed_subcomponents = useSelector(
    (state) => state.updatepanel.components[index]?.completed_subcomponents
  );

  const [data, setData] = useState(component?.map((e) => e.desc) || []);

  const [subComponentIDS, setSubComponentIDS] = useState(
    component?.map((e) => e._id) || []
  );
  const [completed, setCompleted] = useState(false);

  const Details = [
    "Dimensions",
    "Base Frame",
    "Structure, Gland Plate",
    "Doors, Partition",
    "Busbar",
    "Cable Entry",
    "Paint",
  ];

  const [Consumable, setConsumables] = useState(
    component?.map((e, i) => {
      return {
        _id: e._id,
        key: i,
        design: e.desc,
        title: e.title,
        qty: e.quantity,
        rate: e.company.price,
        discount: e.company.discount,
      };
    }) || []
  );

  const addConsu = async (design) => {
    try {
      const title = TitleRef?.current?.input?.value;
      const qty = QtyRef?.current?.input?.value;
      const rate = RateRef?.current?.input?.value;
      const dis = DisRef?.current?.input?.value;
      const obj = {
        key: Math.floor(Math.random() * (999999 - 100000 + 1)) + 100000,
        design: design,
        title: title,
        qty: qty,
        rate: rate,
        discount: dis,
      };

      const array = Consumable?.filter((e) => {
        return e.design === design;
      });

      if (array?.length !== 0 && Consumable?.length !== 0) {
        message.error("Already Added, Delete First");
        return;
      }

      setConsumables([...Consumable, obj]);

      const sendData = {
        desc: design,
        title: title,
        quantity: qty,
        company: {
          price: rate,
          discount: dis,
        },
      };

      const response = await offerSubComponent(sendData);

      if (response.type === "error") {
        message.error(response.message);
      }

      if (response.type === "success") {
        message.success("subcomponent created successfully");
        setData([...data, obj.design]);
        if (!response?.data?.data?._id) {
          message.success("cannot add consumables");
          return;
        }
        setSubComponentIDS([...subComponentIDS, response?.data?.data?._id]);

        dispatch(
          updatepanelActions.addCompletedConsumables({
            data: response?.data?.data,
            _id: response?.data?.data?._id,
            component_index: index,
            price:
              (Number(rate) - (Number(rate) * Number(dis)) / 100) * Number(qty),
          })
        );
      }
    } catch (err) {
      message.error(err);
    }
  };

  const columns = [
    {
      title: "Design",
      dataIndex: "design",
      key: "design",
    },
    {
      title: "Qty",
      dataIndex: "qty",
      key: "qty",
    },
    {
      title: "Rate",
      dataIndex: "rate",
      key: "rate",
    },
    {
      title: "Discount",
      dataIndex: "discount",
      key: "discount",
    },
    {
      title: "Action",
      key: "action",
      render: (text, record, index1) => (
        <>
          {!completed ? (
            <Button
              onClick={() => {
                console.log(record, {
                  index: panel_index,
                  component_index: index,
                  sub_index: index1,
                  totalPrice:
                    (Number(record?.rate) -
                      (Number(record?.rate) * Number(record?.discount)) / 100) *
                    Number(record?.qty),
                });
                setConsumables(
                  Consumable.filter((e) => e?.key !== record?.key)
                );
                setSubComponentIDS(
                  subComponentIDS.filter((e) => e !== record?._id)
                );
                dispatch(
                  updatepanelActions.deleteCompletedSubComponent({
                    index: panel_index,
                    component_index: index,
                    sub_index: index1,
                    totalPrice:
                      (Number(record?.rate) -
                        (Number(record?.rate) * Number(record?.discount)) /
                          100) *
                      Number(record?.qty),
                  })
                );
              }}
              className="bg-red-700 text-white"
              type="primary"
            >
              Delete
            </Button>
          ) : (
            <>Submitted</>
          )}
        </>
      ),
    },
  ];

  const SubmitComponent = async () => {
    try {
      const sendData = {
        name: "Add Consumables",
        sub_components: completed_subcomponents,
      };

      const response = await offerComponent(sendData);

      if (response.type === "success") {
        message.success("Component Created Successfully");
        setCompleted(true);
        dispatch(
          updatepanelActions.addConsumable({
            index: panel_index,
            index2: index,
            subComponentIDS: subComponentIDS,
            data: Consumable.map((e) => ({
              design: e.design,
              title: e.title,
              quantity: e.qty,
              company: {
                price: e.rate,
                discount: e.discount,
              },
            })),
          })
        );
        dispatch(
          updatepanelActions.addCompletedComponentOld({
            data: response.data.data._id,
            component_index: index,
          })
        );
      } else if (response.type === "error") {
        message.error("Error Occured");
      }
    } catch (err) {
      message.error(err.message);
    }
  };
  return (
    <div>
      {completed === false ? (
        <>
          <Button
            className="relative left-[83%] bottom-[25px] bg-blue-700 text-white"
            onClick={SubmitComponent}
            type="primary"
          >
            Update Consumables
          </Button>
          <h3 className="w-full text-center p-2 m-2 font-semibold text-2xl">
            Update the Following Details
          </h3>
          <Table dataSource={Consumable} columns={columns} />
          <div className="flex flex-col gap-4">
            {Details?.map((e, i) => {
              if (!data.includes(e)) {
                return (
                  <div key={i}>
                    <Collapse
                      items={[
                        {
                          key: i,
                          label: e,
                          children: (
                            <div className="flex flex-row gap-2" key={i}>
                              <Input ref={TitleRef} placeholder="Enter Title" />
                              <Input
                                ref={QtyRef}
                                placeholder="Enter Quantity"
                                type="number"
                              />
                              <Input
                                ref={RateRef}
                                placeholder="Enter Rate"
                                type="number"
                              />
                              <Input
                                ref={DisRef}
                                placeholder="Enter Discount"
                                type="number"
                              />
                              <Button
                                onClick={() => addConsu(e)}
                                className="bg-blue-700 text-white"
                                type="primary"
                              >
                                Add
                              </Button>
                            </div>
                          ),
                        },
                      ]}
                      defaultActiveKey={[]}
                    />
                  </div>
                );
              }
            })}
          </div>
        </>
      ) : (
        <div className="m-4">
          <Table dataSource={Consumable} columns={columns} pagination={false} />
        </div>
      )}
    </div>
  );
};
