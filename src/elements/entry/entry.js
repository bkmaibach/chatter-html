import Linkifier from 'react-linkifier'

import './entry.less'

export const Entry = ({ text, timestamp, author }) => {
  // console.log('RENDERING entry')
  return (
    <div className='entry__container--outer'>
      <h4 className='entry__author'>{author} says:</h4>
      <div className='entry__container--inner'>
        <div className='entry__content'>
          <Linkifier>{text}</Linkifier>
        </div>
        <div className='entry__stamp'>
          <small>{timestamp}</small>
        </div>
      </div>
    </div>
  )
}
