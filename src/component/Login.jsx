import React, { useState } from 'react';
import { Modal, Box, Typography, TextField, Button } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    const body = {
      email,
      password,
    };

    axios
      .post('http://localhost:3001/api/v1/auth', body)
      .then((res) => {
        console.log(res.data);
        alert('Successfully logged in');
        navigate('/products');
        onClose();
        const token = res.headers['x-auth-token']; // Get the token from the response header
        localStorage.setItem('x-auth-token', token);
        localStorage.setItem('isAuthenticated', true);
      })
      .catch((err) => {
        console.log(err);
        alert('Login error');
        localStorage.setItem('isAuthenticated', false);
      });
  };

  const handleCloseModal = () => {
    setEmail('');
    setPassword('');
    onClose();
  };

  return (
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
          fullWidth
          className="modal-input"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          label="Password"
          fullWidth
          type="password"
          className="modal-input"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button
          variant="contained"
          fullWidth
          sx={{ mt: 2 }}
          className="modal-btn"
          onClick={handleLogin}
        >
          Login
        </Button>
      </Box>
    </Modal>
  );
};

export default Login;
