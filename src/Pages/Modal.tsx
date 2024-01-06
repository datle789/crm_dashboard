import { useEffect, useRef } from "react";


interface Props {
    children: React.ReactNode;
    modalIsOpen: boolean
    closeModal: () => void
}

const ModalLayOut = ({ children, modalIsOpen, closeModal }: Props) => {

    const modalRef: any = useRef();

    const handleOutsideClick = (event: any) => {
        if (modalRef.current && !modalRef.current.contains(event.target)) {
            // Click outside the modal, close it
            closeModal();
        }
    };

    useEffect(() => {
        // Add event listener when component mounts
        document.addEventListener('mousedown', handleOutsideClick);

        // Cleanup event listener when component unmounts
        return () => {
            document.removeEventListener('mousedown', handleOutsideClick);
        };
    }, [closeModal]);

    return (
        <>
            {modalIsOpen ? <div className="fixed inset-0 cursor-pointer bg-[rgba(0,0,0,0.5)] flex justify-center items-center">
                <div ref={modalRef} className="bg-white p-[20px] rounded-[5px]">
                    {children}
                </div>
            </div> : ''}
        </>
    )
}

export default ModalLayOut