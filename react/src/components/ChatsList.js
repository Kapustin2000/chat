import React, { memo } from 'react';
import { useDispatch } from 'react-redux';
import { getCurrentChatAction } from '../store/actions/chat';
import clsx from 'clsx';
import Avatar from './Avatar';

const ChatsList = ({ chats, currentChatId }) => {
  const dispatch = useDispatch();

  const handleChatClick = (id) => () => {
    dispatch(getCurrentChatAction(id));
  };

  return (
    <div className='chats'>
      {chats &&
        chats.map((chat) => {
          return (
            <div
              className={clsx('chats__item', {
                'chats__item--active': currentChatId === chat._id,
              })}
              key={chat._id}
              onClick={handleChatClick(chat._id)}
            >
              <div className='chats__item-content'>
                <h3>{chat.members.map((m) => m.name).join(', ')}</h3>
              </div>
              <Avatar data={chat} />
            </div>
          );
        })}
    </div>
  );
};

export default memo(ChatsList);
