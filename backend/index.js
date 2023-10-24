const express = require("express");
const cors = require("cors");
const app = express();

// dot env config and database config
require("dotenv").config();
require("./config/dbConfig").dbConnect();

// const userMiddleware = require("./middleware/users.middleware")

// enable statements
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use("/uploads", express.static("Uploads"));

// Here
var base_url = "/inverntoryManagment/api/v1/public";

// users routes
const clientRouters = require("./routes/clientRoutes");
app.use(base_url + "/client", clientRouters);

// Employees routes
const employeeRouters = require("./routes/employeeRoutes");
app.use(base_url + "/employee", employeeRouters);

// machine routes
const machineRouters = require("./routes/machineRoutes");
app.use(base_url + "/machine", machineRouters);

// model wise machine adding controller
const modelByMachineRoutes = require("./routes/modelNumberRoutes");
app.use(base_url + "/model", modelByMachineRoutes);

const projectRoutes = require("./routes/ProjectRoutes");
app.use(base_url + "/project", projectRoutes);

const companyRoutes = require("./routes/CompanyRoutes");
app.use(base_url + "/company", companyRoutes);

const subComponentRoutes = require("./routes/SubComponentRoutes");
app.use(base_url + "/subcomponent", subComponentRoutes);

// DeOkumar
const project_offerRoutes = require("./routes/Offer_projectRoutes");
app.use(base_url + "/project_offer", project_offerRoutes);

// DeOkumar
const componentRoutes = require("./routes/ComponentRoutes");
app.use(base_url + "/component", componentRoutes);

// DeOkumar
const offerRoutes = require("./routes/OfferRoutes");
app.use(base_url + "/offer", offerRoutes);

// DeOkumar
const revisionRoutes = require("./routes/RevisionRoutes");
app.use(base_url + "/revision", revisionRoutes);

// DeOkumar
const offerSubComponentRoutes = require("./routes/OfferSubComponentRoutes");
app.use(base_url + "/offerSubComponent", offerSubComponentRoutes);

// DeOkumar
const offerComponentRoutes = require("./routes/OfferComponentRoutes");
app.use(base_url + "/offerComponent", offerComponentRoutes);

// DeOkumar
const drawingRoutes = require("./routes/drawingRoutes");
app.use(base_url + "/drawing", drawingRoutes);

const storeRoutes = require("./routes/storeRoutes");
app.use(base_url + "/store", storeRoutes);

const vendorRoutes = require("./routes/vendorRoutes");
app.use(base_url + "/vendor", vendorRoutes);

const indentRoutes = require("./routes/indentRoutes");
app.use(base_url + "/indent", indentRoutes);

const purchaseRoutes = require("./routes/purchaseRoutes");
app.use(base_url + "/purchase", purchaseRoutes);

const grnRoutes = require("./routes/grnRoutes");
app.use(base_url + "/grn", grnRoutes);

const grnApprovalPendingRoutes = require("./routes/grnApprovalPendingRoutes");
app.use(base_url + "/grn/approval/pending", grnApprovalPendingRoutes);

const receivedItemRoutes = require("./routes/receivedItemsRoutes");
app.use(base_url + "/receiveditem", receivedItemRoutes);

const issueRoutes = require("./routes/issueRoutes");
app.use(base_url + "/issue", issueRoutes);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(process.env.PORT, () => {
  console.log("server listen on port no", process.env.PORT);
});
