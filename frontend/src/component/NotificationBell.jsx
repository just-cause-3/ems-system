import React, { Component } from 'react';
import { Dropdown } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import './NotificationBell.css';

class NotificationBell extends Component {
  state = {
    unreadCount: 0,
    notifications: [],
    loading: false
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
      const notifications = response.data;
      const unreadCount = notifications.filter(n => !n.read).length;
      this.setState({ notifications, unreadCount });
    } catch (error) {
      console.error('Error loading notifications:', error);
    }
  };

  handleNotificationClick = async (notification) => {
    if (!notification.read) {
      try {
        await axios.put(
          `http://localhost:4000/api/notifications/${notification._id}/read`,
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
    }
  };

  render() {
    const { unreadCount, notifications } = this.state;

    return (
      <Dropdown className="notification-bell">
        <Dropdown.Toggle variant="link" id="notification-dropdown">
          <FontAwesomeIcon icon={faBell} />
          {unreadCount > 0 && (
            <span className="notification-badge">{unreadCount}</span>
          )}
        </Dropdown.Toggle>

        <Dropdown.Menu className="notification-menu">
          <div className="notification-header">
            <h6>Notifications</h6>
            {notifications.length > 0 && (
              <small>
                <a href="/notifications">View All</a>
              </small>
            )}
          </div>
          <div className="notification-list">
            {notifications.length === 0 ? (
              <div className="no-notifications">No notifications</div>
            ) : (
              notifications.slice(0, 5).map(notification => (
                <Dropdown.Item
                  key={notification._id}
                  onClick={() => this.handleNotificationClick(notification)}
                  className={`notification-item ${notification.read ? 'read' : 'unread'}`}
                >
                  <div className="notification-title">{notification.title}</div>
                  <div className="notification-message">{notification.message}</div>
                  <div className="notification-time">
                    {new Date(notification.createdAt).toLocaleString()}
                  </div>
                </Dropdown.Item>
              ))
            )}
          </div>
        </Dropdown.Menu>
      </Dropdown>
    );
  }
}

export default NotificationBell;
