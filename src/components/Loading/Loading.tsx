import React from 'react'

interface LoadingSpinnerProps {
  isLoading: boolean
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ isLoading }) => {
  if (!isLoading) {
    return null
  }

  return (
    <div className="loading-spinner-overlay">
      <div className="spinner"></div>
    </div>
  )
}

export default LoadingSpinner
