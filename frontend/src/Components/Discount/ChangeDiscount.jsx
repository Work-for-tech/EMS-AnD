import { Button, Input, message } from "antd";
import React, { useEffect, useRef } from "react";
import { updateBulkDiscount, updateDiscount } from "../../APIs/indent";

export const ChangeDiscount = ({ discount, record }) => {
  const discountRef = useRef(null);

  useEffect(() => {
    console.log(record);
    discountRef.current.input.value = discount;
  }, [discount]);

  const UpdateHandler = async () => {
    if (record.type === "bulk") {
      const response = await updateBulkDiscount({
        _id: record.indentId,
        discount: discountRef.current.input.value,
        itemId: record.key,
      });
      if (response.type === "error") {
        message.error("Discount Cannot be updated");
      } else {
        message.success("Discount Updated");
      }
    } else {
      const response = await updateDiscount({
        _id: record.indentId,
        discount: discountRef.current.input.value,
        itemId: record.key,
      });

      if (response.type === "error") {
        message.error("Discount Cannot be updated");
      } else {
        message.success("Discount Updated");
      }
    }
  };

  return (
    <div className="flex flex-row gap-2">
      <Input className="w-16" type="number" ref={discountRef} />
      <Button onClick={UpdateHandler}>Update</Button>
    </div>
  );
};
