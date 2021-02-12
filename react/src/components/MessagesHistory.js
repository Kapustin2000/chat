import React from 'react';
import Topbar from './Topbar';
import MessagesList from './MessagesList';
import ChatInput from './ChatInput';

const MessagesHistory = ({ socket, user, currentChat, setSidebarVisible }) => {
  return (
    <div className='messages__history'>
      <Topbar
        chat={currentChat}
        setSidebarVisible={setSidebarVisible}
        userRole={user?.role.name}
      />

      {currentChat ? (
        <>
          <MessagesList messages={currentChat?.messages} user={user} />
          <ChatInput
            chat={currentChat}
            socket={socket}
            userRole={user?.role.name}
          />
        </>
      ) : (
        <div className='messages__empty'>Choose a chat</div>
      )}
    </div>
  );
};

export default MessagesHistory;
