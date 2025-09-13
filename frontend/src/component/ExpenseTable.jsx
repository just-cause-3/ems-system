import React, { Component } from "react";
import axios from "axios";
import { Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faTimes } from "@fortawesome/free-solid-svg-icons";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-balham.css";
import "./ExpenseTable.css";

class ExpenseTable extends Component {
  state = {
    expenseData: [],
    loading: true,
    columnDefs: [
      {
        headerName: "Date",
        field: "date",
        sortable: true,
        filter: true,
        valueFormatter: (params) => {
          return new Date(params.value).toLocaleDateString();
        }
      },
      {
        headerName: "Type",
        field: "expenseType",
        sortable: true,
        filter: true
      },
      {
        headerName: "Amount",
        field: "amount",
        sortable: true,
        filter: true,
        valueFormatter: (params) => {
          return `$${params.value.toFixed(2)}`;
        }
      },
      {
        headerName: "Description",
        field: "description",
        sortable: true,
        filter: true
      },
      {
        headerName: "Status",
        field: "status",
        sortable: true,
        filter: true
      },
      {
        headerName: "Comments",
        field: "comments",
        sortable: true,
        filter: true
      }
    ]
  };

  componentDidMount() {
    this.loadExpenseData();
  }

  loadExpenseData = () => {
    const isHR = localStorage.getItem("role") === "HR";
    const url = isHR ? "http://localhost:4000/api/expense/all" : "http://localhost:4000/api/expense";

    axios
      .get(url, {
        headers: {
          authorization: localStorage.getItem("token") || ""
        }
      })
      .then(response => {
        this.setState({ 
          expenseData: response.data,
          loading: false 
        });
      })
      .catch(error => {
        console.log(error);
        this.setState({ loading: false });
      });
  };

  handleApproveReject = async (id, status) => {
    try {
      await axios.put(
        `http://localhost:4000/api/expense/${id}/status`,
        { status },
        {
          headers: {
            authorization: localStorage.getItem("token") || ""
          }
        }
      );
      this.loadExpenseData();
    } catch (error) {
      console.log(error);
    }
  };

  renderActionButtons = (params) => {
    const isHR = localStorage.getItem("role") === "HR";
    const isPending = params.data.status === "Pending";

    if (isHR && isPending) {
      return (
        <div>
          <Button
            variant="success"
            size="sm"
            className="mr-2"
            onClick={() => this.handleApproveReject(params.data._id, "Approved")}
          >
            <FontAwesomeIcon icon={faCheck} /> Approve
          </Button>
          <Button
            variant="danger"
            size="sm"
            onClick={() => this.handleApproveReject(params.data._id, "Rejected")}
          >
            <FontAwesomeIcon icon={faTimes} /> Reject
          </Button>
        </div>
      );
    }
    return null;
  };

  render() {
    const isHR = localStorage.getItem("role") === "HR";
    
    if (isHR) {
      this.state.columnDefs.push({
        headerName: "Employee",
        field: "employeeName",
        sortable: true,
        filter: true,
        valueGetter: (params) => {
          const emp = params.data.employeeId;
          return emp ? `${emp.FirstName} ${emp.MiddleName} ${emp.LastName}` : "";
        }
      });
      this.state.columnDefs.push({
        headerName: "Actions",
        field: "actions",
        cellRenderer: "actionButtons"
      });
    }

    return (
      <div className="expense-table-container">
        <div
          className="ag-theme-balham"
          style={{ height: "500px", width: "100%" }}
        >
          <AgGridReact
            columnDefs={this.state.columnDefs}
            rowData={this.state.expenseData}
            pagination={true}
            paginationPageSize={10}
            frameworkComponents={{
              actionButtons: this.renderActionButtons
            }}
          />
        </div>
      </div>
    );
  }
}

export default ExpenseTable;
