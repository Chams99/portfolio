import React from 'react'

interface EggIconProps {
  className?: string
  size?: number
}

export const EggIcon: React.FC<EggIconProps> = ({ className = '', size = 24 }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <ellipse
        cx="12"
        cy="14"
        rx="8"
        ry="10"
        fill="currentColor"
      />
    </svg>
  )
}
