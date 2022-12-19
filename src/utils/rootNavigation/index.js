import * as React from 'react';
import {StackActions, CommonActions} from '@react-navigation/native';

export const rootNavigation = React.createRef();

export function navigate(route, params) {
  rootNavigation.current?.navigate(route, params);
}

export function replace(route, params) {
  rootNavigation.current?.dispatch(StackActions.replace(route, params));
}

export function pop() {
  rootNavigation.current?.dispatch(StackActions.pop());
}

export function reset({routeName}) {
  rootNavigation.current?.dispatch(
    CommonActions.reset({
      index: 0,
      routes: [{name: routeName}],
    }),
  );
}
