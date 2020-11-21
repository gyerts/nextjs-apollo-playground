import React from 'react';
import { SignOutMutation } from './SignOutMutation';
import {IIsAuthenticatedResponse, IsAuthenticatedQuery,} from "..";


interface IProps {
  children: (props: {
    isSignedIn: boolean,
    signOut: () => void,
    result: any
  }) => React.ReactElement
}
export const SignOutLogic = (props: IProps) => (
  <IsAuthenticatedQuery>
    {({ customer }: IIsAuthenticatedResponse) => (
      <SignOutMutation>
        {(signOut, result) => props.children({
          isSignedIn: !!customer,
          signOut: async () => {
            await signOut();
            window.location.reload();
          },
          result
        })}
      </SignOutMutation>
    )}
  </IsAuthenticatedQuery>
);
