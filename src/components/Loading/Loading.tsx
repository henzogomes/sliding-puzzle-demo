import classNames from 'classnames'
import React from 'react'
import { css } from '../../../styled-system/css'
import { flex } from '../../../styled-system/patterns'

interface LoadingSpinnerProps {
  isLoading: boolean
}

const overlay = classNames(
  flex({ align: 'center', justify: 'center' }),
  css({
    position: 'fixed',
    top: 0,
    left: 0,
    w: '100%',
    h: '100%',
    bg: 'rgba(0, 0, 0, 0.5)',
    zIndex: 9999
  })
)

const spinner = classNames(
  css({
    border: '4px solid rgba(255, 255, 255, 0.3)',
    borderTop: '4px solid #fff',
    borderRadius: '50%',
    width: '40px',
    height: '40px',
    animation: 'spin 0.8s linear infinite'
  })
)

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ isLoading }) => {
  if (!isLoading) {
    return null
  }

  return (
    <div className={overlay}>
      <div className={spinner}></div>
    </div>
  )
}

export default LoadingSpinner
