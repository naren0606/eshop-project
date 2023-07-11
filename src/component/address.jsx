import React, { useState, useEffect } from 'react';
import { TextField, Button, MenuItem, Alert, Typography } from '@mui/material';
import axios from 'axios';
import '../address.css';


const Address = () => {
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true' || false;
  const [addresses, setAddresses] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState('');
  const [address, setAddress] = useState({
    name: '',
    contactNumber: '',
    city: '',
    landmark: '',
    street: '',
    state: '',
    zipCode: '',
  });

  useEffect(() => {
    if (isAuthenticated) {
      fetchAddresses();
    }
  }, [isAuthenticated]);

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
        if (!selectedAddress) {
          alert('Please select an address from the saved addresses.');
          return;
        }

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
          alert('New address added successfully');
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
        setSelectedAddress('');
        setShowForm(false);
      } else {
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
    return <Alert severity="info">Please login first to access this page.</Alert>;
  }

  return (
    <div className='address'>
      <div>
        <TextField
          select
          label="Saved Addresses"
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
  );
};

export default Address;
