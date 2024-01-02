import { faChevronLeft, faChevronRight, faUser } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useState } from "react"
import adminData from "../SessionInfo"




const NavSide = () => {

    const [isOpen, setIsOpen] = useState<boolean>(true)

    let adminName: string = adminData?.name


    const handleClose = () => {
        setIsOpen(false)
    }

    const handleOpen = () => {
        setIsOpen(true)
    }

    return (
        <>
            {
                isOpen ? <div className="basis-[14%] bg-gradient-to-b from-[#07bd89] to-[#006e8c]  min-h-screen fix border ">
                    <div className="flex justify-end">
                        <button onClick={handleClose} className="">
                            <FontAwesomeIcon className="p-2" icon={faChevronLeft} size="lg" />
                        </button>
                    </div>
                    <div className="flex min-h-full">
                        <div className="w-[90%] text-center">
                            <FontAwesomeIcon className="p-2 text-5xl" icon={faUser} size="lg" />
                            <h1>{adminName}</h1>
                        </div>

                    </div>
                </div > :
                    <div className="fixed">
                        <div className="flex justify-end">
                            <button onClick={handleOpen} className="">
                                <FontAwesomeIcon className="p-2" icon={faChevronRight} size="lg" />
                            </button>
                        </div>
                    </div>

            }

        </>
    )
}

export default NavSide