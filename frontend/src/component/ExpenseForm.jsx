import React, { Component } from "react";
import axios from "axios";
import { Form, Button, Col, Row } from "react-bootstrap";
import "./ExpenseForm.css";

class ExpenseForm extends Component {
  state = {
    expenseTypes: ["Travel", "Meal", "Supply", "Equipment", "Other"],
    loading: false,
    error: null
  };

  handleSubmit = async (event) => {
    event.preventDefault();
    this.setState({ loading: true, error: null });

    const formData = {
      expenseType: event.target.expenseType.value,
      amount: parseFloat(event.target.amount.value),
      description: event.target.description.value,
      receiptUrl: event.target.receiptUrl.value,
      comments: event.target.comments.value
    };

    try {
      const response = await axios.post(
        "http://localhost:4000/api/expense",
        formData,
        {
          headers: {
            authorization: localStorage.getItem("token") || ""
          }
        }
      );

      this.setState({ loading: false });
      this.props.onExpenseSubmit(response.data);
      event.target.reset();
    } catch (err) {
      this.setState({
        loading: false,
        error: err.response?.data || "Error submitting expense"
      });
    }
  };

  render() {
    return (
      <div>
        <h2 id="expense-form-title">Submit Expense</h2>
        <div id="expense-form-outer-div">
          <Form id="form" onSubmit={this.handleSubmit}>
            {this.state.error && (
              <div className="alert alert-danger">{this.state.error}</div>
            )}

            <Form.Group as={Row}>
              <Form.Label column sm={2}>
                Expense Type
              </Form.Label>
              <Col sm={10} className="form-input">
                <Form.Control
                  as="select"
                  name="expenseType"
                  required
                >
                  <option value="" disabled selected>Select expense type</option>
                  {this.state.expenseTypes.map((type, index) => (
                    <option key={index} value={type}>{type}</option>
                  ))}
                </Form.Control>
              </Col>
            </Form.Group>

            <Form.Group as={Row}>
              <Form.Label column sm={2}>
                Amount
              </Form.Label>
              <Col sm={10} className="form-input">
                <Form.Control
                  type="number"
                  name="amount"
                  placeholder="Enter amount"
                  min="0"
                  step="0.01"
                  required
                />
              </Col>
            </Form.Group>

            <Form.Group as={Row}>
              <Form.Label column sm={2}>
                Description
              </Form.Label>
              <Col sm={10} className="form-input">
                <Form.Control
                  as="textarea"
                  name="description"
                  placeholder="Enter expense description"
                  required
                />
              </Col>
            </Form.Group>

            <Form.Group as={Row}>
              <Form.Label column sm={2}>
                Receipt URL
              </Form.Label>
              <Col sm={10} className="form-input">
                <Form.Control
                  type="url"
                  name="receiptUrl"
                  placeholder="Enter receipt URL (optional)"
                />
              </Col>
            </Form.Group>

            <Form.Group as={Row}>
              <Form.Label column sm={2}>
                Comments
              </Form.Label>
              <Col sm={10} className="form-input">
                <Form.Control
                  as="textarea"
                  name="comments"
                  placeholder="Additional comments (optional)"
                />
              </Col>
            </Form.Group>

            <Form.Group as={Row}>
              <Col sm={{ span: 10, offset: 2 }}>
                <Button type="submit" disabled={this.state.loading}>
                  {this.state.loading ? "Submitting..." : "Submit Expense"}
                </Button>
              </Col>
            </Form.Group>
          </Form>
        </div>
      </div>
    );
  }
}

export default ExpenseForm;
