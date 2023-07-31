import React from 'react';
import { Container, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import './NotFound.css';

const NotFound = () => {
  return (
    <section className='main-page'>
      <Container className="page_404">
        <div className="row">
            <div className="col-sm-10 col-sm-offset-1 text-center">
              <div className="four_zero_four_bg">
                <h1 className="text-center">404</h1>
              </div>

              <div className="contant_box_404">
                <h3 className="h2" style={{fontSize:'40px'}}>Look like you're lost</h3>
                <p style={{fontSize:'18px'}}>The page you are looking for is not available!</p>
                <Button
                  component={Link}
                  to="/"
                  variant="contained"
                  className="link_404"
                >
                  Go to Home
                </Button>
            </div>
          </div>
        </div>
      </Container>
      </section>
  );
};

export default NotFound;
