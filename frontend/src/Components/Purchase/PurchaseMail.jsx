import React, { useEffect, useState } from "react";
import XLSX from "xlsx";
import { Button, message, Input, Select, Table } from "antd";
import {
  getParticularPurchase,
  sendMail,
  updatePurchaseAPI,
} from "../../APIs/purchase";
import { getClientById } from "../../APIs/client";
import { getEmployeeList } from "../../APIs/employee";
import html2pdf from "html2pdf.js";
import html2canvas from "html2canvas";
import { List, Typography } from "antd";

export const PurchaseMail = ({ sentEmail, emailpurchaseId, setSentEmail }) => {
  const [data, setData] = useState([]);
  const [clientData, setClientData] = useState([]);
  const [inputs, setInputs] = useState(true);
  const [employee, setEmployee] = useState([]);
  const [preparedBy, setPreparedBy] = useState([]);
  const [authorizedBy, setAuthorizedBy] = useState([]);
  const [paymentTerms, setPaymentTerms] = useState("");

  const sGstRef = React.useRef();
  const cGstRef = React.useRef();
  const tandcRef = React.useRef();
  const deliveryAddressRef = React.useRef();
  const packingCostRef = React.useRef();
  const otherCostRef = React.useRef();
  const transportationCostRef = React.useRef();

  const paymentT = {
    1: "1 Day",
    7: "1 Week",
    14: "2 Weeks",
    21: "3 Weeks",
    180: "6 Months",
  };

  const updatePurchase = async () => {
    const data = {
      sGst: Number(sGstRef.current.input.value),
      cGst: Number(cGstRef.current.input.value),
      paymentTerms: paymentTerms,
      tandc: tandcRef.current
        ? tandcRef.current.resizableTextArea?.textArea?.value
        : "",
      deliveryAddress: deliveryAddressRef
        ? deliveryAddressRef.resizableTextArea?.textArea?.value
        : "",
      transportationCost: Number(transportationCostRef.current.input.value),
      packingCost: Number(packingCostRef.current.input.value),
      otherCost: Number(otherCostRef.current.input.value),
      grandTotal:
        Number(transportationCostRef.current.input.value) +
        Number(packingCostRef.current.input.value) +
        Number(otherCostRef.current.input.value),
      preparedBy: preparedBy,
      authorizedBy: authorizedBy,
    };

    console.log(data);

    const response = await updatePurchaseAPI(emailpurchaseId, data);
    console.log(response);
    if (response.type === "success") {
      message.success("Successfully Updated Purchase");
      setInputs(false);
    } else if (response.type === "error") {
      message.error("Failed to Update Purchase");
    }
  };

  const getemployeeList = async () => {
    const response = await getEmployeeList();
    console.log(response);
    if (response.type === "success") {
      console.log(response.data.data);
      setEmployee(response.data.data);
    } else if (response.type === "error") {
      console.log(response.message);
    }
  };

  useEffect(() => {
    getemployeeList();
  }, []);

  const tableRef = React.useRef();

  const getPurchaseData = async () => {
    const response = await getParticularPurchase(emailpurchaseId);
    console.log(response);
    if (response.type === "success") {
      console.log(response.data.data);
      setData(response.data.data);
      const clientData = await getClientById(
        response.data?.data.indentId.clientId
      );
      setClientData(clientData.data.data);
      if (response.data.data.sGst) {
        setInputs(false);
      }
    } else if (response.type === "error") {
      console.log(response.message);
    }
  };

  const { TextArea } = Input;

  const columns = [
    {
      title: "Sr.No.",
      dataIndex: "srNo",
      key: "srNo",
    },
    {
      title: "HSN Code",
      dataIndex: "hsnCode",
      key: "hsnCode",
    },
    {
      title: "Product Description",
      dataIndex: "productDescription",
      key: "productDescription",
    },
    {
      title: "Size",
      dataIndex: "size",
      key: "size",
    },
    {
      title: "Qty",
      dataIndex: "qty",
      key: "qty",
    },
    {
      title: "UOM",
      dataIndex: "uom",
      key: "uom",
    },
    {
      title: "Rate",
      dataIndex: "rate",
      key: "rate",
    },
    {
      title: "Unit",
      dataIndex: "unit",
      key: "unit",
    },
    {
      title: "Net Amount",
      dataIndex: "netAmount",
      key: "netAmount",
    },
    {
      title: "SGST",
      dataIndex: "sGst",
      key: "sGst",
    },
    {
      title: "CGST",
      dataIndex: "cGst",
      key: "cGst",
    },
  ];



  useEffect(() => {
    getPurchaseData();
  }, []);

  function tableToCSV(table) {
    const rows = table.querySelectorAll("tr");
    const csv = [];

    for (let i = 0; i < rows.length; i++) {
      const row = [];
      const cols = rows[i].querySelectorAll("td, th");

      console.log(cols);

      for (let j = 0; j < cols.length; j++) {
        row.push(cols[j].innerText);
      }
      csv.push(row.join(","));
    }

    return csv.join("\n");
  }

  const contentRef = React.useRef();
  console.log(data);

  if (data.length !== 0)
    return (
      <>
        <Button
          onClick={async () => {
            const opt = {
              margin: 0,
              filename: "myfile.pdf",
              image: { type: "jpeg", quality: 0.98 },
              html2canvas: { scale: 2 },
              jsPDF: { unit: "in", format: "letter", orientation: "landscape" },
            };

            const pdf = await html2pdf()
              .from(contentRef.current)
              .set(opt)
              .output("blob");
            const blob = new Blob([pdf], { type: "application/pdf" });

            const file = new File([blob], "Report.pdf", {
              type: "application/pdf",
            });

            const response = await sendMail({
              purchaseId: data._id,
              file: file,
            });

            if (response.type === "success") {
              setSentEmail(true);
              message.success("Successfully Sent Email");
            } else if (response.type === "error") {
              message.error("Failed to Send Email");
            }
          }}
          className="w-full flex justify-center text-white bg-blue-600"
        >
          Send Mail
        </Button>
        <div>
          <div ref={contentRef} className="w-full p-5">
            <section className="w-full flex justify-evenly">
              <p className="w-3/5 p-4 border-b-0 text-3xl font-semibold border-2 border-zinc-400">
                EMS PROJECTS PVT. LTD.
              </p>
              <p className="w-2/5 p-4 border-l-0 border-b-0 text-3xl font-semibold border-2 border-zinc-400">
                PURCHASE ORDER
              </p>
            </section>
            <section className="flex w-full">
              <div className="w-3/5 border-2 border-zinc-400 p-2">
                <List className="">
                  <List.Item>
                    <p className="bg-yellow-300 p-3">Factory : Survey No.-478, Near Kuha Bus Stand, Village Kuha, Ta.Dascroi, Ahmedabad 382433.</p>
                  </List.Item>
                  <List.Item>
                    <p className="">Office : 2nd Floor, 3rd Eye Vision, Opp. Parimal Garden, C.G.Road, Ahmedabad 380006.</p>
                  </List.Item>
                  <List.Item>
                    <p className="">Contact - 0909906028O, Email id - info@emsgroup.net, Web site:- www.emsgroup.net</p>
                  </List.Item>

                </List>

              </div>
              <div className="w-2/5 border-2 border-l-0 border-zinc-400 p-2">
                <List
                  dataSource={["PROJECT DETAIL : PAO78"]}
                  renderItem={(item) => (
                    <List.Item>
                      {item}
                    </List.Item>
                  )}
                />
              </div>
            </section>
            <section className="flex justify-evenly w-full">
              <div className="w-1/3 p-2 border-2 border-r-0 border-t-0 border-zinc-400">
                <List
                  dataSource={[
                    "Purchase No:- EMSPL/272/2022-23",
                    "Indent No. NA",
                  ]}
                  renderItem={(item) => (
                    <List.Item>
                      {item}
                    </List.Item>
                  )}
                />
              </div>
              <div className="w-1/3 p-2 border-2 border-zinc-400 border-r-0 border-t-0">
                <List
                  dataSource={[
                    "Order Date :- 10/10/2022",
                    "Material Indent Date :- 08/10/2022",
                  ]}
                  renderItem={(item) => (
                    <List.Item>
                      {item}
                    </List.Item>
                  )}
                />
              </div>
              <div className="w-1/3 border-2 p-2 border-zinc-400 border-t-0">
                <List
                  dataSource={[
                    "Delivery Days/Date :- 4 to 5 Days",
                    "Department :- Mechanial",
                  ]}
                  renderItem={(item) => (
                    <List.Item>
                      {item}
                    </List.Item>
                  )}
                />
              </div>
            </section>
            <section className="flex w-full">
              <div className="w-2/3 p-2 border-2 border-zinc-400 border-t-0">
                <List
                  dataSource={["To", "Name : " + data.vendorId.vendorName, "Add : " + data.vendorId.address, "Phone No. : " + data.vendorId.phoneNumber1, "Contact Person :" + data.vendorId.phoneNumber2, "Email-id : " + data.vendorId.email1]}
                  renderItem={(item) => (
                    <List.Item>
                      {item}
                    </List.Item>
                  )}
                />
              </div>
              <div className="w-1/3 p-2 border-2 border-zinc-400 border-t-0 border-l-0">
                <List
                  dataSource={["GST No. :- " + data.vendorId.gst, "PAN No. :- " + data.vendorId.panNo]}
                  renderItem={(item) => (
                    <List.Item>
                      {item}
                    </List.Item>
                  )}
                />
              </div>
            </section>
            <section className="w-full text-center ">
              <Table columns={columns} dataSource={data.items.map((item, index) => ({
                key: index,
                srNo: index + 1,
                hsnCode: item.subcomponent.catalog_number,
                productDescription: item.subcomponent.desc,
                size: item.subcomponent.rating_value,
                qty: item.quantity,
                uom: "NOs",
                rate: item.subcomponent.company.price,
                unit: "Kgs.",
                netAmount: index + 1 === (data.items.length + 1) / 2 ? "As Per Actual Weight" : "",
                sGst: data.sGst,
                cGst: data.cGst,
              }))} />
            </section>
            <List
              dataSource={[
                "Transportation : F.O.R Kuna",
                "Payment Terms : " + paymentT[data.paymentTerms],
              ]}
              renderItem={(item) => (
                <List.Item>
                  <Typography.Text mark></Typography.Text> {item}
                </List.Item>
              )}
            />
            <section></section>
            <section></section>
            <section className="w-full flex">
              <div className="w-3/5">
                <List
                  dataSource={[
                    "Terms and Conditions",
                    data.tandc ?? "-",
                  ]}
                  renderItem={(item) => (
                    <List.Item>
                      {item}
                    </List.Item>
                  )}
                />
              </div>
              <div className="w-1/2">
                <List
                  dataSource={[
                    {
                      vkey: "Total Amount Before Tax",
                      value: data.sum ?? "-",
                    },
                    {
                      vkey: "Transportation Cost",
                      value: data.transportationCost,
                    },
                    {
                      vkey: "Packing Cost",
                      value: data.packingCost,
                    },
                    {
                      vkey: "Other Cost",
                      value: data.otherCost,
                    },
                    {
                      vkey: "SGST",
                      value: data.sGst,
                    },
                    {
                      vkey: "CGST",
                      value: data.cGst,
                    },
                    {
                      vkey: "Grand Total",
                      value: data.grandTotal,
                    },
                  ]}
                  renderItem={(item) => (
                    <List.Item>
                      <span className="pr-5">{item.vkey}</span>
                      {item.value}
                    </List.Item>
                  )}
                />
              </div>
            </section>
          </div>
        </div>
        {emailpurchaseId && (
          <div>
            {
              <div className="flex flex-col gap-5">
                <p>
                  <span className="font-semibold">State Gst</span>
                  <Input ref={sGstRef} placeholder="sGst" />
                </p>
                <p>
                  <span className="font-semibold">Central Gst</span>
                  <Input ref={cGstRef} placeholder="cGst" />
                </p>
                <p>
                  <span className="font-semibold">Payment Terms</span>
                  <Select
                    onChange={(value) => setPaymentTerms(value)}
                    className="w-full"
                    placeholder="Prepared By"
                    options={[
                      {
                        value: 1,
                        label: "1 Day",
                      },
                      {
                        value: 7,
                        label: "1 Week",
                      },
                      {
                        value: 14,
                        label: "2 Weeks",
                      },
                      {
                        value: 21,
                        label: "3 Weeks",
                      },
                      {
                        label: "6 Months",
                        value: 180,
                      },
                    ]}
                  />
                </p>
                <p>
                  <span className="font-semibold">Terms and Conditions</span>
                  <TextArea rows={4} ref={tandcRef} placeholder="tandc" />
                </p>
                <p>
                  <span className="font-semibold">Delivery Address</span>
                  <TextArea
                    rows={4}
                    ref={deliveryAddressRef}
                    placeholder="delivery Address"
                  />
                </p>
                <p>
                  <span className="font-semibold">Transportation Cost</span>
                  <Input
                    ref={transportationCostRef}
                    placeholder="Transportation Cost "
                  />
                </p>
                <p>
                  <span className="font-semibold">Packing Cost</span>
                  <Input ref={packingCostRef} placeholder="Packing Cost" />
                </p>
                <p>
                  <span className="font-semibold">Other Cost</span>
                  <Input ref={otherCostRef} placeholder="Other Cost" />
                </p>
                <p>
                  <div className="font-semibold">Prepared By</div>
                  <Select
                    onChange={(value) => setPreparedBy(value)}
                    className="w-full"
                    placeholder="Prepared By"
                    options={employee.map((item) => ({
                      value: item._id,
                      label: item.name,
                    }))}
                  />
                </p>
                <p>
                  <div className="font-semibold">Authorized By</div>
                  <Select
                    onChange={(value) => setAuthorizedBy(value)}
                    className="w-full"
                    placeholder="Authorized By"
                    options={employee.map((item) => ({
                      value: item._id,
                      label: item.name,
                    }))}
                  />
                </p>
                <Button
                  className="bg-blue-700 m-5 text-white"
                  onClick={() => {
                    updatePurchase();
                  }}
                >
                  Update
                </Button>
              </div>
            }
          </div>
        )}
      </>
    );
};
