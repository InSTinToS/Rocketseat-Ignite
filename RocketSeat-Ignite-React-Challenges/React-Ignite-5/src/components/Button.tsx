import Icon from './Icon'
import React from 'react'
import '../styles/button.scss'
import { ButtonHTMLAttributes } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  title: string
  iconName: 'action' | 'comedy' | 'documentary' | 'drama' | 'horror' | 'family'
  selected: boolean
}

const Button = ({ iconName, title, selected, ...rest }: ButtonProps) => (
  <button type='button' {...(selected && { className: 'selected' })} {...rest}>
    <Icon name={iconName} color={selected ? '#FAE800' : '#FBFBFB'} />

    {title}
  </button>
)

export default Button
