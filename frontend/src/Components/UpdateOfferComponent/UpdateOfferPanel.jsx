import React, { useEffect, useState } from "react";
import { Input, Select, Button, Table, message, Collapse } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { offerActions } from "../../store/offerslice";
import { UpdateOfferComponent } from "./UpdateOfferComponent";
import { updatepanelActions } from "../../store/updateslice";

export const UpdateOfferPanel = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const panel = useSelector((state) => state.updatepanel);
  const offer = useSelector((state) => state.offer);
  const [Name, setName] = useState(panel.name);
  const [PartName, setPartName] = useState(panel.part_name);
  const [price, setPrice] = useState(panel.price);
  const [totalPrice, setTotalPrice] = useState(
    (panel.price * panel.profit_percentage) / 100 + panel.price
  );
  const [profitPercentage, setProfitPercentage] = useState(
    panel.profit_percentage
  );
  const [profit, setProfit] = useState(
    (panel.price * panel.profit_percentage) / 100
  );

  const items = [
    {
      key: 0,
      label: panel.part_name,
      children: (
        <div key={0} className="w-full">
          <UpdateOfferComponent
            part_name={panel.part_name}
            index={0}
            components={panel.components}
          />
        </div>
      ),
    },
  ];

  const submitPanel = () => {
    // check for incomplete data
    let incomplete = false;

    panel.components.forEach((e) => {
      console.log(e);
      if (e.completed_subcomponents.length !== e.sub_components.length) {
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

    const sendData = {
      name: Name,
      part_name: PartName,
      components: panel.completed_components,
      price: 0,
      profit_percentage: Number(profitPercentage),
      profit: Number(profit),
      total_price: Number(totalPrice),
    };

    panel.components.forEach((e) => (sendData.price += e.price));

    dispatch(offerActions.setReplacePanel(sendData));
    if (!offer.id) {
      navigate("/offer");
    } else {
      console.log("Panel ", panel.type);
      if (panel.type === "revision") {
        navigate("/offerlist");
      } else {
        navigate("/projectlist");
      }
    }
  };

  useEffect(() => {
    if (!panel.name) {
      navigate("/offerlist");
    }

    let nowPrice = 0;
    panel.components.forEach((e) => (nowPrice += e.price));

    console.log("Price ", nowPrice);
    setPrice(nowPrice);
  }, [panel.components]);

  useEffect(() => {
    if (Number(profitPercentage) === 0) {
      return;
    }
    setProfit((price * profitPercentage) / 100);
    setTotalPrice(Number(price) + Number((price * profitPercentage) / 100));
  });

  return (
    <div className="w-full min-h-screen bg-[#f3f7ff]">
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
          </div>
        </div>

        <div className="w-full">
          <p className="text-3xl text-blue-800 font-semibold p-4">
            Panel's Details
          </p>

          <div className="w-full p-2">
            <div className="w-full bg-white p-4">
              <div className="w-full flex items-center justify-center">
                <div className="w-full flex items-center justify-center">
                  <div className="w-full p-4 flex flex-row gap-4">
                    <section className={`flex flex-col w-full gap-1`}>
                      <div className="font-semibold text-gray-500">
                        Part Name
                      </div>
                      <Input
                        onChange={(e) => setPartName(e.target.value)}
                        value={PartName}
                        className="w-full"
                        placeholder="Enter Part Name"
                      />
                    </section>
                    <section className="flex flex-col w-full gap-1">
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
                          if (inputValue >= 0 && inputValue <= 100) {
                            setProfitPercentage(inputValue);
                            setProfit((price * inputValue) / 100);
                          }
                        }}
                      />
                    </section>
                  </div>
                </div>
              </div>
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
              <div className="flex items-center justify-center p-4 gap-4">
                <>
                  <Button
                    onClick={submitPanel}
                    className="bg-blue-700 text-white"
                  >
                    Submit Panel
                  </Button>
                </>
              </div>
            </div>
            <div className="p-5">
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
    </div>
  );
};
