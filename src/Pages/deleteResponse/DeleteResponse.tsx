import { useNavigate, useParams } from "react-router";
import Layout from "../../Layout"
import axios from "axios";

const DeleteResponse = () => {

    const { id } = useParams()
    const navigate = useNavigate();

    const handleDeleteBook = async () => {
        await axios.delete(`http://103.160.2.183:8082/crm/${id}`)
            .then(response => {
                navigate('/home');
            })
            .catch(err => {
                console.log(err)
            })
    }

    return (
        <Layout>
            <div className="p-10">
                <h1 className='text-3xl my-4'>Delete Response</h1>
                <div className='flex flex-col items-center border-2 border-sky-400 rounded-xl w-[600px] p-8 mx-auto'>
                    <h3 className='text-2xl'>Are You Sure You want to delete this response?</h3>

                    <button
                        className='p-4 bg-red-600 text-white m-8 w-full'
                        onClick={handleDeleteBook}
                    >
                        Yes, Delete it
                    </button>
                </div>
            </div>
        </Layout>
    )
}

export default DeleteResponse