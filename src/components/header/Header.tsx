import { Link } from "react-router-dom"
import Logo from "../../img/rangdong.png"


type Props = {

}

const Header = (props: Props) => {
    return (
        <nav className="bg-gradient-to-r from-[#07bd89] to-[#006e8c] p-5">
            <div className="container mx-auto flex justify-between items-center">
                <div className="flex space-x-4">
                    <img src={Logo} alt="logo" className="w-[6rem] h-[4rem] object-contain" />
                    <div className="pt-4 space-x-4">
                        <Link to="/home" className="text-white hover:bg-slate-100 hover:text-black p-5 rounded-lg">Home</Link>
                        <Link to="/about" className="text-white hover:bg-slate-100 hover:text-black p-5 rounded-lg">About</Link>
                        <Link to="/" className="text-white hover:bg-slate-100 hover:text-black p-5 rounded-lg">Contact</Link>
                    </div>
                </div>
                <div className="space-x-4">
                    <Link to="/" className="text-white hover:bg-slate-100 hover:text-black p-5 rounded-lg">Logout</Link>
                </div>
            </div>
        </nav>

    )
}

export default Header