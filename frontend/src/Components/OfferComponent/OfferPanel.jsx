import React, { useEffect, useState } from "react";
import { Input, Select, Button, Table, message, Collapse } from "antd";
import { getComponents } from "../../APIs/component";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { panelActions } from "../../store/panelslice";
import { offerActions } from "../../store/offerslice";
import { OfferComponent } from "./OfferComponent";
import { Trash2 } from "lucide-react";

export const OfferPanel = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const panelData = useSelector((state) => state.panel);
  const panel = useSelector((state) => state.panel.panel);
  const updatePanel = useSelector((state) => state.updatepanel);
  const offer = useSelector((state) => state.offer);
  const [validPanel, setValidPanel] = useState("");
  const [Name, setName] = useState("");
  const [PartName, setPartName] = useState("");
  const [price, setPrice] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [ConfirmPartName, setConfirmPartName] = useState(false);
  const [profitPercentage, setProfitPercentage] = useState(0);
  const [profit, setProfit] = useState(0);

  const items = panel.map((e, i) => {
    return {
      key: i,
      label: e.part_name,
      children: (
        <div className="w-full">
          <div className="w-full flex relative justify-end">
            <div
              onClick={() => {
                dispatch(panelActions.deletePanel(i));
              }}
              className="absolute -top-[60px] cursor-pointer bg-red-600 w-fit p-2 rounded-full text-white flex gap-1 justify-center items-center hover:bg-blue-500"
            >
              <Trash2 className="cursor-pointer" />
            </div>
          </div>
          <OfferComponent
            part_name={e.part_name}
            index={i}
            components={e.components}
          />
        </div>
      ),
    };
  });

  const addPanel = () => {
    setValidPanel(true);
    dispatch(
      panelActions.addPanel({
        part_name: PartName,
        price: price,
        components: [],
        completed_components_data: [],
        completed: 0,
        completed_components: [],
      })
    );
  };

  const ConfirmHandler = () => {
    if (Name === "") {
      message.error("Name is required");
      return;
    }
    dispatch(panelActions.setPanelsName(Name));
    setConfirmPartName(true);
  };

  const submitPanel = () => {
    // check for incomplete data
    let incomplete = false;
    panel.forEach((e) => {
      if (e.completed !== e.components.length) {
        incomplete = true;
      }
    });

    if (incomplete) {
      message.error("Complete all the components");
      return;
    }

    panel[0].components.forEach((e) => {
      console.log(e);
      if (e.completed !== e.subcomponents.length) {
        incomplete = true;
      }
    });
    if (incomplete) {
      message.error("Complete all the components");
      return;
    }

    // validations
    if (profitPercentage === 0 && profit === 0) {
      message.error("Profit or Profit Percentage is required");
      return;
    }
    if (panel.length === 0) {
      message.error("Add atleast one panel");
      return;
    }

    const sendData = {
      name: Name,
      part_name: PartName,
      panel: panel[0].completed_components,
      price: 0,
      profit_percentage: Number(profitPercentage),
      profit: Number(profit),
      total_price: Number(totalPrice),
    };

    panel.forEach((e) => {
      e.components.forEach((e) => {
        console.log(e.totalPrice);
        sendData.price += Number(e.totalPrice);
      });
    });

    console.log(sendData);

    dispatch(offerActions.setPanelsData(sendData));
    if (!offer.id) {
      navigate("/offer");
    } else {
      console.log("updatePanel ", updatePanel);
      if (updatePanel.type === "revision") {
        navigate("/offerlist");
      } else {
        navigate("/projectlist");
      }
    }
  };

  useEffect(() => {
    if (panelData.name) {
      setName(panelData.name);
      setConfirmPartName(true);
    }
    if (panel[0]?.part_name) {
      setPartName(panel[0].part_name);
    }
    // if(panel[0]?)
    if (panel.length === 0) {
      setValidPanel(false);
    }
    if (panel.length > 0) {
      let nowPrice = 0;
      setValidPanel(true);
      panel.forEach((e) => {
        e.components.forEach((e) => (nowPrice += e.totalPrice));
      });
      setPrice(nowPrice);
    }
  }, [panel]);

  useEffect(() => {
    if (Number(profitPercentage) === 0) {
      return;
    }
    setProfit((price * profitPercentage) / 100);
    setTotalPrice(Number(price) + Number((price * profitPercentage) / 100));
  });

  const resetNameValue = () => {
    setName("");
  };

  const EditNameHandler = () => {
    setConfirmPartName(false);
  };

  return (
    <div className="w-full  min-h-screen bg-[#f3f7ff]">
      {ConfirmPartName === false ? (
        <div className="rounded-md bg-white flex flex-col m-4">
          <p className="text-blue-800 font-semibold text-xl px-4 pt-4">
            Enter Panel's Details
          </p>
          <div className="w-full flex justify-evenly">
            <div className="w-1/2 p-4">
              <section>
                <div className="font-semibold p-2 text-gray-500 mt-2">Name</div>
                <Input
                  onChange={(e) => setName(e.target.value)}
                  value={Name}
                  className=""
                  placeholder="Enter Name"
                />
              </section>
            </div>
          </div>
          <section className="flex items-center justify-center gap-5 p-4">
            <Button onClick={ConfirmHandler} className="bg-blue-700 text-white">
              Confirm
            </Button>
            <Button onClick={resetNameValue} className="bg-gray-500 text-white">
              Reset
            </Button>
          </section>
        </div>
      ) : (
        <div className="w-full">
          <div className="m-3 p-3 bg-white">
            <p className="text-blue-800 font-semibold text-xl p-2">
              Panel's Name
            </p>

            <div className="flex flex-col justify-center gap-3 items-center">
              <div className="p-1">
                <div className="flex flex-row gap-3 p-1">
                  <p className="font-bold text-gray-500">Name:</p>
                  <div className="w-fit">{Name}</div>
                </div>
              </div>
              <Button
                onClick={EditNameHandler}
                className="bg-blue-700 text-white"
              >
                Edit
              </Button>
            </div>
          </div>

          <div className="w-full">
            <p className="text-3xl text-blue-800 font-semibold p-4">
              Panel's Details
            </p>

            <div className="w-full p-2">
              <div className="w-full bg-white p-4">
                <div className={`w-full flex items-center justify-center`}>
                  <div className="w-full flex items-center justify-center">
                    <div className="w-full p-4 flex flex-row gap-4">
                      <section
                        className={`${
                          validPanel ? "" : "flex flex-col "
                        } w-full gap-1`}
                      >
                        <div className="font-semibold text-gray-500">
                          Part Name
                        </div>
                        <Input
                          onChange={(e) => setPartName(e.target.value)}
                          value={PartName}
                          className={`w-full`}
                          placeholder="Enter Part Name"
                        />
                      </section>
                      {validPanel && (
                        <section className="w-full">
                          <div className="font-semibold text-gray-500">
                            Profit Percentage
                          </div>
                          <Input
                            type="number"
                            className="w-full"
                            placeholder="Profit Percentage"
                            value={profitPercentage}
                            onChange={(e) => {
                              const inputValue = e.target.value;
                              setProfitPercentage(inputValue);
                              setProfit((price * inputValue) / 100);
                            }}
                          />
                        </section>
                      )}
                    </div>
                  </div>
                </div>
                {validPanel && (
                  <div className="w-full flex items-center justify-center">
                    <div className="flex items-center justify-between gap-4">
                      <div className="text-green-500 font-semibold">
                        Profit: {profit?.toFixed(2)}
                      </div>
                      <div className="text-red-500 font-semibold">
                        Price: {price?.toFixed(2)}
                      </div>
                      <div className="text-purple-700 font-semibold">
                        Total Price: {totalPrice?.toFixed(2)}
                      </div>
                    </div>
                  </div>
                )}
                <div className="flex items-center justify-center p-4 gap-4">
                  {validPanel === false && (
                    <Button
                      onClick={addPanel}
                      className="bg-blue-700 text-white"
                    >
                      Add Panel
                    </Button>
                  )}
                  {validPanel && (
                    <>
                      <Button
                        onClick={submitPanel}
                        className="bg-blue-700 text-white"
                      >
                        Submit Panel
                      </Button>
                    </>
                  )}
                </div>
              </div>
              <div className="my-2">
                <Collapse
                  items={items}
                  bordered={panel.length === 0 ? false : true}
                  defaultActiveKey={[0]}
                  className="w-full bg-blue-300 text-white"
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
