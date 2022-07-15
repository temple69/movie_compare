import React, { useContext } from 'react'
import MovieContext from '../../store/movie-context'

 function RightSearch(props) {
   const rightcontext= useContext(MovieContext)
  return (
    <div>
        <input type="search" placeholder='Type in second movie' value={rightcontext.rightValue} onChange={(event)=>rightcontext.rightHandler(event.target.value)}/>
      {props.children}
    </div>
  )
}
export default RightSearch
