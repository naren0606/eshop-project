import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { TextField, Button, MenuItem, Alert, Typography, Box,Stepper, Step, StepLabel,Card, CardContent} from '@mui/material';
import { useLocation } from 'react-router-dom';
import './Order.css';

const CreateOrderPage = () => {
  const [activeStep, setActiveStep] = useState(0);
  const navigate = useNavigate();
  const [selectedAddress, setSelectedAddress] = useState('');
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true' || false;
  const [addresses, setAddresses] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const location = useLocation();
  const [address, setAddress] = useState({
    name: '',
    contactNumber: '',
    city: '',
    landmark: '',
    street: '',
    state: '',
    zipCode: '',
  });

  const [product, setProduct] = useState(null);


  
  useEffect(() => {
    if (isAuthenticated) {
      fetchAddresses();
      setProduct(location.state.product);

        }
  }, [isAuthenticated, location]);

 
  

  const fetchAddresses = async () => {
    try {
      const token = localStorage.getItem('x-auth-token');
      const res = await axios.get('http://localhost:3001/api/v1/addresses', {
        headers: {
          'x-auth-token': token,
        },
      });
      setAddresses(res.data);
    } catch (error) {
      console.error('Error fetching addresses:', error);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setAddress((prevAddress) => ({
      ...prevAddress,
      [name]: value,
    }));
  };

  const handleAddressChange = (event) => {
    setSelectedAddress(event.target.value);
    const selected = addresses.find((addr) => addr._id === event.target.value);
    setAddress(selected);
  };


 
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      if (isAuthenticated) {
        const token = localStorage.getItem('x-auth-token');

        if (selectedAddress) {
          await axios.put(`http://localhost:3001/api/v1/addresses/${selectedAddress}`, address, {
            headers: {
              'x-auth-token': token,
            },
          });
          console.log('Selected address updated successfully');
        } else {
          
          await axios.post('http://localhost:3001/api/v1/addresses', address, {
            headers: {
              'x-auth-token': token,
            },
          });
        }
        fetchAddresses();
        setAddress({
          name: '',
          contactNumber: '',
          city: '',
          landmark: '',
          street: '',
          state: '',
          zipCode: '',
        });
        alert('Address added successfully! Now select address from existing addresses')
        setShowForm(false)
      } 
       else {
        alert('Please login first to add/update address.');
      }
    } catch (error) {
      console.error('Error submitting address:', error);
    }
  };

  const handleAddAddressClick = () => {
    setShowForm(true);
    setSelectedAddress('');
    setAddress({
      name: '',
      contactNumber: '',
      city: '',
      landmark: '',
      street: '',
      state: '',
      zipCode: '',
    });
  };






  if (!isAuthenticated) {
    setTimeout(() => {
      navigate('/');
    }, 2000); // Delay of 2 seconds
  
    return (
      <Box className='alert-box'>
        <Alert severity="error">Please login first to access this page.</Alert>
      </Box>
    );
  }
  
  const steps = ['Review Product', 'Delivery Details', 'Confirm Order'];

  const handleNext = () => {
    if (activeStep === 1) {
      if (!selectedAddress && !showForm) {
        alert('Please select an address from saved addresses or add a new address.');
        return;
      }
  
    }
   
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };


  const handleConfirmOrder = async () => {

    try {
      const token = localStorage.getItem('x-auth-token');
  
      if (!token) {
        alert('Please login first to place an order.');
        return;
      }

    alert('Order placed successfully!');
    navigate('/products');
  
  
      
    } catch (error) {
      console.error('Error placing order:', error);
      // Handle the error and display an appropriate message to the user
    }
  };
  
  
  




  return (
    <div class='create-order'>
      <Stepper activeStep={activeStep} alternativeLabel className='stepper'>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
    
{activeStep === 0 && product && (
        <div className="mains">
          <Card className="cart-card" key={product._id}>
            <Card className="cart-image">
              <img src={product.image} alt={product.name} width="100%" className="image" />
            </Card>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <CardContent className="card-content">
                <Typography variant="h6" component="div">
                  {product.name}
                </Typography>
               
                <Typography variant="body2" color="text.secondary">
                  Price: ₹{product.price}
                </Typography>
              </CardContent>
              <CardContent className="card-content">
               
              </CardContent>
            </div>
          </Card>
        </div>
      )}

{activeStep === 1 && 
(
<div className='address'>
      <div>
        <TextField
          select
          label="Existing Addresses"
          value={selectedAddress}
          style={{ width: '300px' }}
          onChange={handleAddressChange}
        >
          <MenuItem value="">None</MenuItem>
          {addresses.map((addr) => (
           <MenuItem key={addr._id} value={addr._id}>
           <Typography variant="subtitle1">
           {addr.name.toUpperCase()}
             <br/>
             {addr.city}: {addr.zipCode}
             <br />
             Contact: {addr.contactNumber}
           </Typography>
           </MenuItem>
          ))}
        </TextField>
        <Button variant="contained" style={{ marginLeft: '35px' }} onClick={handleAddAddressClick}>
          Add New Address
        </Button>
      </div>
      {showForm && (
        <form className='address-form' onSubmit={handleSubmit}>
          <hr style={{ margin:'10px auto 15px auto', width: '100%' }}/>
          <TextField
            label="Name"
            name="name"
            className='form-input'
            value={address.name}
            onChange={handleChange}
            required
          />
          <TextField
            label="Contact Number"
            name="contactNumber"
            className='form-input'
            value={address.contactNumber}
            onChange={handleChange}
            required
          />
          <TextField
            label="City"
            name="city"
            className='form-input'
            value={address.city}
            onChange={handleChange}
            required
          />
          <TextField
            label="Landmark"
            name="landmark"
            className='form-input'
            value={address.landmark}
            onChange={handleChange}
          />
          <TextField
            label="Street"
            name="street"
            className='form-input'
            value={address.street}
            onChange={handleChange}
            required
          />
          <TextField
            label="State"
            name="state"
            className='form-input'
            value={address.state}
            onChange={handleChange}
            required
          />
          <TextField
            label="Zip Code"
            name="zipCode"
            className='form-input'
            value={address.zipCode}
            onChange={handleChange}
            required
          />
          <br />
          <Button type="submit" className='form-input' variant="contained" color="primary">
            Submit
          </Button>
          <Button variant="contained" className='form-input' onClick={() => setShowForm(false)}>
            Cancel
          </Button>
        </form>
      )}
    </div>
)}


{activeStep === 2 && (
  <>
  <div className="main">
  <Typography variant="h6">Review Product:</Typography>
  <Card className="cart-card" key={product._id}>
    <Card className="cart-image">
      <img src={product.image} alt={product.name} width="100%" className="image" />
    </Card>
    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
      <CardContent className="card-content">
        <Typography variant="h6" component="div">
          {product.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Price: ₹{product.price}
        </Typography>
      </CardContent>
      <CardContent className="card-content">
       
        <Typography variant="body2" color="black" align="right" margin="10px auto auto auto">
        </Typography>
      </CardContent>
    </div>
  </Card>
</div>
  <div>
  <hr width='100%'/>
    <Typography variant="h6">Address:</Typography>
    {addresses.map((addr) => {
      if (addr._id === selectedAddress) {
        return (
          <div key={addr._id} style={{background: 'rgb(245 244 244)',
          padding: '10px',
          borderRadius: '5px'}}>
            <Typography>{addr.name.toUpperCase()}</Typography>
            <hr style={{ margin:'8px auto 13px 0px', width: '15%' }} />
            <Typography>{addr.contactNumber}</Typography>
            <Typography>{addr.city}: {addr.zipCode}</Typography>
          </div>
        );
      }
      return null;
    })}
  </div>
  </>
)}



      <div>
        {activeStep !== 2 && (
          <Button variant="contained" color="primary" className='save-btn' onClick={handleNext}>
            Next
          </Button>
        )}
        {activeStep === 2 && (
          <Button variant="contained" color="primary" className='save-btn'  onClick={handleConfirmOrder}>
            Confirm Order
          </Button>
        )}
        {activeStep !== 0 && (
          <Button variant="contained" color="secondary"  className='save-btn' onClick={handleBack}>
            Back
          </Button>
        )}
      </div>
    </div>
  );
};

export default CreateOrderPage;
