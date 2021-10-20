import { CLEAR_AUTH, CURRENT_URL, SET_AUTH } from '../store/types/authTypes';
import { clearError, setError, setSnack } from './errorActions';
import { loadingFalse, loadingTrue } from './spinnerActions';
import { clearMyFriends, clearUid, clearUser, setUid } from './profileActions';
import { clearChats } from './dialogsActions';

export const setAuth = () => ({
  type: SET_AUTH,
});

export const clearAuth = () => ({
  type: CLEAR_AUTH,
});

export const authorization = ({ email, password }) => {
  return dispatch => {
    dispatch(loadingTrue());

    return fetch(`${CURRENT_URL}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json;charset=utf-8' },
      body: JSON.stringify({ email, password }),
    })
      .then(response => response.json())
      .then(data => {
        if (data.result === 0) {
          dispatch(setAuth());
          dispatch(setUid(data.user));
          dispatch(setSnack({ text: data.text, result: data.result }));
        } else {
          dispatch(setError({ message: data.text, type: data.type }));
          dispatch(setSnack({ text: data.text, result: data.result }));
        }
      })
      .catch(error => {
        dispatch(setError({ message: error.message, type: 'error' }));
      })
      .finally(() => dispatch(loadingFalse()));
  };
};

export const registration = ({ name, email, password }) => {
  return dispatch => {
    dispatch(loadingTrue());

    return fetch(`${CURRENT_URL}/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json;charset=utf-8' },
      body: JSON.stringify({ email, password, name }),
    })
      .then(response => response.json())
      .then(data => {
        if (data.result === 0) {
          dispatch(authorization({ email, password }));
          dispatch(setSnack({ text: data.text, result: data.result }));
        } else {
          dispatch(setError({ message: data.text, type: data.type }));
          dispatch(setSnack({ text: data.text, result: data.result }));
        }
      })
      .catch(error => {
        dispatch(setError({ message: error.message, type: 'error' }));
      })
      .finally(() => dispatch(loadingFalse()));
  };
};

export const logOut = () => {
  return dispatch => {
    dispatch(loadingTrue());
    dispatch(clearAuth());
    dispatch(clearUid());
    dispatch(clearUser());
    dispatch(clearChats());
    dispatch(clearError());
    dispatch(loadingFalse());
    dispatch(clearMyFriends());
    dispatch(setSnack({ text: 'Вы вышли', result: 0 }));
  };
};
