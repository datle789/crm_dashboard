import { useEffect, useMemo, useState } from 'react';
import Modal from 'react-modal'
import { useParams } from 'react-router-dom';
import { UserReply } from '../type/UserReplyModel';
import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import ImageModal from '../../components/priviewImage/ImageModal'


interface Props {
    uuid: number;
}

const ModalPopUp = ({ uuid }: Props) => {

    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [responseLists, setResponseLists] = useState<UserReply[]>([])
    const [isModalOpenImage, setIsModalOpenImage] = useState(false)
    const [selectedImage, setSelectedImage] = useState('');

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

    const openModalImage = (imageSrc: string) => {
        setSelectedImage(imageSrc)
        setIsModalOpenImage(true)
    }

    const closeModalImage = () => {
        setIsModalOpenImage(false)
        setSelectedImage('')
    }

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
                className='bg-gradient-to-r from-[#07bd89] to-[#006e8c] absolute inset-10 border overflow-auto rounded-md outline-none p-[30px]'
            >

                <div className="relative top-0">
                    <div className="mt-2 absolute flex justify-end items-end w-full z-50">
                        <FontAwesomeIcon onClick={closeModal} className="p-2 text-3xl text-white" icon={faXmark} size="lg" />
                    </div>
                    <h1 className="text-2xl text-center text-white">Danh sách phản hồi của {!responseLists ? <>loading...</> : customerName}</h1>
                    <table className="table-auto mt-10 w-full ">
                        <thead>
                            <tr>
                                <th className='text-white'>Tên khách hàng</th>
                                <th className='text-white'>Số điện thoại</th>
                                <th className='text-white'>Mô tả</th>
                                <th className='text-white'>Ngày gặp vấn đề</th>
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
                                    <td className="w-[100px] h-[100px]">
                                        {responseList.crmFile ?
                                            <img src={responseList.crmFile} alt="" onClick={() => openModalImage(responseList.crmFile)} />
                                            : ''}
                                    </td>
                                    <td className='text-white'>
                                        {responseList.isSolved ? 'Đã giải quyết' : 'Chưa giải quyết'}
                                    </td>
                                </tr>
                            )) : []}
                        </tbody>
                    </table>
                </div>
            </Modal>
            {selectedImage && (
                <ImageModal isOpen={isModalOpenImage} onClose={closeModalImage} imageSrc={selectedImage} />
            )}
        </>
    )
}

export default ModalPopUp