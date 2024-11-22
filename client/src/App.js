// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Container } from '@mui/material';
import VehicleList from './components/VehicleList';
import VehicleForm from './components/VehicleForm';

function App() {
  return (
    <Router>
      <div className="App">
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" style={{ flexGrow: 1 }}>
              EV 2-Wheeler Database
            </Typography>
            <Button color="inherit" component={Link} to="/">Home</Button>
            <Button color="inherit" component={Link} to="/add">Add Vehicle</Button>
          </Toolbar>
        </AppBar>
        <Container>
          <Routes>
            <Route path="/" element={<VehicleList />} />
            <Route path="/add" element={<VehicleForm />} />
          </Routes>
        </Container>
      </div>
    </Router>
  );
}

export default App;
