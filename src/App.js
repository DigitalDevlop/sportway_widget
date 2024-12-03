// src/App.js
import React, { useState } from 'react';
import './App.css';
// import './dotenv/config';
import axios from 'axios';
import { Alert, Box, Button, Container, Snackbar, TextField, Typography } from '@mui/material';




function App() {

 
  const [formData, setFormData] = useState({
    Mobile: '',
    Name: '',
    
  });

  const [popup, setPopup] = useState({
    show: false,
    message: '',
    type: 'success', // 'success' or 'error'
  });

  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent the default form submission behavior

    // Simple validation
    if (!formData.Mobile || !formData.Name) {
      setPopup({
        show: true,
        message: 'Please fill out all fields.',
        type: 'error',
      });
      return;
    }

    try {
      const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/api/customer`, {
        Mobile: formData.Mobile,
        Name: formData.Name,
        
      });


      
      setPopup({
        show: true,
        message: 'Form submitted successfully!',
        type: 'success',
      });

      console.log('API Response:', response.data);

      // Optionally, reset the form fields after successful submission
      setFormData({
        Mobile: '',
        Name: '',
       
      });
       // Redirect to sportway.lk after 2 seconds
    setTimeout(() => {
      window.location.href = 'https://sportway.lk';
    }, 2000);
    
    } catch (error) {
      setPopup({
        show: true,
        message: 'Error submitting the form. Please try again later.',
        type: 'error',
      });

     

      console.error('Error while making API call:', error);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
  
    if (name === "Mobile") {
      // Allow only numeric input
      if (/^\d*$/.test(value) && value.length <= 10) {
        setFormData((prevFormData) => ({
          ...prevFormData,
          [name]: value,
        }));
  
        // Regular expression to match exactly 10 digits
        const regex = /^\d{10}$/;
        setPopup((prevPopup) => ({
          ...prevPopup,
          message: value.length === 10 ? "Mobile number is valid." : "",
          type: value.length === 10 ? "success" : "error",
        }));
      } else {
        setPopup((prevPopup) => ({
          ...prevPopup,
          message: "Only digits are allowed.",
          type: "error",
        }));
      }
    } else {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value,
      }));
    }
  };
  

  const closePopup = () => {
    setPopup({
      show: false,
      message: '',
      type: 'success',
    });
  };
  return (
    <Container className="form" maxWidth="sm">
      <Box 
        component="form" 
        onSubmit={handleSubmit} 
        sx={{
          display: 'flex', 
          flexDirection: 'column', 
          gap: 2, 
          mt: 4,
          p: 2,
          backgroundColor: '#00fc44',
          borderRadius: 2,
        }}
      >
        <Typography variant="h5" textAlign="center">
          වැඩි විස්තර දැනගැනීම සඳහා පහත තොරතුරු ලබා දෙන්න
          <br/>
          For more details, please provide the following information.
          <br/>
          மேலும் விவரங்களைப் பெற, தயவுசெய்து கீழே உள்ள தகவல்களை வழங்கவும்.
        </Typography>

        <TextField
          label="Name"
          variant="outlined"
          name="Name"
          value={formData.Name}
          onChange={handleChange}
          fullWidth
        />

        <TextField
          label="Mobile Number"
          variant="outlined"
          name="Mobile"
          value={formData.Mobile}
          onChange={handleChange}
          fullWidth
        />

        

        <Button 
          type="submit"
          variant="contained" 
          color="primary"
          disabled={!formData.Mobile || !formData.Name}
          
        >
          Submit
        </Button>
      </Box>

      <Snackbar 
        open={popup.show} 
        autoHideDuration={6000} 
        onClose={closePopup}
      >
        <Alert 
          onClose={closePopup} 
          severity={popup.type} 
          sx={{ width: '100%' }}
        >
          {popup.message}
        </Alert>
      </Snackbar>
    </Container>
  );
}

export default App;

