import React from 'react'
import  classes from'../Styles/list.module.css'

 function Rightlist(props) {
  return (
    <div>
      <div className={classes.flex} onClick={props.onCLICK}>
            <img src={props.movieSrc} alt="" className={classes.img} />
            <p>{props.movieTitle}</p>
        </div>
    </div>
  )
}
export default Rightlist
