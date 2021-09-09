import axios from 'axios';
import { AppDispatch } from '../..';
import UserService from '../../../api/UserService';
import { IUser } from '../../../models/user';
import {
  AuthActionsEnum,
  SetAuthAction,
  SetErrorAction,
  SetIsLoadingAction,
  SetUserAction,
} from './types';

export const AuthActionCreators = {
  setUser: (payload: IUser): SetUserAction => ({
    type: AuthActionsEnum.SET_USER,
    payload,
  }),
  setAuth: (payload: boolean): SetAuthAction => ({
    type: AuthActionsEnum.SET_AUTH,
    payload,
  }),
  setError: (payload: string): SetErrorAction => ({
    type: AuthActionsEnum.SET_ERROR,
    payload,
  }),
  setIsLoading: (payload: boolean): SetIsLoadingAction => ({
    type: AuthActionsEnum.SET_IS_LOADING,
    payload,
  }),
  login:
    (username: string, password: string) => async (dispatch: AppDispatch) => {
      try {
        dispatch(AuthActionCreators.setIsLoading(true));
        setTimeout(async () => {
          const response = await UserService.getUsers();
          const mockUser = response.data.find(
            user => user.username === username && user.password === password
          );
          if (mockUser) {
            localStorage.setItem('auth', 'true');
            localStorage.setItem('username', mockUser.username);
            dispatch(AuthActionCreators.setUser(mockUser));
            dispatch(AuthActionCreators.setAuth(true));
          } else {
            dispatch(
              AuthActionCreators.setError("User's credentials are wrong")
            );
          }
          dispatch(AuthActionCreators.setIsLoading(false));
        }, 1000);
      } catch (e) {
        dispatch(AuthActionCreators.setError('Something has been wrong'));
      }
    },
  logout: () => async (dispatch: AppDispatch) => {
    localStorage.removeItem('auth');
    localStorage.removeItem('username');
    dispatch(AuthActionCreators.setUser({} as IUser));
    dispatch(AuthActionCreators.setAuth(false));
  },
};
