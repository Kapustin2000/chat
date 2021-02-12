import React from 'react';
import generateAvatar from '../utils/generateAvatar';

const Avatar = ({ data }) => {
  let color;
  if (data) {
    color = generateAvatar(data?._id);
  }

  return (
    <div
      className='avatar'
      style={{
        background: color,
      }}
    >
      {data?.members?.[0].name[0].toUpperCase()}
      {data?.name && data?.name[0].toUpperCase()}
    </div>
  );
};

export default Avatar;
