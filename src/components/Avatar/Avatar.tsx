import classNames from 'classnames'
import React from 'react'
import { AvatarProps } from './types'
import { css } from '../../../styled-system/css'
import * as RadixAvatar from '@radix-ui/react-avatar'

const Avatar = (props: AvatarProps) => {
  const { id, image, active = false, handleClick } = props
  const { src, alt } = image

  const classNameAvatar = classNames(
    'avatar',
    css({ border: '4px solid green' }),
    active ? 'active' : false
  )

  return (
    <RadixAvatar.Root
      className={classNameAvatar}
      onClick={() => handleClick(src, id)}
    >
      <RadixAvatar.Image className="AvatarImage" src={src} alt={alt} />
      <RadixAvatar.Fallback>{alt}</RadixAvatar.Fallback>

      <RadixAvatar.Fallback className="AvatarFallback" delayMs={600}>
        CT
      </RadixAvatar.Fallback>
    </RadixAvatar.Root>
  )
}

export default Avatar
