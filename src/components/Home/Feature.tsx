import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import IconifyIcon from '../utils/icon';

const Feature = () => {
  return (
    <div className="container">
      <div className="row justify-content-center font-bold fs-1 my-4 text-primary">
        Tính năng
      </div>
      
      <div className="row rounded bg-white justify-content-center mb-4">
        <div className="col-lg-2 col-md-4 col-sm-12 mr-2 mb-2 text-center">
          <img src="https://placehold.co/200x200" alt="feature_1" className="img-fluid" />
        </div>
        <div className="col-lg-8 col-md-8 col-sm-12 align-self-center">
          <div className="row mr-12">
            <span className="fs-3 font-bold text text-left text-primary">Thân thiện</span>
          </div>
          <div className="row">
            <span className="fs-5 text text-left">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </span>
          </div>
        </div>
      </div>
      
      <div className="row rounded bg-white justify-content-center mb-4">
        <div className="col-lg-2 col-md-4 col-sm-12 mr-2 mb-2 text-center">
          <img src="https://placehold.co/200x200" alt="feature_1" className="img-fluid" />
        </div>
        <div className="col-lg-8 col-md-8 col-sm-12 align-self-center">
          <div className="row mr-12">
            <span className="fs-3 font-bold text text-left text-primary">Thân thiện</span>
          </div>
          <div className="row">
            <span className="fs-5 text text-left">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </span>
          </div>
        </div>
      </div>
      
      <div className="row rounded bg-white justify-content-center mb-4">
        <div className="col-lg-2 col-md-4 col-sm-12 mr-2 mb-2 text-center">
          <img src="https://placehold.co/200x200" alt="feature_3" className="img-fluid" />
        </div>
        <div className="col-lg-8 col-md-8 col-sm-12 align-self-center">
          <div className="row mr-12">
            <span className="fs-3 font-bold text text-left text-primary">Thân thiện</span>
          </div>
          <div className="row">
            <span className="fs-5 text text-left">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Feature;
