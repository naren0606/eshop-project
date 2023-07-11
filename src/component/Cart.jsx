import React from 'react';
import { Card, CardContent,Typography,Button } from '@mui/material';
import '../Cart.css';

const Cart = ({ cart, onUpdateQuantity, onDeleteItem }) => {
  // Merge products with the same name and sum their quantities
  const mergedCart = cart.reduce((acc, item) => {
    const existingItem = acc.find((i) => i.name === item.name);
    if (existingItem) {
      existingItem.quantity += item.quantity;
    } else {
      acc.push({ ...item });
    }
    return acc;
  }, []);

  const calculateTotalCartValue = () => {
    let total = 0;
    for (const item of mergedCart) {
      total += item.price * item.quantity;
    }
    return total.toFixed(2);
  };

  const handleQuantityChange = (itemId, event) => {
    const quantity = parseInt(event.target.value, 10);
    onUpdateQuantity(itemId, quantity);
 
  };
  
  const handleDeleteItem = (itemId) => {
    onDeleteItem(itemId);
  };
  

  return (
    <div className="main">
      {mergedCart.map((item) => (
        <Card className="cart-card" key={item._id}>
          <Card className="cart-image">
          <img src={item.image} alt={item.name} width="100%" className="image" />
          </Card>
          <div style={{display:'flex', justifyContent:'space-between'}}>
          <CardContent className="card-content">
            <Typography variant="h6" component="div">
              {item.name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Price: ₹{item.price}
            </Typography>
          </CardContent>
          <CardContent className='card-content'>
          <Typography variant="body2" color="text.secondary">
              Quantity:
              <input
                type="number"
                value={item.quantity}
                onChange={(event) => handleQuantityChange(item._id, event)}
                min={1}
              />
            </Typography>
            <Typography variant="body2" color="black" align="right" margin='10px auto auto auto'>
              Sub-total: ₹{(item.price * item.quantity).toFixed(2)}
            </Typography>
            <Button variant="contained" className='remove-product' onClick={() => handleDeleteItem(item._id)}>Remove product </Button>
          </CardContent>
          </div>
        </Card>
      ))}
      <h3 style={{ margin: '20px 35px' }}>Total Cart Value: ₹ {calculateTotalCartValue()}</h3>
    </div>
  );
};

export default Cart;
