import React, { Component } from 'react'

function FontCustom(props) {
  const { type, style, children } = props
  const setFontType = (fontType) => {
    switch (fontType) {
      case 'regular':
        return 'Roboto-Regular'
      case 'bold':
        return 'Roboto-Bold'
      default:
        return 'Roboto-Light'
    }
  }

  const font = setFontType(type || 'normal')
  const textStyle = [{ fontFamily: font }, style || {}]
  const allProps = { ...props, style: textStyle }

  // eslint-disable-next-line react/jsx-props-no-spreading
  return <div {...allProps}>{children}</div>
}

export default FontCustom
