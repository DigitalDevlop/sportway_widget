const handleChange = (event) => {
  const { name, value } = event.target;

  // Mobile number validation
  if (name === 'Mobile') {
    // Allow only numeric values
    if (!/^\d*$/.test(value)) {
      setPopup({
        show: true,
        message: 'Mobile number can only contain numbers.',
        type: 'error',
      });
      return;
    }

    // Optional: Limit the length of the mobile number (e.g., 10 digits)
    if (value.length > 10) {
      setPopup({
        show: true,
        message: 'Mobile number cannot exceed 10 digits.',
        type: 'error',
      });
      return;
    }
  }

  setFormData((prevFormData) => ({
    ...prevFormData,
    [name]: value,
  }));
};

const handleSubmit = async (event) => {
  event.preventDefault();

  // Ensure Mobile is a valid number and has 10 digits
  if (!formData.Mobile || formData.Mobile.length !== 10) {
    setPopup({
      show: true,
      message: 'Please enter a valid 10-digit mobile number.',
      type: 'error',
    });
    return;
  }

  if (!formData.Name) {
    setPopup({
      show: true,
      message: 'Please enter your name.',
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
