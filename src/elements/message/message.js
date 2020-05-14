import './message.less'
import React from 'react'
// import Linkify from 'react-linkify'
import Linkifier from 'react-linkifier'

export const Message = ({ content, timestamp, author }) => {
  return (
    <div className='message__container--outer'>
      <h4 className='message__author'>{author} says:</h4>
      <div className='message__container--inner'>
        <div className='message__content'>
          <Linkifier>{content}</Linkifier>
          {/* <Linkify>{content}</Linkify> */}
        </div>
        <div className='message__stamp'>
          <small>{timestamp}</small>
        </div>
      </div>
    </div>
  )
}
