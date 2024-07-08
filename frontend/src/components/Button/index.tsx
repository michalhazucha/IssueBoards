import type { IButtonProps, TVariant } from '../../config/interfaces'
import { useEffect, useState } from 'react'

const Button = ({ onClick, disabled, variant, children }:IButtonProps) => {
  const [classNames, setClassNames] = useState('dark')
  const changeVariant = (variant:TVariant) => {
    if (variant === 'light') {
      setClassNames(
        'bg-white text-teal-500 py-2 px-4 rounded-lg shadow-lg hover:bg-gray-100 transition',
      )
    } else {
      setClassNames(
        'bg-teal-500 text-white font-bold ck py-2 px-4 rounded-lg shadow-lg hover:bg-teal-600 transition h-10',
      )
    }
}
  useEffect(() => {
    changeVariant(variant)
  }, [variant])

  return (
    <button className={classNames} disabled={disabled} onClick={onClick}>
      {children}
    </button>
  )
}

export default Button
