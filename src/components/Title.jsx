import React from 'react'
import './Title.css'

const Title = ({ text1, text2 }) => {
  return (
    <div className='title'>
      <p>{text1} <span>{text2}</span></p>
      <p className='title-line'></p>
    </div>
  )
}

export default Title