import { useRef, useState } from "react";
import Layout from "../../Layout"
import axios from "axios";
import { useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2'
// import Modal from 'react-modal'
import getAdminData from "../SessionInfo";
import UploadImages from '../uploadimage/UploadImages'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import ModalLayOut from "../Modal";

interface Props {
    modalCreateIsOpen: boolean;
    closeCreateModal: () => void
}

const CreateResponse = ({ modalCreateIsOpen, closeCreateModal }: Props) => {
    const navigate = useNavigate()
    const [urlImage, seturlImage] = useState<string | null>('')
    const [formData, setFormData] = useState({
        uuid: '',
        customerName: '',
        phoneNumber: '',
        description: '',
        crmFile: null
    });
    useEffect(() => {
        getAdminData().then((adminData) => {
            setFormData({ ...formData, uuid: adminData.id })
            if (urlImage) {
                const SplitUrl = urlImage?.split('. ')
                const urlCrmFile: any = 'http://103.160.2.183:8082/crm/files/' + SplitUrl[1]
                setFormData({ ...formData, crmFile: urlCrmFile })
            }
        })
    }, [urlImage])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
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
        console.log(formData)

        const response = await axios.post('http://103.160.2.183:8082/crm', formData)
        if (response.status === 200) {
            // navigate('/home')
            window.location.reload();
            console.log(formData)
        } else {
            Swal.fire('error', response.data.message, 'error')
        }

    };
    return (
        <>
            <ModalLayOut modalIsOpen={modalCreateIsOpen} closeModal={closeCreateModal}>
                <div className="relative top-0">
                    <div className="mt-2 absolute flex justify-end items-end w-full z-50">
                        <FontAwesomeIcon onClick={closeCreateModal} className="p-2 text-3xl text-black" icon={faXmark} size="lg" />
                    </div>
                    <h1 className="text-2xl text-center text-black">Tạo Phản Hồi</h1>
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
                            <UploadImages
                                handleUpload={handleUrlImage}
                                handleValueInput={handleValueInput}
                            />
                            <div className="text-center">
                                <button
                                    type="submit"
                                    className="bg-blue-500 text-white px-4 py-2 rounded-full focus:outline-none"
                                >
                                    Tạo phản hồi
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </ModalLayOut>



        </>

    )
}

export default CreateResponse