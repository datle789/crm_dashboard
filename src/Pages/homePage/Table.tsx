import { Link } from "react-router-dom";
import { UserReply } from "../type/UserReplyModel"
import ModalPopUp from "../detailPage/ModalPopUp";
import DeleteResponse from "../deleteResponse/DeleteResponse";
import CreateResponse from "../createResponse/Create";
import get from '../SessionInfo'
import getAdminData from '../SessionInfo'
import { useEffect, useState } from "react";
import UpdateResponse from "../updateResponse/UpdateResponse";
import axios from "axios";
import Paginations from "./Pagination";

interface Props {
    users: UserReply[];
    setUsers: React.Dispatch<React.SetStateAction<UserReply[]>>
}


const Table = () => {

    //pagination
    const [users, setUsers] = useState<UserReply[]>([])
    const [currentPage, setCurrentPage] = useState(0)
    const [totalPages, setTotalPages] = useState(0)
    const [size, setSize] = useState(10)


    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get(`http://localhost:8082/crms?page=${currentPage}&size=${size}`)
            setUsers(response.data.content)
            setTotalPages(response.data.totalPages)
        }
        fetchData()
    }, [currentPage])


    const [name, setName] = useState('')
    useEffect(() => {
        getAdminData().then((adminData) => {
            setName(adminData.name)
        })
    }, [])


    const [modalCreateIsOpen, setModalCreateIsOpen] = useState(false);

    const openCreateModal = () => {
        setModalCreateIsOpen(true);
    };

    const closeCreateModal = () => {
        setModalCreateIsOpen(false);
    };



    const [modalDeleteIsOpen, setModalDeleteIsOpen] = useState(false);
    const [iddelete, setiddelete] = useState<number>(0)
    const openDeleteModal = (id: number) => {
        setiddelete(id)
        setModalDeleteIsOpen(true)
    }

    const closeDeleteModal = () => {
        setModalDeleteIsOpen(false)
    }



    return (
        <>
            <div className="p-10">
                <h1 className="text-2xl">Xin chào {name}</h1>

                <button onClick={openCreateModal} className="bg-blue-500 text-white font-bold py-2 px-3 rounded mt-[10px]">Tạo phản hồi</button>
                <CreateResponse modalCreateIsOpen={modalCreateIsOpen} closeCreateModal={closeCreateModal} />

                <table className="table-auto mt-10 w-full ">
                    <thead>
                        <tr>
                            <th>Tên khách hàng</th>
                            <th>Số điện thoại</th>
                            <th>Mô tả</th>
                            <th>Ngày gặp vấn đề</th>
                            <th>Ảnh</th>
                            <th>Hoàn thành</th>
                            <th>Hành động</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <tr key={user.id}>
                                <td>{user.customerName}</td>
                                <td>{user.phoneNumber}</td>
                                <td>{user.description}</td>
                                <td>{user.createdDate}</td>
                                <td className="w-[100px] h-[100px]">
                                    {user.crmFile ? <a href={user.crmFile}><img src={user.crmFile} alt="" className="w-full h-full object-contain" /></a> : ''}
                                </td>
                                <td>{user.isSolved ? 'Đã giải quyết' : 'Chưa giải quyết'}</td>
                                <td>
                                    <div className="flex h-auto space-x-4">
                                        <ModalPopUp uuid={user.uuid} />
                                        {/* <DeleteResponse id={user.id} /> */}
                                        <button onClick={() => openDeleteModal(user.id)} className="bg-red-500 text-white font-bold py-1 px-2 rounded">
                                            Xóa
                                        </button>
                                        <UpdateResponse uuid={user.uuid} id={user.id} />
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <Paginations currentPage={currentPage} totalPages={totalPages} setCurrentPage={setCurrentPage} />
                <DeleteResponse id={iddelete} modalDeleteIsOpen={modalDeleteIsOpen} closeDeleteModal={closeDeleteModal} />
                {/* <UpdateResponse formDataUpdate={formData} id={idUpdate} modalUpdateIsOpen={modalUpdateIsOpen} closeModalUpdate={closeModalUpdate} /> */}
            </div>

        </>
    )
}

export default Table