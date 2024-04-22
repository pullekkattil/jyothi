import React, { Component } from 'react';
import ErrorCard from './ErrorCard';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
      networkError: null
    };
  }

  componentDidCatch(error, errorInfo) {
    // Update state with component error information
    this.setState({
      hasError: true,
      error,
      errorInfo
    });
  }

  handleNetworkError = (error) => {
    // Update state with network error information
    this.setState({
      hasError: true,
      networkError: error
    });
  };

  handleCloseError = () => {
    this.setState({ hasError: false });
  };

  render() {
    if (this.state.hasError) {
      return (
        <ErrorCard 
          error={this.state.error ? this.state.error.toString() : this.state.networkError}
          onClose={this.handleCloseError} 
        />
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
