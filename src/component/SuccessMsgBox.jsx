import React,{useState} from 'react';
import { CheckCircle, X } from 'lucide-react';
import PropTypes from 'prop-types';
import { Box } from '@mui/material';

const SuccessMsgBox = ({ color, message, width}) => {
  const [isOpen, setIsOpen] = useState(true);

  const boxStyle = {
    position: 'fixed',
    top: '50px',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    display: isOpen ? 'flex' : 'none',
    backgroundColor: 'rgb(215 255 170)',
    width: width,
    height: '50px',
    fontFamily: 'Raleway, sans-serif' ,
    borderRadius: '3px',
    textAlign: 'center',
    color: color,
    zIndex:'9999',
    alignItems:'center'
  };

  const iconStyle = {
    margin: '0px 10px 0px 18px',
  };
  
  const sideDesign={
   width:'10px',
   height:'100%',
   backgroundColor: color,
   borderRadius: '3px 0px 0px 3px',
   margin:'0'
  }
 
  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <>
      <Box style={boxStyle}>
        <div style={sideDesign}></div>
      <CheckCircle size="26" style={iconStyle}  />
      <p style={{color:"black"}}>{message}</p>    
      <X color="#696969" size="21" style={{ cursor: 'pointer', position: 'absolute', right:'15px' }} onClick={handleClose} />
      </Box>
    </>
  );
};

SuccessMsgBox.propTypes = {
  color: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  width: PropTypes.string.isRequired,
};

export default SuccessMsgBox;
