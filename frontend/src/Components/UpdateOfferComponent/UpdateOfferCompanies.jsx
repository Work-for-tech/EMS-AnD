import React, { useState, useEffect } from "react";
import { Input, Button, Table, Select, message } from "antd";
import { useSelector, useDispatch } from "react-redux";
import {
  getOneSubComponent,
  getOneSubComponentByDesc,
} from "../../APIs/subComponent";
import { offerSubComponent } from "../../APIs/offer";
import panelSlice, { panelActions } from "../../store/panelslice";
import { updatepanelActions } from "../../store/updateslice";
import { FlipVertical } from "lucide-react";

export const UpdateOfferCompanies = ({
  data,
  panel_index,
  sub_index,
  index,
}) => {
  const subcomponent_data = useSelector(
    (state) => state.updatepanel.components[sub_index].sub_components[index]
  );
  const dispatch = useDispatch();
  const [catalogNo, setCatalogNo] = useState(
    data.catalog_number || "Select catalog No"
  );
  const [catalogNoOptions, setCatalogNoOptions] = useState([]);

  const [rating, setRating] = useState(data.rating_value || "Select Rating");
  const [ratingOptions, setRatingOptions] = useState([]);

  const [company, setCompany] = useState(
    data.company?.company_name.name || "Select Company"
  );
  const [companyOptions, setCompanyOptions] = useState([]);
  const [companyData, setCompanyData] = useState([]);
  const [submittedData, setSubmittedData] = useState();

  const [quantity, setQuantity] = useState(data.quantity || 0);
  const [nowData, setNowData] = useState([]);

  const [price, setPrice] = useState(data.company?.price || 0);
  const [discount, setDiscount] = useState(data.company?.discount || 0);
  const [totalPrice, setTotalPrice] = useState(
    (data.company?.price -
      (data.company?.price * data.company?.discount) / 100) *
      quantity || 0
  );
  const [newData, setNewData] = useState([]);
  const [submitted, setSubmitted] = useState(false);

  const [prevprice, setprevPrice] = useState(
    (data.company?.price -
      (data.company?.price * data.company?.discount) / 100) *
      quantity || 0
  );

  useEffect(() => {
    const getData = async () => {
      const response = await getOneSubComponentByDesc({ desc: data.desc });
      if (response.type === "error") {
        message.error(response.message);
      }
      if (response.type === "success") {
        setNewData(response.data.data);
        console.log(response.data.data);
      }
    };
    getData();
  }, []);

  useEffect(() => {
    if (!newData || newData.length === 0) {
      return;
    }
    const catalogData = newData.catalog.map((e) => ({
      label: e.catalog_number,
      value: e.catalog_number,
    }));
    setCatalogNoOptions(catalogData);
    setQuantity(data.quantity || 1);
  }, [newData]);

  useEffect(() => {
    if (!newData || catalogNo === "Select catalog No" || newData.length === 0) {
      return;
    }

    const FilteredData = newData.catalog.filter((e) => {
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
  }, [catalogNo, newData]);

  const getCompaniesData = () => {
    if (!newData || rating === "Select Rating" || newData.length === 0) {
      return;
    }
    const catalogEntry = newData.catalog.find(
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
      }
    }
  };

  useEffect(() => {
    if (catalogNo === "Select catalog No" || rating === "Select Rating") {
      return;
    }
    getCompaniesData();
  }, [rating, newData]);

  const setPriceAndDiscount = () => {
    console.log(nowData);
    const companyData = nowData[0].companies.filter((e) => {
      if (e.company_id.name === company) {
        setCompany(e.company_id._id);
        return e;
      }
      if (e.company_id._id === company) {
        return e;
      }
    });
    console.log(company);
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
      company === "Select Company" ||
      newData.length === 0 ||
      nowData.length === 0
    ) {
      return;
    }
    setPriceAndDiscount();
  }, [company, newData, nowData]);

  useEffect(() => {
    setTotalPrice(Number((price - (discount * price) / 100) * quantity));
  }, [quantity, newData]);

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
      console.log({
        index: index,
        panel_index: panel_index,
        sub_index: sub_index,
        newPrice: totalPrice,
        oldPrice: prevprice,
        _id: response.data.data._id,
        data: response.data.data,
      });
      dispatch(
        updatepanelActions.addCompletedSubComponent({
          component_index: sub_index,
          sub_index: index,
          newPrice: totalPrice,
          oldPrice: prevprice,
          _id: response.data.data._id,
          data: response.data.data,
        })
      );
      setSubmittedData({
        key: response.data.data._id,
        _id: response.data.data._id,
        desc: data.desc,
        catalog_number: catalogNo,
        rating_value: rating,
        company_name: company,
        price: price,
        discount: discount,
        quantity: quantity,
      });
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

  console.log(submitted);

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
        <div className="p-1 w-full flex flex-col items-center gap-2">
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
              <div className="w-5/12 flex items-center justify-evenly gap-4">
                <div className="flex flex-col text-green-500 font-semibold">
                  <p>Price</p>
                  <p>{price?.toFixed(2)}</p>
                </div>
                <div className="text-red-500 font-semibold">
                  <p>Discount</p>
                  <p>{discount?.toFixed(2)}</p>
                </div>
                <div className="text-purple-700 font-semibold">
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
