import { round } from "lodash";
import React from "react";
import XLSX from "xlsx";
import { Button } from "antd";

export const OfferTable = ({ offer }) => {
  const d = offer?.panels_to_be_created;

  const alphabet = Array.from({ length: 26 }, (_, i) =>
    String.fromCharCode("A".charCodeAt(0) + i)
  );

  return (
    <div className="w-full">
      <Button
        className="bg-blue-700 text-white"
        onClick={() => {
          const workbook = XLSX.utils.book_new();

          const worksheet = XLSX.utils.table_to_sheet(
            document.getElementById("TableToExport")
          );

          // Add the worksheet to the workbook
          XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");

          // Create a blob from the workbook and save it as an Excel file
          XLSX.writeFile(workbook, "styled_excel.xlsx");
        }}
      >
        Export as XLSX
      </Button>
      <table id="TableToExport" className="w-full text-center">
        <tr>
          <td className="text-red-900 font-semibold text-2xl" colSpan={9}>
            EMS PROJECTS PVT. LTD.
          </td>
        </tr>
        <tr>
          <td className="text-left" colSpan={4}>
            Project Name : {offer?.project_name}
          </td>
        </tr>
        <tr>
          <td className="text-left" colSpan={4}>
            Client Name: {offer?.client_name}
          </td>
        </tr>
        <tr>
          <td className="text-left" colSpan={4}>
            Description of Panel: {offer?.description_of_panel}
          </td>
        </tr>
        <tr>
          <td className="text-left" colSpan={4}>
            Qty of Panel: {offer?.Qty_of_panel}
          </td>
        </tr>

        <tr>
          <th className="p-5">Sr.No.</th>
          <th className="p-5">Description</th>
          <th className="p-5">Cat. No</th>
          <th className="p-5">Rating</th>
          <th className="p-5">Make</th>
          <th className="p-5">Qty</th>
          <th className="p-5">Rate</th>
          <th className="p-5">Discount</th>
          <th className="p-5">Amount</th>
        </tr>
        {d[0]?.parts[0]?.components?.map((e, i) => {
          if (e.name === "Add Consumables")
            return (
              <>
                <tr>
                  <td>{alphabet[i]}</td>
                  <td>Consumables</td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td>{e?.sub_components[0]?.quantity}</td>
                </tr>
                {e.sub_components.map((e, i) => {
                  return (
                    <>
                      <tr>
                        <td>{i + 1}</td>
                        <td>{e?.desc}</td>
                        <td>{e?.title}</td>
                        <td></td>
                        <td></td>
                        <td>{e?.quantity}</td>
                        <td>{e?.company?.price}</td>
                        <td>{e?.company?.discount} </td>
                        <td>
                          {e?.company?.price *
                            e?.quantity *
                            (1 - e?.company?.discount / 100)}
                        </td>
                      </tr>
                    </>
                  );
                })}
              </>
            );
          else
            return (
              <>
                <tr>
                  <td>{alphabet[i]}</td>
                  <td>{e?.name}</td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td>{e?.sub_components[0]?.quantity}</td>
                </tr>
                {e?.sub_components?.map((e, i) => {
                  return (
                    <>
                      <tr>
                        <td>{i + 1}</td>
                        <td>{e?.desc}</td>
                        <td>{e?.catalog_number}</td>
                        <td>{e?.rating_value}</td>
                        <td>{e?.company?.company_name?.name}</td>
                        {/* <td>{e.sub_components[0].name}</td> */}
                        <td>{e?.quantity}</td>
                        <td>{e?.company?.price}</td>
                        <td>{e?.company?.discount} </td>
                        <td>
                          {round(
                            e?.company?.price *
                              e?.quantity *
                              (1 - e?.company?.discount / 100),
                            3
                          )}
                        </td>
                      </tr>
                    </>
                  );
                })}
              </>
            );
        })}
        <tr>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td>RMC</td>
          <td>{d[0]?.parts[0]?.price}</td>
        </tr>
        <tr>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td>Profit Percentage</td>
          <td>{d[0]?.parts[0]?.profit_percentage}</td>
        </tr>
        <tr>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td>Net Profit</td>
          <td>{d[0]?.parts[0]?.profit}</td>
        </tr>

        <tr>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td>Offer</td>
          <td>{d[0]?.parts[0]?.total_price}</td>
        </tr>
      </table>
    </div>
  );
};
