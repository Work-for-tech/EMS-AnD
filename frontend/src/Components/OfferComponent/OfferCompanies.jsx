import React, { useState, useEffect } from "react";
import { Input, Button, Table, Select, message } from "antd";
import lo from "lodash";
import { useSelector, useDispatch } from "react-redux";
import { getOneSubComponent } from "../../APIs/subComponent";
import { offerSubComponent } from "../../APIs/offer";
import { panelActions } from "../../store/panelslice";

const OfferCompanies = ({ data, panel_index, index }) => {
  const dispatch = useDispatch();
  const [catalogNo, setCatalogNo] = useState("Select catalog No");
  const [catalogNoOptions, setCatalogNoOptions] = useState([]);

  const [rating, setRating] = useState("Select Rating");
  const [ratingOptions, setRatingOptions] = useState([]);

  const [company, setCompany] = useState("Select Company");
  const [companyOptions, setCompanyOptions] = useState([]);
  const [companyData, setCompanyData] = useState([]);

  const [quantity, setQuantity] = useState(0);
  const [nowData, setNowData] = useState([]);

  const [price, setPrice] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (catalogNo === "Select catalog No") {
      const catalogData = data.catalog.map((e) => ({
        label: e.catalog_number,
        value: e.catalog_number,
      }));
      setCatalogNoOptions(catalogData);
      setQuantity(data.quantity || 1);
    }
  }, []);

  useEffect(() => {
    if (catalogNo === "Select catalog No") {
      return;
    }
    const FilteredData = data.catalog.filter((e) => {
      if (catalogNo === e.catalog_number) {
        return e.catalog_number;
      }
    });

    const ratingData = FilteredData[0].rating.map((e) => ({
      label: e.rating_value,
      value: e.rating_value,
    }));

    setNowData(FilteredData[0].rating);
    setRatingOptions(ratingData);
  }, [catalogNo]);

  const getCompaniesData = async () => {
    const response = await getOneSubComponent(data._id);

    if (response.type === "error") {
      message.error(response.message);
    }
    if (response.type === "success") {
      // set data according to catalog number and rating
      const subComponentData = response.data.data;

      const catalogEntry = subComponentData.catalog.find(
        (entry) => entry.catalog_number === catalogNo
      );

      if (catalogEntry) {
        // Find the relevant rating entry within the catalog entry
        const ratingEntry = catalogEntry.rating.find(
          (entry) => entry.rating_value === rating
        );

        if (ratingEntry) {
          // Extract the "name" field from the "company_id" object
          console.log(ratingEntry.companies);
          const companyNameList = ratingEntry.companies.map((e) => {
            console.log(e);
            return {
              label: e.company_id.name,
              value: e.company_id._id,
            };
          });
          setCompanyOptions(companyNameList);
        } else {
          console.log("Rating entry not found.");
        }
      } else {
        console.log("Catalog entry not found.");
      }
    }
  };

  useEffect(() => {
    if (catalogNo === "Select catalog No" || rating === "Select Rating") {
      return;
    }
    getCompaniesData();
  }, [rating]);

  const setPriceAndDiscount = () => {
    console.log(nowData, company);
    const companyData = nowData[0].companies.filter((e) => {
      if (e.company_id === company) {
        return e;
      }
    });
    setPrice(Number(companyData[0].price));
    setDiscount(Number(companyData[0].discount));
    setTotalPrice(
      Number(
        (companyData[0].price -
          (companyData[0].discount * companyData[0].price) / 100) *
          quantity
      )
    );
  };

  useEffect(() => {
    if (
      catalogNo === "Select catalog No" ||
      rating === "Select Rating" ||
      company === "Select Company"
    ) {
      return;
    }
    setPriceAndDiscount();
  }, [company]);

  useEffect(() => {
    setTotalPrice(Number((price - (discount * price) / 100) * quantity));
  }, [quantity]);

  const submitHandler = async () => {
    const submitData = {
      desc: data.desc,
      catalog_number: catalogNo,
      rating_value: rating,
      company: {
        company_name: company,
        price: price,
        discount: discount,
      },
      quantity: quantity,
    };

    const response = await offerSubComponent(submitData);

    if (response.type === "error") {
      message.error(response.message);
    }
    if (response.type === "success") {
      message.success("subcomponent created successfully");
      setSubmitted(true);
      console.log(totalPrice);
      dispatch(
        panelActions.addCompletedSubComponent({
          index: panel_index,
          component_index: index,
          totalPrice: totalPrice,
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

  const ResetHandler = () => {
    setCatalogNo("Select catalog No");
    setRating("Select Rating");
    setCompany("Select Company");
    setQuantity(0);
    setPrice();
    setDiscount();
    setTotalPrice();
    setSubmitted(false);
  };

  return (
    <div className="w-full border-2 border-gray-300 p-4 mb-4">
      <div className="font-semibold p-2 text-gray-500 mt-2">
        <span className="font-bold p-2 text-blue-700 mt-2">
          {submitted === true && "Submitted: "}
        </span>
        {data.desc}
      </div>
      {submitted === false && (
        <div className="w-full flex flex-col justify-center gap-2">
          <Select
            showSearch
            filterOption={(input, option) =>
              (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
            }
            className="w-full"
            options={catalogNoOptions}
            value={catalogNo}
            onChange={(e) => {
              setCatalogNo(e);
            }}
          />
          {catalogNo !== "Select catalog No" && (
            <Select
              showSearch
              filterOption={(input, option) =>
                (option?.label ?? "")
                  .toLowerCase()
                  .includes(input.toLowerCase())
              }
              className="w-full"
              options={ratingOptions}
              value={rating}
              onChange={(e) => {
                setRating(e);
              }}
            />
          )}
          {rating !== "Select Rating" && (
            <Select
              showSearch
              filterOption={(input, option) =>
                (option?.label ?? "")
                  .toLowerCase()
                  .includes(input.toLowerCase())
              }
              className="w-full"
              options={companyOptions}
              value={company}
              onChange={(e) => {
                console.log(e);
                setCompany(e);
              }}
            />
          )}
          <Input
            type="number"
            onChange={(e) => setQuantity(e.target.value)}
            value={quantity}
            className=""
            placeholder="Quantity"
          />
          {company !== "Select Company" && quantity >= 0 && (
            <div className="flex flex-row items-center justify-between gap-2">
              <div className="flex flex-col items-start justify-center gap-2">
                <div className="font-semibold text-gray-500">Price</div>
                <div className="font-semibold text-gray-500">Discount</div>
                <div className="font-semibold text-gray-500">Total Price</div>
              </div>
              <div className="flex flex-col items-start justify-center gap-2">
                <div className="font-semibold text-gray-500">{price}</div>
                <div className="font-semibold text-gray-500">{discount}</div>
                <div className="font-semibold text-gray-500">{totalPrice}</div>
              </div>
            </div>
          )}

          <div className="flex flex-row items-center justify-center gap-3 py-2">
            <Button
              className="w-fit bg-blue-700 text-white"
              onClick={submitHandler}
              type="primary"
            >
              Create
            </Button>
            <Button
              className="w-fit bg-gray-700 text-white"
              onClick={ResetHandler}
              type="primary"
            >
              Reset
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default OfferCompanies;
