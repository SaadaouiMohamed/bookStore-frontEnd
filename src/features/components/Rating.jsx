import React from 'react'

export default function Rating(props) {
    const style={color:'rgb(240, 221, 12)'}
  return (
    <div>
    <span>
        <i
          style={ style }
          className={
            props.rating >= 1
              ? 'fas fa-star'
              : 'far fa-star'
          }
        ></i>
      </span>
      <span>
        <i
          style={ style }
          className={
            props.rating >= 2
              ? 'fas fa-star'
              : 'far fa-star'
          }
        ></i>
      </span>
      <span>
        <i
          style={ style }
          className={
            props.rating >= 3
              ? 'fas fa-star'
              : 'far fa-star'
          }
        ></i>
      </span>
      <span>
        <i
          style={ style }
          className={
            props.rating >= 4
              ? 'fas fa-star'
              : 'far fa-star'
          }
        ></i>
      </span>
      <span>
        <i
          style={ style }
          className={
            props.rating >= 5
              ? 'fas fa-star'
              : 'far fa-star'
          }
        ></i>
      </span>
    </div>
  )
}
