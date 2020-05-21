import { useEffect, useRef } from 'react'

import { ErrorOrHint } from '@app-elements/form'

import './text-input.less'

export const TextInput = ({
  type = 'text',
  name,
  value,
  label,
  placeholder,
  variant,
  focus,
  onEnterUp,
  ...props
}) => {
  const handleKeyUp = (e) => {
    if (e.keyCode === 13) {
      onEnterUp()
    }
  }
  const inputRef = useRef(null)

  if (focus) {
    useEffect(() => {
      inputRef.current && inputRef.current.focus()
    }, [])
  }

  return <div className={`input-component ${variant || ''}`}>

    {label &&
    <label htmlFor={name}>{label}</label>
    }

    <input
      type={type}
      ref={inputRef}
      name={name}
      value={value}
      placeholder={placeholder}
      onKeyUp={handleKeyUp}
      {...props}
    />
    {props.formName != null &&
      <ErrorOrHint formName={props.formName} name={name} />
    }

  </div>
}
