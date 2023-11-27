import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Companies } from "./Components/Companies/Page";
import { SubComponant } from "./Components/SubComponents/Page";
import { ComponentPage } from "./Components/Component/page";
import { Offer } from "./Components/Offers/page";
import { ProjectPage } from "./Components/Project/page";
import { Navigator } from "./Components/Navigation/page";
import { Revision } from "./Components/Revision/page";
import { Client } from "./Components/Client/page";
import { OfferPanel } from "./Components/OfferComponent/OfferPanel";
import { OfferList } from "./Components/Lists/OfferList";
import { OfferComponents } from "./Components/Lists/OfferComponents";
import { UpdateOfferPanel } from "./Components/UpdateOfferComponent/UpdateOfferPanel";
import { ProjectList } from "./Components/Lists/ProjectList";
import { Drawing } from "./Components/Drawing/Drawing";
import { useDispatch } from "react-redux";
import { offerActions } from "./store/offerslice";
import { OfferExcel } from "./Components/OfferExcel/page";
import { CreateVendor } from "./Components/Vendor/page";
import { VendorList } from "./Components/Lists/VendorList";
import { CreateStore } from "./Components/Store/page";
import { StoreList } from "./Components/Lists/StoreList";
import { IndentOffers } from "./Components/Indent/IndentOffers";
import { BulkIndent } from "./Components/BulkIndent/BulkIndent";
import { IndentList } from "./Components/Lists/IndentList";
import { Purchase } from "./Components/Purchase/Purchase";
import { CreateGRN } from "./Components/GRN/page";
import { ListGRN } from "./Components/GRN/list";
import { GRNApproval } from "./Components/GRN/GRNApproval";
import { BulkPurchase } from "./Components/Purchase/BulkPurchase";
import { AddIssue } from "./Components/Issue/AddIssue";
import { IssueList } from "./Components/Issue/IssueList";
import { IssueSubcomponent } from "./Components/Issue/Subcomponent";
import { AddEmployee } from "./Components/Employee/addEmployee";
import { Employeelist } from "./Components/Employee/Employeelist";
import { UpdateEmployee } from "./Components/Employee/UpdateEmployee";
import { Access } from "./Components/Login/access";
import { OfferSubComponentList } from "./Components/SubComponents/OfferSubComponentList";
import { UpdateSubComponent } from "./Components/SubComponents/UpdateSubComponent";
import { ComponentList } from "./Components/Component/ComponentList";
import { UpdateComponent } from "./Components/Component/UpdateComponent";
import { Login } from "./Components/Login/Login";
import { Landing } from "./Components/Landing/Landing";
import { AccessHandler } from "./Validator/AccessHandler";
import { Production } from "./Components/Production/Page";

