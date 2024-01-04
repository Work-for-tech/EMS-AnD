import { Button, Checkbox, Input, Select, message } from "antd";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { finishingDetails, getCompleteDetails } from "../../APIs/project";

export const FinishProject = () => {
  const navigate = useNavigate();
  const [submitForm, setSubmitForm] = useState({
    companyName: "",
    ownerName: "",
    projectId: "",
    panelTesting: false,
    qanda: false,
  });

  const handleChange = (event) => {
    setSubmitForm({
      ...submitForm,
      [event.target.name]: event.target.value,
    });
  };

  const HandleCheckboxChange = (event) => {
    setSubmitForm({
      ...submitForm,
      [event.target.name]: event.target.checked,
    });
  };

  const getProjectCompletion = async () => {
    const data = localStorage.getItem("finishProject");
    if (!data) {
      navigate("/productionlist");
    } else {
      const response = await getCompleteDetails(data);
      console.log({
        panelTesting: response.data?.data[0]?.panelTesting || false,
        qanda: response.data?.data[0]?.qanda || false,
        companyName: response.data?.data[0]?.truckDetails?.companyName || "",
        ownerName: response.data?.data[0]?.truckDetails?.OwnerName || "",
        projectId: data,
      });
      setSubmitForm({
        panelTesting: response.data?.data[0]?.panelTesting || false,
        qanda: response.data?.data[0]?.qanda || false,
        companyName: response.data?.data[0]?.truckDetails?.companyName || "",
        ownerName: response.data?.data[0]?.truckDetails?.OwnerName || "",
        projectId: data,
      });
    }
  };

  useEffect(() => {
    getProjectCompletion();
  }, []);

  const Handle$OnClick$Send = async () => {
    const finalData = {
      truckDetails: {
        companyName: submitForm.companyName,
        OwnerName: submitForm.ownerName,
      },
      projectId: submitForm.projectId,
      panelTesting: submitForm.panelTesting,
      qanda: submitForm.qanda,
    };
    console.log(finalData);
    const response = await finishingDetails(finalData);
    if (response.type === "success") {
      message.success("Project Finished Successfully");
      navigate("/productionlist");
    } else {
      message.error(response.message);
    }
  };

  const ResetValues = () => {
    setSubmitForm({
      companyName: "",
      ownerName: "",
      projectId: "",
      panelTesting: "",
      qanda: "",
    });
  };

  return (
    <div className="w-full h-screen bg-[#f3f7ff]">
      <p className="text-3xl text-blue-800 font-semibold p-4">Finish Project</p>
      <div className="m-4 flex items-center justify-center">
        <div className="w-full bg-white flex flex-col rounded-md">
          <p className="text-blue-800 font-semibold text-xl p-4">
            Enter Project's Details
          </p>
          <div className="bg-white flex items-center justify-center flex-row w-full px-4 gap-4 rounded-md">
            <div className="w-1/2">
              <div className="font-semibold p-2 text-gray-500">
                Company Name
              </div>
              <Input
                className="w-full"
                placeholder="Select Client"
                name="companyName"
                onChange={handleChange}
                value={submitForm.companyName}
              />
              <div className="font-semibold p-2 text-gray-500">Qanda</div>
              <Checkbox
                name="qanda"
                checked={submitForm.qanda}
                onChange={HandleCheckboxChange}
              >
                Qanda
              </Checkbox>
            </div>
            <div className="w-1/2">
              <div className="font-semibold p-2 text-gray-500">Owner Name</div>
              <Input
                className="w-full"
                placeholder="Enter Owner Name"
                name="ownerName"
                value={submitForm.ownerName}
                onChange={handleChange}
              />
              <div className="font-semibold p-2 text-gray-500">
                Panel Testing
              </div>
              <Checkbox
                name="panelTesting"
                checked={submitForm.panelTesting}
                onChange={HandleCheckboxChange}
              >
                Panel Testing
              </Checkbox>
            </div>
          </div>
          <div className="flex items-center justify-center gap-4 p-4 mt-2">
            <Button
              onClick={() => Handle$OnClick$Send()}
              className="bg-blue-700 text-white"
            >
              Submit
            </Button>
            <Button
              onClick={() => ResetValues()}
              className="bg-gray-500 text-white"
            >
              Reset
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
