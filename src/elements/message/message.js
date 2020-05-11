import './message.less'
// import React, { useState, useEffect, useRef } from 'react'
import React from 'react'
// import url from '/util/url'
export const Message = ({ content, timestamp, author }) => {
  return (
    <div className='message'>
      <div className='message__content'>
        {content}
      </div>
      <div className='message__stamp'>
        <small>{author} - {timestamp}</small>
      </div>
    </div>
  )
}
