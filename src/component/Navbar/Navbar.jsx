import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserPlus } from '@fortawesome/free-solid-svg-icons';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Badge from '@mui/material/Badge';
import { styled } from '@mui/material/styles';
import Icon from '@mui/material/IconButton';
import Divider from '@mui/material/Divider';
import SearchIcon from '@mui/icons-material/Search';
import Stack from '@mui/material/Stack';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Drawer from '@mui/material/Drawer';
import HomeIcon from '@mui/icons-material/Home';
import LoginIcon from '@mui/icons-material/Login';
import { Modal, Box, Typography, TextField, Button, MenuItem, Menu, Avatar } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import './Navbar.css';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Login from '../Login/Login';
import { LogOutIcon, UserCircle2 } from 'lucide-react';
import { X } from 'lucide-react';


const Navbar = () => {
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true' || false;
  const [openModal, setOpenModal] = useState(false);
  const [openRegisterModal, setOpenRegisterModal] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const [contactNumber, setContactNumber] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [openDrawer, setOpenDrawer] = useState(false);

  const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
      right: -3,
      top: 13,
      padding: '0 4px',
    },
  }));


  const isAdmin = () => {
    // Logic to determine admin status based on user's role or other authentication data
    return false; // Return true or false based on the admin status
  };


  const handleOpenModal = () => {
    setOpenModal(true);
    setOpenRegisterModal(false);
  };

  const handleOpenRegisterModal = () => {
    setOpenRegisterModal(true);
    setOpenModal(false);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleCloseRegisterModal = () => {
    setOpenRegisterModal(false);
  };

  const handleRegister = () => {
    const data = {
      firstName,
      lastName,
      email,
      password,
      contactNumber,
    };

    axios
      .post('http://localhost:3001/api/v1/users', data)
      .then((response) => {
        if (response.status === 200) {
          alert('Registration successful!');
          handleCloseRegisterModal();
        } else {
          alert('An error occurred during registration.');
        }
      })
      .catch((error) => {
        console.error('Error registering user:', error);
        alert('An error occurred during registration.');
      });
  };

  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
  };


  const handleLogout = () => {
    localStorage.setItem('isAuthenticated', 'false');
    navigate('/');
    setSidebarOpen(false);
  };

  const handleSidebarToggle = () => {
    setOpenDrawer(!openDrawer);
  };


  const handleSearch = (event) => {
    event.preventDefault();
    const trimmedQuery = searchQuery.trim().toLowerCase();
    if (trimmedQuery !== '') {
      const filteredProducts = products.filter((product) =>
        product.name.toLowerCase().includes(trimmedQuery)
      );
      setFilteredProducts(filteredProducts);
    } else {
      setFilteredProducts([]);
    }
  };



  const handleSidebarClose = () => {
    setSidebarOpen(false);
  };

  const handleSidebarLinkClick = () => {
    setSidebarOpen(false);
  };


  return (
    <AppBar position="static" color="primary" style={{ zIndex: 999, boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.2)', backgroundColor: '#3f51b5' }}>
      <Toolbar>
        <Typography variant="h5" sx={{ flexGrow: 1 }}>
          <b>upGrad</b>
        </Typography>

        {isAdmin() && isAuthenticated && (
          <React.Fragment>
            <div>
              <Link to="/">
                <Button color="#fff" className="btn">
                  <HomeIcon fontSize="medium" className="btn" />
                </Button>
              </Link>
              <Link to="/products">
                <Button color="#fff" className="btn">
                  Products
                </Button>
              </Link>
              <Link to="/addproducts">
                <Button color="#fff" className="btn">
                  Add Products
                </Button>
                <form onSubmit={handleSearch} className="searchBar">
                  <input
                    type="search"
                    placeholder="Search"
                    aria-label="Search"
                    value={searchQuery}
                    onChange={handleSearchInputChange}
                    className="search-input"
                  />
                  <SearchIcon type="submit" className="search-icon" />
                </form>

              </Link>
            </div>
          </React.Fragment>
        )}

        <Stack direction="row" spacing={2} alignItems="center" sx={{ flexGrow: 1 }}>
          {isAuthenticated && (
            <React.Fragment>
              <Link to="/">
                <Button color="inherit" className="btn" style={{ color: '#fff' }}>
                  <HomeIcon fontSize="medium" className="home" />
                </Button>
              </Link>
              <Link to="/products">
                <Button color="inherit" className="btn" style={{ color: '#fff' }}>
                  Products
                </Button>
              </Link>
              <form onSubmit={handleSearch} className="searchBar">
                <input
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                  value={searchQuery}
                  onChange={handleSearchInputChange}
                  className="search-input"
                />
                <SearchIcon type="submit" className="search-icon" />
              </form>

            </React.Fragment>
          )}
        </Stack>

        <Stack direction="row" spacing={2} alignItems="center">
          {!isAuthenticated ? (
            <React.Fragment>
              {/* Login Button */}
              <Button color="inherit" className="btn" onClick={handleOpenModal}>
                <LoginIcon className="icon" fontSize="medium" />
                Login
              </Button>

              {/* Login Modal */}
              <Login isOpen={openModal} onClose={handleCloseModal} />

              {/* Register Button */}
              <Button color="inherit" className="btn" onClick={handleOpenRegisterModal}>
                <FontAwesomeIcon icon={faUserPlus} className="icon" />
                Register
              </Button>

              {/* Register Modal */}
              <Modal
                open={openRegisterModal}
                onClose={handleCloseRegisterModal}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <Box
                  sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: '500px',
                    bgcolor: 'background.paper',
                    boxShadow: 24,
                    p: 4,
                  }}
                >
                  <CloseIcon
                    onClick={handleCloseRegisterModal}
                    style={{ position: 'absolute', top: 40, right: 25, cursor: 'pointer' }}
                  />
                  <Typography id="modal-modal-title" variant="h6" component="h2">
                    Register
                  </Typography>
                  <hr className="divider" />
                  <TextField label="First Name" variant="standard" value={firstName} onChange={(e) => setFirstName(e.target.value)} fullWidth className="register-modal-input" />
                  <TextField label="Last Name" variant="standard" value={lastName} onChange={(e) => setLastName(e.target.value)} fullWidth className="register-modal-input" />
                  <TextField label="Email" variant="standard" value={email} onChange={(e) => setEmail(e.target.value)} fullWidth className="register-modal-input" />
                  <TextField label="Password" variant="standard" value={password} onChange={(e) => setPassword(e.target.value)} fullWidth type="password" className="register-modal-input" inputProps={{ minLength: 8, pattern: '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]+$' }} />
                  <TextField label="Contact Number" variant="standard" value={contactNumber} onChange={(e) => setContactNumber(e.target.value)} fullWidth className="register-modal-input" />
                  <Button variant="contained" sx={{ mt: 3 }} style={{ height: '55px', fontSize: '20px' }} fullWidth onClick={handleRegister}>
                    Sign Up
                  </Button>
                </Box>
              </Modal>
            </React.Fragment>
          ) : (
            <>


              {!isAdmin() && (
                <Button className="btn cart-btn" style={{ display: 'flex', alignItems: 'center', color:'white' }}>
                <Icon aria-label="cart" style={{padding:' 0px 5px' }}>
                  <StyledBadge badgeContent={6} color="secondary" >
                    <ShoppingCartIcon fontSize='medium' style={{color:'white',padding:'0' }}  className='cart'/>
                  </StyledBadge>
                </Icon>
                <Typography style={{ marginLeft: '12px'}}>Cart</Typography>
              </Button>
              
              )}
              <div className="profile" onClick={handleSidebarToggle}>
                <UserCircle2 size={28} style={{ marginRight: '10px' }} />
                <Typography variant="body1">
                  Hello, Username
                </Typography>
                <Drawer
                  anchor="right"
                  open={openDrawer}
                  onClose={handleSidebarClose}
                >
                  <Box className="sidebar-content" style={{ width: '300px', padding:'15px 10px 10px 10px'}} >
                    <Button onClick={handleSidebarClose} className="sidebar-close-btn">
                      <X color="#696969" />
                    </Button>
                    <Typography style={{ fontWeight: 'bold', padding: '5px 10px 10px 10px' }}>Your Account</Typography>
                    <Divider variant="middle" style={{ backgroundColor: '#5c5c5c', margin:'5px' }} />
           <MenuItem>
                      <Link to="/profile" className="sidebar-link" onClick={handleSidebarLinkClick}>
                        Your Profile
                      </Link>
                    </MenuItem>
                    <MenuItem>
                      <Link to="/orders-history" className="sidebar-link" onClick={handleSidebarLinkClick}>
                        Orders History
                      </Link>
                    </MenuItem>
                    <MenuItem className="sidebar-logout-btn" onClick={handleLogout}>
                      <LogOutIcon size={18} className="logout-logo" style={{ marginRight: '10px' }} />
                      <Typography>Logout</Typography>
                    </MenuItem>
                  </Box>
                </Drawer>
              </div>
            </>
          )}
        </Stack>
      </Toolbar>
      
    </AppBar>
  );
};

export default Navbar;


