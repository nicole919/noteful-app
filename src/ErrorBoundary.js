import React from "react";
import { Route } from "react-router-dom";
import PropTypes from "prop-types";

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false
    };
  }

  goBack = () => {
    this.props.history.goBack();
  };

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <>
          <h2> Something went wrong</h2>
          <Route path="/" component={this.goBack()} />
        </>
      );
    }
    return this.props.children;
  }
}

ErrorBoundary.propTypes = {
  hasError: PropTypes.bool
};
