import React from 'react';

import Avatar from '../components/Avatar';

const MembersList = ({ members }) => {
  return (
    <div className='members'>
      {members?.map((member) => {
        return (
          <div className='members__item' key={member._id}>
            <div className='members__item-content'>
              <h3>{member.name}</h3>
            </div>
            <Avatar data={member} />
          </div>
        );
      })}
    </div>
  );
};
export default MembersList;
