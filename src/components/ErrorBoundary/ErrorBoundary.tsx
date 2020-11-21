import React from 'react';
import {Error} from "tslint/lib/error";

interface IProps {
  children: React.ReactElement
  renderError?: () => React.ReactElement
  logError?: (error: Error, errorInfo: React.ErrorInfo) => void
}
interface IState {
  hasError: boolean
}
export class ErrorBoundary extends React.Component<IProps, IState> {
  state: IState = {
    hasError: false,
  };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    this.props.logError
      ? this.props.logError(error, errorInfo)
      : console.error(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return this.props.renderError ? this.props.renderError() : null;
    }
    return this.props.children;
  }
}