function App() {
  const dispatch = useDispatch();

  if (
    window.location.pathname === "/offerlist" ||
    window.location.pathname === "/projectlist" ||
    window.location.pathname === "/offer"
  ) {
    dispatch(offerActions.setInitials());
  }

  return (
    <div className="">
      <Router className="w-full">
        <Navigator />
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route
            path="/companies"
            element={
              <AccessHandler>
                <Companies />
              </AccessHandler>
            }
          />
          <Route
            path="/subComponent"
            element={
              <AccessHandler>
                <SubComponant />
              </AccessHandler>
            }
          />
          <Route
            path="/component"
            element={
              <AccessHandler>
                <ComponentPage />
              </AccessHandler>
            }
          />
          <Route
            path="/offer"
            element={
              <AccessHandler>
                <Offer />
              </AccessHandler>
            }
          />
          <Route
            path="/project"
            element={
              <AccessHandler>
                <ProjectPage />
              </AccessHandler>
            }
          />
          <Route
            path="/offerlist"
            element={
              <AccessHandler>
                <Revision />
              </AccessHandler>
            }
          />
          <Route
            path="/client"
            element={
              <AccessHandler>
                <Client />
              </AccessHandler>
            }
          />
          <Route
            path="/offerpanels"
            element={
              <AccessHandler>
                <OfferPanel />
              </AccessHandler>
            }
          />
          <Route
            path="/offerdetails"
            element={
              <AccessHandler>
                <OfferList />
              </AccessHandler>
            }
          />
          <Route
            path="/offercomponents"
            element={
              <AccessHandler>
                <OfferComponents />
              </AccessHandler>
            }
          />
          <Route
            path="/updateoffer"
            element={
              <AccessHandler>
                <UpdateOfferPanel />
              </AccessHandler>
            }
          />
          <Route
            path="/projectlist"
            element={
              <AccessHandler>
                <ProjectList />
              </AccessHandler>
            }
          />
          <Route
            path="/drawing"
            element={
              <AccessHandler>
                <Drawing />
              </AccessHandler>
            }
          />
          <Route
            path="/export"
            element={
              <AccessHandler>
                <OfferExcel />
              </AccessHandler>
            }
          />
          <Route
            path="/createvendor"
            element={
              <AccessHandler>
                <CreateVendor />
              </AccessHandler>
            }
          />
          <Route
            path="/vendorlist"
            element={
              <AccessHandler>
                <VendorList />
              </AccessHandler>
            }
          />
          <Route
            path="/createstore"
            element={
              <AccessHandler>
                <CreateStore />
              </AccessHandler>
            }
          />
          <Route
            path="/storelist"
            element={
              <AccessHandler>
                <StoreList />
              </AccessHandler>
            }
          />
          <Route
            path="/indent"
            element={
              <AccessHandler>
                <IndentOffers />
              </AccessHandler>
            }
          />
          <Route
            path="/bulkindent"
            element={
              <AccessHandler>
                <BulkIndent />
              </AccessHandler>
            }
          />
          <Route
            path="/indentlist"
            element={
              <AccessHandler>
                <IndentList />
              </AccessHandler>
            }
          />
          <Route
            path="/purchase"
            element={
              <AccessHandler>
                <Purchase />
              </AccessHandler>
            }
          />
          <Route
            path="/bulkpurchase"
            element={
              <AccessHandler>
                <BulkPurchase />
              </AccessHandler>
            }
          />
          <Route
            path="/creategrn"
            element={
              <AccessHandler>
                <CreateGRN />
              </AccessHandler>
            }
          />
          <Route
            path="/listgrn"
            element={
              <AccessHandler>
                <ListGRN />
              </AccessHandler>
            }
          />
          <Route
            path="/grnapproval"
            element={
              <AccessHandler>
                <GRNApproval />
              </AccessHandler>
            }
          />
          <Route
            path="/addissue"
            element={
              <AccessHandler>
                <AddIssue />
              </AccessHandler>
            }
          />
          <Route
            path="/issuelist"
            element={
              <AccessHandler>
                <IssueList />
              </AccessHandler>
            }
          />
          <Route
            path="/issueSubcomponent"
            element={
              <AccessHandler>
                <IssueSubcomponent />
              </AccessHandler>
            }
          />
          <Route path="/addemployee" element={<AddEmployee />} />
          <Route
            path="/employeelist"
            element={
              <AccessHandler>
                <Employeelist />
              </AccessHandler>
            }
          />
          <Route
            path="/updateemployee"
            element={
              <AccessHandler>
                <UpdateEmployee />
              </AccessHandler>
            }
          />
          <Route path="/addaccess" element={<Access />} />
          <Route
            path="/offersubcomponentlist"
            element={
              <AccessHandler>
                <OfferSubComponentList />
              </AccessHandler>
            }
          />
          <Route
            path="/offersubcomponentupdate"
            element={
              <AccessHandler>
                <UpdateSubComponent />
              </AccessHandler>
            }
          />
          <Route
            path="/componentlist"
            element={
              <AccessHandler>
                <ComponentList />
              </AccessHandler>
            }
          />
          <Route
            path="/componentupdate"
            element={
              <AccessHandler>
                <UpdateComponent />
              </AccessHandler>
            }
          />
          <Route
            path="/production"
            element={
              <AccessHandler>
                <Production />
              </AccessHandler>
            }
          />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
