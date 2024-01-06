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


    return (
        <>
            <div className="p-10">
                <h1 className="text-2xl">Xin chào {name}</h1>

                <CreateResponse />

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
                                    <img src='https://cdnphoto.dantri.com.vn/YAfcu9nd4T5dX06hhpaf19_QvY8=/thumb_w/960/2021/05/15/co-gai-noi-nhu-con-vi-anh-can-cuoc-xinh-nhu-mong-nhan-sac-ngoai-doi-con-bat-ngo-hon-2-1621075314070.jpg' alt="User Avatar" />
                                </td>
                                <td>{user.isSolved ? 'Đã giải quyết' : 'Chưa giải quyết'}</td>
                                <td>
                                    <div className="flex h-auto space-x-4">
                                        <ModalPopUp uuid={user.uuid} />
                                        <DeleteResponse id={user.id} />
                                        <UpdateResponse uuid={user.uuid} id={user.id} />
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>


            </div>

        </>
    )
}

export default Table