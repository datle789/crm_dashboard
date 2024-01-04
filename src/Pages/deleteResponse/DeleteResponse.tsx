import { useNavigate, useParams } from "react-router";
import Layout from "../../Layout"
import axios from "axios";
import { redirect } from 'react-router-dom'
import Modal from 'react-modal'
import { useState } from "react";


interface Props {
    id: number
}

const DeleteResponse = ({ id }: Props) => {

    const [modalIsOpen, setModalIsOpen] = useState(false);


    const handleDeleteBook = async () => {
        const response = await axios.delete(`http://103.160.2.183:8082/crm/${id}`)
        if (response.data) {
            window.location.reload();
        } else {
            console.log('không thể xóa')
        }
    }

    const openModal = () => {
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setModalIsOpen(false);
    };

    return (
        <>
            <button onClick={openModal} className="bg-red-500 text-white font-bold py-2 px-3 rounded">
                Xóa
            </button>
            <Modal ariaHideApp={false}
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
            >

                <div className="p-5 flex flex-col items-center justify-center h-[500px]">
                    <h1 className="text-2xl text-center text-white">Bạn có chắc chắn muốn xóa phản hồi này</h1>

                    <div className="mt-10 flex justify-center space-x-4">
                        <div>
                            <button onClick={handleDeleteBook} className="bg-red-500 text-white font-bold py-2 px-3 rounded">
                                Xóa
                            </button>
                        </div>
                        <div>
                            <button onClick={closeModal} className="bg-blue-500 text-white font-bold py-2 px-3 rounded">
                                Đóng
                            </button>
                        </div>
                    </div>
                </div>


            </Modal >
        </>

    )
}

export default DeleteResponse