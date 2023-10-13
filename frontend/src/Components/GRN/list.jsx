import React, { useEffect } from 'react'
import { getGRN } from '../../APIs/grn';
import { Table } from 'antd';

export const ListGRN = () => {

    const [grn, setGrn] = React.useState([])

    const getGRNInit = async () => {
        const response = await getGRN()
        setGrn(response.data.grns)
    }

    useEffect(() => {
        getGRNInit()
    }, [])

    const columns = [
        {
            title: 'Invoice Number',
            dataIndex: 'invoice_number',
            key: 'invoice_number',
        },
        {
            title: 'Received Date',
            dataIndex: 'received_date',
            key: 'received_date',
        },
        {
            title: 'Vendor',
            dataIndex: 'vendor',
            key: 'vendor',
        },
        {
            title: "Truck Pic URL",
            dataIndex: "truck_pic",
            key: "truck_pic"
        },
        {
            title: "Bill Pic URL",
            dataIndex: "bill_pic",
            key: "bill_pic"
        }
    ];

    const dataSource = grn.map((item) => {
        return {
            key: item.id,
            invoice_number: item.invoice_number,
            received_date: item.received_date,
            vendor: item.vender_id,
            truck_pic: item.truck_pic_url,
            bill_pic: item.bill_pic_url
        }
    })

    return (
        <div className='w-full'>
            <div className='w-full p-5'>
                <p className='p-5 text-xl text-center'>List of GRNS</p>
                <Table columns={columns} dataSource={dataSource} />
            </div>
        </div>
    )
}
