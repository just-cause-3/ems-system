import React, { Component } from 'react';
import { Line, Bar } from 'react-chartjs-2';
import axios from 'axios';
import { Card, Row, Col } from 'react-bootstrap';
import './DashboardCharts.css';

class DashboardCharts extends Component {
  state = {
    salaryData: {
      labels: [],
      datasets: [
        {
          label: 'Salary History',
          data: [],
          fill: false,
          borderColor: 'rgb(75, 192, 192)',
          tension: 0.1
        }
      ]
    },
    expenseData: {
      labels: [],
      datasets: [
        {
          label: 'Expense History',
          data: [],
          backgroundColor: 'rgba(255, 99, 132, 0.5)'
        }
      ]
    },
    expenseTypeData: {
      labels: [],
      datasets: [
        {
          label: 'Expenses by Type',
          data: [],
          backgroundColor: [
            'rgba(255, 99, 132, 0.5)',
            'rgba(54, 162, 235, 0.5)',
            'rgba(255, 206, 86, 0.5)',
            'rgba(75, 192, 192, 0.5)',
            'rgba(153, 102, 255, 0.5)'
          ]
        }
      ]
    }
  };

  componentDidMount() {
    this.loadChartData();
  }

  loadChartData = async () => {
    try {
      // Get salary history
      const salaryRes = await axios.get('http://localhost:4000/api/salary', {
        headers: { authorization: localStorage.getItem('token') || '' }
      });

      // Get expense history
      const expenseRes = await axios.get('http://localhost:4000/api/expense', {
        headers: { authorization: localStorage.getItem('token') || '' }
      });

      // Process salary data
      const salaryHistory = salaryRes.data.map(s => ({
        date: new Date(s.date).toLocaleDateString(),
        amount: s.BasicSalary
      }));

      // Process expense data
      const expenseHistory = expenseRes.data.map(e => ({
        date: new Date(e.date).toLocaleDateString(),
        amount: e.amount,
        type: e.expenseType
      }));

      // Group expenses by type
      const expensesByType = expenseHistory.reduce((acc, curr) => {
        acc[curr.type] = (acc[curr.type] || 0) + curr.amount;
        return acc;
      }, {});

      this.setState({
        salaryData: {
          ...this.state.salaryData,
          labels: salaryHistory.map(s => s.date),
          datasets: [{
            ...this.state.salaryData.datasets[0],
            data: salaryHistory.map(s => s.amount)
          }]
        },
        expenseData: {
          ...this.state.expenseData,
          labels: expenseHistory.map(e => e.date),
          datasets: [{
            ...this.state.expenseData.datasets[0],
            data: expenseHistory.map(e => e.amount)
          }]
        },
        expenseTypeData: {
          ...this.state.expenseTypeData,
          labels: Object.keys(expensesByType),
          datasets: [{
            ...this.state.expenseTypeData.datasets[0],
            data: Object.values(expensesByType)
          }]
        }
      });
    } catch (error) {
      console.error('Error loading chart data:', error);
    }
  };

  render() {
    const options = {
      responsive: true,
      scales: {
        y: {
          beginAtZero: true
        }
      }
    };

    return (
      <div className="dashboard-charts">
        <h2 className="charts-title">Financial Overview</h2>
        <Row>
          <Col md={6}>
            <Card className="chart-card">
              <Card.Body>
                <Card.Title>Salary History</Card.Title>
                <Line data={this.state.salaryData} options={options} />
              </Card.Body>
            </Card>
          </Col>
          <Col md={6}>
            <Card className="chart-card">
              <Card.Body>
                <Card.Title>Expense History</Card.Title>
                <Line data={this.state.expenseData} options={options} />
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <Row className="mt-4">
          <Col md={6}>
            <Card className="chart-card">
              <Card.Body>
                <Card.Title>Expenses by Type</Card.Title>
                <Bar data={this.state.expenseTypeData} options={options} />
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

export default DashboardCharts;
