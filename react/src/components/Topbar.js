import React, { memo } from 'react';
import Popup from 'reactjs-popup';
import { useDispatch } from 'react-redux';
import { setCurrentChat } from '../store/actions/chat';
import MembersList from '../components/MembersList';

import backChatsIcon from '../images/back-chats-icon.svg';

const Topbar = ({ chat, setSidebarVisible, userRole }) => {
  const dispatch = useDispatch();

  const toggleSidebarVisible = () => {
    setSidebarVisible((prevState) => !prevState);
  };

  return (
    <div className='topbar'>
      <div className='burger' onClick={toggleSidebarVisible}>
        <span className='burger__block'> </span>
        <span className='burger__block'> </span>
        <span className='burger__block'> </span>
      </div>
      {chat && (
        <>
          <div className='topbar__content'>
            <div className='topbar__members'>
              <p>{chat?.members.map((m, i) => m.name).join(', ')}</p>
            </div>

            <Popup
              trigger={() => <span>{chat?.members?.length} members</span>}
              closeOnDocumentClick
              on={['hover']}
              position='bottom center'
            >
              <MembersList members={chat?.members} />
            </Popup>
          </div>
          {userRole === 'Admin' && (
            <img
              className='topbar__back'
              src={backChatsIcon}
              alt=''
              onClick={() => dispatch(setCurrentChat(null))}
            />
          )}
        </>
      )}
    </div>
  );
};

export default memo(Topbar);
