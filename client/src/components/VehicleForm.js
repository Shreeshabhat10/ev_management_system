import React, { useState } from 'react';
import axios from 'axios';
import { Container, TextField, Button, Typography, Alert } from '@mui/material';

const VehicleForm = () => {
  const [formData, setFormData] = useState({
    model: '',
    brand: '',
    range: '',
    price: '',
    battery: '',
    motor: ''
  });
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.model) newErrors.model = 'Model is required';
    if (!formData.brand) newErrors.brand = 'Brand is required';
    if (!formData.range) newErrors.range = 'Range is required';
    if (!formData.price) newErrors.price = 'Price is required';
    if (!formData.battery) newErrors.battery = 'Battery is required';
    if (!formData.motor) newErrors.motor = 'Motor is required';
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setSuccess(false);
    } else {
      axios.post('/vehicles', formData)
        .then(response => {
          setSuccess(true);
          setErrors({});
          setFormData({
            model: '',
            brand: '',
            range: '',
            price: '',
            battery: '',
            motor: ''
          });
        })
        .catch(error => {
          console.error('There was an error adding the vehicle!', error);
          setSuccess(false);
        });
    }
  };

  return (
    <Container>
      <Typography variant="h4" component="h2" gutterBottom>
        Add New Vehicle
      </Typography>
      {success && <Alert severity="success">Vehicle added successfully!</Alert>}
      <form onSubmit={handleSubmit}>
        <TextField label="Model" name="model" value={formData.model} onChange={handleChange} error={!!errors.model} helperText={errors.model} fullWidth margin="normal" required />
        <TextField label="Brand" name="brand" value={formData.brand} onChange={handleChange} error={!!errors.brand} helperText={errors.brand} fullWidth margin="normal" required />
        <TextField label="Range" name="range" value={formData.range} onChange={handleChange} type="number" error={!!errors.range} helperText={errors.range} fullWidth margin="normal" required />
        <TextField label="Price" name="price" value={formData.price} onChange={handleChange} type="number" error={!!errors.price} helperText={errors.price} fullWidth margin="normal" required />
        <TextField label="Battery" name="battery" value={formData.battery} onChange={handleChange} error={!!errors.battery} helperText={errors.battery} fullWidth margin="normal" required />
        <TextField label="Motor" name="motor" value={formData.motor} onChange={handleChange} error={!!errors.motor} helperText={errors.motor} fullWidth margin="normal" required />
        <Button type="submit" variant="contained" color="primary">Add Vehicle</Button>
      </form>
    </Container>
  );
};

export default VehicleForm;
