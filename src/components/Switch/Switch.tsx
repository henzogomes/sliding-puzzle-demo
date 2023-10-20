import * as RadixSwitch from '@radix-ui/react-switch'
import React from 'react'
import { SwitchProps } from './types'
import classNames from 'classnames'
import { css } from '../../../styled-system/css'
import { flex } from '../../../styled-system/patterns'
import { textShadow } from '../../../styled-system/recipes'

const Switch = (props: SwitchProps) => {
  const { id, defaultChecked, label, handleChange } = props

  const switchContainer = classNames(flex({ gap: 8, align: 'center' }))

  const switchLabel = classNames(
    css({
      fontSize: '16px',
      color: '#fff',
      lineHeight: 1,
      userSelect: 'none',
      paddingRight: '16px'
    }),
    textShadow()
  )

  const switchThumb = classNames(
    css({
      display: 'block',
      width: '21px',
      height: '21px',
      backgroundColor: '#fff',
      borderRadius: '50%',
      transform: 'translateX(2px)',
      transition: 'transform .2s ease-in-out',
      '&[data-state="checked"]': {
        transform: 'translateX(19px)'
      }
    })
  )

  const switchRoot = classNames(
    css({
      width: '42px',
      height: '25px',
      cursor: 'pointer',
      bgColor: '#333',
      borderRadius: '9999px',
      opacity: 0.5,
      position: 'relative',
      boxShadow: '0 2px 10px #222',
      WebkitTapHighlightColor: '#333',
      '&[data-state="checked"]': {
        bgColor: '#000',
        opacity: 1
      }
    })
  )

  return (
    <form>
      <div className={switchContainer}>
        <label className={switchLabel} htmlFor={id}>
          {label}
        </label>
        <RadixSwitch.Root
          className={switchRoot}
          id={id}
          defaultChecked={defaultChecked}
          onCheckedChange={handleChange}
        >
          <RadixSwitch.Thumb className={switchThumb} />
        </RadixSwitch.Root>
      </div>
    </form>
  )
}

export default Switch
