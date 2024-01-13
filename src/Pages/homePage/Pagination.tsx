import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useState } from "react";


interface Props {
    currentPage: number;
    totalPages: number;
    setCurrentPage: (page: number) => void;
}

const Paginations = ({ currentPage, totalPages, setCurrentPage }: Props) => {
    const pages = [];

    for (let i = 0; i < totalPages; i++) {
        pages.push(i)
    }

    const [previous, setPrevious] = useState(0)

    // const handlePrevious = (page)=>{
    //     setCurrentPage(page-1)
    // }

    return (
        <>
            <div className="text-center space-x-5 mt-5 ">

                {currentPage < 1 ?
                    <button disabled>
                        <FontAwesomeIcon className="" icon={faChevronLeft} size="lg" />
                    </button> :
                    <button onClick={() => setCurrentPage(currentPage - 1)} className="bg-blue-500 text-white font-bold py-2 px-3 rounded">
                        <FontAwesomeIcon className="" icon={faChevronLeft} size="lg" />
                    </button>
                }


                {pages.map(page => (
                    page === currentPage ?
                        <button className="bg-blue-500 text-white font-bold py-2 px-3 rounded" onClick={() => setCurrentPage(page)}>{page + 1}</button>
                        :
                        <button className="bg-gray-500 text-white font-bold py-2 px-3 rounded" onClick={() => setCurrentPage(page)}>{page + 1}</button>
                ))}



                {currentPage >= totalPages - 1 ?
                    <button disabled>
                        <FontAwesomeIcon className="" icon={faChevronRight} size="lg" />
                    </button> :
                    <button onClick={() => setCurrentPage(currentPage + 1)} className="bg-blue-500 text-white font-bold py-2 px-3 rounded">
                        <FontAwesomeIcon className="" icon={faChevronRight} size="lg" />
                    </button>
                }
            </div>
        </>
    )
}

export default Paginations