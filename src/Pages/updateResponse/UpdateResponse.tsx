import { useState } from "react";
import Layout from "../../Layout"
import axios from "axios";
import { useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2'
import Modal from 'react-modal'
import getAdminData from "../SessionInfo";
import UpdateImage from "./UpdateImage";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { UserReply } from "../type/UserReplyModel";
import ModalLayOut from "../Modal";

// interface Props {
//     formDataUpdate: UserReply
//     id: number
//     modalUpdateIsOpen: boolean,
//     closeModalUpdate: () => void,
// }

interface Props {
    formDataProp: any
    id: number,
    modalUpdateIsOpen: boolean,
    closeModalUpdate: () => void,
}

const UpdateResponse = ({ formDataProp, id, modalUpdateIsOpen, closeModalUpdate }: Props) => {

    const [urlImage, seturlImage] = useState('')
    const [formData, setFormData] = useState({
        id: id,
        uuid: 0,
        customerName: '',
        phoneNumber: '',
        description: '',
        isSolved: false,
        crmFile: ''
    });

    // nhận giá trị prop từ table
    useEffect(() => {
        setFormData(formDataProp)

    }, [formDataProp])


    useEffect(() => {
        if (urlImage) {
            const SplitUrl = urlImage?.split('. ')
            const urlCrmFile = 'http://103.160.2.183:8082/crm/files/' + SplitUrl[1]
            setFormData({ ...formData, crmFile: urlCrmFile })

        }

    }, [urlImage])



    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.checked });
    };


    const handleUrlImage = (urlImage: string) => {
        seturlImage(urlImage)
    }
    let valueInput: object
    const handleValueInput = (value: object) => {
        valueInput = value
    }


    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!formData.customerName) {
            Swal.fire('error', 'Tên người nhập không hợp lệ', 'error')
            return
        }
        if (!formData.phoneNumber) {
            Swal.fire('error', 'Số điện thoại không hợp lệ', 'error')
            return
        }
        if (!formData.description) {
            Swal.fire('error', 'Mô tả không hợp lệ', 'error')
            return
        }
        if (valueInput && !urlImage) {
            Swal.fire('error', 'Vui lòng tải ảnh lên trước', 'error')
            return
        }


        const response = await axios.put(`http://103.160.2.183:8082/crm/${formData.id}`, formData)
        if (response.status === 200) {
            // navigate('/home')
            window.location.reload();
        } else {
            Swal.fire('error', response.data.message, 'error')
        }

    };
    return (
        <>
            <Modal ariaHideApp={false}
                isOpen={modalUpdateIsOpen}
                onRequestClose={closeModalUpdate}
            >

                <div className="relative top-0">
                    <div className="mt-2 absolute flex justify-end items-end w-full z-50">
                        <FontAwesomeIcon onClick={closeModalUpdate} className="p-2 text-3xl text-white" icon={faXmark} size="lg" />
                    </div>
                    <h1 className="text-2xl text-center text-white ">Tạo Phản Hồi</h1>
                    <div className="container mx-auto mt-8">
                        <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4 bg-white shadow-xl rounded-sm">
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="customerName">
                                    Tên người nhập
                                </label>
                                <input
                                    type="text"
                                    id="customerName"
                                    name="customerName"
                                    value={formData.customerName}
                                    onChange={handleChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="phoneNumber">
                                    Số điện thoại
                                </label>
                                <input
                                    type="tel"
                                    id="phoneNumber"
                                    name="phoneNumber"
                                    value={formData.phoneNumber}
                                    onChange={handleChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
                                    Mô tả chi tiết
                                </label>
                                <input
                                    type="text"
                                    id="description"
                                    name="description"
                                    value={formData.description}
                                    onChange={handleChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded"
                                />
                            </div>
                            <UpdateImage getImage={formData.crmFile} handleUpload={handleUrlImage}
                                handleValueInput={handleValueInput} />

                            <div className="mb-4 flex items-center space-x-5 my-8">
                                <label className="block text-gray-700 text-sm font-bold" htmlFor="isSolved">
                                    Hoàn thành
                                </label>
                                <input
                                    type="checkbox"
                                    id="isSolved"
                                    name="isSolved"
                                    checked={formData.isSolved}
                                    onChange={handleCheck}
                                    className="flex justify-end px-3 py-2 border border-gray-300 rounded size-5"
                                />
                            </div>
                            <div className="text-center">
                                <button
                                    type="submit"
                                    className="bg-blue-500 text-white px-4 py-2 rounded-full focus:outline-none"
                                >
                                    Sửa phản hồi
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </Modal>


        </>

    )
}

export default UpdateResponse