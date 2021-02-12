import { combineReducers } from 'redux';
import user from './user';
import chat from './chat';
import socket from './socket';

export default combineReducers({
  user,
  chat,
  socket,
});
