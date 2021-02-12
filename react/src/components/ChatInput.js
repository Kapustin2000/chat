import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import {
  addMessage,
  sendAdminMessageAction,
  sendMessageAction,
} from '../store/actions/chat';

const ChatInput = ({ chat, socket, userRole }) => {
  const [value, setValue] = useState('');
  const dispatch = useDispatch();

  const handleAddMessage = useCallback(
    (msg) => {
      if (chat._id === msg.chat_id) {
        dispatch(addMessage(msg));
      }
    },
    [chat._id, dispatch]
  );

  useEffect(() => {
    socket?.on('MESSAGE', handleAddMessage);
    return () => {
      socket?.removeEventListener('MESSAGE', handleAddMessage);
    };
  }, [socket, dispatch, handleAddMessage]);

  const onTextareaChange = (e) => setValue(e.target.value);

  const handleEnterPressed = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (value) {
        handleSendMessage();
      }
    }
  };

  const handleSendMessage = () => {
    if (userRole === 'Admin') {
      dispatch(sendAdminMessageAction(chat._id, value));
    }
    if (userRole === 'Client') {
      dispatch(sendMessageAction(chat._id, value));
    }
    setValue('');
  };

  return (
    <div className='chat-input'>
      <textarea
        value={value}
        onChange={onTextareaChange}
        onKeyDown={handleEnterPressed}
        placeholder='Type a message...'
      />
      <button onClick={handleSendMessage} disabled={!value}>Type</button>
    </div>
  );
};

export default ChatInput;
