import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

const Carousel = () => {
  return (
    <div id="carouselIndicators" className="carousel slide" data-bs-ride="carousel">
      <ol className="carousel-indicators">
        <li data-bs-target="#carouselIndicators" data-bs-slide-to="0" className="active"></li>
        <li data-bs-target="#carouselIndicators" data-bs-slide-to="1"></li>
        <li data-bs-target="#carouselIndicators" data-bs-slide-to="2"></li>
      </ol>
      <div className="carousel-inner">
        <div className="carousel-item active">
          <img className="d-block w-100 mx-auto" src="https://placehold.co/1200x500" alt="First slide" />
        </div>
        <div className="carousel-item">
          <img className="d-block w-100 mx-auto" src="https://placehold.co/1200x500" alt="Second slide" />
        </div>
        <div className="carousel-item">
          <img className="d-block w-100 mx-auto" src="https://placehold.co/1200x500" alt="Third slide" />
        </div>
      </div>
      <a className="carousel-control-prev" href="#carouselIndicators" role="button" data-bs-slide="prev">
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="sr-only">Previous</span>
      </a>
      <a className="carousel-control-next" href="#carouselIndicators" role="button" data-bs-slide="next">
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="sr-only">Next</span>
      </a>
    </div>
  );
}

export default Carousel;
