import { Link } from "react-router-dom"
import Logo from "../rangdong.png"


type Props = {

}

const Header = (props: Props) => {
    return (
        <nav className="bg-gray-800 p-5">
            <div className="container mx-auto flex justify-between items-center">
                <div className="flex space-x-4">
                    <img src={Logo} alt="logo" className="w-[6rem] h-[4rem] object-contain" />
                    <div className="pt-4 space-x-4">
                        <Link to="/" className="text-white">Home</Link>
                        <Link to="/about" className="text-white">About</Link>
                        <Link to="/" className="text-white">Contact</Link>
                    </div>
                </div>
                <div className="space-x-4">
                    <Link to="/" className="text-white">Logout</Link>
                </div>
            </div>
        </nav>

    )
}

export default Header