import React, { useState, useEffect, useRef } from "react";
import { Input, Button, Table, Select, message, Collapse } from "antd";
import lo from "lodash";
import { useSelector, useDispatch } from "react-redux";
import { getOneComponent } from "../../APIs/component";
import { panelActions } from "../../store/panelslice";
import OfferCompanies from "./OfferCompanies";
import { offerComponent } from "../../APIs/offer";
import { offerSubComponent } from "../../APIs/offer";
export const Consumables = ({ subcomponents, index, panel_index }) => {
  const TitleRef = useRef(null);
  const QtyRef = useRef(null);
  const RateRef = useRef(null);
  const DisRef = useRef(null);

  const dispatch = useDispatch();
  const component = useSelector(
    (state) => state.panel.panel[panel_index].components[index]
  );
  const consumables = useSelector((state) => state.panel.consumables);

  const [subComponent, setSubComponent] = useState([]);
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    setSubComponent(component.subcomponents);
  }, []);

  const Details = [
    "Dimensions",
    "Base Frame",
    "Structure, Gland Plate",
    "Doors, Partition",
    "Busbar",
    "Cable Entry",
    "Paint",
  ];

  const [Consumable, setConsumables] = useState([]);

  const addConsu = async (design) => {
    const title = TitleRef.current.input.value;
    const qty = QtyRef.current.input.value;
    const rate = RateRef.current.input.value;
    const dis = DisRef.current.input.value;
    const obj = {
      key: lo.uniqueId(),
      design: design,
      title: title,
      qty: qty,
      rate: rate,
      discount: dis,
    };

    const array = Consumable.filter((e) => {
      return e.design === design;
    });

    if (array.length !== 0) {
      message.error("Already Added");
      return;
    }

    setConsumables([...Consumable, obj]);

    const sendData = {
      desc: design,
      title: title,
      quantity: Number(qty),
      company: {
        price: Number(rate),
        discount: Number(dis),
      },
    };

    console.log(sendData);

    const response = await offerSubComponent(sendData);

    if (response.type === "error") {
      message.error(response.message);
    }
    if (response.type === "success") {
      message.success("subcomponent created successfully");
      dispatch(
        panelActions.addCompletedSubComponent({
          index: panel_index,
          component_index: index,
          totalPrice:
            (Number(obj.rate) -
              (Number(obj.rate) * Number(obj.discount)) / 100) *
            Number(obj.qty),
        })
      );

      dispatch(
        panelActions.addCompletedComponentSubComponent({
          data: response.data.data._id,
          index: panel_index,
          component_index: index,
        })
      );
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
        <Button
          onClick={() => {
            console.log(record);
            dispatch(
              panelActions.deleteCompletedSubComponent({
                index: panel_index,
                component_index: index,
                totalPrice:
                  (Number(record.rate) -
                    (Number(record.rate) * Number(record.discount)) / 100) *
                  Number(record.qty),
              })
            );
            dispatch(
              panelActions.deleteCompletedComponentSubComponent({
                index: panel_index,
                component_index: index,
                subcomponent_index: Number(index1),
              })
            );
            const array = Consumable.filter((e) => {
              return e.design !== record.design;
            });
            setConsumables(array);
          }}
          className="bg-red-700 text-white"
          type="primary"
        >
          Delete
        </Button>
      ),
    },
  ];

  const SubmitComponent = async () => {
    console.log(component);
    console.log(Consumable);

    dispatch(
      panelActions.addConsumable({
        index: panel_index,
        index2: index,
        data: Consumable,
      })
    );

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
            Fill The Following Details
          </h3>
          <div className="flex flex-col gap-4">
            {Details.map((e, i) => {
              return (
                <Collapse
                  items={[
                    {
                      key: i.toString(),
                      label: e,
                      children: (
                        <div className="flex flex-col gap-2" key={i}>
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
                  defaultActiveKey={["0"]}
                />
              );
            })}
            <Table dataSource={Consumable} columns={columns} />
            <Button
              className="bg-blue-700 text-white"
              onClick={SubmitComponent}
              type="primary"
            >
              {component.component_id}
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
