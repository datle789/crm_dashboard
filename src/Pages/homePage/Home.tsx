import Layout from "../../Layout"
import '../../style/home.css'
import Table from './Table'
import { useEffect, useState } from "react"
import { UserReply } from "../type/UserReplyModel"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import { getAccessToken } from '../type/GetAccessToken';


const Home = () => {

    // const [users, setUsers] = useState<UserReply[]>([])

    // useEffect(() => {
    //     const fetchData = async () => {
    //         const response = await axios.get('http://103.160.2.183:8082/crms')
    //         setUsers(response.data)
    //     }
    //     fetchData()
    // }, [])




    return (
        <Layout>
            {/* <Table users={users} setUsers={setUsers} /> */}
            <Table />
        </Layout>
    )
}

export default Home