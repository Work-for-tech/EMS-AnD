import { round } from "lodash";
import React from "react";
import XLSX from "xlsx";
import { Button } from "antd";

export const OfferTable = ({ offer, part }) => {
  console.log(offer);
  console.log(part);
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
        <tbody>
          <tr>
            <td className="text-red-900 font-semibold text-2xl" colSpan={9}>
              EMS PROJECTS PVT. LTD.
            </td>
          </tr>
          <tr>
            <td className="text-left" colSpan={4}>
              Project Name : {offer?.project_name || ""}
            </td>
          </tr>
          <tr>
            <td className="text-left" colSpan={4}>
              Client Name: {offer?.client_name || ""}
            </td>
          </tr>
          <tr>
            <td className="text-left" colSpan={4}>
              Description of Panel: {offer?.description_of_panel || ""}
            </td>
          </tr>
          <tr>
            <td className="text-left" colSpan={4}>
              Qty of Panel: {offer?.Qty_of_panel || ""}
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
          {part.components?.map((e, ind) => {
            console.log(ind);
            return (
              <React.Fragment key={ind}>
                {e.name === "Add Consumables" ? (
                  <>
                    <tr>
                      <td>{alphabet[ind] || ""}</td>
                      <td>Consumables</td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td>{e?.sub_components[0]?.quantity || ""}</td>
                    </tr>
                    {e.sub_components.map((e, i) => {
                      return (
                        <React.Fragment key={i}>
                          <tr>
                            <td>{i + 1 || ""}</td>
                            <td>{e?.desc || ""}</td>
                            <td>{e?.title || ""}</td>
                            <td></td>
                            <td></td>
                            <td>{e?.quantity || ""}</td>
                            <td>{e?.company?.price || ""}</td>
                            <td>{e?.company?.discount || ""} </td>
                            <td>
                              {e?.company?.price *
                                e?.quantity *
                                (1 - e?.company?.discount / 100) || ""}
                            </td>
                          </tr>
                        </React.Fragment>
                      );
                    })}
                  </>
                ) : (
                  <>
                    <tr>
                      <td>{alphabet[ind]}</td>
                      <td>{e?.name}</td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td>{e?.sub_components[0]?.quantity}</td>
                    </tr>
                    {e?.sub_components?.map((e, i) => {
                      return (
                        <React.Fragment key={i}>
                          <tr>
                            <td>{i + 1 || ""}</td>
                            <td>{e?.desc || ""}</td>
                            <td>{e?.catalog_number || ""}</td>
                            <td>{e?.rating_value || ""}</td>
                            <td>{e?.company?.company_name?.name || ""}</td>
                            {/* <td>{e.sub_components[0].name}</td> */}
                            <td>{e?.quantity || ""}</td>
                            <td>{e?.company?.price || ""}</td>
                            <td>{e?.company?.discount || ""} </td>
                            <td>
                              {round(
                                e?.company?.price *
                                  e?.quantity *
                                  (1 - e?.company?.discount / 100),
                                3
                              ) || ""}
                            </td>
                          </tr>
                        </React.Fragment>
                      );
                    })}
                  </>
                )}
              </React.Fragment>
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
            <td>{part.price || ""}</td>
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
            <td>{part.profit_percentage || ""}</td>
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
            <td>{part.profit || ""}</td>
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
            <td>{part.total_price || ""}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};
