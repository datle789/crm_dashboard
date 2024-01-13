import { useNavigate, useParams } from "react-router";
import Layout from "../../Layout"
import axios from "axios";
import { redirect } from 'react-router-dom'
import Modal from 'react-modal'
import { useState } from "react";
import ModalLayOut from "../Modal";


interface Props {
    id: number,
    modalDeleteIsOpen: boolean,
    closeDeleteModal: () => void
}

const DeleteResponse = ({ id, modalDeleteIsOpen, closeDeleteModal }: Props) => {


    const handleDeleteBook = async () => {
        const response = await axios.delete(`http://103.160.2.183:8082/crm/${id}`)
        if (response.data) {
            window.location.reload();
        } else {
            console.log('không thể xóa')
        }
    }

    return (
        <>
            <ModalLayOut modalIsOpen={modalDeleteIsOpen} closeModal={closeDeleteModal}>
                <h2>Bạn có chắc chắn muốn xóa không?</h2>
                <div className="mt-[20px] flex items-center justify-center space-x-5">
                    <button className="bg-blue-500 text-white font-bold py-2 px-3 rounded" onClick={closeDeleteModal}>Hủy</button>
                    <button className="bg-red-500 text-white font-bold py-2 px-3 rounded" onClick={handleDeleteBook}>Xóa</button>
                </div>

            </ModalLayOut>


        </>

    )
}

export default DeleteResponse