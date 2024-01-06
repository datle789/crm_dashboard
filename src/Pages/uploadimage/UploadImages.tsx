import React, { ChangeEvent, useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { MdUploadFile } from "react-icons/md";
import Swal from 'sweetalert2'

interface Props {
  handleUpload: (urlImage: string) => void;
  handleValueInput: (urlImage: object) => void;
}


const UploadImages = ({ handleUpload, handleValueInput }: Props) => {

  const [selectedFile, setSelectedFile] = useState<File | null | string>(null);

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
      console.log(selectedFile);
    }

  };
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
      } catch (error) {
        console.error('Error uploading image:', error);
      }
    }
  };

  // const fileInputRef = useRef<HTMLInputElement>(null);

  // const handleCancelImage = () => {

  //   if (fileInputRef.current) {
  //     fileInputRef.current.value = '';
  //   }

  //   setSelectedFile(null);

  //   console.log(selectedFile)

  // }



  return (
    <div className='mb-6 '>
      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
        Chọn File
      </label>
      <div className='flex items-center justify-between w-full'>
        <input id="file" type="file" onChange={handleFileChange} className='w-[70%]' />
        <button className='text-center w-[30%] gap-2 ml-5 flex items-center ' type='button' onClick={handleUploadImage}>
          <MdUploadFile size={25} />
          Tải ảnh lên
        </button>

        {/* <button className='text-center w-[30%] gap-2 ml-5 flex items-center ' type='button' onClick={handleCancelImage}>
          <MdUploadFile size={25} />
          Xóa ảnh
        </button> */}
      </div>
    </div>
  )
}

export default UploadImages