import React, { Component } from "react";
import ExpenseForm from "./ExpenseForm";
import ExpenseTable from "./ExpenseTable";
import "./Expense.css";

class Expense extends Component {
  state = {
    showForm: false
  };

  handleExpenseSubmit = (expense) => {
    this.setState({ showForm: false });
    // Refresh the table
    this.expenseTable.loadExpenseData();
  };

  toggleForm = () => {
    this.setState(prevState => ({
      showForm: !prevState.showForm
    }));
  };

  render() {
    const isEmployee = localStorage.getItem("role") === "Employee";

    return (
      <div className="expense-container">
        {isEmployee && (
          <button 
            className="btn btn-primary mb-3" 
            onClick={this.toggleForm}
          >
            {this.state.showForm ? "Cancel" : "Submit New Expense"}
          </button>
        )}

        {this.state.showForm && isEmployee ? (
          <ExpenseForm onExpenseSubmit={this.handleExpenseSubmit} />
        ) : (
          <ExpenseTable 
            ref={el => (this.expenseTable = el)}
          />
        )}
      </div>
    );
  }
}

export default Expense;
