import React, { useState, useEffect } from "react";
import { Input, Button, Table, Select, message } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { getOneSubComponent } from "../../APIs/subComponent";
import { offerSubComponent } from "../../APIs/offer";
import { panelActions } from "../../store/panelslice";

const OfferCompanies = ({ data, panel_index, index, completed }) => {
  const subcomponent_data = useSelector(
    (state) => state.panel.panel[panel_index].components[index]
  );
  console.log(subcomponent_data);
  const dispatch = useDispatch();
  const [catalogNo, setCatalogNo] = useState("Select catalog No");
  const [catalogNoOptions, setCatalogNoOptions] = useState([]);

  const [rating, setRating] = useState("Select Rating");
  const [ratingOptions, setRatingOptions] = useState([]);

  const [company, setCompany] = useState("Select Company");
  const [companyOptions, setCompanyOptions] = useState([]);
  const [companyData, setCompanyData] = useState([]);
  const [submittedData, setSubmittedData] = useState();

  const [quantity, setQuantity] = useState(0);
  const [nowData, setNowData] = useState([]);

  const [price, setPrice] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [submitted, setSubmitted] = useState(false);

  useEffect((e) => {
    const foundData = subcomponent_data?.completed_subcomponents_data?.filter(
      (e) => {
        if (data.desc === e.desc) {
          return e;
        }
      }
    );

    if (foundData?.length === 0) {
      setTotalPrice((price - (price * discount) / 100) * quantity);
      setSubmitted(false);
      return;
    }
  });

  useEffect(() => {
    if (
      subcomponent_data?.completed_subcomponents_data &&
      subcomponent_data?.completed_subcomponents_data?.length !== 0
    ) {
      const foundData = subcomponent_data?.completed_subcomponents_data.filter(
        (e) => {
          if (data.desc === e.desc) {
            return e;
          }
        }
      );

      if (foundData && foundData.length === 0) {
        setSubmitted(false);
        console.log("I was here");
        return;
      }

      const foundSubcomponent = subcomponent_data?.subcomponents.filter(
        (e) => e.desc === data.desc
      )[0];

      setCatalogNo(foundData[0].catalog_number);
      const catalogData = foundSubcomponent.catalog.map((e) => ({
        label: e.catalog_number,
        value: e.catalog_number,
      }));
      setCatalogNoOptions(catalogData);
      setQuantity(foundSubcomponent.quantity || 1);

      setRating(foundData[0].rating_value);
      const FilteredData = foundSubcomponent.catalog.filter((e) => {
        if (foundData[0].catalog_number === e.catalog_number) {
          return e.catalog_number;
        }
      });
      const ratingData = FilteredData[0].rating.map((e) => ({
        label: e.rating_value,
        value: e.rating_value,
      }));
      const nowDataHere = FilteredData[0].rating;
      setCompany(foundData[0].company_name);
      setRatingOptions(ratingData);

      const catalogEntry = foundSubcomponent.catalog.find(
        (entry) => entry.catalog_number === foundData[0].catalog_number
      );

      console.log(catalogEntry);

      if (catalogEntry) {
        // Find the relevant rating entry within the catalog entry
        const ratingEntry = catalogEntry.rating.find(
          (entry) => entry.rating_value === foundData[0].rating_value
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
          console.log(companyNameList);
          setCompanyOptions(companyNameList);
        }
      }

      console.log(foundData[0]);

      setPrice(foundData[0].price);
      setDiscount(foundData[0].discount);
      setTotalPrice(foundData[0].totalPrice);
      setSubmittedData(foundData[0]);
      setSubmitted(true);
    }
  }, [subcomponent_data?.completed_subcomponents_data]);

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
          const companyNameList = ratingEntry.companies.map((e) => {
            console.log(e);
            return {
              label: e.company_id.name,
              value: e.company_id._id,
            };
          });

          console.log(companyNameList);
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
    if (nowData.length !== 0) {
      const companyData = nowData[0].companies.filter((e) => {
        console.log(e);
        if (e.company_id === company || e.company_id._id === company) {
          return e;
        }
      });
      if (companyData.length === 0) {
        return;
      }
      setPrice(Number(companyData[0].price));
      setDiscount(Number(companyData[0].discount));
      setTotalPrice(
        Number(
          (companyData[0].price -
            (companyData[0].discount * companyData[0].price) / 100) *
            quantity
        )
      );
    } else {
    }
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
  }, [quantity, price, discount]);

  const submitHandler = async () => {
    console.log(companyOptions);
    const newCompanyName = companyOptions.filter((e) => {
      if (e.label === company || e.value === company) {
        return e;
      }
    })[0];

    const submitData = {
      desc: data.desc,
      catalog_number: catalogNo,
      rating_value: rating,
      company: {
        company_name: newCompanyName.value,
        price: price,
        discount: discount,
      },
      quantity: quantity,
    };

    console.log(submitData);
    const response = await offerSubComponent(submitData);

    if (response.type === "error") {
      message.error(response.message);
    }
    if (response.type === "success") {
      message.success("subcomponent created successfully");
      setSubmitted(true);
      console.log(totalPrice);

      const finalData = {
        key: response.data.data._id,
        _id: response.data.data._id,
        desc: data.desc,
        catalog_number: catalogNo,
        rating_value: rating,
        company_name: newCompanyName.label,
        company_id: newCompanyName.value,
        price: price,
        discount: discount,
        quantity: quantity,
      };

      console.log(finalData);

      dispatch(
        panelActions.addCompletedSubComponent({
          subcomponent_data: finalData,
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

      console.log(finalData);

      setSubmittedData(finalData);
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
    <div className="">
      <div className="flex flex-col font-semibold text-gray-500 text-center ">
        {submitted === true && (
          <div className="m-1">
            {/* <Table
              columns={column}
              dataSource={[submittedData]}
              pagination={false}
            /> */}
          </div>
        )}

        {submitted === true && <div className="w-full items-center"></div>}
      </div>
      {!submitted && (
        <div className="p-2 w-full flex flex-col items-center gap-2">
          <div className="p-1 w-full text-blue-800 font-bold text-left">
            Description: {data.desc}
          </div>
          <div className="w-full flex flex-row items-center gap-2">
            <Select
              showSearch
              filterOption={(input, option) =>
                (option?.label ?? "")
                  .toLowerCase()
                  .includes(input.toLowerCase())
              }
              className="w-1/3"
              options={catalogNoOptions}
              value={catalogNo}
              onChange={(e) => setCatalogNo(e)}
            />
            {catalogNo !== "Select catalog No" && (
              <Select
                showSearch
                filterOption={(input, option) =>
                  (option?.label ?? "")
                    .toLowerCase()
                    .includes(input.toLowerCase())
                }
                className="w-1/3"
                options={ratingOptions}
                value={rating}
                onChange={(e) => setRating(e)}
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
                className="w-1/3"
                options={companyOptions}
                value={company}
                onChange={(e) => setCompany(e)}
              />
            )}
            <Input
              type="number"
              onChange={(e) => setQuantity(e.target.value)}
              value={quantity}
              className="w-1/3"
              placeholder="Quantity"
            />
            {company !== "Select Company" && quantity >= 0 && (
              <div className="w-1/3 flex items-center justify-evenly gap-4">
                <div className=" font-semibold">
                  <p>Price</p>
                  <p>{price?.toFixed(2)}</p>
                </div>
                <div className=" font-semibold">
                  <p>Discount</p>
                  <p>{discount?.toFixed(2)}</p>
                </div>
                <div className="font-semibold">
                  <p>Total Price</p>
                  <p>{totalPrice?.toFixed(2)}</p>
                </div>
              </div>
            )}
            <div className="flex flex-row items-center justify-center gap-3">
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
        </div>
      )}
    </div>
  );
};

export default OfferCompanies;
