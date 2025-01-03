const Feature = () => {
  return (
    <div className="container">
      <div className="row justify-content-center font-bold fs-1 my-4 text-primary">
        Tính năng
      </div>
      
      <div className="row rounded bg-white justify-content-center mb-4">
        <div className="col-lg-2 col-md-4 col-sm-12 mr-2 mb-2 text-center">
          <img src={`${process.env.PUBLIC_URL}/assets/friendly.png`} alt="feature_1" className="img-fluid" />
        </div>
        <div className="col-lg-8 col-md-8 col-sm-12 align-self-center">
          <div className="row mr-12">
            <span className="fs-3 font-bold text text-left text-primary">Thân thiện</span>
          </div>
          <div className="row">
            <span className="fs-5 text text-left">
              Giao diện thân thiện, dễ dàng sử dụng. Các tính năng được bố trí khoa học và hợp lý.
            </span>
          </div>
        </div>
      </div>
      
      <div className="row rounded bg-white justify-content-center mb-4">
        <div className="col-lg-2 col-md-4 col-sm-12 mr-2 mb-2 text-center">
          <img src={`${process.env.PUBLIC_URL}/assets/innovative.png`} alt="feature_1" className="img-fluid" />
        </div>
        <div className="col-lg-8 col-md-8 col-sm-12 align-self-center">
          <div className="row mr-12">
            <span className="fs-3 font-bold text text-left text-primary">Sáng tạo</span>
          </div>
          <div className="row">
            <span className="fs-5 text text-left">
              Tạo ra những trải nghiệm học tập mới lạ, việc dạy và học không còn nhàm chán.
            </span>
          </div>
        </div>
      </div>
      
      <div className="row rounded bg-white justify-content-center mb-4">
        <div className="col-lg-2 col-md-4 col-sm-12 mr-2 mb-2 text-center">
          <img src={`${process.env.PUBLIC_URL}/assets/interactive.png`} alt="feature_3" className="img-fluid" />
        </div>
        <div className="col-lg-8 col-md-8 col-sm-12 align-self-center">
          <div className="row mr-12">
            <span className="fs-3 font-bold text text-left text-primary">Tương tác</span>
          </div>
          <div className="row">
            <span className="fs-5 text text-left">
              Tăng sự tương tác giữa học viên và giáo viên, giúp việc học tập trở nên thú vị hơn.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Feature;
