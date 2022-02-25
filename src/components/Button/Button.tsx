import React, {ButtonHTMLAttributes, DetailedHTMLProps} from "react";
import style from "./Button.module.css"

type DefaultButtonPropsType = DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>

type SuperButtonPropsType = DefaultButtonPropsType & {
  padding?: string
}

export const Button: React.FC<SuperButtonPropsType> = (
  {
    padding,
    className,
    ...restProps
  }
) => {
  const finalClassName = className ? `${className} ${style.btn}` : style.btn

  return (
    <button
      style={padding ? {padding:`9px ${padding}`} : {padding:'9px 9px'}}
      className={finalClassName}
      {...restProps}
    />
  )
}