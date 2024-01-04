import { Table, Tooltip, message } from "antd";
import {
  DeleteIcon,
  MoreHorizontal,
  PlusCircle,
  Redo2,
  Trash2,
} from "lucide-react";
import React, { useEffect, useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { deleteEmployee, getEmployeeList } from "../../APIs/employee";

export const Employeelist = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [employee, setEmployee] = useState([]);
  const [arrow, setArrow] = useState("Show");
  const mergedArrow = useMemo(() => {
    if (arrow === "Hide") {
      return false;
    }
    if (arrow === "Show") {
      return true;
    }
    return {
      pointAtCenter: true,
    };
  }, [arrow]);

  const columns = [
    {
      title: "name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "phoneNumber",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
    },
    {
      title: "phone Number (Optional)",
      dataIndex: "phoneNumber2",
      key: "phoneNumber2",
    },
    {
      title: "E-Mail",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "E-Mail (Optional)",
      dataIndex: "email2",
      key: "email2",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Designation",
      dataIndex: "designation",
      key: "designation",
    },
    {
      title: "Department",
      dataIndex: "department",
      key: "department",
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      render: (text, record) => (
        <div className="flex flex-row gap-2">
          <Tooltip
            placement="top"
            title={"See More Details"}
            arrow={mergedArrow}
          >
            <button
              className="text-blue-600 hover:text-blue-300"
              onClick={() => {
                localStorage.setItem("employee", JSON.stringify(record));
                navigate("/updateemployee");
              }}
            >
              <Redo2 />
            </button>
          </Tooltip>
          <Tooltip
            placement="top"
            title={"Access Management"}
            arrow={mergedArrow}
          >
            <button
              className="text-blue-600 hover:text-blue-300"
              onClick={() => {
                console.log(record);
                localStorage.setItem("employeeId", JSON.stringify(record.key));
                navigate("/addAccess");
              }}
            >
              <PlusCircle />
            </button>
          </Tooltip>
          <Tooltip
            placement="top"
            title={"Delete Employee"}
            arrow={mergedArrow}
          >
            <button
              className="text-red-600 hover:text-red-300"
              onClick={() => {
                console.log(record.key);
                deleteEmployee(record.key).then((res) => {
                  console.log(res);
                  if (res.data) {
                    message.success("Employee Deleted Successfully");
                    getEmployeeList().then((res) => {
                      const data = res.data.data.map((e) => {
                        return {
                          key: e._id,
                          name: e.name,
                          phoneNumber: e.phoneNumber,
                          phoneNumber2: e.phoneNumber2,
                          email: e.email,
                          email2: e.email2,
                          address: e.address,
                          designation: e.designation,
                          department: e.department,
                        };
                      });
                      setEmployee(data);
                    });
                  }
                });
              }}
            >
              <Trash2 />
            </button>
          </Tooltip>
        </div>
      ),
    },
  ];

  useEffect(() => {
    getEmployeeList().then((res) => {
      const data = res.data.data.map((e) => {
        return {
          key: e._id,
          name: e.name,
          phoneNumber: e.phoneNumber,
          phoneNumber2: e.phoneNumber2,
          email: e.email,
          email2: e.email2,
          address: e.address,
          designation: e.designation,
          department: e.department,
        };
      });
      setEmployee(data);
    });
  }, []);

  console.log(employee);
  return (
    <div className="w-full min-h-screen bg-[#f3f7ff]">
      <p className="text-3xl text-blue-800 font-semibold p-4">Employee List</p>

      <div className="rounded-md bg-white flex flex-col m-4">
        <>
          <p className="text-blue-800 font-semibold text-xl p-5">
            Empolyee List
          </p>
          <div className="w-full">
            <Table columns={columns} dataSource={employee} />
          </div>
        </>
      </div>
    </div>
  );
};
