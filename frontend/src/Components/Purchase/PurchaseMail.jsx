import React, { useEffect, useState } from "react";
import XLSX from "xlsx";
import { Button, message, Input, Select } from "antd";
import { getParticularPurchase, sendMail, updatePurchaseAPI } from "../../APIs/purchase";
import { getClientById } from "../../APIs/client";
import { getEmployeeList } from "../../APIs/employee";

export const PurchaseMail = ({ sentEmail, emailpurchaseId, setSentEmail }) => {
  const [data, setData] = useState([]);
  const [clientData, setClientData] = useState([]);
  const [inputs, setInputs] = useState(true);
  const [employee, setEmployee] = useState([]);
  const [preparedBy, setPreparedBy] = useState([]);
  const [authorizedBy, setAuthorizedBy] = useState([]);
  const [paymentTerms, setPaymentTerms] = useState("")

  const sGstRef = React.useRef();
  const cGstRef = React.useRef();
  const tandcRef = React.useRef();
  const deliveryAddressRef = React.useRef();
  const packingCostRef = React.useRef();
  const otherCostRef = React.useRef();
  const transportationCostRef = React.useRef();

  const updatePurchase = async () => {
    const data = {
      sGst: Number(sGstRef.current.input.value),
      cGst: Number(cGstRef.current.input.value),
      paymentTerms: paymentTerms,
      tandc: tandcRef.current.input.value,
      deliveryAddress: deliveryAddressRef.current.input.value,
      transportationCost: Number(transportationCostRef.current.input.value),
      packingCost: Number(packingCostRef.current.input.value),
      otherCost: Number(otherCostRef.current.input.value),
      grandTotal: Number(transportationCostRef.current.input.value) + Number(packingCostRef.current.input.value) + Number(otherCostRef.current.input.value),
      preparedBy: preparedBy,
      authorizedBy: authorizedBy,
    };

    console.log(data)

    const response = await updatePurchaseAPI(emailpurchaseId, data);
    console.log(response);
    if (response.type === "success") {
      message.success("Successfully Updated Purchase");
      setInputs(false)
    } else if (response.type === "error") {
      message.error("Failed to Update Purchase");
    }
  }

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
        setInputs(false)
      }
    } else if (response.type === "error") {
      console.log(response.message);
    }
  };

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

  if (data.length !== 0)
    return (
      <>
        {emailpurchaseId && (
          <div>
            {
              inputs &&
              <div className="flex flex-col gap-5">
                <p>
                  <span className="font-semibold">State Gst</span>
                  <Input
                    ref={sGstRef}
                    placeholder="sGst" />
                </p>
                <p>
                  <span className="font-semibold">Central Gst</span>
                  <Input ref={cGstRef} placeholder="cGst" />
                </p>
                <p>
                  <span className="font-semibold">Payment Terms</span>
                  <Select
                    onChange={(value) => setPaymentTerms(value)}
                    className="w-full" placeholder="Prepared By" options={
                      [
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
                          value: 180
                        }
                      ]
                    } />
                </p>
                <p>
                  <span className="font-semibold">Terms and Conditions</span>
                  <Input
                    ref={tandcRef}
                    placeholder="tandc" />
                </p>
                <p>
                  <span className="font-semibold">Delivery Address</span>
                  <Input
                    ref={deliveryAddressRef}
                    placeholder="delivery Address" />
                </p>
                <p>
                  <span className="font-semibold">Transportation Cost</span>
                  <Input
                    ref={transportationCostRef}
                    placeholder="Transportation Cost " />
                </p>
                <p>
                  <span className="font-semibold">Packing Cost</span>
                  <Input
                    ref={packingCostRef}
                    placeholder="Packing Cost" />
                </p>
                <p>
                  <span className="font-semibold">Other Cost</span>
                  <Input
                    ref={otherCostRef}
                    placeholder="Other Cost" />
                </p>
                <p>
                  <div className="font-semibold">Prepared By</div>
                  <Select
                    onChange={(value) => setPreparedBy(value)}
                    className="w-full" placeholder="Prepared By" options={
                      employee.map((item) => ({
                        value: item._id,
                        label: item.name,
                      }))
                    } />
                </p>
                <p>
                  <div className="font-semibold">Authorized By</div>
                  <Select
                    onChange={(value) => setAuthorizedBy(value)}
                    className="w-full" placeholder="Authorized By" options={
                      employee.map((item) => ({
                        value: item._id,
                        label: item.name,
                      }))
                    } />
                </p>
                <Button className="bg-blue-700 m-5 text-white" onClick={() => {
                  updatePurchase()
                }}>Update</Button>
              </div>
            }
            {
              !inputs &&
              <div>
                <Button
                  className="bg-blue-700 text-white w-full flex items-center justify-center m-3"
                  onClick={async () => {
                    const csvData = tableToCSV(tableRef.current);
                    const blob = new Blob([csvData], { type: "text/csv" });
                    const file = new File([blob], "Purchase.csv", {
                      type: "text/csv",
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
                >
                  Send Email
                </Button>
                <table key={data._id} ref={tableRef} className="text-left">
                  <tbody>
                    <tr>
                      <td className="font-semibold text-xl" colSpan={9}>
                        EMS Project Pvt. Ltd.
                      </td>
                    </tr>
                    <tr>
                      <td className="font-semibold" colSpan={9}>
                        Factory : {data.vendorId.address}
                      </td>
                    </tr>
                    <tr>
                      <td className="font-semibold" colSpan={9}>
                        OFF : {clientData.address}
                      </td>
                    </tr>
                    <tr>
                      <td className="font-semibold" colSpan={9}>
                        Contact - {clientData.phoneNumber} Email id -{" "}
                        {clientData.email}
                        Website :- emsgroup.net
                      </td>
                    </tr>
                    <tr>
                      <th className="p-2" colSpan={3}>
                        Purchase Order No. : EMSPL/933/2383/3234
                      </th>
                      <th className="p-2" colSpan={3}>
                        Order Date : 10/10/2023
                      </th>
                      <th className="p-2" colSpan={3}>
                        Delivery : Days/Date - 4 to 5 Days
                      </th>
                    </tr>
                    <tr>
                      <th className="p-2" colSpan={3}>
                        Indent No. : {data.indentId._id}
                      </th>
                      <th className="p-2" colSpan={3}>
                        Material Indent Date : 08/10/2023
                      </th>
                      <th className="p-2" colSpan={3}>
                        Department : Mechanial
                      </th>
                    </tr>
                    <tr>
                      <th className="p-2" colSpan={6}>
                        To,
                      </th>
                      <th className="p-2" colSpan={3}>
                        COMPANY COMMERCIAL DETAIL
                      </th>
                    </tr>
                    <tr>
                      <th className="p-2" colSpan={6}>
                        Name : {data.vendorId.vendorName},
                      </th>
                      <th className="p-2" colSpan={3}>
                        GST No : {data.vendorId.gst}
                      </th>
                    </tr>
                    <tr>
                      <td className="p-2" colSpan={6}>
                        Address : {data.vendorId.address}
                      </td>
                      <td></td>
                      <td className="p-2" colSpan={3}>
                        PAN No : {data.vendorId.panNo}
                      </td>
                    </tr>
                    <tr>
                      <td className="p-2" colSpan={6}>
                        Phone No : {data.vendorId.phoneNumber1}
                      </td>
                    </tr>
                    <tr>
                      <td className="p-2" colSpan={6}>
                        Contact Person :- Rahul Kamble (9823475827)
                      </td>
                    </tr>
                    <tr>
                      <td className="p-2" colSpan={6}>
                        Email Id :
                        <a className="underline" href="mailto:dummymail@gmail.com">
                          {data.vendorId.email1}
                        </a>
                      </td>
                    </tr>
                    <tr>
                      <th className="p-2">Sr.No.</th>
                      <th className="p-2">Catalog Number</th>
                      <th className="p-2" colSpan={2}>
                        Description
                      </th>
                      <th className="p-2">Rating Value</th>
                      <th className="p-2">Qty</th>
                      <th className="p-2">Net Amount</th>
                      <th className="p-2">S GST</th>
                      <th className="p-2">C GST</th>
                      <th className="p-2">Transportation Cost</th>
                      <th className="p-2">Packing Cost</th>
                      <th className="p-2">Other Cost</th>
                      <th className="p-2">Grand Total</th>
                    </tr>
                    {data.items.map((item, index) => (
                      <tr key={index}>
                        <td className="p-2">{index + 1}</td>
                        <td className="p-2">{item.subcomponent.catalog_number ?? "-"}</td>
                        <td className="p-2" colSpan={2}>
                          {item.subcomponent.desc ?? "-"}
                        </td>
                        <td className="p-2">{item.subcomponent.rating_value ?? "-"}</td>
                        <td className="p-2">{item.quantity ?? "-"}</td>
                        <td className="p-2">{item.subcomponent.company.price ?? "-"}</td>
                        <td className="p-2">{data.sGst ?? "-"}</td>
                        <td className="p-2">{data.cGst ?? "-"}</td>
                        <td className="p-2">{data.transportationCost ?? "-"}</td>
                        <td className="p-2">{data.packingCost ?? "-"}</td>
                        <td className="p-2">{data.otherCost ?? "-"}</td>
                        <td className="p-2">{data.grandTotal ?? "-"}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            }

          </div>

        )}
      </>
    );
};
