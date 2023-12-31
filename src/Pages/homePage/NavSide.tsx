import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useState } from "react"




const NavSide = () => {

    const [isOpen, setIsOpen] = useState<boolean>(true)

    const handleClose = () => {
        setIsOpen(false)
    }

    const handleOpen = () => {
        setIsOpen(true)
    }

    return (
        <>
            {
                isOpen ? <div className="basis-[14%] min-h-screen fix border">
                    <div className="bg-gradient-to-b from-[#07bd89] to-[#006e8c] min-h-full">
                        <div className="flex justify-end">
                            <button onClick={handleClose} className=" fixed">
                                <FontAwesomeIcon className="p-2" icon={faChevronLeft} size="lg" />
                            </button>
                        </div>
                        <div>Avatar</div>
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