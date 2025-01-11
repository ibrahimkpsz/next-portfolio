import React from 'react'
import { FaSpinner } from 'react-icons/fa'

const Loading = () => {
  return (
    <div className="flex items-center justify-center w-full h-screen">
      <FaSpinner className="animate-spin" />
    </div>
  )
}

export default Loading