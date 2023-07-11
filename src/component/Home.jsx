import React, { useState } from 'react';
import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext } from 'pure-react-carousel';
import 'pure-react-carousel/dist/react-carousel.es.css';
import '../Home.css';

const Home = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const handleSlideChange = (slide) => {
    setCurrentSlide(slide);
  };

  return (
    <CarouselProvider
      naturalSlideWidth={100}
      naturalSlideHeight={50}
      totalSlides={4}
      className="hero"
      isPlaying={true}
      interval={2000}
      infinite={true}
      currentSlide={currentSlide}
      onChange={handleSlideChange}
    >
      <Slider>
        <Slide index={0}>
          <div className="card text-bg-dark border-0">
            <img
              src={require('../background.jpg')}
              className="card-img hero-img"
              alt="Background"
            />
          </div>
        </Slide>
        <Slide index={1}>
          <div className="card text-bg-dark border-0">
            <img
              src={require('../background1.jpg')}
              className="card-img hero-img"
              alt="Background"
            />
          </div>
        </Slide>
        <Slide index={2}>
          <div className="card text-bg-dark border-0">
            <img
              src={require('../background2.jpg')}
              className="card-img hero-img"
              alt="Background"
            />
          </div>
        </Slide>
        <Slide index={3}>
          <div className="card text-bg-dark border-0">
            <img
              src={require('../background3.jpg')}
              className="card-img hero-img"
              alt="Background"
            />
          </div>
        </Slide>
      </Slider>
    </CarouselProvider>
  );
};

export default Home;
