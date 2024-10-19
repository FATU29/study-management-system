import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import './HomePage.tsx.css';
import exp from 'constants';

const Welcome = () => {
    return (
      <>
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Coiny&display=swap');
        </style>
        <div className='d-flex flex-column min-vh-100'>
          <div className='row flex-grow-1 align-items-center bg-white'>
            <div className='col d-flex align-items-center justify-content-center'>
              <div className='ml-3 text-left coiny-regular'>
                Moodle:
                <div className='text-break'></div>
                Giải pháp giáo dục toàn diện
              </div>
            </div>
            <div className='col col-4 d-flex align-items-center justify-content-end mr-16'>
              <img
                src='https://cdn.prod.website-files.com/6364b6fd26e298b0b8b938f5/637212de8fd1af58bb121cfb_drawkit-hero-p-800.png'
                alt='feature_1'
                className='img-fluid w-100'
              />
            </div>
          </div>
        </div>
      </>
    );
  }
  
  export default Welcome;
  