import React, { useEffect, useState, memo, useCallback, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import clsx from 'clsx';
import {
  getChatInfo,
  getAdminChatInfo,
  addNewChatAction,
  addNewChatUserAction,
} from '../store/actions/chat';
import { getUserAction } from '../store/actions/user';
import Sidebar from './Sidebar';
import MessagesHistory from './MessagesHistory';
import ChatsList from './ChatsList';
import MembersList from './MembersList';

const Chat = ({ history }) => {
  const dispatch = useDispatch();
  const { currentChat, chat, socket, user, userRole } = useSelector(
    ({ chat, socket, user }) => ({
      chat: chat.data,
      currentChat: chat.currentChat,
      socket: socket.io,
      user: user.data,
      userRole: user.data?.role?.name,
    })
  );
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef();

  const handleOutsideClick = useCallback(
    (e) => {
      if (
        ref.current &&
        !ref.current.contains(e.target) &&
        e.target.className !== 'burger' &&
        e.target.className !== 'burger__block'
      ) {
        setIsVisible(false);
      }
    },
    [ref]
  );

  const handleNewChat = useCallback(
    (chat) => {
      if (user?.role.name === 'Admin') {
        dispatch(addNewChatAction(chat));
      }
    },
    [user, dispatch]
  );

  const handleNewUser = useCallback(
    (user) => {
      dispatch(addNewChatUserAction(user));
    },
    [dispatch]
  );

  useEffect(() => {
    socket?.on('NEW_CHAT', handleNewChat);
    socket?.on('NEW_USER', handleNewUser);
    return () => {
      socket?.removeEventListener('NEW_CHAT', handleNewChat);
      socket?.removeEventListener('NEW_USER', handleNewUser);
    };
  }, [socket, handleNewChat, handleNewUser]);

  useEffect(() => {
    document.addEventListener('click', handleOutsideClick);
    return () => document.removeEventListener('click', handleOutsideClick);
  }, [handleOutsideClick]);

  useEffect(() => {
    if (!user) {
      dispatch(getUserAction());
    }
  }, [user, dispatch]);

  useEffect(() => {
    if (!chat) {
      if (userRole === 'Admin') {
        dispatch(getAdminChatInfo());
      }
      if (userRole === 'Client') {
        dispatch(getChatInfo());
      }
    }
  }, [chat, userRole, dispatch]);

  return (
    <div className='chat'>
      <Sidebar
        isVisible={isVisible}
        ref={ref}
        history={history}
        setSidebarVisible={setIsVisible}
      />

      <MessagesHistory
        socket={socket}
        currentChat={currentChat}
        user={user}
        setSidebarVisible={setIsVisible}
      />

      <div
        className={clsx('chat__dialogs', {
          'chat__dialogs--visible': currentChat,
          'chat__dialogs--hide': userRole === 'Client',
        })}
      >
        {userRole === 'Admin' && (
          <ChatsList chats={chat} currentChatId={currentChat?._id} />
        )}
        {userRole === 'Client' && (
          <MembersList members={currentChat?.members} />
        )}
      </div>
    </div>
  );
};

export default memo(withRouter(Chat));
