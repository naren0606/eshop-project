import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import {useNavigate} from "react-router-dom"


import '../ProductDetails.css';

const ProductDetails = ({ addToCart }) => {
  const { productId } = useParams();
  const [product, setProduct] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch the product details based on the productId
    fetchProductDetails(productId);
  }, [productId]);

  const fetchProductDetails = async (productId) => {
    try {
      const response = await fetch(`http://localhost:3001/api/v1/products/${productId}`);
      const productData = await response.json();
      setProduct(productData);
    } catch (error) {
      console.error('Error fetching product details:', error);
    }
  };

  const handleAddToCart = () => {
    if (quantity > product.availableItems) {
      alert('Please select a quantity less than or equal to the available items.');
      return;
    }
  
    const productDetails = {
      _id: productId,
      name: product.name,
      image: product.image,
      price: product.price,
      quantity: quantity,
    };
  
    addToCart(productDetails);
    alert('Your order is confirmed.');
  };
  


  const [quantity, setQuantity] = useState(1);

  const handleQuantityChange = (event) => {
    const newQuantity = parseInt(event.target.value);
    if (!isNaN(newQuantity) && newQuantity >= 1) {
      setQuantity(newQuantity);
    }
  };

  

  return (
    <div className="product-detail-container" style={{ overflowY: 'auto' }}>
      <Grid container spacing={1} className="product-grid">
        <Grid item xs={9} md={10} className="left-side">
          <Card className="images">
              <img src={product.imageURL} alt="{product.name}" width="100%" className="image" />
          </Card>
        </Grid>
        <Grid item xs={6} md={7}>
          <Grid container spacing={2} className="row-container">
            <Grid item xs={8} className="middle-side">
              <Card style={{ height: '510px' }}>
                <Box sx={{ p: 3 }}>
                  <h3 style={{ fontSize: '35px' }}>{product.name}</h3>
                  <hr className="divider" />
                  <span className="price">
                  <h5 style={{ fontSize: '20px', marginBottom: '5px', marginTop:'5px' }}>Product Price:</h5>
                  <h6 style={{ fontSize: '18px' }}>₹{product.price}</h6>   
                  </span>
                  <div className="product-description">
                  <h5 style={{ fontSize: '20px', margin: '20px 0px 3px 0px' }}>Category :</h5>
                  <h6 style={{ fontSize: '18px'}}>{product.category}</h6>
                  <h5 style={{ fontSize: '20px', margin: '20px 0px 3px 0px' }}>Manufacturer :</h5>
                  <h6 style={{ fontSize: '18px'}}>{product.manufacturer}</h6>
                  <h5 style={{ fontSize: '20px', margin: '20px 0px 3px 0px' }}>Product Description:</h5>
                  <h6 style={{ fontSize: '18px'}}>{product.description}</h6>
                  <h5 style={{ fontSize: '20px', margin: '20px 0px 3px 0px' }}>Available Items:</h5>
                  <h6 style={{ fontSize: '18px'}}>{product.availableItems}</h6>
                    
                  </div>
                </Box>
              </Card>
            </Grid>
            <Grid item xs={4} className="right-side">
              <Card Width='280px'>
                <div className="addTocart">Add to cart</div>
                <Box sx={{ p: 2 }}>
                    <div className="quantity-input">
                      <h6 style={{ fontSize: '15px', margin: ' 5px 0px 10px 0px' }}>Add Quantity:</h6>
                      <TextField
                        label="Quantity"
                        type="number"
                        value={quantity}
                        onChange={handleQuantityChange}
                      />
                      
                      
                    </div>
                    <Button  onClick={() => {handleAddToCart(); navigate("/place-order");}} className="place-order-btn">
        Place Order
      </Button>
                </Box>
              </Card>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default ProductDetails;
