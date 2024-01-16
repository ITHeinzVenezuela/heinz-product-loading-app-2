import React from 'react'

type Props = {
  animationDuration: string,
}

const ProductSkeleton = () => {
  return (
    <div className="ProductSkeleton">
      <div className="image-container">
        <img src="https://i.imgur.com/Q3TDDYy.png" alt="" />
      </div>
      <div className="ProductSkeleton__info">
        <div className="">
          <h4 className=""></h4>
          <small></small>
          <small></small>
          <small></small>
        </div>
        <div className="ProductSkeleton__info--button"></div>
      </div>
    </div>
  )
}

export default ProductSkeleton