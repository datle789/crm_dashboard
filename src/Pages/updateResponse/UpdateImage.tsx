import React, { ChangeEvent, useEffect, useState } from 'react';
import axios from 'axios';
import { MdUploadFile } from "react-icons/md";
import Swal from 'sweetalert2'
import { getBase64 } from '../../Util/ConverImageBase64'

interface Props {
    getImage: File | null | string
    handleUpload: (urlImage: string) => void;
    handleValueInput: (urlImage: object) => void;
}


const UpdateImage = ({ getImage, handleUpload, handleValueInput }: Props) => {

    const [selectedFile, setSelectedFile] = useState<File | null | string>(null);
    const [priviewImage, setPriviewImage] = useState<string>('')

    useEffect(() => {
        if (getImage) {
            setSelectedFile(getImage);

        }
    }, [getImage])


    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        const maxSizeInBytes = 1024 * 1024;
        const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
        if (event.target.files && event.target.files.length > 0) {
            const selectedFile = event.target.files[0];
            // Check if the file type is allowed
            if (!allowedTypes.includes(selectedFile.type)) {
                Swal.fire('error', 'Chỉ chấp nhận các loại file ảnh (JPEG, PNG, GIF)', 'error');
                event.target.value = '';
                return;
            }
            // Check if the file size is within the limit
            if (selectedFile.size > maxSizeInBytes) {
                Swal.fire('error', 'Kích thước tệp tin quá lớn. Hãy chọn một tệp tin nhỏ hơn', 'error');
                event.target.value = '';
                return;
            }
            handleValueInput(selectedFile)
            setSelectedFile(selectedFile);

        }
    };

    const toBase64 = async (file: File | string): Promise<string> => {
        try {
            // Kiểm tra nếu file là kiểu string (đã là base64), thì trả về luôn
            if (typeof file === 'string') {
                return file;
            }
            const base64String = await getBase64(file);
            return base64String;
        } catch (error) {
            console.error('Error converting to base64:', error);
            throw error;
        }
    };
    useEffect(() => {
        const loadImage = async () => {
            if (selectedFile) {
                try {
                    const base64String = await toBase64(selectedFile);
                    setPriviewImage(base64String);
                } catch (error) {
                    console.error('Error loading base64 image:', error);
                }
            }
        };

        loadImage();
    }, [selectedFile]);


    const handleUploadImage = async () => {
        if (!selectedFile) {
            Swal.fire('error', 'Vui lòng chọn một tệp tin trước khi gửi', 'error');
            return
        }
        if (selectedFile) {

            const formData = new FormData();
            formData.append('file', selectedFile);

            try {
                const response = await axios.post('http://103.160.2.183:8082/crm/upload', formData);
                if (response.status === 200) {
                    const urlImage = response.data.message;
                    handleUpload(urlImage)
                    Swal.fire('success', 'Tải ảnh lên thành công !', 'success');
                }
            } catch (error: any) {
                Swal.fire('error', error.response.data.message, 'error');
            }
        }
    };


    return (
        <div className='mb-6 '>
            <label className="block text-gray-100 text-sm font-bold mb-2" htmlFor="description">
                Chọn File
            </label>
            <div className='flex items-center justify-between w-full'>
                <input id="file" type="file" onChange={handleFileChange} className='w-[70%] text-gray-100' />
                <button className='text-center w-[30%] gap-2 ml-5 flex items-center text-gray-100 ' type='button' onClick={handleUploadImage}>
                    <MdUploadFile size={25} />
                    Tải ảnh lên
                </button>
            </div>
            {priviewImage && <div className='my-4'>
                <img src={priviewImage} alt="img" className='w-[100px] h-[120px] object-contain' />
            </div>}
        </div>
    )
}

export default UpdateImage