import { useParams } from "react-router-dom"
import Layout from "../../Layout"
import { useEffect, useMemo, useState } from "react"
import { UserReply } from "../type/UserReplyModel"
import axios from "axios"

const Detail = () => {

    const [responseLists, setResponseLists] = useState<UserReply[]>([])

    const { id } = useParams()

    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get(`http://103.160.2.183:8082/crm-user/${id}`)
            setResponseLists(response.data)
            console.log(responseLists)
        }
        fetchData()
    }, [responseLists])

    const customerName = useMemo(() => {
        if (responseLists?.length > 0) {
            return responseLists[0]['customerName']
        }
    }, [responseLists])

    return (
        <Layout>
            <div className="p-10">
                <h1 className="text-2xl">Danh sách phản hồi của {!responseLists ? <>loading...</> : customerName}</h1>
                <table className="table-auto mt-10 w-full ">
                    <thead>
                        <tr>
                            <th>Customer Name</th>
                            <th>Phone Number</th>
                            <th>Description</th>
                        </tr>
                    </thead>
                    <tbody>
                        {responseLists ? responseLists.map((responseList) => (
                            <tr key={responseList.id}>
                                <td>{responseList.customerName}</td>
                                <td>{responseList.phoneNumber}</td>
                                <td>{responseList.description}</td>

                            </tr>
                        )) : []}
                    </tbody>
                </table>
            </div>
        </Layout>
    )
}

export default Detail