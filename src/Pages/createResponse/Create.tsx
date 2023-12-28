import { useState } from "react";
import Layout from "../../Layout"
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2'

const CreateResponse = () => {
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        uuid: '6471830d01df9e8330f78817',
        customerName: '',
        phoneNumber: '',
        description: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!formData.customerName) {
            Swal.fire('error', 'customer name invalid', 'error')
            return
        }
        if (!formData.phoneNumber) {
            Swal.fire('error', 'phone number invalid', 'error')
            return
        }
        if (!formData.description) {
            Swal.fire('error', 'description invalid', 'error')
            return
        }

        const response = await axios.post('http://103.160.2.183:8082/crm', formData)
        if (response.status === 200) {
            navigate('/home')
        } else {
            Swal.fire('error', response.data.message, 'error')
        }

    };
    return (
        <Layout>
            <div className="p-10">
                <h1 className="text-2xl text-center">Create Response</h1>
                <div className="container mx-auto mt-8">
                    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4 bg-white shadow-md">
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="customerName">
                                Customer Name
                            </label>
                            <input
                                type="text"
                                id="customerName"
                                name="customerName"
                                value={formData.customerName}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="phoneNumber">
                                Phone number
                            </label>
                            <input
                                type="tel"
                                id="phoneNumber"
                                name="phoneNumber"
                                value={formData.phoneNumber}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
                                description
                            </label>
                            <input
                                type="text"
                                id="description"
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded"
                            />
                        </div>
                        <div className="text-center">
                            <button
                                type="submit"
                                className="bg-blue-500 text-white px-4 py-2 rounded-full focus:outline-none"
                            >
                                Submit
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </Layout>
    )
}

export default CreateResponse