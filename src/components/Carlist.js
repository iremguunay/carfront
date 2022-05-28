import React, { Component } from "react";
import { SERVER_URL } from "../constants.js";
import ReactTable from "react-table-6";
import "react-table-6/react-table.css";

class Carlist extends Component {
  constructor(props) {
    super(props);
    this.state = { arabalar: [] };
  }

  componentDidMount() {
    this.fetchCars();
  }
  fetchCars = () => { fetch(SERVER_URL + "/api/car")
      .then((response) => response.json())
      .then((responseData) => {
        this.setState({
          arabalar: responseData._embedded.car,
        });
      })
      .catch((err) => console.error(err));
  }

  // Delete car
  onDelClick = (link) => {
    fetch(link, { method: "DELETE" })
      .then((res) => this.fetchCars())
      .catch((err) => console.error(err));
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
      </div>
    );
  }
}

export default Carlist;
