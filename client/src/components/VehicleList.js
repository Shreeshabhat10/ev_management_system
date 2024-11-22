import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Typography, Card, CardContent, Grid, TextField, CircularProgress } from '@mui/material';

const VehicleList = () => {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    axios.get('/vehicles')
      .then(response => {
        setVehicles(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('There was an error fetching the vehicles!', error);
        setLoading(false);
      });
  }, []);

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const filteredVehicles = vehicles.filter(vehicle =>
    vehicle.model.toLowerCase().includes(search.toLowerCase()) ||
    vehicle.brand.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Container>
      <Typography variant="h4" component="h2" gutterBottom>
        Vehicles List
      </Typography>
      <TextField
        label="Search"
        value={search}
        onChange={handleSearchChange}
        fullWidth
        margin="normal"
      />
      {loading ? (
        <CircularProgress />
      ) : (
        <Grid container spacing={3}>
          {filteredVehicles.map(vehicle => (
            <Grid item xs={12} sm={6} md={4} key={vehicle._id}>
              <Card>
                <CardContent>
                  <Typography variant="h6">{vehicle.brand} {vehicle.model}</Typography>
                  <Typography>Range: {vehicle.range} km</Typography>
                  <Typography>Price: ₹{vehicle.price}</Typography>
                  <Typography>Battery: {vehicle.battery}</Typography>
                  <Typography>Motor: {vehicle.motor}</Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
};

export default VehicleList;
