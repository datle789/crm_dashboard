import React, { ChangeEvent, useState } from 'react';
import axios from 'axios';
interface Props {
  handleUpload: (urlImage: string) => void;
}


const UploadImages = ({ handleUpload }: Props) => {

  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setSelectedFile(event.target.files[0]);
    }
  };
  const handleUploadImage = async (event: ChangeEvent<HTMLInputElement>) => {
    console.log('test')

    // if (selectedFile) {
    //   const formData = new FormData();
    //   formData.append('file', selectedFile);

    //   try {
    //     const response = await axios.post('http://103.160.2.183:8082/crm/upload', formData);
    //     if (response.status === 200) {
    //       const urlImage = response.data.message;
    //       handleUpload(urlImage)
    //     }
    //   } catch (error) {
    //     console.error('Error uploading image:', error);
    //   }
    // }
  };

  return (
    <div className='mb-4'>
      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
        Chọn File
      </label>
      <input id="file" type="file" onChange={handleFileChange} />
      <button type='button' onClick={(event) => handleUploadImage}>Upload</button>
    </div>
  )
}

export default UploadImages