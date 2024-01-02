import { useState } from "react";
import Layout from "../../Layout"
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2'
import Modal from 'react-modal'
import adminData from "../SessionInfo";

const CreateResponse = () => {
    const navigate = useNavigate()
    let adminId: number = adminData.id


    const [modalIsOpen, setModalIsOpen] = useState(false);

    const [formData, setFormData] = useState({
        uuid: adminId,
        customerName: '',
        phoneNumber: '',
        description: ''
    });

    const openModal = () => {
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setModalIsOpen(false);
    };


    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!formData.customerName) {
            Swal.fire('error', 'customer name invalid', 'error')
            return
        }
        if (!formData.phoneNumber) {
            Swal.fire('error', 'phone number invalid', 'error')
            return
        }
        if (!formData.description) {
            Swal.fire('error', 'description invalid', 'error')
            return
        }

        const response = await axios.post('http://103.160.2.183:8082/crm', formData)
        if (response.status === 200) {
            // navigate('/home')
            window.location.reload();
        } else {
            Swal.fire('error', response.data.message, 'error')
        }

    };
    return (
        <>
            <div className="my-10">
                <button onClick={openModal} className="bg-blue-500 text-white font-bold py-2 px-3 rounded">Tạo phản hồi</button>
                <Modal ariaHideApp={false}
                    isOpen={modalIsOpen}
                    onRequestClose={closeModal}
                >
                    <div className="p-10">
                        <h1 className="text-2xl text-center">Create Response</h1>
                        <div className="container mx-auto mt-8">
                            <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4 bg-white shadow-md">
                                <div className="mb-4">
                                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="customerName">
                                        Customer Name
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
                                        Phone number
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
                                        description
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
                                <div className="text-center">
                                    <button
                                        type="submit"
                                        className="bg-blue-500 text-white px-4 py-2 rounded-full focus:outline-none"
                                    >
                                        Submit
                                    </button>
                                </div>
                            </form>

                            <div className="mt-10 flex justify-end mr-[32%]">
                                <button onClick={closeModal} className="bg-blue-500 text-white font-bold py-2 px-3 rounded">
                                    Đóng
                                </button>
                            </div>
                        </div>
                    </div>
                </Modal>
            </div>

        </>

    )
}

export default CreateResponse