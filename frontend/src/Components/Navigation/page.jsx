import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Menu } from "antd";
import { useNavigate } from "react-router-dom";

const rootSubmenuKeys = ["sub1", "sub2", "sub4"];

export const Navigator = () => {
  const navigate = useNavigate();
  const [currentURL, setCurrentURL] = React.useState(
    window.location.href.split("/")[3]
  );
  function getItem(label, key, children, type) {
    return {
      key,
      children,
      label,
      type,
    };
  }

  const item1 = [
    getItem("Offer", "sub1", [
      getItem("Companies", "companies"),
      getItem("Add SubComponent", "subComponent"),
      getItem("Add Component", "component"),
      getItem("Add Offer", "offer"),
      getItem("Offers List", "offerlist"),
      getItem("Export Offer", "export"),
    ]),
  ];

  const item2 = [
    getItem("Project", "sub2", [
      getItem("Add Project", "project"),
      getItem("Add Client", "client"),
      getItem("Projects List", "projectlist"),
      getItem("Drawing", "drawing"),
    ]),
  ];

  const item3 = [
    getItem("Indent", "sub3", [
      getItem("Create Vendor", "createvendor"),
      getItem("Vendor List", "vendorlist"),
      getItem("Create Store", "createstore"),
      getItem("Store List", "storelist"),
      getItem("Indent", "indent"),
      getItem("Bulk Indent", "bulkindent"),
      getItem("Indent List", "indentlist"),
    ]),
  ];

  const item4 = [
    getItem("Purchase", "sub4", [
      getItem("Purchase", "purchase"),
      getItem("Bulk Purchase", "bulkpurchase"),
    ]),
  ];

  const item5 = [
    getItem("GRN", "sub5", [
      getItem("GRN Create", "creategrn"),
      getItem("GRN List", "listgrn"),
      getItem("GRN Approval", "grnapproval"),
    ]),
  ];

  const item6 = [
    getItem("Issue", "sub6", [
      getItem("Add Issue", "addissue"),
      getItem("Issue List", "issuelist"),
    ]),
  ];

  const [openKeys, setOpenKeys] = useState(["sub1"]);
  const onOpenChange = (keys) => {
    const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1);
    if (latestOpenKey && rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
      setOpenKeys(keys);
    } else {
      setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
    }
  };

  return (
    <div className="w-[22vw]">
      <p className="text-2xl p-3 font-semibold">ERP</p>
      <Menu
        mode="inline"
        className=" "
        openKeys={openKeys}
        onOpenChange={onOpenChange}
        onClick={(e) => navigate(`/${e.key}`)}
        items={item1}
      />
      <Menu
        mode="inline"
        className=""
        openKeys={openKeys}
        onOpenChange={onOpenChange}
        onClick={(e) => navigate(`/${e.key}`)}
        items={item2}
      />
      <Menu
        mode="inline"
        className=""
        openKeys={openKeys}
        onOpenChange={onOpenChange}
        onClick={(e) => navigate(`/${e.key}`)}
        items={item3}
      />
      <Menu
        mode="inline"
        className=""
        openKeys={openKeys}
        onOpenChange={onOpenChange}
        onClick={(e) => navigate(`/${e.key}`)}
        items={item4}
      />
      <Menu
        mode="inline"
        className=""
        openKeys={openKeys}
        onOpenChange={onOpenChange}
        onClick={(e) => navigate(`/${e.key}`)}
        items={item5}
      />
      <Menu
        mode="inline"
        className=""
        openKeys={openKeys}
        onOpenChange={onOpenChange}
        onClick={(e) => navigate(`/${e.key}`)}
        items={item6}
      />
    </div>
  );
};
