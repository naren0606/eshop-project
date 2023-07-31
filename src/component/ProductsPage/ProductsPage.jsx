import React, { useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import { Link, useNavigate } from "react-router-dom";
import Grid from '@mui/material/Grid';
import ToggleButton from '@mui/material/ToggleButton';
import Button from '@mui/material/Button';
import Skeleton from 'react-loading-skeleton';
import { Alert } from '@mui/material';




import './ProductsPage.css';

const ProductsPage = () => {
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true' || false;
  const navigate=useNavigate();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [sortingOption, setSortingOption] = useState('default');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch the products data
    fetch('http://localhost:3001/api/v1/products')
      .then((response) => response.json())
      .then((data) => {
        setProducts(data);
        setTimeout(() => {
          setLoading(false);
        }, 1500);
      })
      .catch((error) => {
        console.error('Error fetching products:', error);
        setLoading(true);
      });
  
    // Fetch the categories data
    fetch('http://localhost:3001/api/v1/products/categories')
      .then((response) => response.json())
      .then((data) => {
        setCategories(data);
      })
      .catch((error) => {
        console.error('Error fetching categories:', error);
      });
  
  
  }, []);

  
  
  

  const handleCategoryChange = (category) => {
    setSelectedCategories((prevSelectedCategories) => {
      if (category === '') {
        // If the category is empty, deselect all categories
        return [];
      } else if (prevSelectedCategories.includes(category)) {
        // If the category is already selected, remove it from the selected categories
        return prevSelectedCategories.filter((cat) => cat !== category);
      } else {
        // If the category is not selected, add it to the selected categories
        return [category];
      }
    });
  };
  

  
  const handleSortingOptionChange = (event) => {
    setSortingOption(event.target.value);
  
    if (event.target.value === 'default') {
      // Fetch the products again to revert to the original order
      fetch('http://localhost:3001/api/v1/products')
        .then(response => response.json())
        .then(data => {
          setProducts(data);
        })
        .catch(error => {
          console.error('Error fetching products:', error);
        });
    } else if (event.target.value === 'price-low-to-high') {
      // Sort the products by price in ascending order
      const sortedProducts = [...products].sort((a, b) => a.price - b.price);
      setProducts(sortedProducts);
    } else if (event.target.value === 'price-high-to-low') {
      // Sort the products by price in descending order
      const sortedProducts = [...products].sort((a, b) => b.price - a.price);
      setProducts(sortedProducts);

    }else if (event.target.value === 'newest') {
    // Sort the products by createdAt in descending order (newest first)
    const sortedProducts = [...products].sort((a, b) => {
      const dateA = new Date(a.createdAt);
      const dateB = new Date(b.createdAt);
      return dateB - dateA;
    });
      setProducts(sortedProducts);
    }
  };


 
  if (!isAuthenticated) {
    setTimeout(() => {
      navigate('/');
    }, 2200); 
  
    return (
      <Box className='alert-box'>
        <Alert severity="error">Please login first to access this page.</Alert>
      </Box>
    );
  }
  
  

  return (
    <div className="main">
      <div className="filters">
        <div className="categories">
          <ToggleButton
            value=""
            selected={selectedCategories.length === 0}
            onChange={() => handleCategoryChange('')}
            size="small"
            className="category-btn"
          >
            All
          </ToggleButton>
          {categories.map((category) => (
            <ToggleButton
              key={category}
              value={category}
              selected={selectedCategories.includes(category)}
              onChange={() => handleCategoryChange(category)}
              size="small"
              variant="outlined"
              className="category-btn"
            >
              {category}
            </ToggleButton>
          ))}
        </div>

        <select value={sortingOption} onChange={handleSortingOptionChange} className='select-input'>
          <option value="default">Default Sorting</option>
          <option value="price-low-to-high">Price: Low to High</option>
          <option value="price-high-to-low">Price: High to Low</option>
          <option value="newest">Newest First</option>
        </select>
      </div>

   {loading ? (
  <Grid container spacing={3} className="grid">
    {[...Array(6)].map((_, index) => (
      <Grid item xs={12} sm={6} md={4} lg={4} key={index}>
        <Card sx={{ height: '370px' }}>
          <Skeleton animation="wave" height={1} />
          <Box p={2}>
            <Skeleton animation="wave" height={10} />
            <Skeleton animation="wave" height={10} width="60%" />
          </Box>
        </Card>
      </Grid>
    ))}
  </Grid>
) : (
  <Grid container spacing={3} className='grid'>
  {products
    .filter((product) => selectedCategories.length === 0 || selectedCategories.includes(product.category))
    .map((product) => (
      <Grid item xs={8} sm={6} md={4} lg={4} key={product._id}>
        <Card sx={{ width: '100%' }} className='product-card'>
          <img src={product.imageURL} alt={product.name} className="product-image" />
          <Box p={2} className='product-details'>
            <h4 className="product-title">{product.name}...</h4>
            <p className="product-manufacturer">{product.manufacturer}</p>
            <p className="product-price"><b>₹{product.price}</b></p>
            <Link to={`/product-details/${product._id}`}>
            <Button variant="contained" className="buyNow">
              Buy Now
            </Button>
            </Link>
          </Box>
        </Card>
      </Grid>
    ))}
</Grid>

      )}
    </div>
  );
};

export default ProductsPage;
