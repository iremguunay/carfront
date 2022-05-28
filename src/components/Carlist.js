import React, { Component } from "react";
import { SERVER_URL } from "../constants.js";

import ReactTable from "react-table-6";
import "react-table-6/react-table.css";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

class Carlist extends Component {
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

  render() {
    const columns = [
      {
        Header: "Marka",
        accessor: "brand",
      },
      {
        Header: "Model",
        accessor: "model",
      },
      {
        Header: "Renk",
        accessor: "color",
      },
      {
        Header: "Yıl",
        accessor: "year",
      },
      {
        Header: "Kayıt No",
        accessor: "registerNumber",
      },
      {
        Header: "Fiyat €",
        accessor: "price",
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
            Sil
          </button>
        ),
      },
    ];

    return (
      <div className="App">
        <ReactTable
          data={this.state.arabalar}
          columns={columns}
          filterable={true}
        />
        <ToastContainer autoClose={1500} />
      </div>
    );
  }
}
export default Carlist;
