import React, { useEffect, useRef } from 'react'
import type { ImgHTMLAttributes } from "react"

// interface Props extends ImgHTMLAttributes<HTMLImageElement> {
// }

// type Props = LazyImageProps & ImageProps

interface LazyImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  url: string,
}

const Picture = ({ url, ...imageProps }: LazyImageProps) => {
  const $image = useRef<HTMLImageElement>(null)

  useEffect(() => {
    if ($image.current) {
      console.log($image.current.src)
    }
  }, [])

  return (
    <img ref={$image} src={url} {...imageProps} />
  )
}

export default Picture