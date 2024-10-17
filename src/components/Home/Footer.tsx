import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import IconifyIcon from '../utils/icon';

const Footer = () => {


    return (
        <div className="bg-white">
            <div className="row">
                <div className="col col-3 justify-content-start">
                    <div className="text-black font-medium font-bold text-left px-5 py-4">
                        Về Moodle
                    </div>
                    <div className="text-black text-left px-5 text-xs text-gray-500">
                    Moodle là một sản phẩm được tạo ra để quản lý giáo dục. Với Moodle, chúng ta có thể giải quyết những vấn đề còn tồn đọng trong ngành giáo dục.
                    </div>
                    <div className="px-12 py-2">
                        <div className='row justify-content-start'>
                            <div className='col col-auto'>
                                <IconifyIcon icon="radix-icons:modulz-logo" width="80" height="80"></IconifyIcon>
                            </div>
                            <div className='col text-left py-3 font-bold text-lg'>
                                Moodle
                                <div className='text-left  font-bold text-xs'>
                                    Education Solution  
                                </div>  
                            </div>
                        </div>
                        
                    </div>
                </div>
                
                <div className="col col-4 justify-content-start py-4">
                    <div className="text-black font-medium font-bold text-left">
                        Liên hệ
                    </div>
                    <div className='text-left text-xs py-3.5'>
                        <a className='block text-decoration-none text-gray-500'>
                            Địa chỉ: 227 Nguyễn Văn Cừ, phường 4, quận 5, TP.HCM
                        </a>
                        <br/>
                        <a className='block text-decoration-none text-gray-500' href='tel:+012345678'>
                            Phone: +012345678
                        </a>
                        <br/>
                        <a className='block text-decoration-none text-gray-500' href='mailto:mail@example.com'>
                            contact@example.com
                        </a>
                    </div>
                </div>

                <div className="col col-2 justify-content-start py-4">
                    <div className="text-black font-medium font-bold text-left">
                        Sản phẩm
                    </div>
                    <div className='text-left text-xs py-3.5'>
                        <a className='block text-decoration-none text-gray-500'>
                            Giáo dục
                        </a>
                    </div>
                </div>

                <div className="col col justify-content-start py-4">
                    <div className="text-black font-medium font-bold text-left">
                        Theo dõi chúng tôi
                    </div>
                    <div className=''>
                        <div className='row justify-content-start py-3'>
                            <a className='col-auto' href='https://www.facebook.com/' target='_blank'>
                                <IconifyIcon icon="akar-icons:facebook-fill" width="30" height="30"></IconifyIcon>
                            </a>
                            <a className='col-auto' href='https://www.instagram.com/' target='_blank'>
                                <IconifyIcon icon="akar-icons:instagram-fill" width="30" height="30"></IconifyIcon>
                            </a>
                            <a className='col-auto' href='https://www.twitter.com/' target='_blank'>
                                <IconifyIcon icon="akar-icons:twitter-fill" width="30" height="30"></IconifyIcon>
                            </a>
                        </div>
                    </div>
                </div>

            </div>
            <hr className="my-4 border-gray-400" />
            <div className='row justify-content-center py-3'>
                <div className='col-auto text-left text-gray-500 text-xs'>
                    Copyright © 2024 uStudy. All rights reserved.
                </div>
            </div>
        </div>
    )
}


export default Footer;