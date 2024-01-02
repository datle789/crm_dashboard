import logo from '../../img/rangdong.png'
import { FaFacebookF } from "react-icons/fa";
import { TiSocialYoutube } from "react-icons/ti";
type Props = {

}

const Footer = (props: Props) => {
    return (
        <div className='w-full bg-gradient-to-r from-[#07bd89] to-[#006e8c] min-h-[260px]'>
            <div className='max-w-[240px] ml-1'><img src={logo} className='w-[200px] h-[120px]' /></div>
            <div className='w-full h-[1px] mb-[24px] bg-gradient-to-r from-transparent via-white to-transparent" style="background-image: linear-gradient(89.98deg, hsla(0,0%,100%,0), #fff 50.1%, hsla(0,0%,100%,0)) '></div>
            <div className='flex items-center justify-between'>
                <div>
                    <div className='p-2 font-bold text-white'>CÔNG TY CP BÓNG ĐÈN PHÍCH NƯỚC RẠNG ĐÔNG</div>
                    <div className='p-2'>
                        <a href="https://goo.gl/maps/mXjR42gkqUShsYwYA" className='text-[14px] leading-[150%] inline-block text-white'>Số 87 - 89 Hạ Đình, Thanh Xuân, Hà Nội.</a>
                        <div className='text-[14px] leading-[150%] text-white'>©2024 - Bản quyền của Công ty CP Bóng đèn Phích nước Rạng Đông. RangDongStore.vn</div>
                        <div className='text-[14px] leading-[150%] text-white'>GPĐKKD số: 0103004893 do Sở KHĐT TP Hà Nội cấp ngày 15/07/2004</div>
                    </div>
                </div>
                <div className='pt-[10px] pr-[9px] '>
                    <div className='p-2 font-bold text-white leading-[120%] text-[18px] mb-[16px]'>Kết nối với chúng tôi</div>
                    <div className='flex items-center gap-4'>
                        <a className='ml-[5px]' href="https://www.facebook.com/rangdongstore.vn/"><span className=' w-[45px] h-[45px] bg-blue-600 items-center justify-center flex rounded-full'><FaFacebookF size={24} color='white' /></span></a>
                        <a href="https://www.youtube.com/channel/UCpErV6UKMmu-Gu3LA-DDS0A"><span className=' w-[45px] h-[45px] bg-red-600 items-center justify-center flex rounded-full'><TiSocialYoutube size={24} color='white' /></span></a>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Footer