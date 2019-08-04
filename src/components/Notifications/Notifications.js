import React from 'react';
import { connect } from 'react-redux';
import ReactNotification from 'react-notifications-component';

class Notification extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      type: props.type || 'info',
      duration: props.duration || 1000,
      ...props,
    };

    this.notificationDOMRef = React.createRef();
  }

  componentWillUpdate(prevProps, prevState) {
    if (
      prevProps.title !== prevState.title ||
      prevProps.message !== prevState.message
    ) {
      this.setState({ ...prevProps }, this.addNotification);
    }
  }

  addNotification() {
    const { title, message, type, duration } = this.state;

    this.notificationDOMRef.current.addNotification({
      title,
      message,
      type,
      insert: 'bottom',
      container: 'top-right',
      animationIn: ['animated', 'fadeIn'],
      animationOut: ['animated', 'fadeOut'],
      dismiss: { duration },
      dismissable: { click: true, touch: true },
    });
  }

  render() {
    return <ReactNotification ref={this.notificationDOMRef} />;
  }
}

const mapStateToProps = ({ notification }) => ({
  title: notification.title,
  message: notification.message,
  type: notification.type,
  duration: notification.duration,
});

export default connect(mapStateToProps)(Notification);
