import React from 'react';
import { MiniCartPopup, MiniCartImpl, MessageController } from './components/minicart';
import './MiniCart.scss';
import {ErrorBoundary} from "../ErrorBoundary";
import {UnexpectedError} from "./components/UnexpectedError";


export const MiniCart = () => {
  return (
    <ErrorBoundary renderError={renderUnexpectedError}>
      <MiniCartPopup>{(props) => (
        <React.Fragment>
          <MessageController {...props} />
          <MiniCartImpl {...props} />
        </React.Fragment>
      )}</MiniCartPopup>
    </ErrorBoundary>
  );
};

const renderUnexpectedError = () => {
  return <UnexpectedError />
};
