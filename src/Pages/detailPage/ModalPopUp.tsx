import { useEffect, useMemo, useState } from 'react';
import Modal from 'react-modal'
import { useParams } from 'react-router-dom';
import { UserReply } from '../type/UserReplyModel';
import axios from 'axios'


interface Props {
    uuid: number;
}

const ModalPopUp = ({ uuid }: Props) => {

    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [responseLists, setResponseLists] = useState<UserReply[]>([])


    const openModal = () => {
        try {
            const fetchData = async () => {
                const response = await axios.get(`http://103.160.2.183:8082/crm-user/${uuid}`)
                setResponseLists(response.data)
            }
            fetchData()
        } catch (error) {
            console.log('không call được api')
        }
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setModalIsOpen(false);
    };

    const customerName = useMemo(() => {
        if (responseLists?.length > 0) {
            return responseLists[0]['customerName']
        }
    }, [responseLists])

    return (
        <>
            <button onClick={openModal} className="bg-blue-500 text-white font-bold py-1 px-2 rounded">Chi Tiết</button>
            <Modal ariaHideApp={false}
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
            >

                <div className="p-5 ">
                    <h1 className="text-2xl text-center text-white">Danh sách phản hồi của {!responseLists ? <>loading...</> : customerName}</h1>
                    <table className="table-auto mt-10 w-full ">
                        <thead>
                            <tr>
                                <th className='text-white'>Tên khách hàng</th>
                                <th className='text-white'>Số điện thoại</th>
                                <th className='text-white'>Mô tả</th>
                                <th className='text-white'>Ngày</th>
                                <th className='text-white'>Ảnh</th>
                                <th className='text-white'>Hoàn thành</th>
                            </tr>
                        </thead>
                        <tbody>
                            {responseLists ? responseLists.map((responseList) => (
                                <tr key={responseList.id}>
                                    <td className='text-white'>{responseList.customerName}</td>
                                    <td className='text-white'>{responseList.phoneNumber}</td>
                                    <td className='text-white'>{responseList.description}</td>
                                    <td className='text-white'>{responseList.createdDate}</td>
                                    <td className="w-[10%] h-[10%]">
                                        {responseList.crmFile ? <img src={responseList.crmFile} alt="" /> : ''}
                                    </td>
                                    <td className='text-white'>
                                        {responseList.isSolved ? 'Đã giải quyết' : 'Chưa giải quyết'}
                                    </td>
                                </tr>
                            )) : []}
                        </tbody>
                    </table>
                    <div className="mt-10 flex justify-end">
                        <button onClick={closeModal} className="bg-blue-500 text-white font-bold py-2 px-3 rounded">
                            Đóng
                        </button>
                    </div>
                </div>



            </Modal>
        </>
    )
}

export default ModalPopUp