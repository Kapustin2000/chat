import React, { useRef, useEffect } from 'react';
import Avatar from './Avatar';
import clsx from 'clsx';

const MessagesList = ({ messages, user }) => {
  const messagesRef = useRef();

  useEffect(() => {
    messagesRef.current.scrollTo(0, messagesRef.current.scrollHeight);
  }, [messages]);
  return (
    <div className='messages' ref={messagesRef}>
      {messages?.map((message) => (
        <div
          className={clsx('messages__item', {
            'messages__item--is-me': user?._id === message?.user._id,
          })}
          key={message._id}
        >
          <Avatar data={message.user} />
          <div className='messages__item-content'>
            <p>{message.text}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MessagesList;
