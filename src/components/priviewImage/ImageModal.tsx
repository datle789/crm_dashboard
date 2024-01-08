// Modal.tsx
import React from 'react';
import Modal from 'react-modal';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  imageSrc: string;
}

const ImageModal: React.FC<ModalProps> = ({ isOpen, onClose, imageSrc }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Image Modal"
      className="image-modal max-w-[700x] mx-auto h-[700px] mt-[40px] bg-transparent"
      overlayClassName="image-modal-overlay fixed top-0 left-0 w-full h-full bg-black bg-opacity-90"
    >
      <img src={imageSrc} alt="Enlarged Image" className="w-full h-full object-contain" />
      <button className="close-button absolute top-4 right-4 text-white text-xl" onClick={onClose}>
        Đóng
      </button>
    </Modal>
  );
};

export default ImageModal;
