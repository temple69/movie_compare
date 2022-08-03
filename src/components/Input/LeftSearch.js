import React, {  useContext } from 'react'
import '../Styles/input.css'
import MovieContext from '../../store/movie-context'

function LeftSearch(props) {
  const inputContext=useContext(MovieContext)
  return (
    <div>
        <input type="search"  placeholder='Type in first movie' value={inputContext.leftValue} onChange={(event)=>inputContext.leftHandler(event.target.value)}/>
        {props.children}
    </div>
  )
}
export default React.memo(LeftSearch)
