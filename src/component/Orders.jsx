import React, { useState, useEffect } from 'react';
import { Stepper, Step, StepLabel, Button, Typography, TextField, MenuItem } from '@mui/material';
import Cart from './Cart';
import { useNavigate } from 'react-router-dom';

import '../Order.css';
import Address from './address';

const CreateOrderPage = () => {
  const [activeStep, setActiveStep] = useState(0);
  const navigate=useNavigate();
  const [selectedAddress, setSelectedAddress] = useState('');


  const [cartItems, setCartItems] = useState([]);

  const handleAddToCart = (item) => {
    setCartItems((prevCartItems) => [...prevCartItems, item]);
  };

  const deleteItem = (itemId) => {
    // Find the index of the item to be deleted in the cart array
    const itemIndex = cartItems.findIndex((item) => item._id === itemId);

    // If the item is found, remove it from the cart
    if (itemIndex !== -1) {
      const updatedCart = [...cartItems];
      updatedCart.splice(itemIndex, 1);
      setCartItems(updatedCart);
    }
  };

  const handleQuantityChange = (itemId, quantity) => {
    const updatedCart = cartItems.map((item) => {
      if (item._id === itemId) {
        return { ...item, quantity: parseInt(quantity, 10) };
      }
      return item;
    });
    setCartItems(updatedCart);
  };

 
  const [address, setAddress] = useState({
    firstName: '',
    lastName: '',
    phoneNo: '',
    alternateNo: '',
    mailId: '',
    country: 'India',
    address1: '',
    address2: '',
    city: '',
    landmark: '',
    state: 'Arunachal Pradesh',
    pincode: '',
  });



  const steps = ['Cart', 'Shipping Details', 'Confirm Order'];

  const handleNext = () => {
   
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleConfirmOrder = () => {
    // Perform actions to create the order and add the product to the cart
    // ...
    // Display confirmation message
    navigate('/');
    alert('Order placed successfully!');
  };

  const handleChange = (field, value) => {
    if (activeStep === 1) {
      setAddress((prevaddress) => ({
        ...prevaddress,
        [field]: value,
      }));
    }
  };



  return (
    <div>
      <Stepper activeStep={activeStep} alternativeLabel className='stepper'>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      {activeStep === 0 &&(
        <Cart cart={cartItems} onUpdateQuantity={handleQuantityChange} onDeleteItem={deleteItem} />
      )}

      {activeStep === 1 && <Address />}


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
