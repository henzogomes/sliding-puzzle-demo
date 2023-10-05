import classNames from 'classnames'
import React from 'react'
import { AvatarProps } from './types'
import { css } from '../../../styled-system/css'
import * as RadixAvatar from '@radix-ui/react-avatar'
import { flex } from '../../../styled-system/patterns/flex'

const Avatar = (props: AvatarProps) => {
  const { id, image, active = false, handleClick } = props
  const { src, alt } = image

  const Root = classNames(
    flex({ align: 'center', justify: 'center' }),
    css({
      borderRadius: '50%',
      overflow: 'hidden',
      userSelect: 'none',
      h: 'full',
      w: 'full',
      cursor: 'pointer',
      transition: 'transform .2s ease-in-out',
      border: '4px dashed green',
      lg: {
        w: '150px',
        h: '150px',
        _hover: { transform: 'scale(1.1)' }
      }
    })
  )

  const RootActive = css({
    border: '4px solid #fff'
  })

  const Image = css({
    borderRadius: 'inherit',
    objectFit: 'cover',
    h: 'full',
    w: 'full'
  })

  const ClassNames = {
    Root,
    Image,
    RootActive
  }

  const Fallback = classNames(
    flex({ align: 'center', justify: 'center' }),
    css({
      bg: '#000',
      color: '#fff',
      w: 'full',
      h: 'full',
      fontSize: '28px',
      lineHeight: 1,
      fontWeight: 700
    })
  )

  const classNameAvatar = classNames(
    ClassNames.Root,
    active ? ClassNames.RootActive : false
  )

  return (
    <RadixAvatar.Root
      className={classNameAvatar}
      onClick={() => handleClick(src, id)}
    >
      <RadixAvatar.Image className={ClassNames.Image} src={src} alt={alt} />
      <RadixAvatar.Fallback>{alt}</RadixAvatar.Fallback>

      <RadixAvatar.Fallback className={Fallback} delayMs={600}>
        CT
      </RadixAvatar.Fallback>
    </RadixAvatar.Root>
  )
}

export default Avatar
