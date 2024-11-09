import IconifyIcon from '../utils/icon';

const Footer = () => {
  return (
    <div className="bg-white">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-3 col-md-6 col-sm-12 mr-lg-4 mb-4">
            <div className="text-black font-medium font-bold text-left py-4">
              Về Moodle
            </div>
            <div className="text-black text-left text-xs text-gray-500 py-1">
              Moodle là một sản phẩm được tạo ra để quản lý giáo dục. Với Moodle, chúng ta có thể giải quyết những vấn đề còn tồn đọng trong ngành giáo dục.
            </div>
            <div className="py-2">
              <div className="row">
                <div className="col-auto">
                  <IconifyIcon icon="radix-icons:modulz-logo" width="80" height="80"></IconifyIcon>
                </div>
                <div className="col text-left font-bold text-lg">
                  Moodle
                  <div className="text-left font-bold text-xs">
                    Education Solution
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="col-lg-3 mr-lg-4 col-md-6 col-sm-12 mb-4">
            <div className="text-black font-medium font-bold text-left py-4">
              Liên hệ
            </div>
            <div className="text-left text-xs">
            <a className="block text-decoration-none text-base font-bold mb-2 text-black" href="tel:+012345678">
                +84 123 456 789
              </a>

              <a className="block text-decoration-none mb-2 text-black">
                
                <span className="font-bold">Địa chỉ: </span> 227 Nguyễn Văn Cừ, phường 4, quận 5, TP.HCM
              </a>
              <a className="block text-decoration-none text-black" href="mailto:mail@example.com">
                <span className="font-bold">Email: </span>contact@example.com
              </a>
            </div>
          </div>
          <div className="col-lg-2 mr-lg-4 col-md-6 col-sm-12 mb-4">
            <div className="text-black font-medium font-bold text-left py-4">
              Sản phẩm
            </div>
            <div className="text-left text-xs ">
              <a className="block text-decoration-none text-black" href='#'>
                Giáo dục
              </a>
            </div>
          </div>
          <div className="col-lg-2 col-md-6 col-sm-12 mb-4">
            <div className="text-black font-medium font-bold text-left py-4">
              Theo dõi chúng tôi
            </div>
            <div className="">
              <div className="row justify-content-start py-3">
                <a className="col-auto" href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer">
                  <IconifyIcon icon="akar-icons:facebook-fill" width="30" height="30"></IconifyIcon>
                </a>
                <a className="col-auto" href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer">
                  <IconifyIcon icon="akar-icons:instagram-fill" width="30" height="30"></IconifyIcon>
                </a>
                <a className="col-auto" href="https://www.twitter.com/" target="_blank" rel="noopener noreferrer">
                  <IconifyIcon icon="akar-icons:twitter-fill" width="30" height="30"></IconifyIcon>
                </a>
              </div>
            </div>
          </div>
        </div>
        <hr className="my-4 border-gray-400" />
        <div className="row justify-content-center py-3">
          <div className="col-auto text-left text-gray-500 text-xs">
            Copyright © 2024 uStudy. All rights reserved.
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
