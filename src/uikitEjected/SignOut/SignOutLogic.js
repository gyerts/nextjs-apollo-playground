import React from 'react';
import { Router } from './../Router';
import { SignOutMutation } from './SignOutMutation';
import {IsAuthenticatedQuery} from "src/api";

export const SignOutLogic = props => (
  <Router>
    {({ history }) => (
      <IsAuthenticatedQuery>
        {({ customer }) => (
          <SignOutMutation
            update={(_cache, result) => {
              if (!result.errors && result.data.signOut) {
                history.push('/');
              }
            }}
          >
            {(signOut, result) => props.children({ isSignedIn: !!customer, signOut, result })}
          </SignOutMutation>
        )}
      </IsAuthenticatedQuery>
    )}
  </Router>
);
