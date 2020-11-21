import React from "react";
import {useHistory, useLocation, useParams} from "react-router-dom";
import {AuthContextLayer} from "./components/PageLayers/AuthContextLayer";
import {AuthImplLayer} from './components/PageLayers/AuthImplLayer'
import {TopPageMessage} from "src/components";


export const AuthPage = () => {
  const query = new URLSearchParams(useLocation().search);
  let next = query.get("next") || '/';
  let isCheckout = query.get("checkout") === 'true';
  // @ts-ignore

  let {tab} = useParams();
  const history = useHistory();

  if ( !['signin', 'signup', 'guest'].includes(tab) ) {
    tab = 'signin';
  }

  if (tab === 'signup') {
    isCheckout = false;
  }

  if (next.includes('/authorization')) {
    console.warn('AuthPage, next cannot link to itself', history.location.pathname);
    const url = history.location.pathname.replace(/\W(next=[^&]*)/, '');
    history.replace(url);
  }

  return (
    <AuthContextLayer>
      <TopPageMessage mb='sm' />
      <AuthImplLayer isCheckout={isCheckout} next={next} tab={tab} />
    </AuthContextLayer>
  );
};
