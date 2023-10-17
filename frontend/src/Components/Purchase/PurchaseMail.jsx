import React, { useEffect, useState } from "react";
import XLSX from "xlsx";
import { Button, message } from "antd";
import { getParticularPurchase, sendMail } from "../../APIs/purchase";
import { getClientById } from "../../APIs/client";

export const PurchaseMail = ({ sentEmail, emailpurchaseId, setSentEmail }) => {
  const [data, setData] = useState([]);
  const [clientData, setClientData] = useState([]);

  console.log(emailpurchaseId);

  const tableRef = React.useRef();

  const getPurchaseData = async () => {
    const response = await getParticularPurchase(emailpurchaseId);
    console.log(response);
    if (response.type === "success") {
      console.log(response.data.data);
      setData(response.data.data);
      const clientData = await getClientById(
        response.data.data.indentId.clientId
      );
      setClientData(clientData.data.data);
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
            <Button
              className="bg-blue-700 text-white"
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
                </tr>
                {data.items.map((item, index) => (
                  <tr key={index}>
                    <td className="p-2">{index + 1}</td>
                    <td className="p-2">{item.subcomponent.catalog_number}</td>
                    <td className="p-2" colSpan={2}>
                      {item.subcomponent.desc}
                    </td>
                    <td className="p-2">{item.subcomponent.rating_value}</td>
                    <td className="p-2">{item.quantity}</td>
                    <td className="p-2">{item.subcomponent.company.price}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </>
    );
};
