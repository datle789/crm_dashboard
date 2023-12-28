import { Link } from "react-router-dom";
import { UserReply } from "../type/UserReplyModel"

interface Props {
    users: UserReply[];
    setUsers: React.Dispatch<React.SetStateAction<UserReply[]>>
}


const Table = ({ users, setUsers }: Props) => {
    return (
        <>
            <div className="border-l-2 p-10">
                <h1 className="text-2xl">Hi Admin</h1>
                <table className="table-auto mt-10 w-full ">
                    <thead>
                        <tr>
                            <th>Customer Name</th>
                            <th>Phone Number</th>
                            <th>Description</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <tr key={user.id}>
                                <td>{user.customerName}</td>
                                <td>{user.phoneNumber}</td>
                                <td>{user.description}</td>
                                <td>
                                    <Link to={`/crm-user/${user.uuid}`} className="bg-blue-500 text-white font-bold py-2 px-3 rounded">Detail</Link>
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