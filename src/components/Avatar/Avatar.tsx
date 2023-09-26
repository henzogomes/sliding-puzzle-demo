import classNames from 'classnames';
import React from 'react';
import { AvatarProps } from './types';

const Avatar = (props: AvatarProps) => {
  const { id, image, active = false, handleClick } = props;
  const { src, alt } = image;

  const classNameAvatar = classNames(
    'avatar',
    active ? 'active' : false,
  );

  // @TODO: Implement Radix Avatar.
  return (
    <div className={classNameAvatar} onClick={() => handleClick(src, id)}>
      <img src={src} alt={alt} />
    </div>
  );
};

export default Avatar;
