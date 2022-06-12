import React, { useState } from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";

import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

const AddCar = (props) => {
  const [open, setOpen] = useState(false);
  const [car, setCar] = useState({
    brand: "",
    model: "",
    color: "",
    year: "",
    registerNumber: "",
    price: "",
  });

  // Open the modal form
  const handleClickOpen = () => {
    setOpen(true);
  };
  // Close the modal form
  const handleClose = () => {
    setOpen(false);
    setCar({
      brand: "",
      model: "",
      color: "",
      year: "",
      registerNumber: "",
      price: "",
    });
  };
  const handleChange = (event) => {
    setCar({ ...car, [event.target.name]: event.target.value });
  };

  // Save car and close modal form
  const handleSave = (event) => {
    props.addCar(car);
    handleClose();
    setCar({
      brand: "",
      model: "",
      color: "",
      year: "",
      registerNumber: "",
      price: "",
    });
  };

  return (
    <div>
      <Button
        variant="outlined"
        color="primary"
        style={{ margin: 10 }}
        onClick={handleClickOpen}
      >
        Add New Car
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>New Car Info</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus="true" 
            fullWidth
            label="Brand"
            name="brand"
            value={car.brand}
            onChange={handleChange}
          />
          <TextField
            fullWidth
            label="Model"
            name="model"
            value={car.model}
            onChange={handleChange}
          />
          <TextField
            fullWidth
            label="Color"
            name="color"
            value={car.color}
            onChange={handleChange}
          />
          <TextField
            fullWidth
            label="Year"
            name="year"
            value={car.year}
            onChange={handleChange}
          />
          <TextField
            fullWidth
            label="Register No"
            name="registerNumber"
            value={car.registerNumber}
            onChange={handleChange}
          />
          <TextField
            fullWidth
            label="Price"
            name="price"
            value={car.price}
            onChange={handleChange}
          />
        </DialogContent>
        <DialogActions>
          <Button color="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button color="primary" onClick={handleSave}>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AddCar;
