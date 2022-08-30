import React, {  useContext } from 'react'
import MovieContext from '../../../store/movie-context'
import '../../Styles/input.css'
function SearchInput(props) {
  const inputContext=useContext(MovieContext)
  const {children,position}=props
  return (
    <div>
        <input type="search"  placeholder={position==='left'?'Type in First Movie':'Type in Second Movie'} value={position==='left'?inputContext.leftValue:inputContext.rightValue} onChange={position === 'left'?(event)=>inputContext.inputVALUEHandler(event.target.value,'left'):(event)=>inputContext.inputVALUEHandler(event.target.value)}/>
        {children}
    </div>
  )
}
export default React.memo(SearchInput)
