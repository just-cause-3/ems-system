import React, { Component } from 'react';
import axios from 'axios';
import { Badge, ListGroup, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell, faCheckCircle, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import './NotificationList.css';

class NotificationList extends Component {
  state = {
    notifications: [],
    loading: true,
    error: null
  };

  componentDidMount() {
    this.loadNotifications();
    // Poll for new notifications every 30 seconds
    this.pollInterval = setInterval(this.loadNotifications, 30000);
  }

  componentWillUnmount() {
    if (this.pollInterval) {
      clearInterval(this.pollInterval);
    }
  }

  loadNotifications = async () => {
    try {
      const response = await axios.get('http://localhost:4000/api/notifications', {
        headers: {
          authorization: localStorage.getItem('token') || ''
        }
      });
      this.setState({
        notifications: response.data,
        loading: false
      });
    } catch (error) {
      console.error('Error loading notifications:', error);
      this.setState({
        error: 'Failed to load notifications',
        loading: false
      });
    }
  };

  markAsRead = async (notificationId) => {
    try {
      await axios.put(
        `http://localhost:4000/api/notifications/${notificationId}/read`,
        {},
        {
          headers: {
            authorization: localStorage.getItem('token') || ''
          }
        }
      );
      this.loadNotifications();
    } catch (error) {
      console.error('Error marking notification as read:', error);
    }
  };

  markAllAsRead = async () => {
    try {
      await axios.put(
        'http://localhost:4000/api/notifications/read-all',
        {},
        {
          headers: {
            authorization: localStorage.getItem('token') || ''
          }
        }
      );
      this.loadNotifications();
    } catch (error) {
      console.error('Error marking all notifications as read:', error);
    }
  };

  getNotificationIcon = (type) => {
    switch (type) {
      case 'expense_approved':
        return <FontAwesomeIcon icon={faCheckCircle} className="text-success" />;
      case 'expense_rejected':
        return <FontAwesomeIcon icon={faTimesCircle} className="text-danger" />;
      default:
        return <FontAwesomeIcon icon={faBell} />;
    }
  };

  render() {
    const { notifications, loading, error } = this.state;
    const unreadCount = notifications.filter(n => !n.read).length;

    if (loading) {
      return <div>Loading notifications...</div>;
    }

    if (error) {
      return <div className="text-danger">{error}</div>;
    }

    return (
      <div className="notifications-container">
        <div className="notifications-header">
          <h5>
            Notifications
            {unreadCount > 0 && (
              <Badge variant="danger" className="ml-2">
                {unreadCount}
              </Badge>
            )}
          </h5>
          {unreadCount > 0 && (
            <Button
              variant="link"
              size="sm"
              onClick={this.markAllAsRead}
            >
              Mark all as read
            </Button>
          )}
        </div>

        <ListGroup>
          {notifications.length === 0 ? (
            <ListGroup.Item>No notifications</ListGroup.Item>
          ) : (
            notifications.map(notification => (
              <ListGroup.Item
                key={notification._id}
                className={`notification-item ${notification.read ? 'read' : 'unread'}`}
                onClick={() => !notification.read && this.markAsRead(notification._id)}
              >
                <div className="notification-icon">
                  {this.getNotificationIcon(notification.type)}
                </div>
                <div className="notification-content">
                  <div className="notification-title">{notification.title}</div>
                  <div className="notification-message">{notification.message}</div>
                  <div className="notification-time">
                    {new Date(notification.createdAt).toLocaleString()}
                  </div>
                </div>
              </ListGroup.Item>
            ))
          )}
        </ListGroup>
      </div>
    );
  }
}

export default NotificationList;
