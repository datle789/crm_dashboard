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

interface Props {
    users: UserReply[];
    setUsers: React.Dispatch<React.SetStateAction<UserReply[]>>
}


const Table = ({ users, setUsers }: Props) => {

    const [name, setName] = useState('')
    useEffect(() => {
        getAdminData().then((adminData) => {
            setName(adminData.name)
        })
    }, [])


    //modal create
    const [modalCreateIsOpen, setModalCreateIsOpen] = useState(false);

    const openCreateModal = () => {
        setModalCreateIsOpen(true);
    };

    const closeCreateModal = () => {
        setModalCreateIsOpen(false);
    };


    //modal delete
    const [modalDeleteIsOpen, setModalDeleteIsOpen] = useState(false);
    const [iddelete, setiddelete] = useState<number>(0)
    const openDeleteModal = (id: number) => {
        setiddelete(id)
        setModalDeleteIsOpen(true)
    }

    const closeDeleteModal = () => {
        setModalDeleteIsOpen(false)
    }


    //modal update
    const [modalUpdateIsOpen, setModalUpdateIsOpen] = useState(false);
    const [idUpdate, setIdUpdate] = useState<number>(0)
    const [uuidUpdate, setUuidUpdate] = useState<number>(0)
    const [formData, setFormData] = useState({
        uuid: 0,
        customerName: '',
        phoneNumber: '',
        description: '',
        isSolved: false,
        crmFile: ''
    });



    const openModalUpdate = async (id: number) => {

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
                            <th>Ngày tạo</th>
                            <th>Ảnh</th>
                            <th>Hoàn Thành</th>
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
                                <td className="w-[10%] h-[10%]">
                                    {user.crmFile ? <a href={user.crmFile}><img className="object-cover" src={user.crmFile} alt="" /></a> : ''}
                                </td>
                                <td>{user.isSolved ? 'Đã giải quyết' : 'Chưa giải quyết'}</td>
                                <td>
                                    <div className="flex h-auto space-x-4">
                                        <ModalPopUp uuid={user.uuid} />
                                        {/* <DeleteResponse id={user.id} /> */}
                                        <button onClick={() => openDeleteModal(user.id)} className="bg-red-500 text-white font-bold py-1 px-2 rounded">
                                            Xóa
                                        </button>
                                        {/* <UpdateResponse uuid={user.uuid} id={user.id} /> */}
                                        <button onClick={() => openModalUpdate(user.id)} className="bg-blue-500 text-white font-bold py-1 px-2 rounded">Sửa</button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <DeleteResponse id={iddelete} modalDeleteIsOpen={modalDeleteIsOpen} closeDeleteModal={closeDeleteModal} />
                <UpdateResponse formDataProp={formData} id={idUpdate} modalUpdateIsOpen={modalUpdateIsOpen} closeModalUpdate={closeModalUpdate} />
            </div>

        </>
    )
}

export default Table