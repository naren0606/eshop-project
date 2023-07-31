import React, { useState } from 'react';
import { Modal, Box, Typography, TextField, Button } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import AlertMsgBox from '../AlertMsgBox';
import SuccessMsgBox from '../SuccessMsgBox';

const Login = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const [userNotFound, setUserNotFound] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [successLogin, setSuccessLogin] = useState(false);

  const handleLogin = () => {
    const body = {
      email,
      password,
    };

    axios
      .post('http://localhost:3001/api/v1/auth', body)
      .then((res) => {
        console.log(res.data);
        setSuccessLogin(true);
        setTimeout(() => {
          onClose();
          const token = res.headers['x-auth-token']; // Get the token from the response header
          localStorage.setItem('x-auth-token', token);
          localStorage.setItem('isAuthenticated', true);
          navigate('/products');
        }, 3000);
      })
      .catch((err) => {
        console.log(err);
        localStorage.setItem('isAuthenticated', false);
        if (err.response && err.response.status === 401) {
          setUserNotFound(true);
        }     
        setTimeout(() => {
          setUserNotFound(false);
        }, 3000);
      });
  };

  const handleCloseModal = () => {
    setEmail('');
    setPassword('');
    onClose();
  };

  const validateEmail = (email) => {
    const emailRegex = /^\S+@\S+\.\S+$/;
    return emailRegex.test(email);
  };

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    setEmailError(!validateEmail(value));
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);
    setPasswordError(value.length < 5);
  };

  return (
    <>
    <Modal
      open={isOpen}
      onClose={handleCloseModal}
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
          onClick={onClose}
          style={{ position: 'absolute', top: 40, right: 25, cursor: 'pointer' }}
        />
        <Typography id="modal-modal-title" variant="h5" component="h2">
          Login
        </Typography>
        <hr className="divider" />
        <TextField
          label="Email"
          variant="standard"
          fullWidth
          className="modal-input"
          value={email}
          onChange={handleEmailChange}
          error={emailError}
          helperText={emailError ? 'Invalid email format' : ''}
          />
        <TextField
          label="Password"
          fullWidth
          variant="standard"
          type="password"
          className="modal-input"
          value={password}
          onChange={handlePasswordChange}
          error={passwordError}
          helperText={passwordError ? 'Password should be at least 5 characters' : ''}        />
        <Button
          variant="contained"
          fullWidth
          sx={{ mt: 2 }}
          className="modal-btn"
          onClick={handleLogin}
          disabled={emailError || passwordError}
        >
          Login
        </Button>
      </Box>
    </Modal>

    {successLogin &&  (
    <SuccessMsgBox color="green" message="Login successful! Navigating to products page"  width='530px'/>
    )}

    {userNotFound && (
    <AlertMsgBox color="red" message="Invalid email / password!" width='350px' />
    )}
    </>
  );
};

export default Login;
