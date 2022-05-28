import React, { Component } from "react";
import { SERVER_URL } from "../constants.js";

import ReactTable from "react-table-6";
import "react-table-6/react-table.css";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import AddCar from "./AddCar";
import EditCar from "./EditCar";

import { CSVLink } from 'react-csv';

class CarList extends Component {
  constructor(props) {
    super(props);
    this.state = { arabalar: [] };
  }

  componentDidMount() {
    this.fetchCars();
  }

  fetchCars = () => {
    fetch(SERVER_URL + "/api/car")
      .then((response) => response.json())
      .then((responseData) => {
        this.setState({
          arabalar: responseData._embedded.car,
        });
      })
      .catch((err) => console.error(err));
  };

  // Delete car
  onDelClick = (link) => {
    if (window.confirm("Are you sure to delete?")) {
      fetch(link, { method: "DELETE" })
        .then((res) => {
          toast.success("Car deleted", {
            position: toast.POSITION.BOTTOM_LEFT,
          });
          this.fetchCars();
        })
        .catch((err) => {
          toast.error("Error when deleting", {
            position: toast.POSITION.BOTTOM_LEFT,
          });
          console.error(err);
        });
    }
  };

  // Add new car
  addCar(car) {
    fetch(SERVER_URL + "/api/car", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(car),
    })
      .then((res) => this.fetchCars())
      .catch((err) => console.error(err));
  }

  // Update car
  updateCar(car, link) {
    fetch(link, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(car),
    })
      .then((res) => {
        toast.success("Changes saved", {
          position: toast.POSITION.BOTTOM_LEFT,
        });
        this.fetchCars();
      })
      .catch((err) =>
        toast.error("Error when saving", {
          position: toast.POSITION.BOTTOM_LEFT,
        })
      );
  }

  render() {
    const columns = [
      {
        Header: "Brand",
        accessor: "brand",
      },
      {
        Header: "Model",
        accessor: "model",
      },
      {
        Header: "Color",
        accessor: "color",
      },
      {
        Header: "Year",
        accessor: "year",
      },
      {
        Header: "Register No",
        accessor: "registerNumber",
      },
      {
        Header: "Price €",
        accessor: "price",
      },
      {
        sortable: false,
        filterable: false,
        width: 100,
        accessor: "_links.self.href",
        Cell: ({ value, row }) => (
          <EditCar
            car={row}
            link={value}
            updateCar={this.updateCar}
            fetchCars={this.fetchCars}
          />
        ),
        width: 100,
      },
      {
        id: "delbutton",
        sortable: false,
        filterable: false,
        width: 100,
        accessor: "_links.self.href",
        Cell: ({ value }) => (
          <button
            onClick={() => {
              this.onDelClick(value);
            }}
          >
            Delete
          </button>
        ),
      },
    ];

    return (
      <div className="App">
        <AddCar addCar={this.addCar} fetchCars={this.fetchCars} />
        <ReactTable
          data={this.state.arabalar}
          columns={columns}
          filterable={true}
          pageSize={10}
        />
        <br></br>
        <CSVLink data={this.state.arabalar} separator=";">Export CSV</CSVLink>
        <ToastContainer autoClose={1500} />
      </div>
    );
  }
}
export default CarList;
