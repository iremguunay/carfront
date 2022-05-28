import React, { useState } from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";

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
      <button style={{ margin: 10 }} onClick={handleClickOpen}>
        Add New Car
      </button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>New Car Info</DialogTitle>
        <DialogContent>
          <input
            type="text"
            placeholder="Brand"
            name="brand"
            value={car.brand}
            onChange={handleChange}
          />
          <br />
          <input
            type="text"
            placeholder="Model"
            name="model"
            value={car.model}
            onChange={handleChange}
          />
          <br />
          <input
            type="text"
            placeholder="Color"
            name="color"
            value={car.color}
            onChange={handleChange}
          />
          <br />
          <input
            type="text"
            placeholder="Year"
            name="year"
            value={car.year}
            onChange={handleChange}
          />
          <br />
          <input
            type="text"
            placeholder="Register No"
            name="registerNumber"
            value={car.registerNumber}
            onChange={handleChange}
          />
          <br />
          <input
            type="text"
            placeholder="Price €"
            name="price"
            value={car.price}
            onChange={handleChange}
          />
          <br />
        </DialogContent>
        <DialogActions>
          <button onClick={handleClose}>Cancel</button>
          <button onClick={handleSave}>Save</button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AddCar;
