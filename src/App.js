// src/App.js
import React, { useState } from 'react';
import './App.css';

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
      const response = await axios.post('http://localhost:8000/api/customer', {
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
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
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
        </Typography>

        <TextField
          label="Mobile Number"
          variant="outlined"
          name="Mobile"
          value={formData.Mobile}
          onChange={handleChange}
          fullWidth
        />

        <TextField
          label="Name"
          variant="outlined"
          name="Name"
          value={formData.Name}
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

