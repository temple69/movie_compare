import React from 'react'
import  classes from'../Styles/list.module.css'
 function MoviesList(props) {
  const{movieSrc,movieTitle,onCLICK,position} = props
  return (
        <div className={classes.flex} onClick={position ==='left'?onCLICK:onCLICK}>
            <img src={position ==='left'?movieSrc:movieSrc} alt="" className={classes.img} />
            <p>{position ==='left'?movieTitle:movieTitle}</p>
        </div>
  )
}
export default MoviesList
