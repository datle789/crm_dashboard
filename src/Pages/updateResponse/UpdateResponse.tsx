import { useState } from "react";
import Layout from "../../Layout"
import axios from "axios";
import { useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2'
import Modal from 'react-modal'
import getAdminData from "../SessionInfo";

interface Props {
    uuid: number,
    id: number,
}

const UpdateResponse = ({ uuid, id }: Props) => {
    const [formData, setFormData] = useState({
        uuid: uuid,
        customerName: '',
        phoneNumber: '',
        description: '',
        isSolved: false,
        crmFile: ''
    });



    const [modalUpdateIsOpen, setModalUpdateIsOpen] = useState(false);


    const openModalUpdate = async () => {
        try {
            const fetchData = async () => {
                const response = await axios.get(` http://103.160.2.183:8082/crm/${id}`)
                setFormData(response.data)
            }
            fetchData()
        } catch (error) {
            console.log('không call được api')
        }

        setModalUpdateIsOpen(true);
    };


    const closeModalUpdate = () => {
        setModalUpdateIsOpen(false);
    };




    const [file, setFile] = useState<File | null>(null);
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setFile(e.target.files[0]);
        }
    };



    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.checked });
    };



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
        const response = await axios.put(`http://103.160.2.183:8082/crm/${id}`, formData)
        console.log(formData)
        if (response.status === 200) {
            // navigate('/home')
            // window.location.reload();
        } else {
            Swal.fire('error', response.data.message, 'error')
        }

    };
    return (
        <>
            <button onClick={openModalUpdate} className="bg-blue-500 text-white font-bold py-2 px-3 rounded">Sửa</button>
            <Modal ariaHideApp={false}
                isOpen={modalUpdateIsOpen}
                onRequestClose={closeModalUpdate}
            >
                <div className="p-10">
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
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
                                    Chọn File
                                </label>
                                <input
                                    type="file"
                                    id="file"
                                    name="file"
                                    onChange={handleFileChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded"
                                />
                            </div>
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
                                    Sửa phàn hồi
                                </button>
                            </div>
                        </form>

                        <div className="mt-10 flex justify-end mr-[32%]">
                            <button onClick={closeModalUpdate} className="bg-blue-500 text-white font-bold py-2 px-3 rounded">
                                Đóng
                            </button>
                        </div>
                    </div>
                </div>
            </Modal>

        </>

    )
}

export default UpdateResponse