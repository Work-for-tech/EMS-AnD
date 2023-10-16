import { Input, Button, message } from 'antd'
import React from 'react'
import { createRecievedItem } from '../../APIs/receiveditems'

export const GRNApprovalUpdate = ({ data, setGrnApprovalUpdate, setGrnApprovalList }) => {
    console.log(data)

    const quanityReceivedRef = React.useRef()

    const HandleOnClick = async () => {
        console.log(quanityReceivedRef.current.input.value)
        const Data = {
            _id: data.key,
            quantity_received: quanityReceivedRef.current.input.value
        }

        if (Data.quantity_received === '') {
            return message.error("Please Enter Quantity Received")
        }

        if (Data.quantity_received > data.quantity_expected) {
            return message.error("Quantity Received cannot be greater than Quantity Expected")
        }

        if (Data.quantity_received < 0) {
            return message.error("Quantity Received cannot be less than 0")
        }

        const response = await createRecievedItem(Data)

        console.log(response)

        if (response.type === "success") {
            message.success("Received Item Updated Successfully")
            setGrnApprovalUpdate({})
            setGrnApprovalList([])
        }
    }

    return (
        <div className='w-full mb-10'>
            <p className='text-center text-xl font-semibold'>GRN Approval Update</p>
            <div className='gap-2 p-5 flex flex-col items-center '>
                <p>Description : {data.description}</p>
                <p>Rating : {data.rating}</p>
                <p>Catalog Number : {data.catalog_number}</p>
                <p>Quantity Expected : {data.quantity_expected}</p>
            </div>
            <div className='gap-5 flex justify-center'>
                <Input type = "number" placeholder='Enter Recived Quantity' className='w-1/5' ref={quanityReceivedRef} />
                <Button onClick={() => HandleOnClick()}>Update</Button>
            </div>
        </div>
    )
}
