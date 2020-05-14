import './message.less'
import React from 'react'
// import Linkify from 'react-linkify'
import Linkifier from 'react-linkifier'

export const Message = ({ content, timestamp, author }) => {
  return (
    <div className='message'>
      <div className='message__content'>
        <Linkifier>{content}</Linkifier>
        {/* <Linkify>{content}</Linkify> */}
      </div>
      <div className='message__stamp'>
        <small>{author} - {timestamp}</small>
      </div>
    </div>
  )
}
