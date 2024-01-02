import { Link } from "react-router-dom";
import { UserReply } from "../type/UserReplyModel"
import ModalPopUp from "../detailPage/ModalPopUp";
import DeleteResponse from "../deleteResponse/DeleteResponse";
import CreateResponse from "../createResponse/Create";
import adminData from '../SessionInfo'

interface Props {
    users: UserReply[];
    setUsers: React.Dispatch<React.SetStateAction<UserReply[]>>
}


const Table = ({ users, setUsers }: Props) => {

    return (
        <>
            <div className="p-10">
                <h1 className="text-2xl">Xin chào {adminData.name}</h1>

                <CreateResponse />

                <table className="table-auto mt-10 w-full ">
                    <thead>
                        <tr>
                            <th>Tên khách hàng</th>
                            <th>Số điện thoại</th>
                            <th>Mô tả</th>
                            <th>Ngày tạo</th>
                            <th>Hành động</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            user.isSolved ?
                                <tr className="bg-green-400" key={user.id}>
                                    <td>{user.customerName}</td>
                                    <td>{user.phoneNumber}</td>
                                    <td>{user.description}</td>
                                    <td>{user.createdDate}</td>
                                    <td>
                                        <Link to={`/crm-user/${user.uuid}`} className="bg-blue-500 text-white font-bold py-2 px-3 rounded">Detail</Link>
                                    </td>
                                </tr> :
                                <tr key={user.id}>
                                    <td>{user.customerName}</td>
                                    <td>{user.phoneNumber}</td>
                                    <td>{user.description}</td>
                                    <td>{user.createdDate}</td>
                                    <td className="space-x-4">
                                        {/* <button className="bg-blue-500 text-white font-bold py-2 px-3 rounded">
                                            <Link to={`/crm-user/${user.uuid}`}>Detail</Link>
                                        </button> */}
                                        <ModalPopUp uuid={user.uuid} />
                                        <DeleteResponse id={user.id} />
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