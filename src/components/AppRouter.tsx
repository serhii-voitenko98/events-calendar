import React, { FC } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { useTypedSelector } from '../hooks/useTypedSelector';
import { privateRoutes, publicRoutes, RouteNames } from '../routes';

export const AppRouter: FC = () => {
  const { isAuth } = useTypedSelector(state => state.authReducer);

  return isAuth ? (
    <Switch>
      {privateRoutes.map(route => (
        <Route {...route} key={route.path} />
      ))}
      <Redirect to={RouteNames.EVENT}></Redirect>
    </Switch>
  ) : (
    <Switch>
      {publicRoutes.map(route => (
        <Route {...route} key={route.path} />
      ))}
      <Redirect to={RouteNames.LOGIN}></Redirect>
    </Switch>
  );
};
