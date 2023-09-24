import React, { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOneOffer } from "../../APIs/offer";
import { Table, Tooltip } from "antd";
import { MoreHorizontal } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { offerActions } from "../../store/offerslice";

export const OfferList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [offerData, setOfferData] = useState([]);
  const [isOffer, setIsOffer] = useState(false);
  const [arrow, setArrow] = useState("Show");
  const mergedArrow = useMemo(() => {
    if (arrow === "Hide") {
      return false;
    }
    if (arrow === "Show") {
      return true;
    }
    return {
      pointAtCenter: true,
    };
  }, [arrow]);

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Part Name",
      dataIndex: "part_name",
      key: "part_name",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Profit Percentage",
      dataIndex: "profit_percentage",
      key: "profit_percentage",
    },
    {
      title: "Profit",
      dataIndex: "profit",
      key: "profit",
    },
    {
      title: "Total Price",
      dataIndex: "total_price",
      key: "total_price",
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      render: (text, record) => (
        <div className="flex flex-row gap-2">
          <Tooltip
            placement="top"
            title={"See More Details"}
            arrow={mergedArrow}
          >
            <button
              className="text-blue-600 hover:text-blue-300"
              onClick={() => {
                if (isOffer) {
                  localStorage.setItem(
                    "components",
                    JSON.stringify(record.components)
                  );
                } else {
                  localStorage.removeItem("components");
                  localStorage.setItem(
                    "offercomponents",
                    JSON.stringify(record.components)
                  );
                }
                navigate("/offercomponents");
              }}
            >
              <MoreHorizontal />
            </button>
          </Tooltip>
        </div>
      ),
    },
  ];

  const OfferData = async () => {
    const offer = JSON.parse(localStorage.getItem("offerId"));
    if (offer) {
      const response = await getOneOffer(offer);

      const data = [];
      response.data?.data.panels_to_be_created.map((e) => {
        e.parts.map((part) => {
          console.log(part);
          data.push({
            key: part._id,
            name: e.name,
            part_name: part.part_name,
            price: Number(part.price).toFixed(2),
            profit_percentage: part.profit_percentage.toFixed(2),
            profit: part.profit.toFixed(2),
            total_price: part.total_price.toFixed(2),
            components: part.components,
          });
        });
      });

      console.log(data);
      setOfferData(data);
      setIsOffer(true);
    } else {
      const panels = JSON.parse(localStorage.getItem("offerRevision"));
      const data = [];
      panels.map((e) => {
        e.parts.map((part) => {
          console.log(part);
          data.push({
            key: part._id,
            name: e.name,
            part_name: part.part_name,
            price: Number(part.price).toFixed(2),
            profit_percentage: part.profit_percentage.toFixed(2),
            profit: part.profit.toFixed(2),
            total_price: part.total_price.toFixed(2),
            components: part.components,
          });
        });
      });

      console.log(data);
      setOfferData(data);
      setIsOffer(false);
    }
  };

  useEffect(() => {
    OfferData();
  }, []);

  return (
    <div className="w-full min-h-screen bg-[#f3f7ff]">
      <p className="text-3xl text-blue-800 font-semibold p-4">
        Offer Panel List
      </p>
      <div className="rounded-md bg-white flex flex-col m-4">
        <>
          <p className="text-blue-800 font-semibold text-xl p-5">
            Offer Panel List
          </p>
          <div className="w-full">
            <Table columns={columns} dataSource={offerData} />
          </div>
        </>
      </div>
    </div>
  );
};
