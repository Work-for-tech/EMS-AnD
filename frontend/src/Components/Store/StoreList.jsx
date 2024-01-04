import { ArrowBigLeftDash, Redo2 } from "lucide-react";
import Highlighter from "react-highlight-words";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { SearchOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createStoreData, getStoreData } from "../../APIs/store";
import { Button, Input, Space, Table, Tooltip, message } from "antd";

export const StoreList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [data, setStoreData] = useState([]);
  const [updateStore, setUpdateStore] = useState(false);
  const [updateData, setUpdateData] = useState();
  const [quantity, setQuantity] = useState("");
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
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef(null);
  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };
  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText("");
  };
  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
      close,
    }) => (
      <div
        style={{
          padding: 8,
        }}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: "block",
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
              width: 90,
            }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({
                closeDropdown: false,
              });
              setSearchText(selectedKeys[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? "#1677ff" : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{
            backgroundColor: "#ffc069",
            padding: 0,
          }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });

  const getStoresData = async () => {
    const response = await getStoreData();

    if (response.type === "success") {
      const newStoreData = response.data.data.map((e) => {
        console.log(e);
        return {
          key: e?._id || "",
          desc: e?.desc || "",
          catalog_number: e?.catalog_number || "",
          rating_value: e?.rating_value || "",
          company: e?.companyId?.name || "",
          companyId: e?.companyId?._id || "",
          quantity: e?.quantity || 0,
        };
      });

      setStoreData(newStoreData);
    } else {
      message.error("Cannot fetch store data");
    }
  };

  useEffect(() => {
    getStoresData();
  }, []);

  const columns = [
    {
      title: "Description",
      dataIndex: "desc",
      key: "desc",
      ...getColumnSearchProps("desc"),
    },
    {
      title: "Catalog Number",
      dataIndex: "catalog_number",
      key: "catalog_number",
      ...getColumnSearchProps("catalog_number"),
    },
    {
      title: "Rating Value",
      dataIndex: "rating_value",
      key: "rating_value",
      ...getColumnSearchProps("rating_value"),
    },
    {
      title: "Company",
      dataIndex: "company",
      key: "company",
      ...getColumnSearchProps("company"),
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
      ...getColumnSearchProps("quantity"),
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      render: (text, record) => (
        <div className="flex flex-row gap-2">
          <Tooltip placement="top" title={"Update Store"} arrow={mergedArrow}>
            <button
              className="text-blue-600 hover:text-blue-300"
              onClick={() => {
                console.log(record);
                setUpdateStore(true);
                setUpdateData(record);
                setQuantity(record.quantity);
              }}
            >
              <Redo2 />
            </button>
          </Tooltip>
        </div>
      ),
    },
  ];

  const Handle$OnClick$Submit = async () => {
    const sendData = {
      desc: updateData.desc,
      catalog_number: updateData.catalog_number,
      rating_value: updateData.rating_value,
      companyId: updateData.companyId,
      quantity: Number(quantity),
    };

    console.log(sendData);

    const response = await createStoreData(sendData);
    console.log(response.data);

    if (response.type === "success") {
      message.success("Data Added Successfully");
      setUpdateStore(false);
      setUpdateData();
      setQuantity("");
      getStoresData();
    } else {
      message.error("Data Not Added");
    }
  };

  return (
    <div className="w-full min-h-screen bg-[#f3f7ff]">
      {!updateStore ? (
        <>
          <p className="text-3xl text-blue-800 font-semibold p-4">Store List</p>
          <div className="rounded-md bg-white flex flex-col m-4">
            <>
              <p className="text-blue-800 font-semibold text-xl p-5">
                Store List
              </p>
              <div className="w-full">
                <Table columns={columns} dataSource={data} />
              </div>
            </>
          </div>
        </>
      ) : (
        <>
          <p className="text-3xl text-blue-800 font-semibold p-4">
            Update Data
          </p>
          <div
            className="px-4 flex flex-row cursor-pointer"
            onClick={() => {
              setUpdateStore(false);
              setUpdateData();
              setQuantity("");
            }}
          >
            <ArrowBigLeftDash className="text-gray-500 hover:text-blue-800" />
            <span className="font-semibold text-gray-500 hover:text-blue-800">
              Store List
            </span>
          </div>
          <div className="rounded-md bg-white flex flex-col m-4">
            <>
              <p className="text-blue-800 font-semibold text-xl p-5">
                Update Data
              </p>
              <div className="w-full flex justify-evenly">
                <section className="w-3/4 p-4">
                  <div className="font-semibold p-2 text-gray-500">
                    Add Quantity
                  </div>
                  <Input
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    type="number"
                    className="w-full"
                    placeholder="Enter Quantity"
                  />
                </section>
              </div>
            </>
            <section className="flex items-center justify-center gap-5 p-4">
              <Button
                onClick={Handle$OnClick$Submit}
                className="bg-blue-700 text-white"
              >
                Update
              </Button>
            </section>
          </div>
        </>
      )}
    </div>
  );
};
