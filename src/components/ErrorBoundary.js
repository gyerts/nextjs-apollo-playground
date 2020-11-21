import React from 'react';
import { H2, Box, Link } from '@market-ui/falcon-ui';
import {T} from "@market-ui/falcon-i18n";

// based on https://reactjs.org/docs/error-boundaries.html
export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    // You can also log the error to an error reporting service
    console.error(error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        this.props.render ? (
          this.props.render()
        ) : (
          <Box m="md" css={{ textAlign: 'center' }}>
            <H2 mb="md"><T id='errors.somethingWentWrong' /></H2>
            <Link onClick={() => window.location.reload()}><T id='words.refresh' /></Link>
          </Box>
        )
      );
    }

    return this.props.children;
  }
}
