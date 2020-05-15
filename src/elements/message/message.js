import React from 'react'
import Linkifier from 'react-linkifier'

import './message.less'

export const Message = ({ text, timestamp, author }) => {
  // console.log('RENDERING MESSAGE')
  return (
    <div className='message__container--outer'>
      <h4 className='message__author'>{author} says:</h4>
      <div className='message__container--inner'>
        <div className='message__content'>
          <Linkifier>{text}</Linkifier>
        </div>
        <div className='message__stamp'>
          <small>{timestamp}</small>
        </div>
      </div>
    </div>
  )
}
