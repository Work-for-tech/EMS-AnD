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
import { PurchaseMail } from "./Components/Purchase/PurchaseMail";
import { CreateGRN } from "./Components/GRN/page";
import { ListGRN } from "./Components/GRN/list";
import { GRNApproval } from "./Components/GRN/GRNApproval";

function App() {
  const dispatch = useDispatch();

  if (
    window.location.pathname === "/offer" ||
    window.location.pathname === "/offerlist" ||
    window.location.pathname === "/projectlist"
  ) {
    dispatch(offerActions.setInitials());
  }

  return (
    <div className="flex">
      <Router className="w-full">
        <Navigator />
        <Routes>
          <Route path="/companies" element={<Companies />} />
          <Route path="/subComponent" element={<SubComponant />} />
          <Route path="/component" element={<ComponentPage />} />
          <Route path="/offer" element={<Offer />} />
          <Route path="/project" element={<ProjectPage />} />
          <Route path="/offerlist" element={<Revision />} />
          <Route path="/client" element={<Client />} />
          <Route path="/offerpanels" element={<OfferPanel />} />
          <Route path="/offerdetails" element={<OfferList />} />
          <Route path="/offercomponents" element={<OfferComponents />} />
          <Route path="/updateoffer" element={<UpdateOfferPanel />} />
          <Route path="/projectlist" element={<ProjectList />} />
          <Route path="/drawing" element={<Drawing />} />
          <Route path="/export" element={<OfferExcel />} />
          <Route path="/createvendor" element={<CreateVendor />} />
          <Route path="/vendorlist" element={<VendorList />} />
          <Route path="/createstore" element={<CreateStore />} />
          <Route path="/storelist" element={<StoreList />} />
          <Route path="/indent" element={<IndentOffers />} />
          <Route path="/bulkindent" element={<BulkIndent />} />
          <Route path="/indentlist" element={<IndentList />} />
          <Route path="/purchase" element={<Purchase />} />
          <Route path="/purchasemail" element={<PurchaseMail />} />
          <Route path="/creategrn" element={<CreateGRN />} />
          <Route path="/listgrn" element={<ListGRN />} />
          <Route path="/grnapproval" element={<GRNApproval />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
