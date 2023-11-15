import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Menu } from "antd";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import FormItemLabel from "antd/es/form/FormItemLabel";
import { loginActions } from "../../store/loginslice";
import { LogOut } from "lucide-react";

const rootSubmenuKeys = ["sub1", "sub2", "sub3", "sub4", "sub5", "sub6"];

export const Navigator = () => {
  const loginData = useSelector((state) => state.login);
  const dispatch = useDispatch();
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
  const [items, setItems] = useState({
    Offer: 0,
    Project: 0,
    Indent: 0,
    Purchase: 0,
    GRN: 0,
    Issue: 0,
    Employee: 0,
  });

  const columns = [
    "Offer",
    "Project",
    "Indent",
    "Purchase",
    "GRN",
    "Issue",
    "Employee",
  ];

  const RWOffer = [
    getItem("Offer", "sub1", [
      getItem("Companies", "companies"),
      getItem("Add SubComponent", "subComponent"),
      getItem("Subcomponent List", "offersubcomponentlist"),
      getItem("Add Component", "component"),
      getItem("Component List", "componentlist"),
      getItem("Add Offer", "offer"),
      getItem("Offers List", "offerlist"),
      getItem("Export Offer", "export"),
    ]),
  ];

  const ROffer = [
    getItem("Offer", "sub1", [
      getItem("Subcomponent List", "offersubcomponentlist"),
      getItem("Component List", "componentlist"),
      getItem("Offers List", "offerlist"),
      getItem("Export Offer", "export"),
    ]),
  ];

  const RWProject = [
    getItem("Project", "sub2", [
      getItem("Add Project", "project"),
      getItem("Add Client", "client"),
      getItem("Projects List", "projectlist"),
      getItem("Drawing", "drawing"),
    ]),
  ];

  const RProject = [
    getItem("Project", "sub2", [
      getItem("Projects List", "projectlist"),
      getItem("Drawing", "drawing"),
    ]),
  ];

  const RWIndent = [
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

  const RIndent = [
    getItem("Indent", "sub3", [
      getItem("Vendor List", "vendorlist"),
      getItem("Store List", "storelist"),
      getItem("Indent List", "indentlist"),
    ]),
  ];

  const RWPurchase = [
    getItem("Purchase", "sub4", [
      getItem("Purchase", "purchase"),
      getItem("Bulk Purchase", "bulkpurchase"),
    ]),
  ];

  const RPurchase = [
    getItem("Purchase", "sub4", [
      getItem("Purchase", "purchase"),
      getItem("Bulk Purchase", "bulkpurchase"),
    ]),
  ];

  const RWGRN = [
    getItem("GRN", "sub5", [
      getItem("GRN Create", "creategrn"),
      getItem("GRN List", "listgrn"),
      getItem("GRN Approval", "grnapproval"),
    ]),
  ];

  const RGRN = [getItem("GRN", "sub5", [getItem("GRN List", "listgrn")])];

  const RWIssue = [
    getItem("Issue", "sub6", [
      getItem("Add Issue", "addissue"),
      getItem("Issue List", "issuelist"),
    ]),
  ];

  const RIssue = [
    getItem("Issue", "sub6", [getItem("Issue List", "issuelist")]),
  ];

  const RWEmployee = [
    getItem("Employee", "sub7", [
      getItem("Add Employee", "addemployee"),
      getItem("Employee List", "employeelist"),
    ]),
  ];

  const REmployee = [
    getItem("Employee", "sub7", [getItem("Employee List", "employeelist")]),
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

  const NavigatorHandler = () => {
    if (!loginData.access) return;
    const { access } = loginData;
    const updatedItemsData = {
      Offer: 0,
      Project: 0,
      Indent: 0,
      Purchase: 0,
      GRN: 0,
      Issue: 0,
      Employee: 0,
    };

    columns.forEach((item) => {
      const RW = `RW${item}`;
      const R = `R${item}`;

      access.forEach((element) => {
        if (element.startsWith(RW)) {
          updatedItemsData[item] = 2;
        } else if (element.startsWith(R) && updatedItemsData[item] === 0) {
          updatedItemsData[item] = 1;
        }
      });
    });

    setItems(updatedItemsData);
  };

  useEffect(() => {
    NavigatorHandler();
    dispatch(loginActions.addItems(items));
  }, [loginData]);

  const LogoutHandler = () => {
    dispatch(loginActions.logout());
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="w-[22vw]">
      <div className="flex justify-between items-center p-3">
        <p className="text-2xl p-3 font-semibold">ERP</p>
        {localStorage.getItem("token") && (
          <p
            className="text-2xl p-3 font-semibold cursor-pointer hover:text-red-700"
            onClick={LogoutHandler}
          >
            <LogOut />
          </p>
        )}
      </div>
      {items.Offer !== 0 && (
        <Menu
          mode="inline"
          className=" "
          openKeys={openKeys}
          onOpenChange={onOpenChange}
          onClick={(e) => navigate(`/${e.key}`)}
          items={items.Offer === 1 ? ROffer : RWOffer}
        />
      )}
      {items.Project !== 0 && (
        <Menu
          mode="inline"
          className=""
          openKeys={openKeys}
          onOpenChange={onOpenChange}
          onClick={(e) => navigate(`/${e.key}`)}
          items={items.Project === 1 ? RProject : RWProject}
        />
      )}
      {items.Indent !== 0 && (
        <Menu
          mode="inline"
          className=""
          openKeys={openKeys}
          onOpenChange={onOpenChange}
          onClick={(e) => navigate(`/${e.key}`)}
          items={items.Indent === 1 ? RIndent : RWIndent}
        />
      )}
      {items.Purchase !== 0 && (
        <Menu
          mode="inline"
          className=""
          openKeys={openKeys}
          onOpenChange={onOpenChange}
          onClick={(e) => navigate(`/${e.key}`)}
          items={items.Purchase === 1 ? RPurchase : RWPurchase}
        />
      )}
      {items.GRN !== 0 && (
        <Menu
          mode="inline"
          className=""
          openKeys={openKeys}
          onOpenChange={onOpenChange}
          onClick={(e) => navigate(`/${e.key}`)}
          items={items.GRN === 1 ? RGRN : RWGRN}
        />
      )}
      {items.Issue !== 0 && (
        <Menu
          mode="inline"
          className=""
          openKeys={openKeys}
          onOpenChange={onOpenChange}
          onClick={(e) => navigate(`/${e.key}`)}
          items={items.Issue === 1 ? RIssue : RWIssue}
        />
      )}
      {items.Employee !== 0 && (
        <Menu
          mode="inline"
          className=""
          openKeys={openKeys}
          onOpenChange={onOpenChange}
          onClick={(e) => navigate(`/${e.key}`)}
          items={items.Employee === 1 ? REmployee : RWEmployee}
        />
      )}
    </div>
  );
};
