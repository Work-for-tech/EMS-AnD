import React, { useRef } from 'react'
import { getAllProjects } from '../../APIs/project';
import { Button, message } from "antd";
import { useEffect, useState } from "react";
import { Select, Input } from 'antd';
import { PostProduction } from '../../APIs/Production';

export const Production = () => {

    const [projectData, setProjectData] = useState([]);
    const [projectId, setProjectId] = useState("");
    const [MainSection, setMainSection] = useState("");
    const [SubSection, setSubSection] = useState("");
    const DoneByRef = useRef("")

    const HandlePostRequest = async () => {
        const response = await PostProduction({
            projectId: projectId,
            mainSection: MainSection,
            subSection: SubSection,
            approvedBy: DoneByRef.current.input.value,
        });

        console.log(response);

        if (response.type === "success") {
            message.success("Production Added Successfully");
        }
        else {
            message.error("Error in Adding Production");
        }
    }

    const getProjects = async () => {
        const response = await getAllProjects();

        console.log(response.data.data);

        if (response.type === "success") {
            let newData = [];
            response.data.data.map((e) => {
                newData.push({
                    key: e._id,
                    project_name: e.project_name,
                    client_name: e.client_id.name,
                    price: e.total_price.toFixed(2),
                    is_finalized: e.is_finalized,
                });
            });
            setProjectData(newData);
        } else {
            message.error("Error in Fetching Projects");
        }
    };

    useEffect(() => {
        getProjects();
    }, []);


    return (
        <div className='w-screen'>
            <p className='text-2xl p-5 text-center'>Production</p>
            <div className='flex flex-col items-center gap-3'>
                <Select
                    showSearch
                    style={{ width: 500 }}
                    placeholder="Select a project"
                    onChange={(value) => {
                        setProjectId(value);
                    }}
                    options={projectData.map((e) => {
                        return {
                            label: e.project_name,
                            value: e.key,

                        }
                    })
                    }
                >
                </Select>
                <Select
                    showSearch
                    style={{ width: 500 }}
                    placeholder="Select Main Section"
                    onChange={(value) => {
                        setMainSection(value);
                    }}
                    options={[{
                        label: "WIRING",
                        value: "WIRING",
                    },
                    {
                        label: "BUSBAR",
                        value: "BUSBAR",
                    },
                    ]}
                >
                </Select>
                <Select
                    showSearch
                    style={{ width: 500 }}
                    placeholder="Select Main Section"
                    onChange={(value) => {
                        setSubSection(value);
                    }}
                    options={

                        MainSection === "" ?
                            []
                            :
                            MainSection === "WIRING" ?
                                [{
                                    label: "assembly",
                                    value: "assembly",
                                },
                                {
                                    label: "wiring",
                                    value: "wiring",
                                },
                                {
                                    label: "finish",
                                    value: "finish",
                                }
                                ]
                                :
                                [{
                                    label: "cutting / drilling",
                                    value: "cutting / drilling",
                                },
                                {
                                    label: "sleving",
                                    value: "sleving",
                                },
                                {
                                    label: "fitting",
                                    value: "fitting",
                                },
                                {
                                    label: "tighting",
                                    value: "tighting",
                                }
                                ]

                    }
                >
                </Select>
                <Input style={{ width: 500 }} className='w-fit' ref={DoneByRef} placeholder="Done By"></Input>
                <Button
                    style={{ width: 500 }}
                    className='bg-blue-700 text-white'
                    onClick={HandlePostRequest}>
                    Add Production
                </Button>
            </div>
        </div >
    )
}